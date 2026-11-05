# Adding portfolio projects

The public Projects section currently shows only Bicless ERP. Layout example content for Mobile, Automation, and AI lives in `assets/js/content.js`; rendering is in `assets/js/app.js`. These examples stay hidden with `siteConfig.showProjectSamples = false` in config.js.

## Revisit the layout examples

Set `siteConfig.showProjectSamples` in `assets/js/config.js` to `true` locally to preview the saved project switcher and example layouts. Set it back to `false` before publishing unless examples have been replaced with real projects.

## Add a real project

- Use `setupProjectSwitcher()` and `selectProject()` as the existing navigation/layout reference. Replace the demo branch with real project content and rename its selector in both languages. Do not simply publish a sample as a real project.
- Follow Bicless layout: title, concise description, independent development/role explanation, status, optional Used by logo, inline Built with tags, then a matching macOS-style preview. Use a short introductory eyebrow without a project number. Do not add a caption beneath the preview.
- Supply English and Indonesian copy. Only include verified clients, usage claims, and results.
- Put optimized screenshots in `assets/images/`. Anonymize private information before saving public assets. Give each real project its own gallery images; the `galleryImages` array in `assets/js/content.js` belongs to Bicless only.
- Keep screenshots and window controls monochrome until hover. Preserve the existing open/close animation, keyboard navigation, and reduced-motion support.
- Show the project selector only when there is more than one real project. Keep sample projects hidden.
- Check every project in both languages at desktop and mobile sizes, including 360 x 640. Verify preview dimensions, text clipping, project switching, and the correct gallery for each project.

Files under `.cache/` contain local capture tooling and browser session data; they are ignored by Git and must not be published.
