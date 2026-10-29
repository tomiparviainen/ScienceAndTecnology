/*
 * IDEA PORTFOLIO CONFIGURATION
 * 1. Edit SITE below.
 * 2. Add categories to CATEGORIES.
 * 3. Add your ideas to IDEAS.
 * 4. Put images/files in the assets/ folder and use relative paths.
 *
 * IMPORTANT ABOUT COUNTERS:
 * The built-in preview counter uses this browser's localStorage only. It is
 * NOT a shared visitor counter and does not count other people's browsers.
 * For global counts, configure a hosted analytics/event service or a small
 * serverless endpoint. See README.md before enabling real tracking.
 */

// --- ANALYTICS: ideakohtaiset tapahtumat ---

function trackIdeaEvent(ideaId, action, title = "") {
  if (!ideaId || !action) return;

  if (
    window.goatcounter &&
    typeof window.goatcounter.count === "function"
  ) {
    window.goatcounter.count({
      path: `events/${ideaId}/${action}`,
      title: title || `${ideaId}: ${action}`,
      event: true
    });
  } else {
    console.warn("GoatCounter ei ole vielä käytettävissä.");
  }
}

const SITE = {
  title: "Idea Portfolio",
  author: "Tomi Parviainen",
  // Set to "remote" only after implementing a real event endpoint below.
  trackingMode: "local",
  // Example placeholder; do not use until you have a real endpoint and know its API.
  trackingEndpoint: ""
};

const CATEGORIES = [
  { id: "science", label: "Science" },
  { id: "technology", label: "Technology" },
  { id: "algorithms", label: "Algorithms" },
  { id: "untested", label: "Untested Ideas" }
];

