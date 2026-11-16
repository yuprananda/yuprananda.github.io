/** Classic deferred script: works with file:// and GitHub Pages. Keep script order in index.html. */
(() => {
  "use strict";
  /** Decorative SVG artwork. Keep viewBox coordinates unchanged when replacing paths. */
  const serviceIcons = [
    // 01 Experience: tactile track + spring wave + gliding thumb knob (viewBox 0 0 48 24)
    '<line class="viz-track" x1="8" y1="12" x2="40" y2="12"/><path class="viz-wave" d="M8 12c4-5.5 8-5.5 12 0s8 5.5 12 0 5.5-3.5 8 0"/><circle class="viz-knob" cx="15" cy="12" r="3.8"/>',
    // 02 Simplicity: scattered noise lines collapsing into one crisp clarity line (viewBox 0 0 48 24)
    '<path class="viz-noise-top" d="M9 6.5h14m5 0h11"/><path class="viz-noise-bot" d="M9 17.5h9m5 0h16"/><line class="viz-clarity" x1="8" y1="12" x2="38" y2="12"/><circle class="viz-clarity-dot" cx="38" cy="12" r="2.2" fill="currentColor" stroke="none"/>',
    // 03 Beauty: golden-ratio canvas frame + harmonic split + balanced focal circle (viewBox 0 0 48 24)
    '<rect class="viz-frame" x="9" y="4.5" width="30" height="15" rx="2.5"/><path class="viz-split" d="M27.5 4.5v15M27.5 13.8H39"/><circle class="viz-circle" cx="18.2" cy="12" r="4"/>',
  ];

  Object.assign(window.Portfolio, { serviceIcons });
})();
