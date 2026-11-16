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

  function renderProjectPreview(project = siteConfig.project, view = null) {
    const src = view ? view[0] : project.preview;
    const alt = view ? view[1] : project.previewAlt;
    const label = view ? `${project.name} \u2014 ${view[1]}` : project.name;
    return `<figure class="project-preview" tabindex="0" role="button" aria-haspopup="dialog" aria-label="Open ${project.name} gallery"><div class="preview-toolbar" aria-hidden="true"><span class="window-controls"><i></i><i></i><i></i></span><span>${label}</span></div><div class="preview-screen"><img class="preview" src="${src}" alt="${alt}" width="1600" height="1000"></div></figure>`;
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
