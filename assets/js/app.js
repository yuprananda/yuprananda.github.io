/** Classic deferred script: works with file:// and GitHub Pages. Keep script order in index.html. */
(() => {
  "use strict";
  const {
    renderPortrait,
    renderProjectPreview,
    renderProjectStatus,
    siteConfig,
    copy,
    serviceGroups,
    processSteps,
    heroText,
    galleryImages,
    serviceIcons,
    processArt,
  } = window.Portfolio;
  let activeProcessStep = 0;
  let processWasVisible = false;
  let selectedProject = 0;
  let originalWorkContent, originalWorkPreview;

  const ids = ["intro", "services", "work", "process", "contact"];
  let lang;
  try {
    lang = localStorage.getItem("language");
  } catch {}
  lang = lang === "id" ? "id" : "en";
  let current = Math.max(0, ids.indexOf(location.hash.slice(1))),
    locked = false;
  const pages = document.querySelector("#pages");
  const prev = document.querySelector("#prev");
  const next = document.querySelector("#next");

  // SERVICES: edit serviceGroups in content.js; the renderer only controls presentation.
  function renderServices() {
    const groups = serviceGroups[lang];
    return `<div class="service-groups">${groups.map((g, i) => `<article class="service-group"><div class="service-group-marker"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${serviceIcons[[0, 1, 5, 2][i]]}</svg><span>0${i + 1}</span></div><h2>${g[0]}</h2><p>${g[1]}</p><ul>${g[2].map((item) => `<li>${item}</li>`).join("")}</ul></article>`).join("")}</div>`;
  }

  const jikanda = {
    name: "Jikanda",
    type: { en: "Open source", id: "Open source" },
    preview: "assets/images/jikanda-focus.webp",
    previewAlt: "Jikanda desktop focus timer with example tasks",
  };
  const jikandaGallery = [
    [jikanda.preview, "Focus timer · dark theme", "Timer fokus · tema gelap"],
    ["assets/images/jikanda-focus-light.webp", "Focus timer · light theme", "Timer fokus · tema terang"],
    ["assets/images/jikanda-mini.webp", "Floating mini timer", "Mini timer mengambang"],
    ["assets/images/jikanda-share-card.webp", "Achievement card · example data", "Kartu pencapaian · data contoh"],
  ];
  function setupProjectSwitcher() {
    const section = document.querySelector("#work");
    originalWorkContent = section.querySelector(".content").innerHTML;
    originalWorkPreview = section.querySelector(".project-preview").outerHTML;
    selectProject(selectedProject);
  }
  function selectProject(index) {
    selectedProject = index;
    const section = document.querySelector("#work");
    const content = section.querySelector(".content");
    const isId = lang === "id";
    const choices = `<div class="project-switcher" role="group" aria-label="${isId ? "Pilih proyek" : "Choose a project"}">${["Bicless", "Jikanda"].map((name, i) => `<button type="button" data-project="${i}" aria-pressed="${i === index}"><span>0${i + 1}</span> ${name}</button>`).join("")}</div>`;
    let visual = originalWorkPreview;
    if (index === 0) {
      content.innerHTML = choices + originalWorkContent;
    } else {
      const description = isId
        ? "Aplikasi fokus desktop dengan Pomodoro, Deep Focus, dan Flow. Timer mini, riwayat sesi, dan kartu pencapaian tersedia secara offline."
        : "A desktop companion with Pomodoro, Deep Focus, and Flow. Includes a mini timer, session history, and offline achievement cards.";
      content.innerHTML = choices + `<p class="eyebrow">${isId ? "Luangkan waktu untuk yang berarti." : "Make time for what matters."}</p><h1>Jikanda</h1><p>${description}</p><div class="item"><h2>${isId ? "Dikembangkan secara mandiri" : "Built independently"}</h2><p>${isId ? "Saya merancang dan membangun aplikasi native dengan Rust dan Slint. Data disimpan lokal tanpa akun atau layanan cloud." : "I design and build this native app with Rust and Slint. Data stays local, with no account or cloud service."}</p></div>${renderProjectStatus("Windows beta", lang, jikanda)}<div class="project-stack"><span class="stack-label">${isId ? "Teknologi" : "Built with"}</span><ul><li>Rust</li><li>Slint</li><li>Cargo</li></ul></div><div class="project-links"><a href="https://github.com/yuprananda/jikanda/releases" target="_blank" rel="noopener noreferrer">${isId ? "Unduh beta" : "Download beta"} ↗</a><a href="https://github.com/yuprananda/jikanda" target="_blank" rel="noopener noreferrer">Source code ↗</a></div>`;
      visual = renderProjectPreview(jikanda);
    }
    section.querySelector(".project-preview").outerHTML = visual;
  }
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-project]");
    if (!button) return;
    selectProject(Number(button.dataset.project));
    document
      .querySelector(`[data-project="${selectedProject}"]`)
      .focus({ preventScroll: true });
  });

  // PROCESS: SVG animation is replayed by toggling is-playing after a forced layout.
  function processIllustration(index) {
    const art = processArt;
    return `<svg viewBox="0 0 100 94" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${art[index]}</svg>`;
  }
  function replayProcess(button) {
    const step = button.closest(".process-step");
    step.classList.remove("is-playing");
    void step.offsetWidth;
    step.classList.add("is-playing");
  }
  document.addEventListener("pointerover", (event) => {
    const button = event.target.closest(".process-visual");
    if (button && !button.contains(event.relatedTarget)) replayProcess(button);
  });
  document.addEventListener("focusin", (event) => {
    if (event.target.matches(".process-visual")) replayProcess(event.target);
  });
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".process-visual");
    if (button) replayProcess(button);
  });
  // Step text lives in content.js; all steps share one measured layout to prevent jumping.
  function renderProcess() {
    const isId = lang === "id";
    const steps = processSteps[lang];
    return `<div class="process-picker" role="group" aria-label="${isId ? "Pilih tahap" : "Choose a step"}">${steps.map((step, i) => `<button type="button" data-process="${i}" aria-label="${i + 1}. ${step[0]}" aria-pressed="${i === activeProcessStep}">0${i + 1}<span class="process-tab-name">${(isId ? ["Diskusi", "Rencana", "Bangun", "Serahkan", "Rawat"] : ["Discuss", "Plan", "Build", "Handover", "Maintain"])[i]}</span></button>`).join("")}</div><ol class="process-steps">${steps.map((step, i) => `<li class="process-step${i === activeProcessStep ? " is-active" : ""}"><button type="button" class="process-visual" aria-label="${isId ? "Putar animasi: " : "Play animation: "}${step[0]}"><span class="process-number" aria-hidden="true">0${i + 1}</span>${processIllustration(i)}</button><div class="process-copy"><h2>${step[0]}</h2><p>${step[1]}</p><div class="process-outcome"><span class="outcome-label"><svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m3 8 3 3 7-7"/></svg>${isId ? "Yang Anda dapatkan" : "What you get"}</span><span>${step[2].replace(/^(Hasil|Outcome): /, "")}</span></div></div></li>`).join("")}</ol><p class="process-note">${isId ? "Belum punya dokumen teknis? Cukup mulai dari cerita tentang pekerjaan Anda." : "No technical brief yet? Start by telling me about your work."} <a href="#contact">${isId ? "Mari diskusi" : "Let&#8217;s talk"} &rarr;</a></p>`;
  }

  // HERO TYPEWRITER: one timer only. Pause when hidden; reduced motion always shows a static word.
  const heroMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let heroTimer,
    heroWordIndex = 0,
    heroLetters = 0,
    heroPhase = "hold";
  function heroCopy() {
    return heroText[lang];
  }
  function renderHeroTitle() {
    const c = heroCopy();
    return `<div class="hero-heading"><h1 class="typing-title"><span class="sr-only">${c.first} ${c.prefix}${c.words[0]}${c.suffix}</span><span aria-hidden="true" class="hero-title-lines"><span>${c.first}</span><span class="hero-type-line">${c.prefix}<span class="hero-word-space"><span class="hero-word-reserve">${c.words.reduce((a, b) => (a.length > b.length ? a : b))}</span><span class="hero-word-track"><span class="hero-word">${c.words[0]}</span><span class="typing-cursor"></span></span></span>${c.suffix}</span></span></h1></div>`;
  }
  function syncHeroAnimation(reset = false) {
    clearTimeout(heroTimer);
    const word = document.querySelector(".hero-word");
    if (!word) return;
    if (reset) {
      heroWordIndex = 0;
      heroLetters = heroCopy().words[0].length;
      heroPhase = "hold";
      word.textContent = heroCopy().words[0];
    }
    document
      .querySelector(".hero-heading")
      .classList.toggle(
        "typing-paused",
        current !== 0 || document.hidden || heroMotion.matches,
      );
    if (heroMotion.matches) {
      word.textContent = heroCopy().words[0];
      return;
    }
    if (current !== 0 || document.hidden) return;
    heroTimer = setTimeout(
      heroTick,
      heroPhase === "hold"
        ? 2000
        : heroPhase === "gap"
          ? 250
          : heroPhase === "delete"
            ? 50
            : 90,
    );
  }
  function heroTick() {
    const words = heroCopy().words;
    const word = document.querySelector(".hero-word");
    if (!word) return;
    if (heroPhase === "hold") heroPhase = "delete";
    if (heroPhase === "delete") {
      heroLetters--;
      word.textContent = words[heroWordIndex].slice(
        0,
        Math.max(0, heroLetters),
      );
      if (heroLetters <= 0) {
        heroWordIndex = (heroWordIndex + 1) % words.length;
        heroPhase = "gap";
      }
    } else if (heroPhase === "gap") {
      heroPhase = "type";
    } else {
      heroLetters++;
      word.textContent = words[heroWordIndex].slice(0, heroLetters);
      if (heroLetters >= words[heroWordIndex].length) heroPhase = "hold";
    }
    syncHeroAnimation();
  }
  document.addEventListener("visibilitychange", () => syncHeroAnimation());
  heroMotion.addEventListener("change", () => syncHeroAnimation(true));

  // CONTACT: destinations and copy-to-clipboard use config.js. Icons are inline to avoid extra requests.
  function renderContact() {
    const isId = lang === "id";
    const envelope =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></svg>';
    const github =
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.5-.29-5.13-1.25-5.13-5.57 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.13-1.45 3.07-1.15 3.07-1.15.62 1.55.23 2.69.12 2.98.72.79 1.15 1.79 1.15 3.02 0 4.33-2.63 5.28-5.14 5.56.4.35.76 1.04.76 2.09v3.09c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z"/></svg>';
    const linkedin =
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5V9h3ZM6.5 7.5A1.75 1.75 0 1 1 6.5 4a1.75 1.75 0 0 1 0 3.5ZM19 19h-3v-5c0-1.2-.4-2-1.5-2S13 12.8 13 14v5h-3V9h3v1.4c.5-.9 1.4-1.6 2.8-1.6 2.3 0 3.2 1.5 3.2 4.2Z"/></svg>';
    return `<div class="contact-options"><div class="contact-email-panel"><span class="contact-label">${isId ? "Mulai dari email" : "Start with an email"}</span><a class="contact-primary" href="mailto:${siteConfig.email}?subject=${encodeURIComponent(isId ? "Diskusi proyek baru" : "Let us discuss a project")}">${envelope}<span>${isId ? "Mari bahas proyek Anda" : "Let&#8217;s discuss your project"}</span><span aria-hidden="true">&rarr;</span></a><div class="contact-email-row"><a href="mailto:${siteConfig.email}">${siteConfig.email}</a><button type="button" class="copy-email" aria-label="${isId ? "Salin alamat email" : "Copy email address"}">${isId ? "Salin" : "Copy"}</button></div><span class="copy-feedback" role="status"></span></div><div class="contact-social-panel"><span class="contact-label">${isId ? "Kenali saya lebih dekat" : "Find me elsewhere"}</span><div class="contact-socials"><a href="${siteConfig.social.github}" target="_blank" rel="noopener noreferrer">${github}<span>GitHub</span><span aria-hidden="true">&nearr;</span></a><a href="${siteConfig.social.linkedin}" target="_blank" rel="noopener noreferrer">${linkedin}<span>LinkedIn</span><span aria-hidden="true">&nearr;</span></a></div></div></div>`;
  }
  document.addEventListener("click", async (event) => {
    if (!event.target.closest(".copy-email")) return;
    const feedback = document.querySelector(".copy-feedback");
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      feedback.textContent =
        lang === "id" ? "Alamat email disalin." : "Email address copied.";
    } catch {
      feedback.textContent =
        lang === "id"
          ? "Silakan pilih dan salin alamat email di atas."
          : "Select and copy the email address above.";
    }
  });

  // RENDER: language changes replace only the page tree. Event delegation survives these replacements.
  function render() {
    pages.classList.add("is-translating");
    const c = copy[lang];
    document.documentElement.lang = lang;
    document.title = siteConfig.title;
    document.querySelector(".brand").firstChild.textContent = siteConfig.name;
    document.querySelector(".brand span").textContent = c.role;
    document.querySelector("nav").innerHTML = c.nav
      .map((n, i) => `<a href="#${ids[i]}">${n}</a>`)
      .join("");
    pages.innerHTML = c.slides
      .map(
        (s, i) =>
          `<section id="${ids[i]}" aria-label="${c.nav[i]}"><div class="content"><p class="eyebrow">${s[0]}</p>${i === 0 ? renderHeroTitle() : `<h1>${i === 2 ? siteConfig.project.name : s[1]}</h1>`}${i === 1 ? renderServices() : i === 3 ? renderProcess() : ""}${(i ===
            1 || i === 3
            ? []
            : s.slice(2)
          )
            .map((t, j) =>
              i === 0 && j === 1
                ? `<a class="action" href="#work">${t}</a>`
                : t.includes("|")
                  ? `<div class="item"><h2>${t.split("|")[0]}</h2><p>${t.split("|")[1]}</p></div>`
                  : i === 2 && j === 2
                    ? renderProjectStatus(t, lang)
                    : `<p>${t}</p>`,
            )
            .join(
              "",
            )}${i === 2 ? `<div class="project-stack"><span class="stack-label">${lang === "id" ? "Teknologi" : "Built with"}</span><ul aria-label="${lang === "id" ? "Teknologi proyek" : "Project technologies"}">${siteConfig.projectTechnologies.map((name) => `<li>${name}</li>`).join("")}</ul></div>` : ""}${i === 4 ? renderContact() : ""}</div>${i === 0 ? renderPortrait() : i === 2 ? renderProjectPreview() : ""}</section>`,
      )
      .join("");
    document.querySelector("#hint").textContent = c.hint;
    document.querySelector("#footer-credit").textContent =
      lang === "id"
        ? `Dirancang & dibuat oleh ${siteConfig.name}`
        : `Designed & built by ${siteConfig.name}`;
    document
      .querySelectorAll("[data-lang]")
      .forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === lang));
    syncHeroAnimation(true);
    setupProjectSwitcher();
    update();
    void pages.offsetWidth;
    pages.classList.remove("is-translating");
  }
  // CAROUSEL STATE: offscreen panels are inert and hidden from assistive technology.
  function update() {
    const processActive = document.querySelector(
      ".process-step.is-active .process-visual",
    );
    if (
      current === 3 &&
      (!processWasVisible ||
        !processActive
          ?.closest(".process-step")
          .classList.contains("is-playing"))
    ) {
      if (processActive) replayProcess(processActive);
    }
    if (current !== 3)
      document
        .querySelectorAll(".process-step")
        .forEach((step) => step.classList.remove("is-playing"));
    processWasVisible = current === 3;
    syncHeroAnimation();
    pages.scrollLeft = 0;
    pages.scrollTop = 0;
    [...pages.children].forEach((p, i) => {
      p.inert = i !== current;
      p.setAttribute("aria-hidden", i !== current);
      p.style.transform = `translateX(${(i - current) * 100}%)`;
    });
    document.querySelector("#position").textContent =
      `0${current + 1} / ${String(ids.length).padStart(2, "0")} - ${copy[lang].nav[current]}`;
    document
      .querySelectorAll("nav a")
      .forEach((a, i) =>
        a.setAttribute("aria-current", i === current ? "page" : "false"),
      );
    prev.disabled = current === 0;
    next.disabled = current === ids.length - 1;
  }
  // Navigation updates history without native anchor scrolling inside the clipped carousel.
  function go(n) {
    n = Math.max(0, Math.min(ids.length - 1, n));
    if (n === current) return;
    current = n;
    history.pushState(null, "", "#" + ids[n]);
    update();
    locked = true;
    setTimeout(() => (locked = false), 550);
  }
  prev.onclick = () => go(current - 1);
  next.onclick = () => go(current + 1);
  window.onhashchange = () => {
    current = Math.max(0, ids.indexOf(location.hash.slice(1)));
    update();
  };
  document.querySelectorAll("[data-lang]").forEach(
    (b) =>
      (b.onclick = () => {
        lang = b.dataset.lang;
        try {
          localStorage.setItem("language", lang);
        } catch {}
        render();
      }),
  );
  // Mouse/trackpad wheel never changes pages. Touch swipe remains available on phones.
  let x, y;
  window.addEventListener(
    "touchstart",
    (e) => {
      x = e.changedTouches[0].clientX;
      y = e.changedTouches[0].clientY;
    },
    { passive: true },
  );
  window.addEventListener(
    "touchend",
    (e) => {
      if (locked || document.querySelector("#project-gallery[open]")) return;
      let d = x - e.changedTouches[0].clientX;
      const dy = y - e.changedTouches[0].clientY;
      if (Math.abs(d) > 45 && Math.abs(d) > Math.abs(dy))
        go(current + Math.sign(d));
    },
    { passive: true },
  );
  render();

  // Keep fragment navigation from scrolling the clipped carousel container.
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const index = ids.indexOf(link.getAttribute("href").slice(1));
    if (index < 0) return;
    event.preventDefault();
    go(index);
  });
  window.addEventListener("popstate", () => {
    current = Math.max(0, ids.indexOf(location.hash.slice(1)));
    update();
  });
  window.addEventListener("load", () => {
    pages.scrollLeft = 0;
    pages.scrollTop = 0;
  });

  // GALLERY: native dialog handles focus trapping/Escape. Animation completes before close restores focus.
  const gallery = document.createElement("dialog");
  gallery.id = "project-gallery";
  gallery.setAttribute("aria-labelledby", "gallery-title");
  gallery.innerHTML =
    '<div class="gallery-top"><div class="mac-window-controls"><button class="gallery-close mac-control mac-close" aria-label="Close gallery"><span aria-hidden="true">&times;</span></button><span class="mac-control mac-minimize" aria-hidden="true"></span><button class="gallery-expand mac-control mac-expand" aria-label="Expand gallery" aria-pressed="false"><span aria-hidden="true">&#8599;</span></button></div><span id="gallery-title">Bicless ERP</span><span class="mac-window-detail" aria-hidden="true">Preview</span></div><div class="gallery-image"><img width="1600" height="1000" alt=""></div><div class="gallery-bottom"><button class="gallery-prev" aria-label="Previous image">&#8592;</button><span class="gallery-caption" aria-live="polite"></span><button class="gallery-next" aria-label="Next image">&#8594;</button></div>';
  document.body.append(gallery);
  gallery.querySelector("#gallery-title").textContent = siteConfig.project.name;
  let galleryIndex = 0,
    galleryTrigger;

  // Public screenshot paths/captions are in content.js. Never publish raw captures or session files.
  function showGalleryImage(index) {
    const images = selectedProject === 1 ? jikandaGallery : galleryImages;
    galleryIndex = (index + images.length) % images.length;
    const item = images[galleryIndex];
    const label = item[lang === "id" ? 2 : 1];
    gallery.querySelector("img").src = item[0];
    gallery.querySelector("img").alt = label;
    gallery.querySelector(".gallery-caption").textContent =
      `${galleryIndex + 1} / ${images.length} - ${label}`;
  }
  let galleryClosing = false;
  function openGallery(trigger) {
    if (gallery.open || galleryClosing) return;
    galleryTrigger = trigger;
    gallery.querySelector("#gallery-title").textContent = selectedProject === 1 ? jikanda.name : siteConfig.project.name;
    showGalleryImage(0);
    gallery.showModal();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gallery.animate(
        [
          { opacity: 0, transform: "translateY(18px) scale(.95)" },
          { opacity: 1, transform: "translateY(0) scale(1)" },
        ],
        { duration: 320, easing: "cubic-bezier(.22,1,.36,1)" },
      );
    }
  }
  async function closeGallery() {
    if (!gallery.open || galleryClosing) return;
    galleryClosing = true;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gallery.classList.add("is-closing");
      try {
        await gallery.animate(
          [
            { opacity: 1, transform: "translateY(0) scale(1)" },
            { opacity: 0, transform: "translateY(10px) scale(.97)" },
          ],
          { duration: 180, easing: "ease-in", fill: "forwards" },
        ).finished;
      } catch {}
    }
    gallery.close();
    gallery.getAnimations().forEach((animation) => animation.cancel());
    gallery.classList.remove("is-closing");
    galleryClosing = false;
  }
  gallery.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeGallery();
  });
  gallery.querySelector(".gallery-close").onclick = closeGallery;
  gallery.querySelector(".gallery-expand").onclick = () => {
    const expanded = gallery.classList.toggle("is-expanded");
    const button = gallery.querySelector(".gallery-expand");
    button.setAttribute("aria-pressed", expanded);
    button.setAttribute(
      "aria-label",
      expanded ? "Restore gallery size" : "Expand gallery",
    );
  };
  gallery.querySelector(".gallery-prev").onclick = () =>
    showGalleryImage(galleryIndex - 1);
  gallery.querySelector(".gallery-next").onclick = () =>
    showGalleryImage(galleryIndex + 1);
  gallery.addEventListener("close", () => galleryTrigger?.focus());
  gallery.addEventListener("click", (e) => {
    if (e.target === gallery) {
      const r = gallery.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        closeGallery();
    }
  });
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest(
      ".project-preview:not(.simulation-preview)",
    );
    if (trigger) openGallery(trigger);
  });
  document.addEventListener("keydown", (e) => {
    if (gallery.open) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        showGalleryImage(galleryIndex + (e.key === "ArrowRight" ? 1 : -1));
      }
      return;
    }
    const trigger = e.target.closest(
      ".project-preview:not(.simulation-preview)",
    );
    if (trigger && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      openGallery(trigger);
    }
  });
  let galleryTouch;
  gallery.addEventListener(
    "touchstart",
    (e) => (galleryTouch = e.changedTouches[0].clientX),
    { passive: true },
  );
  gallery.addEventListener(
    "touchend",
    (e) => {
      const delta = galleryTouch - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 45)
        showGalleryImage(galleryIndex + Math.sign(delta));
    },
    { passive: true },
  );

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-process]");
    if (!button) return;
    const index = Number(button.dataset.process);
    activeProcessStep = index;
    document.querySelectorAll(".process-step").forEach((step, i) => {
      step.classList.remove("is-playing");
      step.classList.toggle("is-active", i === index);
    });
    const visual = document.querySelector(
      ".process-step.is-active .process-visual",
    );
    if (visual) replayProcess(visual);
    document
      .querySelectorAll("[data-process]")
      .forEach((item, i) => item.setAttribute("aria-pressed", i === index));
  });
})();
