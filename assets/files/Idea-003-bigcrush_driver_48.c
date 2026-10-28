/*
 * bigcrush_driver_46.c
 * Optimoitu 64-bittinen kokonaislukutoteutus ja TestU01 BigCrush -testiajuri prng46-algoritmille (256 alkioa).
 *
 * Ulostulo per askel: 512 x 32-bittistä sanaa (32 keskimmäistä bittiä kaikista r1- ja r2-alkioista).
 */

#include <stdarg.h>
#include <limits.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

#include <TestU01.h>

#define H 256U
#define WORDS_PER_STEP (2 * H) // 256 x r1 + 256 x r2 = 512 sanaa per askel

typedef struct {
    uint64_t r1[H];
    uint64_t r2[H];
    uint32_t idx1[H];
    uint32_t idx2[H];
    uint32_t word_buffer[WORDS_PER_STEP];
    uint32_t word_index;
} Prng46_64;

// SplitMix64 64-bittiseen alustukseen
static inline uint64_t splitmix64_next(uint64_t *state) {
    *state += 0x9E3779B97F4A7C15ULL;
    uint64_t z = *state;
    z = (z ^ (z >> 30)) * 0xBF58476D1CE4E5B9ULL;
    z = (z ^ (z >> 27)) * 0x94D049BB133111EBULL;
    return z ^ (z >> 31);
}

// Lomitusjärjestämisen apurakenne alustuksen sort-operaatioille
typedef struct {
    uint64_t val;
    uint32_t orig_idx;
} SortPair;

static void merge_sort_pairs(SortPair *pairs, SortPair *temp, size_t left, size_t right) {
    if (right - left <= 1) return;

    size_t mid = left + (right - left) / 2;
    merge_sort_pairs(pairs, temp, left, mid);
    merge_sort_pairs(pairs, temp, mid, right);

    size_t i = left, j = mid, k = left;
    while (i < mid && j < right) {
        if (pairs[i].val <= pairs[j].val) {
            temp[k++] = pairs[i++];
        } else {
            temp[k++] = pairs[j++];
        }
    }
    while (i < mid) temp[k++] = pairs[i++];
    while (j < right) temp[k++] = pairs[j++];

    for (size_t p = left; p < right; p++) {
        pairs[p] = temp[p];
    }
}

void prng46_generate_step(Prng46_64 *g) {
    uint64_t temp_r1[H];
    uint64_t temp_r2[H];
    uint64_t a_r[H];
    uint32_t a_idx[H];

    uint64_t new_r1[H];
    uint64_t new_r2[H];
    uint32_t new_idx1[H];
    uint32_t new_idx2[H];

    // 1. Aritmetiikka: mod(r1+r2, 1) -> 64-bittiset ylivuotoyhteenlaskut (mod 2^64)
    for (size_t i = 0; i < H; i++) {
        temp_r1[i] = g->r1[i] + g->r2[i];
    }
    for (size_t i = 0; i < H; i++) {
        temp_r2[i] = temp_r1[i] + g->r2[i];
    }

    // Alustetaan uudet puskurit vanhoilla arvoilla
    for (size_t i = 0; i < H; i++) {
        new_r1[i] = temp_r1[i];
        new_r2[i] = temp_r2[i];
        new_idx1[i] = g->idx1[i];
        new_idx2[i] = g->idx2[i];
    }

    // 2. Tilan r1 ja r2 indexed assignment:
    // a = r1;
    // r1(idx2) = r2(idx1);
    // r2(idx1) = a(idx2);
    for (size_t i = 0; i < H; i++) {
        a_r[i] = temp_r1[i];
    }
    for (size_t i = 0; i < H; i++) {
        new_r1[g->idx2[i]] = temp_r2[g->idx1[i]];
        new_r2[g->idx1[i]] = a_r[g->idx2[i]];
    }

    // 3. Indeksien idx1 ja idx2 indexed assignment:
    // a = idx1;
    // idx1(idx2) = idx2(idx1);
    // idx2(idx1) = a(idx2);
    for (size_t i = 0; i < H; i++) {
        a_idx[i] = g->idx1[i];
    }
    for (size_t i = 0; i < H; i++) {
        new_idx1[g->idx2[i]] = g->idx2[g->idx1[i]];
        new_idx2[g->idx1[i]] = a_idx[g->idx2[i]];
    }

    // Tallennetaan päivitetyt arvot takaisin tilageneraattoriin
    for (size_t i = 0; i < H; i++) {
        g->r1[i] = new_r1[i];
        g->r2[i] = new_r2[i];
        g->idx1[i] = new_idx1[i];
        g->idx2[i] = new_idx2[i];
    }

    // 4. Ulostulo: Poimitaan keskimmäiset 32 bittiä (bitit 16–47) kaikista 256 alkion r1- ja r2-taulukoista
    size_t buf_idx = 0;
    for (size_t i = 0; i < H; i++) {
        g->word_buffer[buf_idx++] = (uint32_t)((g->r1[i] >> 16) & 0xFFFFFFFFULL);
    }
    for (size_t i = 0; i < H; i++) {
        g->word_buffer[buf_idx++] = (uint32_t)((g->r2[i] >> 16) & 0xFFFFFFFFULL);
    }

    g->word_index = 0;
}

