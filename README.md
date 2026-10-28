# Kass — Design & Development Portfolio

Personal portfolio for Khin Yati Kyaw (Kass), a Bangkok-based UI/UX Designer, Frontend Developer, and Freelance Graphic Designer.

**Live site:** https://khinn-yati4906.github.io/kass-portfolio/

## Run locally

No build step or dependency installation is needed. Serve this directory with any static HTTP server, for example:

```sh
python -m http.server 8000
```

Open http://localhost:8000. Use a server because project details use JavaScript modules.

## Deployment

GitHub Pages serves the root of the `main` branch. In repository Settings → Pages, choose **Deploy from a branch**, **main**, and **/ (root)**. Updates to `main` trigger deployment. All local paths are relative so the site works beneath `/kass-portfolio/`.

## Editing

- **Brand colors:** change `--brand-primary` and `--brand-secondary` at the start of `style.css`. Check contrast after changing colors. Light and dark theme neutral colors are in the same block.
- **Projects:** update the accessible project cards in `index.html` and the corresponding descriptions in `projects.js`. Match each card's `data-project` with its key in `projects.js`. Add filter categories via `data-categories` and update the All work count.
- **Images:** optimized WebP assets live beside `index.html`. Preserve aspect ratios and supply descriptive alt text. The ZeroPrompt image is a screenshot of the actual university demo, not a fabricated product mockup. ExpireSense uses a typographic process graphic, not a product screenshot.
- **CV:** replace `Khin_Yati_Kyaw_CV.pdf` with a public-safe PDF using the same filename. The current copy has its phone number removed from the PDF content and metadata cleared.
- **Experience, education, contact:** edit the semantic text in `index.html`. Confirm facts before publication.
- **SEO:** update the canonical URL, Open Graph URLs, JSON-LD, `sitemap.xml`, and `robots.txt` if the repository URL changes.

## Interactions and accessibility

Project category filtering, modal project details with native focus containment and Escape dismissal, mobile navigation, persistent theme toggle, email link, clipboard feedback, and real PDF downloads. Content is readable without JavaScript; project details and filters require it. Animation respects `prefers-reduced-motion`. Fonts load from Google Fonts with system fallbacks.

## Privacy and content

Only approved portfolio assets and a sanitized CV are included. No transcripts, student identifiers, GPA, GED scores, certificate scans, or personal photograph are included. Project descriptions do not claim unverified metrics or client results. ExpireSense dates are January–June 2026. ZeroPrompt is a university group project with simulated routing and prepared responses. Supplied graphic titles are descriptive; no unverified client status, dates, affiliation, or commercial outcomes are claimed. Artwork and third-party marks remain the property of their respective owners; no open-source license is granted for artwork.
