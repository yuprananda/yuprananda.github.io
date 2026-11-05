/** Classic deferred script: works with file:// and GitHub Pages. Keep script order in index.html. */
(() => {
  "use strict";
  const { siteConfig } = window.Portfolio;
  /** Presentation for the real project. Samples reuse its CSS window frame.
   * Config values are trusted source content. For a project with no public client,
   * leave clientName/clientLogo empty: the adoption badge will not be rendered.
   */
  function renderProjectStatus(text, language) {
    const status = text;
    const { clientName, clientLogo } = siteConfig.project;
    const usedBy = language === "id" ? "Digunakan oleh" : "Used by";
    const projectType = siteConfig.project.type?.[language];
    const typeBadge = projectType
      ? `<span class="project-type"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18"/></svg>${projectType}</span>`
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

  function renderProjectPreview() {
    const project = siteConfig.project;
    return `<figure class="project-preview" tabindex="0" role="button" aria-haspopup="dialog" aria-label="Open ${project.name} gallery"><div class="preview-toolbar" aria-hidden="true"><span class="window-controls"><i></i><i></i><i></i></span><span>${project.name}</span></div><div class="preview-screen"><img class="preview" src="${project.preview}" alt="${project.previewAlt}" width="1600" height="1000"></div></figure>`;
  }

  /** Use a transparent color cutout. CSS supplies grayscale and hover animation. */
  function renderPortrait() {
    return `<div class="portrait-frame"><img class="portrait" src="${siteConfig.portrait.src}" alt="${siteConfig.portrait.alt}" width="1254" height="1254"></div>`;
  }

  Object.assign(window.Portfolio, {
    renderProjectStatus,
    renderProjectPreview,
    renderPortrait,
  });
})();