void prng46_init(Prng46_64 *g, uint64_t seed) {
    uint64_t sm_state = seed;
    SortPair pairs1[H], temp1[H];
    SortPair pairs2[H], temp2[H];

    for (size_t i = 0; i < H; i++) {
        g->r1[i] = splitmix64_next(&sm_state);
        g->r2[i] = splitmix64_next(&sm_state);

        pairs1[i].val = g->r1[i];
        pairs1[i].orig_idx = (uint32_t)i;

        pairs2[i].val = g->r2[i];
        pairs2[i].orig_idx = (uint32_t)i;
    }

    merge_sort_pairs(pairs1, temp1, 0, H);
    merge_sort_pairs(pairs2, temp2, 0, H);

    for (size_t i = 0; i < H; i++) {
        g->idx1[i] = pairs1[i].orig_idx;
        g->idx2[i] = pairs2[i].orig_idx;
    }

    prng46_generate_step(g);
}

uint32_t prng46_next_u32(Prng46_64 *g) {
    if (g->word_index >= WORDS_PER_STEP) {
        prng46_generate_step(g);
    }
    return g->word_buffer[g->word_index++];
}

/* ========================================================================= */
/* TestU01 BigCrush Driver                                                  */
/* ========================================================================= */

static Prng46_64 *g_prng = NULL;
static uint64_t g_steps_count = 0;
static int g_initialized = 0;

static void initialize_generator_once(void) {
    if (!g_initialized) {
        g_prng = malloc(sizeof(Prng46_64));
        if (!g_prng) {
            fprintf(stderr, "ERROR: Muistin varaus epäonnistui.\n");
            exit(EXIT_FAILURE);
        }
        prng46_init(g_prng, 0x123456789ABCDEF0ULL);
        g_steps_count = 1;
        g_initialized = 1;
    }
}

unsigned int get_next_bits(void) {
    initialize_generator_once();

    if (g_prng->word_index >= WORDS_PER_STEP) {
        ++g_steps_count;
    }

    return (unsigned int)prng46_next_u32(g_prng);
}

int main(void) {
    unif01_Gen *gen;

    setvbuf(stdout, NULL, _IONBF, 0);

    printf("prng46 (256-Element Scatter/Indexed Assignment PRNG) / BigCrush\n");
    printf("---------------------------------------------------------------\n");
    printf("Output: Mid 32-bits (16-47) of ALL 256 r1 and ALL 256 r2 elements\n");
    printf("Initializing state...\n");

    initialize_generator_once();

    printf("Creating TestU01 external bits generator...\n");
    gen = unif01_CreateExternGenBits(
        "prng46 (256 elements, 512 words/step)",
        get_next_bits
    );

    if (gen == NULL) {
        fprintf(stderr, "ERROR: unif01_CreateExternGenBits returned NULL.\n");
        return EXIT_FAILURE;
    }

    printf("Starting TestU01 BigCrush...\n\n");
    bbattery_Crush(gen); 

    printf("\nBigCrush finished.\n");
    printf("Total generator steps performed: %llu\n", (unsigned long long)g_steps_count);

    unif01_DeleteExternGenBits(gen);
    if (g_prng) free(g_prng);

    return EXIT_SUCCESS;
}