const IDEAS = [
  //{
  //  id: "idea-001",
  //  title: "Optical system concept",
  //  category: "science",
  //  date: "2026-10-01",
  //  featured: true,
  //  summary: "A placeholder for an optics or imaging concept. Replace this text with a concise, public-safe summary of your idea.",
  //  description: "Describe the problem, core concept, potential applications, and current development stage. Keep sensitive or confidential details out of a public portfolio.",
  //  image: "",
  //  gallery: [],
  //  tags: ["optics", "imaging", "prototype"],
  //  files: [
  //    { label: "Idea description (PDF)", path: "assets/files/idea-001-description.pdf", type: "PDF document" },
  //    { label: "Source code (ZIP)", path: "assets/files/idea-001-source.zip", type: "Source files" },
  //    { label: "Animation (MP4)", path: "assets/files/idea-001-animation.mp4", type: "Video animation" }
  //  ],
  //  license: "MIT for source code; specify separate terms for documents and media."
  //},
  {
    id: "idea-003",
    title: "PRNG algorithm prototype",
    category: "algorithms",
    date: "2026-09-15",
    featured: true,
    summary: "Testing My Custom PRNG with TestU01 BigCrush",
    description: "Link to code, and a technical PDF below.",
    image: "assets/images/Idea_002_nopat2.png",
    gallery: [],
    tags: ["algorithm", "PRNG", "BigCrush", "code"],
    files: [
      { label: "Technical note (PDF)", path: "assets/files/Idea-003-PRNG.pdf", type: "PDF document" },
      { label: "C implementation", path: "assets/files/Idea-003-bigcrush_driver_48.c", type: "C source" },
      { label: "MATLAB implementation", path: "assets/files/Idea-003-prng46.m", type: "MATLAB source" }
    ],
    license: "MIT"
  },
  //{
  //  id: "idea-003",
  //  title: "Untested engineering idea",
  //  category: "untested",
  //  date: "2026-08-20",
  //  featured: false,
  //  summary: "A concept that has not yet been validated experimentally or through a full simulation.",
  //  description: "State clearly what is hypothetical, what evidence exists, and what experiment would validate or reject the concept.",
  //  image: "",
  //  gallery: [],
  //  tags: ["concept", "unverified"],
  //  files: [
  //    { label: "Concept note (PDF)", path: "assets/files/idea-003-note.pdf", type: "PDF document" }
  //  ],
  //  license: "Specify terms for this idea and its attachments."
  //},
  {
    id: "idea-004",
    title: "Model of the universe",
    category: "science",
    date: "2026-10-05",
    featured: true,
    summary: "A rotational model of unverse that fits well to distance modulus data without dark energy.",
    description: "This model is premilinary and has not been validated against broder data sets or discussed with scientific community.",
    image: "assets/images/Idea_004_UniverseSpiralPhi.png",
    gallery: [],
    tags: ["concept", "unverified"],
    files: [
      { label: "Concept image (.png)", path: "assets/images/Idea_004_UniverseSpiralPhi.png", type: "png image" },
      { label: "Concept source file (.m)", path: "assets/files/Idea-004-UniverseSpiralPhi2.m", type: "MATLAB source file" },
      { label: "Concept note (.pdf)", path: "assets/files/Idea-004-ModelUniverse.pdf", type: "PDF source file" },
    ],
    license: "Specify terms for this idea and its attachments."
  },
    {
    id: "idea-005",
    title: "Optical point source tracker",
    category: "technology",
    date: "2026-10-10",
    featured: false,
    summary: "A shadow mask in the front of the optics, that enables direction finding of a point source",
    description: "This is a premilinary concept, not fully modeled for stray light",
    image: "assets/images/Idea_005_Laserangledetector.png",
    gallery: [],
    tags: ["concept", "unverified"],
    files: [
      { label: "Concept image (.png)", path: "assets/images/Idea_005_Laserangledetector.png", type: "png image" },
      { label: "Concept note (.pdf)", path: "assets/files/Idea-005-Pointtracker.pdf", type: "PDF source file" },
    ],
    license: "Specify terms for this idea and its attachments."
  },
    {
    id: "idea-006",
    title: "Laser Beam Propagation Through Air",
    category: "algorithms",
    date: "2026-10-07",
    featured: false,
    summary: "A simulation of the irradiance profile of a laser beam focused at a specific distance.",
    description: "In this artificial simulation, atmospheric turbulence—primarily caused by random variations in the refractive index of air—increases over a period of ten seconds",
    image: "assets/images/Idea-006-Turbulence.png",
    gallery: [],
    tags: ["concept", "unverified"],
    files: [
      { label: "Concept image (.png)", path: "assets/images/Idea-006-Turbulence.png", type: "png image" },
      { label: "Concept video (.mp4)", path: "assets/files/Idea-006-turbulence3.mp4", type: "mp4 video" },
      { label: "Concept note (.pdf)", path: "assets/files/Idea-006-Laserbeampropagation.pdf", type: "PDF source file" },
    ],
    license: "MIT"
  },
      {
    id: "idea-007",
    title: "Low cost radio telescoope",
    category: "technology",
    date: "2026-09-20",
    featured: false,
    summary: "Calculated model of diffractive hydrogen line radiotelescope",
    description: "This is an idea of tape structured diffractive mirror",
    image: "assets/images/Idea-007-radiomirror.png",
    gallery: [],
    tags: ["concept", "unverified"],
    files: [
      { label: "Concept image (.png)", path: "assets/images/Idea-007-radiomirror.png", type: "png image" },
      { label: "Concept note (.pdf)", path: "assets/files/Idea-007-lowcostradioreflector.pdf", type: "PDF source file" },
    ],
    license: "MIT"
  },
  {
    id: "idea-008",
    title: "A single-mode laser system for high-precision material processing",
    category: "technology",
    date: "2026-09-19",
    featured: false,
    summary: "An array of 81 single-mode, 100 W continuous-wave (CW) fiber lasers.",
    description: "Programmable High-Power Optical Waveform Synthesis for Material Processing Using a Phase-Controlled Array of Spectrally Spaced Continuous-Wave Fiber Lasers",
    image: "assets/images/Idea-008-pulsetrain.png",
    gallery: [],
    tags: ["concept", "unverified"],
    files: [
      { label: "Concept image (.png)", path: "assets/images/Idea-008-pulsetrain.png", type: "png image" },
      { label: "Concept note (.pdf)", path: "assets/files/Idea-008-materialprocessinglaser.pdf", type: "PDF source file" },
    ],
    license: "MIT"
  }


];

