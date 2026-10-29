# Idea Portfolio starter

A responsive static portfolio built with `index.html`, `style.css`, and `script.js`, intended for GitHub Pages.

## Preview locally
Open `index.html` in a browser. For more reliable local testing, use a small local web server or the Live Server extension in VS Code.

## Publish on GitHub Pages
1. Create a public GitHub repository.
2. Upload `index.html`, `style.css`, `script.js`, and the `assets/` folder to the repository root.
3. In the repository, open **Settings → Pages**.
4. Select the `main` branch and `/ (root)` as the publishing source.
5. Wait for deployment, then open the published URL.

GitHub Pages publishes static HTML/CSS/JavaScript. It does not run server-side code or provide a database.

## Add or change categories
Edit `CATEGORIES` near the top of `script.js`:

```js
const CATEGORIES = [
  { id: "science", label: "Science" },
  { id: "technology", label: "Technology" },
  { id: "algorithms", label: "Algorithms" },
  { id: "untested", label: "Untested Ideas" }
];
```

Use each category's `id` in the corresponding idea's `category` field.

## Add an idea
Copy one object from `IDEAS` in `script.js`, change its unique `id`, title, category, date, summary, description, image, gallery, tags, files, and license.

Example:
```js
{
  id: "idea-004",
  title: "My new idea",
  category: "technology",
  date: "2026-10-28",
  featured: false,
  summary: "A short summary shown on the card.",
  description: "The full description shown when the card is opened.",
  image: "assets/images/idea-004-main.jpg",
  gallery: ["assets/images/idea-004-detail-1.jpg"],
  tags: ["prototype", "engineering"],
  files: [
    { label: "Description (PDF)", path: "assets/files/idea-004.pdf", type: "PDF document" },
    { label: "Animation (MP4)", path: "assets/files/idea-004.mp4", type: "Video animation" }
  ],
  license: "MIT for source code; see each file for separate terms."
}
```

Put referenced files in the matching `assets/` folder. Ensure filenames and letter case match exactly. The sample attachment links are placeholders until you add the actual files.

## Counters: important limitation
The included counter is **local-only demo functionality**. It stores counts in the current browser's `localStorage`. It is useful to test the interface, but:
- it does not count visitors across different devices or browsers;
- clearing browser storage resets it;
- it is not a reliable global counter;
- the download number counts link clicks, not proof that a file was fully downloaded.

### How to get global counts
Choose one of these approaches:
1. **Page analytics:** add a privacy-conscious analytics service to count page views. This is suitable for overall site traffic, but may not automatically provide reliable per-idea file download counts.
2. **Event analytics:** send `idea_view` and `file_download` events to an analytics provider that supports custom events. Configure the provider's event API and privacy settings.
3. **Serverless endpoint/database:** create an endpoint that records an event for each idea and file, and expose aggregate counts to an admin-only dashboard. This gives the most control but requires setup and may have usage limits.

In `script.js`, `sendTrackingEvent()` is the integration point. Do not change `trackingMode` to `"remote"` until `trackingEndpoint` points to an endpoint that you own and have configured. Never put secret API keys in client-side JavaScript. Public client-side event endpoints also need abuse protection/rate limiting if accurate counts matter.

For privacy, disclose analytics where required and avoid collecting personal data you do not need.

## Licensing
A code license for the website does not automatically cover the ideas, PDFs, images, videos, datasets, or third-party material linked from it. Set licensing and attribution terms for each idea and attachment deliberately. Do not publish confidential or patent-sensitive details before considering the consequences.
