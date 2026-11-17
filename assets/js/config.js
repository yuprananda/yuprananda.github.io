/** Classic deferred script: works with file:// and GitHub Pages. Keep script order in index.html. */
window.Portfolio = window.Portfolio || {};
(() => {
  "use strict";
  /** Start here when forking. Use your own identity, public contact details and verified project stack.
   * Paths in content.js are relative to index.html; keep them relative for GitHub Pages subdirectories. */
  const siteConfig = {
    name: "Yu Prananda",
    title: "Yu Prananda \u2014 Frontend Developer",
    email: "hello.yuprananda@gmail.com",
    social: {
      github: "https://github.com/yuprananda",
      linkedin: "https://www.linkedin.com/in/yu-prananda-125116449",
    },
    // Use your own portrait and verified client/project information when forking.
    portrait: {
      src: "assets/images/portrait-color.webp",
      alt: "Yu Prananda",
    },
    project: {
      name: "Rehearsal",
      type: { en: "Visual novel web", id: "Web visual novel" },
      preview: "assets/images/rehearsal-hero-ella.webp",
      previewAlt: "Rehearsal visual novel promotional website — Ella CG scene",
      clientName: "",
      clientLogo: "",
    },
    showProjectSamples: false,
  };

  Object.assign(window.Portfolio, { siteConfig });
})();
