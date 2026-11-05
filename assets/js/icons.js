/** Classic deferred script: works with file:// and GitHub Pages. Keep script order in index.html. */
(() => {
  "use strict";
  /** Decorative SVG artwork. Keep viewBox coordinates unchanged when replacing paths. */
  const serviceIcons = [
    '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01M9 13l-2 2 2 2m6-4 2 2-2 2"/>',
    '<path d="M13 2 4 14h7l-1 8 10-12h-7l1-8Z"/>',
    '<rect x="2" y="8" width="6" height="8" rx="2"/><rect x="16" y="8" width="6" height="8" rx="2"/><path d="M8 12h8m-6-3 3 3-3 3"/>',
    '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/>',
    '<path d="M4 3v17h17M8 16v-4m5 4V8m5 8V5"/>',
    '<path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-10-2 12"/>',
  ];

  const processArt = [
    '<g class="motion-bubble"><path d="M15 22h56v32H35L23 65V54h-8Z"/><circle class="motion-dot" cx="30" cy="38" r="2"/><circle class="motion-dot" cx="42" cy="38" r="2"/><circle class="motion-dot" cx="54" cy="38" r="2"/></g><path d="M49 60h24l12 10V41h-9"/>',
    '<rect x="23" y="14" width="54" height="66" rx="4"/><path d="M39 14v-4h22v4M45 33h20M45 49h20M45 65h20"/><path class="motion-check" d="m30 32 4 4 6-8"/><path class="motion-check" d="m30 48 4 4 6-8"/><path class="motion-check" d="m30 64 4 4 6-8"/>',
    '<rect x="10" y="18" width="80" height="58" rx="4"/><path d="M10 30h80M18 24h2m4 0h2m4 0h2"/><path class="motion-code" d="m28 42-7 7 7 7m10-17-5 20"/><path class="motion-code" d="M48 43h25M48 51h18M48 59h23"/><g class="motion-feedback"><rect x="65" y="62" width="28" height="20" rx="3"/><path d="m72 72 4 4 9-9"/></g>',
    '<rect x="12" y="17" width="60" height="55" rx="4"/><path d="M12 29h60"/><path class="motion-check" d="m26 49 10 10 19-20"/><g class="motion-guide"><path d="M62 47h24v36H62zM68 56h12m-12 7h12m-12 7h8"/></g>',
    '<rect x="12" y="18" width="76" height="58" rx="4"/><path d="M12 30h76"/><g class="motion-maintain"><path d="M37 42a13 13 0 0 1 19-4l-9 9 6 6 9-9a13 13 0 0 1-17 18L32 75l-8-8 13-13a13 13 0 0 1 0-12Z"/></g>',
  ];

  Object.assign(window.Portfolio, { serviceIcons, processArt });
})();
