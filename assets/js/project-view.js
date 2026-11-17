/** Classic deferred script: works with file:// and GitHub Pages. Keep script order in index.html. */
(() => {
  "use strict";
  const { siteConfig } = window.Portfolio;
  /** Presentation for the real project. Samples reuse its CSS window frame.
   * Config values are trusted source content. For a project with no public client,
   * leave clientName/clientLogo empty: the adoption badge will not be rendered.
   */
  function renderProjectStatus(text, language, project = siteConfig.project) {
    const status = text;
    const { clientName, clientLogo } = project;
    const usedBy = language === "id" ? "Digunakan oleh" : "Used by";
    const projectType = project.type?.[language];
    const typeBadge = projectType
      ? `<span class="project-type"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/></svg>${projectType}</span>`
      : "";
    const client =
      clientName && clientLogo
        ? `<div class="project-adoption" aria-label="${usedBy} ${clientName}" title="${usedBy} ${clientName}">
        <span class="adoption-label">${usedBy}</span>
        <span class="adoption-logo"><img src="${clientLogo}" alt="${clientName}" width="1600" height="1600" loading="lazy"></span>
      </div>`
        : "";
    return `<div class="project-status"><span class="status-label"><span class="status-dot" aria-hidden="true"></span>${status}</span><div class="project-meta">${typeBadge}${client}</div></div>`;
  }

  function renderProjectPreview(project = siteConfig.project, language = "en", view = null) {
    if (Array.isArray(language)) {
      view = language;
      language = "en";
    }
    const src = view ? view[0] : project.preview;
    const rawAlt = view ? view[1] : project.previewAlt;
    const alt = typeof rawAlt === "object" ? rawAlt[language] || rawAlt.en || "" : rawAlt || "";
    const barLabel = project.urlDisplay || (view ? `${project.name} \u2014 ${alt}` : project.name);
    const lockIcon = project.urlDisplay
      ? '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><rect x="3" y="6" width="8" height="6" rx="1.4"/><path d="M4.8 6V4.5a2.2 2.2 0 0 1 4.4 0V6"/></svg>'
      : "";
    const expandIcon =
      '<span class="preview-zoom-hint" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2.5h4v4M6.5 13.5h-4v-4M13.5 2.5 9.2 6.8M2.5 13.5l4.3-4.3"/></svg></span>';
    const ariaLabel =
      language === "id"
        ? `Buka galeri ${project.name}`
        : `Open ${project.name} gallery`;
    return `<figure class="project-preview" tabindex="0" role="button" aria-haspopup="dialog" aria-label="${ariaLabel}"><div class="preview-toolbar" aria-hidden="true"><span class="window-controls"><i></i><i></i><i></i></span><span class="preview-url">${lockIcon}<span>${barLabel}</span></span>${expandIcon}</div><div class="preview-screen"><img class="preview" src="${src}" alt="${alt}" width="1600" height="1000"></div></figure>`;
  }

  /** 3D pop-out editorial portrait with layered card, warm glow, and hover comic speech bubble with typing effect. */
  function renderPortrait(language = "en") {
    const bubbleText =
      language === "id"
        ? "Terbuka untuk kolaborasi \u2014 ayo buat sesuatu yang indah!"
        : "Open to collaborate \u2014 let\u2019s craft something great!";
    return `<div class="portrait-frame"><div class="portrait-card" aria-hidden="true"><span class="portrait-glow"></span><span class="portrait-grid"></span></div><div class="portrait-cutout"><img class="portrait" src="${siteConfig.portrait.src}" alt="${siteConfig.portrait.alt}" width="1254" height="1254"></div><div class="portrait-bubble" data-bubble="${bubbleText}" aria-hidden="true"><span class="bubble-reserve">${bubbleText}</span><span class="bubble-typed"></span></div></div>`;
  }

  Object.assign(window.Portfolio, {
    renderProjectStatus,
    renderProjectPreview,
    renderPortrait,
  });
})();
