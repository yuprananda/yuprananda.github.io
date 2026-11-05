/** Classic deferred script: works with file:// and GitHub Pages. Keep script order in index.html. */
window.Portfolio = window.Portfolio || {};
(() => {
  "use strict";
  /** Start here when forking. Use your own identity, public contact details and verified project stack.
   * Paths in content.js are relative to index.html; keep them relative for GitHub Pages subdirectories. */
  const siteConfig = {
    name: "Yu Prananda",
    title: "Yu Prananda \u2014 Software Engineer",
    email: "hello.yuprananda@gmail.com",
    social: {
      github: "https://github.com/yuprananda",
      linkedin: "https://www.linkedin.com/in/yu-prananda-125116449",
    },
    projectTechnologies: [
      "Electron",
      "React",
      "TypeScript",
      "Supabase",
      "Vite",
    ],
    // Use your own portrait and verified client/project information when forking.
    portrait: {
      src: "assets/images/portrait-color.webp",
      alt: "Yu Prananda",
    },
    project: {
      name: "Bicless ERP",
      // Classify the project truthfully; use "Open source" only with a public source link.
      type: { en: "Independent project", id: "Proyek mandiri" },
      preview: "assets/images/bicless-dashboard-real.webp",
      previewAlt: "Bicless ERP dashboard - anonymized data",
      clientName: "PT MBB",
      clientLogo: "assets/images/logo_MBB.png",
    },
    showProjectSamples: false,
  };

  Object.assign(window.Portfolio, { siteConfig });
})();
