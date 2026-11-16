/** Classic deferred script: works with file:// and GitHub Pages. Keep script order in index.html. */
(() => {
  "use strict";
  const {
    renderPortrait,
    siteConfig,
    copy,
    serviceGroups,
    techStack,
    heroText,
    contactMeta,
    serviceIcons,
  } = window.Portfolio;
  let activeTechDevice = "web";
  let copyResetTimer = null;

  const ids = ["intro", "services", "tech", "work", "contact"];
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

  // PHILOSOPHY: left inspector box stays on current pillar until a right-side pillar is hovered/clicked, then a pointer drags the old box out and drags the new box in. Hovering the left box reveals the quote popover.
  let activePhilosophy = 0;
  let targetPhilosophy = 0;
  let philDragPhase = "hold";
  let philosophyTimer;
  function renderPhilosophyTitle() {
    const isId = lang === "id";
    const groups = serviceGroups[lang];
    const active = groups[activePhilosophy] || groups[0];
    const longestPhrase = groups.reduce((a, b) =>
      a[4].length > b[4].length ? a : b,
    )[4];
    const pointerSvg =
      '<span class="phil-drag-pointer" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none"><path d="M4.5 2.8 15.8 8.4a.8.8 0 0 1-.08 1.46l-4.42 1.48-1.48 4.42a.8.8 0 0 1-1.46.08L2.8 4.5a1.2 1.2 0 0 1 1.7-1.7Z" fill="#111" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg></span>';
    return `<h1 class="philosophy-title"><span class="sr-only">${copy[lang].slides[1][1]}</span><span aria-hidden="true" class="phil-lines"><span class="phil-line-top">${isId ? "Layar mudah dibuat." : "Screens are easy to build."}</span><span class="phil-line-mid">${isId ? 'Hanya <span class="phil-care">rasa</span> yang membuatnya' : 'Only <span class="phil-care">care</span> makes them'}</span><span class="phil-inspector-stage"><span class="phil-inspector" data-phase="hold" tabindex="0"><span class="phil-inspector-badge"><span class="phil-badge-dot"></span><span class="phil-badge-num">0${activePhilosophy + 1}</span><span>&middot;</span><span class="phil-badge-label">${active[0]}</span></span><span class="phil-inspector-box"><span class="phil-handle phil-h-tl"></span><span class="phil-handle phil-h-tr"></span><span class="phil-handle phil-h-bl"></span><span class="phil-handle phil-h-br"></span><span class="phil-word-stage"><span class="phil-word-reserve">${longestPhrase}</span><span class="phil-word-current">${active[4]}</span></span>${pointerSvg}</span><span class="phil-quote-popover" role="tooltip"><span class="phil-popover-text">${active[3]}</span></span></span></span></span></h1>`;
  }
  function renderServices() {
    const groups = serviceGroups[lang];
    return `<div class="philosophy-pillars" role="list">${groups.map((g, i) => `<article class="philosophy-pillar${i === targetPhilosophy ? " is-selected" : ""}" data-pillar="${i}" tabindex="0" role="listitem"><div class="pillar-top"><div class="pillar-meta"><span class="pillar-dot" aria-hidden="true"></span><span class="pillar-index">0${i + 1}</span><span class="pillar-sep">&middot;</span><span class="pillar-key">${g[0]}</span></div><div class="pillar-viz" aria-hidden="true"><svg viewBox="0 0 48 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${serviceIcons[i]}</svg></div></div><h2 class="pillar-title">${g[1]}</h2><div class="pillar-collapse"><div class="pillar-collapse-inner"><p>${g[2]}</p></div></div></article>`).join("")}</div>`;
  }
  function applyPhilosophySelectedPillar() {
    const section = document.querySelector("#services");
    if (!section) return;
    section.querySelectorAll(".philosophy-pillar").forEach((el, i) => {
      el.classList.toggle("is-selected", i === targetPhilosophy);
    });
  }
  function applyPhilosophyDom() {
    const groups = serviceGroups[lang];
    const section = document.querySelector("#services");
    if (!section || !groups) return;
    const item = groups[activePhilosophy];
    section.dataset.pillar = String(activePhilosophy);
    const badgeNum = section.querySelector(".phil-badge-num");
    const badgeLabel = section.querySelector(".phil-badge-label");
    const wordEl = section.querySelector(".phil-word-current");
    const popText = section.querySelector(".phil-popover-text");
    if (badgeNum) badgeNum.textContent = `0${activePhilosophy + 1}`;
    if (badgeLabel) badgeLabel.textContent = item[0];
    if (wordEl) wordEl.textContent = item[4];
    if (popText) popText.textContent = item[3];
    applyPhilosophySelectedPillar();
  }
  function applyPhilosophyDragClasses() {
    const inspector = document.querySelector("#services .phil-inspector");
    if (!inspector) return;
    inspector.dataset.phase = philDragPhase;
  }
  function syncPhilosophy(reset = false) {
    clearTimeout(philosophyTimer);
    const section = document.querySelector("#services");
    if (!section) return;
    if (reset) {
      philDragPhase = "hold";
      targetPhilosophy = activePhilosophy;
      applyPhilosophyDom();
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      activePhilosophy = targetPhilosophy;
      philDragPhase = "hold";
      applyPhilosophyDom();
      applyPhilosophyDragClasses();
      return;
    }
    applyPhilosophyDragClasses();
    if (philDragPhase === "hold") {
      if (targetPhilosophy !== activePhilosophy) {
        philDragPhase = "aim";
        applyPhilosophyDragClasses();
      } else {
        return;
      }
    }
    const delay =
      philDragPhase === "aim"
        ? 110
        : philDragPhase === "grab"
          ? 110
          : philDragPhase === "drag-out"
            ? 250
            : philDragPhase === "drag-start"
              ? 30
              : philDragPhase === "drag-in"
                ? 290
                : 140;
    philosophyTimer = setTimeout(philosophyDragTick, delay);
  }
  function philosophyDragTick() {
    const groups = serviceGroups[lang];
    if (!groups) return;
    if (philDragPhase === "aim") {
      philDragPhase = "grab";
    } else if (philDragPhase === "grab") {
      philDragPhase = "drag-out";
    } else if (philDragPhase === "drag-out") {
      activePhilosophy = targetPhilosophy;
      applyPhilosophyDom();
      philDragPhase = "drag-start";
    } else if (philDragPhase === "drag-start") {
      philDragPhase = "drag-in";
    } else if (philDragPhase === "drag-in") {
      philDragPhase = "drop";
    } else {
      philDragPhase = "hold";
    }
    syncPhilosophy();
  }
  function triggerPhilosophyDragTo(index) {
    const groups = serviceGroups[lang];
    if (!groups || index < 0 || index >= groups.length) return;
    targetPhilosophy = index;
    applyPhilosophySelectedPillar();
    if (targetPhilosophy === activePhilosophy && philDragPhase === "hold") {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      clearTimeout(philosophyTimer);
      activePhilosophy = targetPhilosophy;
      philDragPhase = "hold";
      applyPhilosophyDom();
      applyPhilosophyDragClasses();
      return;
    }
    if (philDragPhase === "hold") {
      philDragPhase = "aim";
      syncPhilosophy();
    }
  }
  const mobilePhilQuery = window.matchMedia(
    "(hover: none), (max-width: 700px)",
  );
  function closePhilosophyPopover() {
    const open = document.querySelector("#services .phil-inspector.is-hovered");
    if (open) {
      open.classList.remove("is-hovered");
    }
  }
  document.addEventListener("pointerover", (event) => {
    if (event.pointerType === "touch" || mobilePhilQuery.matches) return;
    const inspector = event.target.closest(".phil-inspector");
    if (inspector && !inspector.contains(event.relatedTarget)) {
      inspector.classList.add("is-hovered");
      return;
    }
    const pillar = event.target.closest(".philosophy-pillar");
    if (pillar && !pillar.contains(event.relatedTarget)) {
      triggerPhilosophyDragTo(Number(pillar.dataset.pillar));
    }
  });
  document.addEventListener("pointerout", (event) => {
    if (event.pointerType === "touch" || mobilePhilQuery.matches) return;
    const inspector = event.target.closest(".phil-inspector");
    if (inspector && !inspector.contains(event.relatedTarget)) {
      inspector.classList.remove("is-hovered");
    }
  });
  document.addEventListener("focusin", (event) => {
    const pillar = event.target.closest(".philosophy-pillar");
    if (pillar) {
      closePhilosophyPopover();
      triggerPhilosophyDragTo(Number(pillar.dataset.pillar));
    }
  });
  document.addEventListener("click", (event) => {
    const inspector = event.target.closest(".phil-inspector");
    if (inspector) {
      const isOpen = inspector.classList.toggle("is-hovered");
      if (!isOpen) inspector.blur();
      return;
    }
    closePhilosophyPopover();
    const pillar = event.target.closest(".philosophy-pillar");
    if (pillar) triggerPhilosophyDragTo(Number(pillar.dataset.pillar));
  });

  // TECH STACK (IDE 1): Viewport Resizer Studio — drag the frame or pick a ruler preset while Core Bedrock stays anchored below.
  const techDeviceOrder = ["mobile", "web", "desktop"];
  let techTitleTimer = null;
  let techTitlePhase = "hold";
  let techTitleTarget = "web";
  let techUserHovering = false;
  let techManualHoldUntil = 0;

  function techFundIcon(id) {
    if (id === "html") {
      return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.2 2.8h15.6l-1.42 15.84L12 20.8l-6.38-2.16L4.2 2.8Z" fill="#E34F26"/><path d="M12 4.3v15l4.98-1.66L18.14 4.3H12Z" fill="#EF652A"/><path d="M7.6 7.4h8.8l-.25 2.1H9.9l.2 2.15h5.82l-.48 4.95L12 17.7l-3.44-1.1-.22-2.55h2.12l.11 1.12 1.43.46 1.44-.46.18-1.72H8.18L7.6 7.4Z" fill="#fff"/></svg>';
    }
    if (id === "css") {
      return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.2 2.8h15.6l-1.42 15.84L12 20.8l-6.38-2.16L4.2 2.8Z" fill="#1572B6"/><path d="M12 4.3v15l4.98-1.66L18.14 4.3H12Z" fill="#33A9DC"/><path d="M7.6 7.4h8.8l-.28 2.1H9.95l.2 2.1h5.72l-.48 5L12 17.7l-3.42-1.1-.22-2.45h2.12l.1 1.05 1.42.45 1.44-.45.18-1.75H8.22l-.18-1.9h4.18l.12-1.05H7.78L7.6 7.4Z" fill="#fff"/></svg>';
    }
    if (id === "js") {
      return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3.2" fill="#F7DF1E"/><path d="M11.6 11.4v5.15c0 1.48-.85 2.25-2.18 2.25-.92 0-1.56-.38-1.97-.98l1.28-.8c.24.36.5.56.92.56.45 0 .7-.22.7-.9v-5.28h1.25Zm2.22 5.64c.42.48 1 .78 1.72.78.62 0 1.04-.26 1.04-.66 0-.42-.34-.58-1.12-.88l-.42-.16c-1.14-.44-1.86-1.02-1.86-2.2 0-1.14.92-2.02 2.26-2.02.98 0 1.66.32 2.14 1.14l-1.18.74c-.26-.44-.54-.64-.96-.64-.46 0-.74.26-.74.62 0 .42.28.58 1.04.88l.42.16c1.28.48 2 .98 2 2.24 0 1.32-1.04 2.1-2.44 2.1-1.38 0-2.22-.64-2.66-1.46l1.16-.66Z" fill="#111"/></svg>';
    }
    return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3.2" fill="#3178C6"/><path d="M11.55 12.1H9.52v6.6H8.06v-6.6H6.04v-1.22h5.51v1.22Zm1.3 4.86c.45.5 1.04.8 1.78.8.64 0 1.06-.26 1.06-.66 0-.42-.35-.58-1.16-.9l-.42-.16c-1.18-.44-1.92-1.04-1.92-2.24 0-1.16.95-2.04 2.34-2.04 1 0 1.7.34 2.18 1.16l-1.2.74c-.26-.44-.56-.64-.98-.64-.46 0-.76.26-.76.62 0 .42.3.58 1.08.88l.42.16c1.32.5 2.04 1 2.04 2.28 0 1.34-1.06 2.14-2.5 2.14-1.42 0-2.28-.66-2.74-1.5l1.18-.66Z" fill="#fff"/></svg>';
  }

  function techStackIcon(id) {
    if (id === "flutter") {
      return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.3 2.5 4.8 12l2.95 2.95L20.2 2.5h-5.9Z" fill="#47C5FB"/><path d="M14.2 11.4 9.15 16.45l2.95 2.95 2.95-2.95L20.1 11.4h-5.9Z" fill="#47C5FB"/><path d="M12.1 19.4 14.3 21.6h5.9l-5.15-5.15-2.95 2.95Z" fill="#00569E"/><path d="M9.15 16.45 12.1 13.5l2.95 2.95-2.95 2.95-2.95-2.95Z" fill="#00B5F8"/></svg>';
    }
    if (id === "kotlin") {
      return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3.5 3.5h17l-8.5 8.5 8.5 8.5h-17v-17Z" fill="#7F52FF"/><path d="M3.5 3.5h8.7L3.5 12.4V3.5Z" fill="#0095D5"/><path d="m3.5 20.5 8.5-8.5 8.5 8.5h-17Z" fill="#E44857"/></svg>';
    }
    if (id === "react" || id === "react-native") {
      return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="2.1" fill="#0EA5E9"/><ellipse cx="12" cy="12" rx="9.2" ry="3.6" stroke="#0EA5E9" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="9.2" ry="3.6" transform="rotate(60 12 12)" stroke="#0EA5E9" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="9.2" ry="3.6" transform="rotate(120 12 12)" stroke="#0EA5E9" stroke-width="1.5"/></svg>';
    }
    if (id === "vue") {
      return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2.5 4.2h4.1L12 13.5l5.4-9.3h4.1L12 20.5 2.5 4.2Z" fill="#41B883"/><path d="M6.6 4.2h3.4L12 7.7l2-3.5h3.4L12 13.5 6.6 4.2Z" fill="#34495E"/></svg>';
    }
    if (id === "svelte") {
      return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18.6 5.2a5.1 5.1 0 0 0-7-1.5L7.3 6.5a4.8 4.8 0 0 0-2 5.3c.2.6.5 1.2.9 1.7a4.6 4.6 0 0 0-.6 3 4.8 4.8 0 0 0 3.7 3.8c1 .2 2.1 0 3-.6l4.3-2.8a4.8 4.8 0 0 0 2-5.3c-.2-.6-.5-1.2-.9-1.7a4.6 4.6 0 0 0 .6-3 4.5 4.5 0 0 0-.7-1.7Z" fill="#FF3E00"/><path d="M15.4 7.8c-.7-.9-2-1.1-3-.4L9.2 9.5c-.8.5-1 1.6-.4 2.3.3.3.7.5 1.1.7l3.6 1.1c.9.3 1.4 1.3 1.1 2.2-.2.5-.5.9-.9 1.2l-3.2 2.1c-1 .6-2.3.4-3-.5" stroke="#fff" stroke-width="2.1" stroke-linecap="round"/></svg>';
    }
    if (id === "tailwind") {
      return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 6.2c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.11 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.62 7.35 14.49 6.2 12 6.2ZM7 12.2c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.11 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35-.98-1-2.11-2.15-4.6-2.15Z" fill="#06B6D4"/></svg>';
    }
    if (id === "shadcn") {
      return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4" fill="#111"/><path d="m16.2 11.4-4.8 4.8m3.4-9.8-8.4 8.4" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>';
    }
    if (id === "tauri") {
      return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9.2" cy="9.2" r="2.1" fill="#24C8DB"/><path d="M14.7 6.8a5.8 5.8 0 0 0-8.2 8.1l2-1.8a3.1 3.1 0 0 1 4.4-4.4l1.8-1.9Z" fill="#24C8DB"/><circle cx="14.8" cy="14.8" r="2.1" fill="#FFC131"/><path d="M9.3 17.2a5.8 5.8 0 0 0 8.2-8.1l-2 1.8a3.1 3.1 0 0 1-4.4 4.4l-1.8 1.9Z" fill="#FFC131"/></svg>';
    }
    return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="2" fill="#2F3241"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(35 12 12)" stroke="#47848F" stroke-width="1.45"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-35 12 12)" stroke="#47848F" stroke-width="1.45"/><circle cx="6.2" cy="8.2" r="1.3" fill="#47848F"/><circle cx="17.8" cy="15.8" r="1.3" fill="#47848F"/><circle cx="17.8" cy="8.2" r="1.3" fill="#47848F"/></svg>';
  }

  function renderStudioTechTiles(items) {
    return items
      .map(
        (item) => `<div class="mockup-tech-tile">
          <span class="mockup-tech-icon" aria-hidden="true">${techStackIcon(item.id)}</span>
          <div class="mockup-tech-meta">
            <strong>${item.name}</strong>
            <span>${item.tag}</span>
          </div>
        </div>`,
      )
      .join("");
  }

  function renderStudioDeviceFrame(device, isId) {
    if (device.id === "mobile") {
      return `<div class="mockup-phone">
        <span class="phone-btn is-vol-up" aria-hidden="true"></span>
        <span class="phone-btn is-vol-down" aria-hidden="true"></span>
        <span class="phone-btn is-power" aria-hidden="true"></span>
        <div class="phone-screen">
          <div class="mockup-chrome is-phone">
            <span class="phone-time" aria-hidden="true">9:41</span>
            <span class="phone-island" aria-hidden="true"><i></i></span>
            <span class="phone-status" aria-hidden="true">
              <svg viewBox="0 0 24 12" fill="currentColor"><rect x="1" y="7" width="2.2" height="4" rx=".6"/><rect x="4.6" y="5" width="2.2" height="6" rx=".6"/><rect x="8.2" y="3" width="2.2" height="8" rx=".6"/><rect x="13.5" y="2.5" width="8.5" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.2"/><rect x="15" y="4" width="5.2" height="4" rx=".6"/><rect x="22.4" y="4.5" width="1.1" height="3" rx=".4"/></svg>
            </span>
          </div>
          <div class="mockup-screen is-phone">
            <div class="mockup-phone-hero" aria-hidden="true">
              <div class="phone-hero-left">
                <span class="phone-hero-dot"></span>
                <span class="phone-hero-lines"><i></i><i></i></span>
              </div>
              <span class="phone-hero-pill"></span>
            </div>
            <div class="mockup-app-head">
              <span class="mockup-badge">${device.chromeLabel}</span>
              <span class="mockup-mini-pill">${isId ? "Sentuh" : "Touch UI"}</span>
            </div>
            <div class="mockup-tech-list">
              ${renderStudioTechTiles(device.items)}
            </div>
          </div>
          <div class="mockup-phone-tabs" aria-hidden="true">
            <span class="phone-tab is-active">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1"/><rect x="9" y="2.5" width="4.5" height="4.5" rx="1"/><rect x="2.5" y="9" width="4.5" height="4.5" rx="1"/><rect x="9" y="9" width="4.5" height="4.5" rx="1"/></svg>
            </span>
            <span class="phone-tab">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m2.5 6 5.5-3 5.5 3-5.5 3-5.5-3Z"/><path d="m2.5 9.5 5.5 3 5.5-3"/></svg>
            </span>
            <span class="phone-tab">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="5.5" r="2.2"/><path d="M3.5 13.2a4.8 4.8 0 0 1 9 0"/></svg>
            </span>
          </div>
          <div class="mockup-phone-home" aria-hidden="true"><span></span></div>
        </div>
      </div>`;
    }

    if (device.id === "desktop") {
      return `<div class="mockup-monitor">
        <div class="monitor-frame">
          <span class="monitor-cam" aria-hidden="true"></span>
          <div class="monitor-screen">
            <div class="laptop-os-backdrop">
              <div class="laptop-app-window">
                <div class="mockup-chrome is-desktop">
                  <div class="desktop-app-brand">
                    <span class="desktop-app-badge" aria-hidden="true"></span>
                    <span>${device.chromeLabel}</span>
                  </div>
                  <div class="desktop-win-ctrls" aria-hidden="true">
                    <span></span><span></span><span class="is-close"></span>
                  </div>
                </div>
                <div class="mockup-screen is-desktop">
                  <aside class="desktop-sidebar" aria-hidden="true">
                    <span class="sb-line is-active"></span>
                    <span class="sb-line"></span>
                    <span class="sb-line is-short"></span>
                    <span class="sb-core">HTML · CSS · TS</span>
                  </aside>
                  <div class="desktop-workspace">
                    <div class="desktop-wire-bar" aria-hidden="true">
                      <span class="wire-pill"></span>
                      <span class="wire-lines"><i></i><i></i></span>
                    </div>
                    <div class="mockup-app-head">
                      <span class="mockup-badge">${device.sub}</span>
                      <span class="mockup-mini-pill">App</span>
                    </div>
                    <div class="mockup-tech-list">
                      ${renderStudioTechTiles(device.items)}
                    </div>
                  </div>
                </div>
              </div>
              <div class="laptop-dock" aria-hidden="true">
                <span></span><span class="is-active"></span><span></span><span></span>
              </div>
            </div>
          </div>
        </div>
        <div class="monitor-stand" aria-hidden="true">
          <div class="monitor-neck"></div>
          <div class="monitor-foot"></div>
        </div>
      </div>`;
    }

    const laptopInner = `<div class="laptop-browser-window">
      <div class="mockup-chrome is-browser">
        <span class="studio-chrome-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="browser-url-bar">
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><rect x="3" y="6" width="8" height="6" rx="1.4"/><path d="M4.8 6V4.5a2.2 2.2 0 0 1 4.4 0V6"/></svg>
          <span>${device.chromeLabel}</span>
        </span>
        <span class="browser-refresh" aria-hidden="true">&#8635;</span>
      </div>
      <div class="mockup-screen is-browser">
        <div class="mockup-browser-wire" aria-hidden="true">
          <span class="wire-pill"></span>
          <span class="wire-lines"><i></i><i></i></span>
        </div>
        <div class="mockup-app-head">
          <span class="mockup-badge">${device.sub}</span>
          <span class="mockup-mini-pill">Browser</span>
        </div>
        <div class="mockup-tech-list is-grid">
          ${renderStudioTechTiles(device.items)}
        </div>
      </div>
    </div>`;

    return `<div class="mockup-laptop">
      <div class="laptop-lid">
        <span class="laptop-cam" aria-hidden="true"></span>
        <div class="laptop-screen">${laptopInner}</div>
      </div>
      <div class="laptop-base" aria-hidden="true">
        <span class="laptop-notch"></span>
      </div>
    </div>`;
  }

  function positionTechPointer(wordId, immediate = false) {
    const lines = document.querySelector("#tech .tech-title-lines");
    if (!lines) return;
    const btn = lines.querySelector(`[data-tech-word="${wordId}"]`);
    if (!btn) return;
    const linesRect = lines.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    if (!linesRect.width || !btnRect.width) return;
    const x = btnRect.left - linesRect.left + btnRect.width * 0.72;
    const y = btnRect.top - linesRect.top + btnRect.height * 0.68;
    if (immediate) {
      lines.classList.add("is-ptr-snap");
    }
    lines.style.setProperty("--ptr-x", `${x.toFixed(1)}px`);
    lines.style.setProperty("--ptr-y", `${y.toFixed(1)}px`);
    if (immediate) {
      void lines.offsetWidth;
      lines.classList.remove("is-ptr-snap");
    }
  }

  function applyTechTitlePhase() {
    const lines = document.querySelector("#tech .tech-title-lines");
    if (!lines) return;
    lines.dataset.ptrPhase = techTitlePhase;
  }

  function syncTechTitleAnimation(reset = false) {
    clearTimeout(techTitleTimer);
    const techIndex = ids.indexOf("tech");
    const lines = document.querySelector("#tech .tech-title-lines");
    if (!lines) return;

    if (reset) {
      techTitlePhase = "hold";
      techTitleTarget = activeTechDevice;
      applyTechTitlePhase();
      requestAnimationFrame(() => positionTechPointer(activeTechDevice, true));
    }

    if (heroMotion.matches || current !== techIndex || document.hidden) {
      techTitlePhase = "hold";
      applyTechTitlePhase();
      return;
    }

    applyTechTitlePhase();

    if (techTitlePhase === "hold") {
      if (techUserHovering) return;
      const now = Date.now();
      const extraDelay = Math.max(0, techManualHoldUntil - now);
      techTitleTimer = setTimeout(() => {
        if (techUserHovering || current !== techIndex || document.hidden) {
          return;
        }
        positionTechPointer(activeTechDevice, true);
        const curIdx = techDeviceOrder.indexOf(activeTechDevice);
        techTitleTarget = techDeviceOrder[(curIdx + 1) % techDeviceOrder.length];
        techTitlePhase = "move";
        applyTechTitlePhase();
        positionTechPointer(techTitleTarget, false);
        syncTechTitleAnimation();
      }, Math.max(1950, extraDelay));
      return;
    }

    const delay =
      techTitlePhase === "move"
        ? 490
        : techTitlePhase === "click"
          ? 200
          : 320;
    techTitleTimer = setTimeout(() => {
      if (current !== techIndex || document.hidden) return;
      if (techTitlePhase === "move") {
        techTitlePhase = "click";
        activeTechDevice = techTitleTarget;
        updateTechDom();
      } else if (techTitlePhase === "click") {
        techTitlePhase = "settle";
      } else {
        techTitlePhase = "hold";
      }
      syncTechTitleAnimation();
    }, delay);
  }

  function updateTechDom() {
    const section = document.querySelector("#tech");
    if (!section) return;
    const data = techStack[lang];
    if (!data) return;
    const active =
      data.devices.find((d) => d.id === activeTechDevice) || data.devices[1];
    activeTechDevice = active.id;

    section.querySelectorAll("[data-tech-word]").forEach((btn) => {
      const selected = btn.dataset.techWord === active.id;
      btn.classList.toggle("is-selected", selected);
      btn.setAttribute("aria-pressed", String(selected));
    });

    const stage = section.querySelector(".studio-stage");
    if (stage && stage.dataset.device !== active.id) {
      stage.dataset.device = active.id;
      stage.innerHTML = renderStudioDeviceFrame(active, lang === "id");
    }
  }

  function renderTechPage(slideMeta) {
    const data = techStack[lang];
    const isId = lang === "id";
    const active =
      data.devices.find((d) => d.id === activeTechDevice) || data.devices[1];
    activeTechDevice = active.id;
    const titleMuted = isId ? "Satu fondasi." : "One foundation.";
    const wordBtn = (id, text) =>
      `<button type="button" class="tech-word-btn${id === active.id ? " is-selected" : ""}" data-tech-word="${id}" aria-pressed="${id === active.id}">${text}</button>`;
    const lineTwoHtml = isId
      ? `Untuk <span class="tech-word-group">${wordBtn("mobile", "mobile")},</span> <span class="tech-word-group">${wordBtn("web", "web")},</span> &amp; <span class="tech-word-group">${wordBtn("desktop", "desktop")}.</span>`
      : `Built for <span class="tech-word-group">${wordBtn("mobile", "mobile")},</span> <span class="tech-word-group">${wordBtn("web", "web")},</span> &amp; <span class="tech-word-group">${wordBtn("desktop", "desktop")}.</span>`;
    const pointerSvg =
      '<span class="tech-title-pointer" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none"><path d="M4.5 2.8 15.8 8.4a.8.8 0 0 1-.08 1.46l-4.42 1.48-1.48 4.42a.8.8 0 0 1-1.46.08L2.8 4.5a1.2 1.2 0 0 1 1.7-1.7Z" fill="#111" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg></span>';

    return `<div class="tech-shell">
      <div class="tech-overview">
        <p class="eyebrow tech-eyebrow">${slideMeta[0]}</p>
        <h1 class="tech-title">
          <span class="sr-only">${slideMeta[1]}</span>
          <span aria-hidden="true" class="tech-title-lines" data-ptr-phase="hold">
            <span class="tech-title-muted">${titleMuted}</span>
            <span class="tech-title-ink">${lineTwoHtml}</span>
            ${pointerSvg}
          </span>
        </h1>
        <p class="tech-lead">${slideMeta[2]}</p>
        <div class="tech-fundamentals">
          <div class="tech-fund-head">
            <span class="tech-fund-dot" aria-hidden="true"></span>
            <span>${data.fundamentalsLabel}</span>
          </div>
          <ul class="tech-fund-list">
            ${data.fundamentals
              .map(
                (f) => `<li class="tech-fund-chip" data-fund="${f.id}">
                  <span class="tech-fund-icon" aria-hidden="true">${techFundIcon(f.id)}</span>
                  <span class="tech-fund-label">${f.label}</span>
                </li>`,
              )
              .join("")}
          </ul>
        </div>
      </div>
      <div class="studio-resizer">
        <div class="studio-stage" data-device="${active.id}">
          ${renderStudioDeviceFrame(active, isId)}
        </div>
      </div>
    </div>`;
  }

  document.addEventListener("pointerover", (event) => {
    if (event.pointerType === "touch") return;
    const interactive = event.target.closest("#tech .studio-resizer, #tech .tech-title-lines");
    if (interactive && !techUserHovering) {
      techUserHovering = true;
      syncTechTitleAnimation();
    }
  });
  document.addEventListener("pointerout", (event) => {
    if (event.pointerType === "touch") return;
    const interactive = event.target.closest("#tech .studio-resizer, #tech .tech-title-lines");
    if (interactive && (!event.relatedTarget || !event.relatedTarget.closest("#tech .studio-resizer, #tech .tech-title-lines"))) {
      techUserHovering = false;
      syncTechTitleAnimation();
    }
  });
  window.addEventListener("resize", () =>
    positionTechPointer(activeTechDevice, true),
  );

  // PROJECTS: Simple centered under-maintenance screen.
  function renderWorkPage(slideMeta) {
    return `<div class="work-maintenance">
      <p class="eyebrow work-eyebrow">${slideMeta[0]}</p>
      <h1 class="work-maint-title">${slideMeta[1]}</h1>
      <p class="work-maint-note">${slideMeta[2]}</p>
    </div>`;
  }

  // HERO TYPEWRITER: pointer glides in, clicks, highlights/blocks the word, then types the next word over it.
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
    const pointerSvg =
      '<span class="hero-pointer" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none"><path d="M4.5 2.8 15.8 8.4a.8.8 0 0 1-.08 1.46l-4.42 1.48-1.48 4.42a.8.8 0 0 1-1.46.08L2.8 4.5a1.2 1.2 0 0 1 1.7-1.7Z" fill="#111" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg></span>';
    return `<div class="hero-heading"><h1 class="typing-title"><span class="sr-only">${c.first} ${c.prefix}${c.words[0]}${c.suffix}</span><span aria-hidden="true" class="hero-title-lines"><span>${c.first}</span><span class="hero-type-line">${c.prefix}<span class="hero-word-space"><span class="hero-word-reserve">${c.words.reduce((a, b) => (a.length > b.length ? a : b))}</span><span class="hero-word-track"><span class="hero-word">${c.words[0]}</span><span class="typing-cursor"></span>${pointerSvg}</span></span>${c.suffix}</span></span></h1></div>`;
  }
  function applyHeroPhaseClasses() {
    const track = document.querySelector(".hero-word-track");
    if (!track) return;
    track.classList.toggle("is-aiming", heroPhase === "aim");
    track.classList.toggle("is-clicking", heroPhase === "click");
    track.classList.toggle("is-selected", heroPhase === "select");
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
    applyHeroPhaseClasses();
    document
      .querySelector(".hero-heading")
      .classList.toggle(
        "typing-paused",
        current !== 0 || document.hidden || heroMotion.matches,
      );
    if (heroMotion.matches) {
      heroPhase = "hold";
      applyHeroPhaseClasses();
      word.textContent = heroCopy().words[0];
      return;
    }
    if (current !== 0 || document.hidden) return;
    const delay =
      heroPhase === "hold"
        ? 2200
        : heroPhase === "aim"
          ? 300
          : heroPhase === "click"
            ? 180
            : heroPhase === "select"
              ? 460
              : 75;
    heroTimer = setTimeout(heroTick, delay);
  }
  function heroTick() {
    const words = heroCopy().words;
    const word = document.querySelector(".hero-word");
    if (!word) return;
    if (heroPhase === "hold") {
      heroPhase = "aim";
    } else if (heroPhase === "aim") {
      heroPhase = "click";
    } else if (heroPhase === "click") {
      heroPhase = "select";
    } else if (heroPhase === "select") {
      heroWordIndex = (heroWordIndex + 1) % words.length;
      heroLetters = 1;
      word.textContent = words[heroWordIndex].slice(0, 1);
      heroPhase = "type";
    } else {
      heroLetters++;
      word.textContent = words[heroWordIndex].slice(0, heroLetters);
      if (heroLetters >= words[heroWordIndex].length) heroPhase = "hold";
    }
    syncHeroAnimation();
  }
  document.addEventListener("visibilitychange", () => {
    syncHeroAnimation();
    syncTechTitleAnimation();
    syncContactAnimation();
  });
  heroMotion.addEventListener("change", () => {
    syncHeroAnimation(true);
    syncTechTitleAnimation(true);
    syncContactAnimation(true);
  });

  // PORTRAIT PARALLAX & COMIC BUBBLE TYPING: layered depth and live dialogue typing on hover & mobile tap.
  let bubbleTimer, bubbleAutoTimer;
  const mobileBubbleQuery = window.matchMedia(
    "(hover: none), (max-width: 700px)",
  );
  function stopBubbleTyping(frame) {
    clearTimeout(bubbleTimer);
    clearTimeout(bubbleAutoTimer);
    frame?.classList.remove("is-speaking");
    const typed = frame?.querySelector(".bubble-typed");
    if (typed) {
      typed.textContent = "";
      typed.classList.remove("is-typing");
    }
  }
  function startBubbleTyping(frame) {
    clearTimeout(bubbleTimer);
    const bubble = frame?.querySelector(".portrait-bubble");
    const typed = frame?.querySelector(".bubble-typed");
    if (!bubble || !typed) return;
    frame.classList.add("is-speaking");
    const fullText = bubble.dataset.bubble || "";
    if (heroMotion.matches) {
      typed.textContent = fullText;
      typed.classList.remove("is-typing");
      return;
    }
    typed.textContent = "";
    typed.classList.add("is-typing");
    let count = 0;
    function step() {
      count++;
      typed.textContent = fullText.slice(0, count);
      if (count < fullText.length) {
        bubbleTimer = setTimeout(step, 22);
      } else {
        typed.classList.remove("is-typing");
      }
    }
    bubbleTimer = setTimeout(step, 110);
  }
  function syncPortraitBubble() {
    clearTimeout(bubbleAutoTimer);
    const frame = document.querySelector("#intro .portrait-frame");
    if (!frame) return;
    if (current !== 0 || document.hidden) {
      stopBubbleTyping(frame);
      return;
    }
    if (mobileBubbleQuery.matches) {
      bubbleAutoTimer = setTimeout(() => {
        if (current === 0 && !document.hidden) startBubbleTyping(frame);
      }, 650);
    }
  }

  // CONTACT: two-column editorial split + emoji typing effect + Gmail-style compose window.
  const contactEmojis = ["\uD83D\uDE0A", "\u2764\uFE0F", "\uD83D\uDE0D"];
  let contactEmojiTimer = null;
  let contactEmojiIndex = 0;
  let contactEmojiPhase = "hold";
  let contactDraftSubject = "";
  let contactDraftBody = "";
  let contactGhostTimer = null;
  let contactGhostIndex = 0;
  let contactGhostChars = 0;
  let contactGhostPhase = "type";
  let contactComposeFocused = false;

  function escapeAttr(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function buildMailtoHref() {
    const meta = contactMeta[lang];
    const subject = contactDraftSubject.trim() || meta.defaultSubject;
    const body = contactDraftBody.trim();
    return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;
  }

  function renderContactPage(slideMeta) {
    const isId = lang === "id";
    const meta = contactMeta[lang];
    const sendIcon =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 3 10.5 13.5"/><path d="M21 3 14.2 21l-3.7-7.5L3 9.8 21 3Z"/></svg>';
    const copyIcon =
      '<svg class="icon-copy" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
    const checkIcon =
      '<svg class="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5 9.5 17 19 7.5"/></svg>';
    const trashIcon =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4a1.5 1.5 0 0 1 1.5-1.5h5A1.5 1.5 0 0 1 16 4v2"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6M14 11v6"/></svg>';
    const github =
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.5-.29-5.13-1.25-5.13-5.57 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.13-1.45 3.07-1.15 3.07-1.15.62 1.55.23 2.69.12 2.98.72.79 1.15 1.79 1.15 3.02 0 4.33-2.63 5.28-5.14 5.56.4.35.76 1.04.76 2.09v3.09c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z"/></svg>';
    const linkedin =
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5V9h3ZM6.5 7.5A1.75 1.75 0 1 1 6.5 4a1.75 1.75 0 0 1 0 3.5ZM19 19h-3v-5c0-1.2-.4-2-1.5-2S13 12.8 13 14v5h-3V9h3v1.4c.5-.9 1.4-1.6 2.8-1.6 2.3 0 3.2 1.5 3.2 4.2Z"/></svg>';
    const hasDraft = Boolean(contactDraftSubject || contactDraftBody);

    return `<div class="contact-shell">
      <div class="contact-overview">
        <p class="eyebrow contact-eyebrow">${slideMeta[0]}</p>
        <h1 class="contact-title">
          <span class="sr-only">${slideMeta[1]}</span>
          <span aria-hidden="true" class="contact-title-lines">
            <span class="contact-title-muted">${meta.titleMuted}</span>
            <span class="contact-title-ink">${meta.titleFocus} <span class="contact-emoji-wrap"><span class="contact-emoji-reserve" aria-hidden="true"><span class="contact-emoji-char">${contactEmojis[0]}</span><span class="contact-emoji-caret"></span></span><span class="contact-emoji-track"><span class="contact-emoji-char">${contactEmojis[contactEmojiIndex]}</span><span class="contact-emoji-caret"></span></span></span></span>
          </span>
        </h1>
        <p class="contact-lead">${slideMeta[2]}</p>
        <div class="contact-availability">
          <p class="contact-avail-note">${slideMeta[3]}</p>
          <dl class="contact-meta-grid">
            ${(meta.metaSpecs || [])
              .map(
                (item) => `<div class="contact-meta-item">
                  <dt>${item.label}</dt>
                  <dd>${item.live ? '<span class="contact-avail-dot" aria-hidden="true"></span>' : ""}<span>${item.value}</span></dd>
                </div>`,
              )
              .join("")}
          </dl>
          <div class="contact-profiles">
            <span class="contact-profiles-label">${meta.profilesLabel}</span>
            <div class="contact-profile-links">
              <a class="contact-profile-link" href="${siteConfig.social.github}" target="_blank" rel="noopener noreferrer">
                ${github}
                <span>GitHub</span>
                <span class="contact-profile-arrow" aria-hidden="true">&#8599;</span>
              </a>
              <a class="contact-profile-link" href="${siteConfig.social.linkedin}" target="_blank" rel="noopener noreferrer">
                ${linkedin}
                <span>LinkedIn</span>
                <span class="contact-profile-arrow" aria-hidden="true">&#8599;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="contact-workspace">
        <div class="contact-compose-window">
          <div class="compose-header">
            <div class="compose-header-left">
              <span class="compose-header-dot" aria-hidden="true"></span>
              <span class="compose-header-title">${meta.windowTitle}</span>
            </div>
            <div class="compose-header-actions" aria-hidden="true">
              <span class="compose-win-btn is-min"><span></span></span>
              <span class="compose-win-btn is-exp">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M7.5 1.5h3v3M4.5 10.5h-3v-3M10.5 1.5 6.8 5.2M1.5 10.5l3.7-3.7"/></svg>
              </span>
              <span class="compose-win-btn is-close">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="m2.5 2.5 7 7m0-7-7 7"/></svg>
              </span>
            </div>
          </div>
          <div class="compose-row compose-to-row">
            <span class="compose-field-label">${meta.toLabel}</span>
            <a class="compose-recipient-chip" href="mailto:${siteConfig.email}">
              <span class="compose-avatar" aria-hidden="true">${siteConfig.name.charAt(0)}</span>
              <span class="compose-recipient-email">${siteConfig.email}</span>
            </a>
            <button type="button" class="copy-email" aria-label="${isId ? "Salin alamat email" : "Copy email address"}">
              ${copyIcon}
              ${checkIcon}
              <span class="copy-email-text">${meta.copyLabel}</span>
            </button>
          </div>
          <div class="compose-row compose-subject-row">
            <label class="sr-only" for="compose-subject">${meta.subjectPlaceholder}</label>
            <input id="compose-subject" type="text" class="compose-subject-input" placeholder="${escapeAttr(meta.subjectPlaceholder)}" value="${escapeAttr(contactDraftSubject)}" autocomplete="off" />
          </div>
          <div class="compose-body-wrap${contactDraftBody ? " is-filled" : ""}">
            <label class="sr-only" for="compose-body">${meta.bodyPlaceholder}</label>
            <textarea id="compose-body" class="compose-textarea" rows="5" placeholder="">${escapeHtml(contactDraftBody)}</textarea>
            <div class="compose-ghost" aria-hidden="true">
              <span class="compose-ghost-text"></span><span class="compose-ghost-caret"></span>
            </div>
          </div>
          <div class="compose-toolbar">
            <div class="compose-toolbar-left">
              <a class="contact-primary compose-send-btn" href="${buildMailtoHref()}">
                <span>${meta.ctaLabel}</span>
                ${sendIcon}
              </a>
              <span class="copy-feedback" role="status" aria-live="polite"></span>
            </div>
            <div class="compose-toolbar-right">
              <button type="button" class="compose-clear-btn" aria-label="${meta.clearLabel}" title="${meta.clearLabel}" ${!hasDraft ? "disabled" : ""}>
                ${trashIcon}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  function syncContactEmojiTyping(reset = false) {
    clearTimeout(contactEmojiTimer);
    const contactIndex = ids.indexOf("contact");
    const emojiEl = document.querySelector("#contact .contact-emoji-track .contact-emoji-char");
    if (!emojiEl) return;

    if (reset) {
      contactEmojiIndex = 0;
      contactEmojiPhase = "hold";
      emojiEl.textContent = contactEmojis[0];
    }

    if (heroMotion.matches || current !== contactIndex || document.hidden) {
      contactEmojiPhase = "hold";
      emojiEl.textContent = contactEmojis[contactEmojiIndex];
      return;
    }

    const delay =
      contactEmojiPhase === "hold"
        ? 1750
        : contactEmojiPhase === "erase"
          ? 360
          : 140;
    contactEmojiTimer = setTimeout(() => {
      if (current !== contactIndex || document.hidden) return;
      if (contactEmojiPhase === "hold") {
        contactEmojiPhase = "erase";
        emojiEl.textContent = "";
      } else if (contactEmojiPhase === "erase") {
        contactEmojiPhase = "type";
        contactEmojiIndex = (contactEmojiIndex + 1) % contactEmojis.length;
        emojiEl.textContent = contactEmojis[contactEmojiIndex];
      } else {
        contactEmojiPhase = "hold";
      }
      syncContactEmojiTyping();
    }, delay);
  }

  function syncContactGhostTyping(reset = false) {
    clearTimeout(contactGhostTimer);
    const contactIndex = ids.indexOf("contact");
    const ghostTextEl = document.querySelector("#contact .compose-ghost-text");
    const bodyWrap = document.querySelector("#contact .compose-body-wrap");
    if (!ghostTextEl || !bodyWrap) return;

    const phrases = contactMeta[lang].ghostPhrases || [];
    if (!phrases.length) return;
    if (reset) {
      contactGhostIndex = 0;
      contactGhostChars = 0;
      contactGhostPhase = "type";
    }

    const currentPhrase = phrases[contactGhostIndex % phrases.length];
    if (heroMotion.matches) {
      ghostTextEl.textContent = contactMeta[lang].bodyPlaceholder;
      return;
    }
    if (
      current !== contactIndex ||
      document.hidden ||
      contactDraftBody ||
      contactComposeFocused
    ) {
      return;
    }

    const delay =
      contactGhostPhase === "type"
        ? 36
        : contactGhostPhase === "hold"
          ? 2100
          : 18;
    contactGhostTimer = setTimeout(() => {
      if (
        current !== contactIndex ||
        document.hidden ||
        contactDraftBody ||
        contactComposeFocused
      ) {
        return;
      }
      if (contactGhostPhase === "type") {
        contactGhostChars++;
        ghostTextEl.textContent = currentPhrase.slice(0, contactGhostChars);
        if (contactGhostChars >= currentPhrase.length) {
          contactGhostPhase = "hold";
        }
      } else if (contactGhostPhase === "hold") {
        contactGhostPhase = "erase";
      } else {
        contactGhostChars = Math.max(0, contactGhostChars - 2);
        ghostTextEl.textContent = currentPhrase.slice(0, contactGhostChars);
        if (contactGhostChars === 0) {
          contactGhostIndex = (contactGhostIndex + 1) % phrases.length;
          contactGhostPhase = "type";
        }
      }
      syncContactGhostTyping();
    }, delay);
  }

  function syncContactAnimation(reset = false) {
    syncContactEmojiTyping(reset);
    syncContactGhostTyping(reset);
  }

  function syncComposeDom() {
    const section = document.querySelector("#contact");
    if (!section) return;
    const sendBtn = section.querySelector(".compose-send-btn");
    if (sendBtn) sendBtn.href = buildMailtoHref();
    const bodyWrap = section.querySelector(".compose-body-wrap");
    if (bodyWrap) bodyWrap.classList.toggle("is-filled", Boolean(contactDraftBody));
    const clearBtn = section.querySelector(".compose-clear-btn");
    if (clearBtn) {
      clearBtn.disabled = !contactDraftSubject && !contactDraftBody;
    }
  }

  document.addEventListener("input", (event) => {
    const subj = event.target.closest("#compose-subject");
    if (subj) {
      contactDraftSubject = subj.value;
      syncComposeDom();
      return;
    }
    const body = event.target.closest("#compose-body");
    if (body) {
      contactDraftBody = body.value;
      syncComposeDom();
      syncContactGhostTyping();
    }
  });
  document.addEventListener("focusin", (event) => {
    if (event.target.closest("#compose-body")) {
      contactComposeFocused = true;
      const bodyWrap = document.querySelector("#contact .compose-body-wrap");
      bodyWrap?.classList.add("is-focused");
      syncContactGhostTyping();
    }
  });
  document.addEventListener("focusout", (event) => {
    if (event.target.closest("#compose-body")) {
      contactComposeFocused = false;
      const bodyWrap = document.querySelector("#contact .compose-body-wrap");
      bodyWrap?.classList.remove("is-focused");
      syncContactGhostTyping();
    }
  });

  document.addEventListener("click", async (event) => {
    const clearBtn = event.target.closest(".compose-clear-btn");
    if (clearBtn) {
      contactDraftSubject = "";
      contactDraftBody = "";
      const subj = document.querySelector("#compose-subject");
      const body = document.querySelector("#compose-body");
      if (subj) subj.value = "";
      if (body) body.value = "";
      syncComposeDom();
      syncContactGhostTyping(true);
      return;
    }
    const copyBtn = event.target.closest(".copy-email");
    if (!copyBtn) return;
    const feedback = document.querySelector("#contact .copy-feedback");
    const btnText = copyBtn.querySelector(".copy-email-text");
    const meta = contactMeta[lang];
    clearTimeout(copyResetTimer);
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      copyBtn.classList.add("is-copied");
      if (btnText) btnText.textContent = meta.copiedLabel;
      if (feedback) {
        feedback.textContent =
          lang === "id" ? "Email disalin" : "Copied";
      }
      copyResetTimer = setTimeout(() => {
        copyBtn.classList.remove("is-copied");
        if (btnText) btnText.textContent = contactMeta[lang].copyLabel;
        if (feedback) feedback.textContent = "";
      }, 2200);
    } catch {
      if (feedback) {
        feedback.textContent =
          lang === "id"
            ? "Salin email dari kolom Kepada."
            : "Copy email from the To field.";
      }
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
      .map((s, i) => {
        if (ids[i] === "tech") {
          return `<section id="tech" aria-label="${c.nav[i]}">${renderTechPage(s)}</section>`;
        }
        if (ids[i] === "work") {
          return `<section id="work" aria-label="${c.nav[i]}">${renderWorkPage(s)}</section>`;
        }
        if (ids[i] === "contact") {
          return `<section id="contact" aria-label="${c.nav[i]}">${renderContactPage(s)}</section>`;
        }
        const body = s
          .slice(2)
          .map((t, j) =>
            i === 0 && j === 1
              ? `<a class="action" href="#services"><span>${t}</span><span class="action-arrow" aria-hidden="true">&rarr;</span></a>`
              : i === 1 && j === 0
                ? `<p class="philosophy-lead">${t}</p>`
                : t.includes("|")
                  ? `<div class="item"><h2>${t.split("|")[0]}</h2><p>${t.split("|")[1]}</p></div>`
                  : `<p>${t}</p>`,
          )
          .join("");
        return `<section id="${ids[i]}" aria-label="${c.nav[i]}"><div class="content"><p class="eyebrow">${s[0]}</p>${i === 0 ? renderHeroTitle() : i === 1 ? renderPhilosophyTitle() : `<h1>${s[1]}</h1>`}${body}</div>${i === 0 ? renderPortrait(lang) : i === 1 ? renderServices() : ""}</section>`;
      })
      .join("");
    document.querySelector("#hint").textContent = c.hint;
    document.querySelector("#footer-credit").textContent =
      lang === "id"
        ? "Pengalaman, kesederhanaan, dan keindahan."
        : "Experience, simplicity, and beauty.";
    document
      .querySelectorAll("[data-lang]")
      .forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === lang));
    syncHeroAnimation(true);
    syncPhilosophy(true);
    syncTechTitleAnimation(true);
    syncContactAnimation(true);
    update();
    void pages.offsetWidth;
    pages.classList.remove("is-translating");
  }
  // CAROUSEL STATE: offscreen panels are inert and hidden from assistive technology.
  function update() {
    syncHeroAnimation();
    syncPortraitBubble();
    syncPhilosophy();
    if (current !== ids.indexOf("services")) {
      closePhilosophyPopover();
    }
    syncTechTitleAnimation();
    syncContactAnimation();
    pages.scrollLeft = 0;
    pages.scrollTop = 0;
    [...pages.children].forEach((p, i) => {
      p.inert = i !== current;
      p.setAttribute("aria-hidden", i !== current);
      p.style.transform = `translateX(${(i - current) * 100}%)`;
    });
    const progress = ((current + 1) / ids.length) * 100;
    document.querySelector("#position").innerHTML =
      `<span class="pos-current">0${current + 1}</span><span class="pos-total"> / ${String(ids.length).padStart(2, "0")}</span><span class="pos-bar" aria-hidden="true"><span class="pos-fill" style="width:${progress}%"></span></span>`;
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
  let x, y, touchFromField = false;
  window.addEventListener(
    "touchstart",
    (e) => {
      touchFromField = Boolean(
        e.target.closest("input, textarea, [contenteditable]"),
      );
      x = e.changedTouches[0].clientX;
      y = e.changedTouches[0].clientY;
    },
    { passive: true },
  );
  window.addEventListener(
    "touchend",
    (e) => {
      if (locked || touchFromField) return;
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

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePhilosophyPopover();
      return;
    }
    if (e.target.closest("input, textarea, [contenteditable]")) return;
    if (
      (e.key === "ArrowRight" || e.key === "ArrowLeft") &&
      !e.altKey &&
      !e.ctrlKey &&
      !e.metaKey &&
      !locked
    ) {
      e.preventDefault();
      go(current + (e.key === "ArrowRight" ? 1 : -1));
    }
  });

  document.addEventListener("click", (event) => {
    const techWord = event.target.closest("[data-tech-word]");
    if (techWord) {
      activeTechDevice = techWord.dataset.techWord;
      techTitleTarget = activeTechDevice;
      updateTechDom();
      positionTechPointer(activeTechDevice, true);
      if (!heroMotion.matches) {
        techTitlePhase = "click";
        applyTechTitlePhase();
        techManualHoldUntil = Date.now() + 5500;
        clearTimeout(techTitleTimer);
        techTitleTimer = setTimeout(() => {
          techTitlePhase = "settle";
          syncTechTitleAnimation();
        }, 190);
      }
      return;
    }
  });

  document.addEventListener("visibilitychange", () => syncPortraitBubble());
  mobileBubbleQuery.addEventListener("change", () => syncPortraitBubble());
  document.addEventListener("pointerover", (event) => {
    if (event.pointerType === "touch" || mobileBubbleQuery.matches) return;
    const frame = event.target.closest(".portrait-frame");
    if (frame && !frame.contains(event.relatedTarget)) {
      startBubbleTyping(frame);
    }
  });
  document.addEventListener("pointermove", (event) => {
    if (heroMotion.matches || event.pointerType === "touch") return;
    const frame = event.target.closest(".portrait-frame");
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const py = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    frame.style.setProperty("--px", px.toFixed(3));
    frame.style.setProperty("--py", py.toFixed(3));
  });
  document.addEventListener("pointerout", (event) => {
    if (event.pointerType === "touch" || mobileBubbleQuery.matches) return;
    const frame = event.target.closest(".portrait-frame");
    if (frame && !frame.contains(event.relatedTarget)) {
      frame.style.setProperty("--px", "0");
      frame.style.setProperty("--py", "0");
      stopBubbleTyping(frame);
    }
  });
  document.addEventListener("click", (event) => {
    const frame = event.target.closest(".portrait-frame");
    if (!frame) return;
    if (
      mobileBubbleQuery.matches &&
      frame.classList.contains("is-speaking") &&
      !frame.querySelector(".bubble-typed.is-typing")
    ) {
      stopBubbleTyping(frame);
    } else {
      startBubbleTyping(frame);
    }
  });
})();