// Optional analytics event hook. A real backend must implement the API you choose.
// Event shape: { event: "idea_view" | "file_download", ideaId, filePath?, timestamp }
async function sendTrackingEvent(event) {
  if (SITE.trackingMode !== "remote" || !SITE.trackingEndpoint) return;
  try {
    await fetch(SITE.trackingEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...event, timestamp: new Date().toISOString() }),
      keepalive: true
    });
  } catch (error) {
    console.warn("Analytics event could not be sent.", error);
  }
}

const $ = (selector) => document.querySelector(selector);
const state = { category: "all", search: "", sort: "featured" };
const dialog = $("#idea-dialog");
const dialogContent = $("#dialog-content");

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}
function categoryLabel(id) {
  return CATEGORIES.find(category => category.id === id)?.label || id;
}
function localStatsKey(ideaId) { return `idea-portfolio-stats:${ideaId}`; }
function getLocalStats(ideaId) {
  try { return JSON.parse(localStorage.getItem(localStatsKey(ideaId))) || { views: 0, downloads: 0 }; }
  catch { return { views: 0, downloads: 0 }; }
}
function bumpLocalStat(ideaId, key) {
  const stats = getLocalStats(ideaId);
  stats[key] = (stats[key] || 0) + 1;
  try { localStorage.setItem(localStatsKey(ideaId), JSON.stringify(stats)); } catch {}
  return stats;
}
function recordView(idea) {
  bumpLocalStat(idea.id, "views");
  sendTrackingEvent({ event: "idea_view", ideaId: idea.id });
}
function recordDownload(idea, file) {
  bumpLocalStat(idea.id, "downloads");
  sendTrackingEvent({ event: "file_download", ideaId: idea.id, filePath: file.path });
}
function visibleIdeas() {
  let items = IDEAS.filter(idea => state.category === "all" || idea.category === state.category);
  const query = state.search.trim().toLowerCase();
  if (query) {
    items = items.filter(idea =>
      [idea.title, idea.summary, idea.description, categoryLabel(idea.category), ...(idea.tags || [])]
        .join(" ").toLowerCase().includes(query)
    );
  }
  if (state.sort === "title") items.sort((a, b) => a.title.localeCompare(b.title));
  if (state.sort === "newest") items.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  if (state.sort === "featured") items.sort((a, b) => Number(b.featured) - Number(a.featured));
  return items;
}
function renderCategories() {
  const all = [{ id: "all", label: "All ideas" }, ...CATEGORIES];
  $("#category-tabs").innerHTML = all.map(category => `
    <button class="category-tab ${state.category === category.id ? "active" : ""}"
      type="button" data-category="${escapeHtml(category.id)}"
      aria-pressed="${state.category === category.id}">
      ${escapeHtml(category.label)}
    </button>`).join("");
  $("#category-tabs").querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
      state.category = button.dataset.category;
      renderCategories();
      renderIdeas();
    });
  });
}
function renderCard(idea) {
  const stats = getLocalStats(idea.id);
  const image = idea.image
    ? `<img class="card-image" src="${escapeHtml(idea.image)}" alt="${escapeHtml(idea.title)}" loading="lazy">`
    : `<div class="card-image-placeholder" aria-label="No image added">IDEA / ${escapeHtml(idea.id.toUpperCase())}</div>`;
  return `<article class="idea-card">
    ${image}
    <div class="card-body">
      <div class="card-meta"><span class="category-pill">${escapeHtml(categoryLabel(idea.category))}</span><span class="idea-id">${escapeHtml(idea.id.toUpperCase())}</span></div>
      <h3>${escapeHtml(idea.title)}</h3>
      <p>${escapeHtml(idea.summary)}</p>
      <div class="tag-list">${(idea.tags || []).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
      <div class="card-footer">
        <span>${idea.files?.length || 0} files · local preview: ${stats.views} views</span>
        <button class="open-idea" type="button" data-open-idea="${escapeHtml(idea.id)}">Explore →</button>
      </div>
    </div>
  </article>`;
}
function renderIdeas() {
  const items = visibleIdeas();
  $("#idea-grid").innerHTML = items.map(renderCard).join("");
  $("#empty-state").hidden = items.length !== 0;
  $("#idea-count").textContent = `${IDEAS.length} ${IDEAS.length === 1 ? "idea" : "ideas"}`;
  $("#category-count").textContent = `${CATEGORIES.length} categories`;
  $("#idea-grid").querySelectorAll("[data-open-idea]").forEach(button => {
    button.addEventListener("click", () => openIdea(button.dataset.openIdea));
  });
}
function openIdea(id) {
function openIdea(id) {
  const idea = IDEAS.find(item => item.id === id);
  if (!idea) return;

  trackIdeaEvent(
    idea.id,
    "view",
    idea.title
  );

  recordView(idea);
  const stats = getLocalStats(idea.id);
  const hero = idea.image
    ? `<img class="dialog-hero-image" src="${escapeHtml(idea.image)}" alt="${escapeHtml(idea.title)}">`
    : `<div class="card-image-placeholder" style="aspect-ratio:16/7">IDEA / ${escapeHtml(idea.id.toUpperCase())}</div>`;
  const gallery = (idea.gallery || []).length
    ? `<div class="dialog-gallery">${idea.gallery.map((src, index) => `<img src="${escapeHtml(src)}" alt="${escapeHtml(idea.title)} — additional image ${index + 1}" loading="lazy">`).join("")}</div>`
    : "";
  const files = (idea.files || []).length
    ? `<h3>Files & resources</h3><ul class="file-list">${idea.files.map((file, index) => `
      <li><div class="file-info"><strong>${escapeHtml(file.label)}</strong><span>${escapeHtml(file.type || "File")}</span></div>
      <a class="file-link" href="${escapeHtml(file.path)}" data-download-idea="${escapeHtml(idea.id)}" data-file-index="${index}">Open / download ↗</a></li>`).join("")}</ul>`
    : "<p>No files have been added yet.</p>";
  dialogContent.innerHTML = `${hero}<div class="dialog-inner">
    <span class="category-pill">${escapeHtml(categoryLabel(idea.category))}</span>
    <h2>${escapeHtml(idea.title)}</h2>
    <p class="dialog-description">${escapeHtml(idea.description || idea.summary)}</p>
    ${gallery}${files}
    <p class="muted"><strong>License / terms:</strong> ${escapeHtml(idea.license || "Not specified — add license information before publishing.")}</p>
    <div class="dialog-stats">
      <span>Local preview views: <strong>${stats.views}</strong></span>
      <span>Local preview downloads: <strong>${stats.downloads}</strong></span>
    </div>
    <p class="muted" style="font-size:.75rem;margin-top:12px">These local preview counts are stored only in this browser. They are not global visitor statistics.</p>
  </div>`;
  dialogContent.querySelectorAll("[data-download-idea]").forEach(link => {
    link.addEventListener("click", () => {
      const targetIdea = IDEAS.find(item => item.id === link.dataset.downloadIdea);
      const file = targetIdea?.files?.[Number(link.dataset.fileIndex)];
      if (targetIdea && file) recordDownload(targetIdea, file);
    });
  });
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}
$("#dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});
$("#search-input").addEventListener("input", event => {
  state.search = event.target.value;
  renderIdeas();
});
$("#sort-select").addEventListener("change", event => {
  state.sort = event.target.value;
  renderIdeas();
});

document.querySelectorAll("[data-site-title]").forEach(node => node.textContent = SITE.title);
document.querySelectorAll("[data-author-name]").forEach(node => node.textContent = SITE.author);
document.title = SITE.title;
$("#current-year").textContent = new Date().getFullYear();
renderCategories();
renderIdeas();
