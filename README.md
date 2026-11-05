# Yu Prananda — Portfolio

A lightweight bilingual portfolio built with HTML, CSS, and plain JavaScript. Five full-screen horizontal pages: Hello, Services, Projects, Process, and Contact. English is the default; Indonesian is also included.

## Run locally

No build step or runtime dependencies are required. Serve the repository root:

```sh
python -m http.server 8080
```

Open http://localhost:8080. Use `python3` on systems that require it. You may also open `index.html` directly as a local file. Ordered deferred scripts support both file URLs and hosted pages. Clipboard copying requires HTTPS or localhost; the email remains selectable when copying is unavailable.

## Structure

```text
index.html                 Document shell, metadata, header, and footer
assets/
  css/site.css             Layout, components, responsive rules, animations
  css/fonts.css            Local font declarations
  js/config.js             Identity, contact links, stack, sample toggle
  js/content.js            English/Indonesian text and content collections
  js/icons.js              Decorative SVG artwork
  js/project-view.js       Shared project metadata, preview, and portrait markup
  js/app.js                Rendering, navigation, typing, process, gallery
  fonts/                   IBM Plex Mono and its OFL license
  images/                  Active public website assets and replacement notes
docs/
  CUSTOMIZATION.md          Indonesian customization guide
  PROJECTS.md               Adding real projects
ASSETS.md                  Asset permissions and attribution
LICENSE                    MIT license for the code
```

Start with [config.js](assets/js/config.js), then edit both languages in [content.js](assets/js/content.js). See [the customization guide](docs/CUSTOMIZATION.md). Small UI labels also live beside their renderers in `app.js`; update both language branches when changing interface behavior.

## GitHub Pages

1. Fork or copy this repository and replace personal content, contact details, photos, screenshots, and client claims with your own.
2. Commit the source **and active files under `assets/`**, including fonts and images. They are required at runtime.
3. Open **Settings → Pages**, choose **Deploy from a branch**, then select the publishing branch and **/ (root)**.
4. User repositories are served at `https://<username>.github.io/`; project repositories at `https://<username>.github.io/<repository>/`. Paths are relative to support both.

Keep `.nojekyll` in the published root. No server secrets, build pipeline, or deployment workflow are required for branch-based publishing.

## Fork checklist

- Update `index.html` title, description, brand, favicon, no-JavaScript contact, and fallback credit. Config also sets the runtime title and brand.
- Update the name, email, social URLs, typing text, and both language copies. Footer credit automatically follows the configured name. Retaining original author credit in the UI is appreciated, not required.
- Replace Yu's portrait, Bicless screenshots, PT MBB logo, and client claims. Do not present another person's identity, work, or affiliations as your own.
- Update project/portrait paths, names, client identity, and technology tags in config.js; screenshot paths/captions in content.js. Image dimensions and project markup live in project-view.js. Only publish information you may share; anonymize private data first.
- Keep layout examples hidden until replaced with real projects. See [PROJECTS.md](docs/PROJECTS.md).
- Check every page in both languages at desktop, phone, and short-screen sizes. Confirm mouse/trackpad scrolling does not change pages. Test touch swipe, keyboard activation of navigation buttons, browser history, reduced motion, process steps, and gallery open/close.
- Keep `.cache/`, browser profiles, credentials, `.env`, and raw captures out of Git. The included `.gitignore` excludes local tooling and session data.

## Maintenance notes

The carousel intentionally uses fixed-height panels. Long replacement copy can overflow: keep text concise and check the smallest viewport you support. Process steps are selected individually to preserve readable spacing. Native dialog supplies gallery focus handling; offscreen pages are inert. Animations respect reduced motion. Use a current browser supporting dialog, inert, and container query units.

CSS retains cascade order to preserve the approved responsive design. Redundant declarations were pruned without reordering responsive rules. Edit the relevant component rule before adding an override, then check desktop, phone, and short screens.

Optional formatting (Node.js only needed for this development command):

```sh
npx prettier --write index.html "assets/**/*.{js,css}" "docs/*.md" README.md
```

## License

Code is available under [MIT](LICENSE). IBM Plex Mono remains under its bundled [SIL Open Font License](assets/fonts/OFL.txt). Portraits, client logos, and project screenshots are **not covered by the code license**; see [ASSETS.md](ASSETS.md). Public availability alone does not grant unrelated reuse rights.
