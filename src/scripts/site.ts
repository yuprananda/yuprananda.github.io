const track = document.querySelector<HTMLElement>('.carousel-track');
const slides = Array.from(document.querySelectorAll<HTMLElement>('.panel'));
const navItems = Array.from(document.querySelectorAll<HTMLButtonElement>('.panel-nav-item'));
const goToButtons = Array.from(document.querySelectorAll<HTMLElement>('[data-go-to]'));
const previousButton = document.querySelector<HTMLButtonElement>('.previous-button');
const nextButton = document.querySelector<HTMLButtonElement>('.next-button');
const progressFill = document.querySelector<HTMLElement>('.progress-fill');
const currentSlideLabel = document.querySelector<HTMLElement>('.current-slide');
const slideAnnouncement = document.querySelector<HTMLElement>('#slide-announcement');
const languageToggle = document.querySelector<HTMLButtonElement>('.language-toggle');
const languageCodes = Array.from(document.querySelectorAll<HTMLElement>('.language-code'));
const translatable = Array.from(document.querySelectorAll<HTMLElement>('[data-en][data-id]'));
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const slideCount = slides.length;
let activeIndex = 0;
let currentLanguage: 'en' | 'id' = 'en';
document.documentElement.classList.add('js-enabled');

const getSlideName = (slide: HTMLElement, language: 'en' | 'id') =>
  slide.dataset[language === 'en' ? 'slideLabelEn' : 'slideLabelId'] ?? '';

function setActiveSlide(index: number, announce = false) {
  const boundedIndex = Math.max(0, Math.min(index, slideCount - 1));
  activeIndex = boundedIndex;

  slides.forEach((slide, slideIndex) => {
    const isCurrent = slideIndex === activeIndex;
    slide.classList.toggle('is-active', isCurrent);
    slide.setAttribute('aria-label', `${slideIndex + 1} of ${slideCount}: ${getSlideName(slide, currentLanguage)}`);
  });

  navItems.forEach((item, itemIndex) => {
    const isCurrent = itemIndex === activeIndex;
    item.classList.toggle('is-current', isCurrent);
    if (isCurrent) item.setAttribute('aria-current', 'step');
    else item.removeAttribute('aria-current');
  });

  if (previousButton) previousButton.disabled = activeIndex === 0;
  if (nextButton) nextButton.disabled = activeIndex === slideCount - 1;
  if (progressFill) progressFill.style.width = `${((activeIndex + 1) / slideCount) * 100}%`;
  if (currentSlideLabel) currentSlideLabel.textContent = String(activeIndex + 1).padStart(2, '0');
  if (slideAnnouncement) slideAnnouncement.textContent = `Slide ${activeIndex + 1} of ${slideCount}: ${getSlideName(slides[activeIndex], currentLanguage)}`;

  if (announce && slideAnnouncement) {
    slideAnnouncement.textContent = '';
    requestAnimationFrame(() => {
      if (slideAnnouncement) slideAnnouncement.textContent = `Slide ${activeIndex + 1} of ${slideCount}: ${getSlideName(slides[activeIndex], currentLanguage)}`;
    });
  }
}

function goToSlide(index: number) {
  if (!track || index < 0 || index >= slideCount) return;
  track.scrollTo({
    left: slides[index].offsetLeft,
    behavior: reducedMotion.matches ? 'instant' : 'smooth',
  });
  setActiveSlide(index, true);
}

for (const button of goToButtons) {
  button.addEventListener('click', (event) => {
    if (button instanceof HTMLAnchorElement) event.preventDefault();
    const index = Number(button.dataset.goTo);
    if (Number.isInteger(index)) goToSlide(index);
  });
}

previousButton?.addEventListener('click', () => goToSlide(activeIndex - 1));
nextButton?.addEventListener('click', () => goToSlide(activeIndex + 1));

if (track && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    const mostVisible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (mostVisible) {
      const index = slides.indexOf(mostVisible.target as HTMLElement);
      if (index !== -1) setActiveSlide(index);
    }
  }, { root: track, threshold: [0.5, 0.7, 0.9] });

  slides.forEach((slide) => observer.observe(slide));
} else {
  track?.addEventListener('scroll', () => {
    if (!track) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    setActiveSlide(index);
  }, { passive: true });
}

track?.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.target instanceof HTMLElement && event.target !== track && event.target.closest('a, button, input, textarea, select, [contenteditable="true"]')) return;

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    goToSlide(activeIndex + 1);
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault();
    goToSlide(activeIndex - 1);
  }
});

track?.addEventListener('wheel', (event: WheelEvent) => {
  if (!track || Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
  const panel = slides[activeIndex];
  const panelCanScrollVertically = panel.scrollHeight > panel.clientHeight + 2;
  const atPanelTop = panel.scrollTop <= 0;
  const atPanelBottom = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 2;
  const scrollingPanel = panelCanScrollVertically && ((event.deltaY < 0 && !atPanelTop) || (event.deltaY > 0 && !atPanelBottom));
  if (scrollingPanel) return;

  event.preventDefault();
  track.scrollLeft += event.deltaY;
}, { passive: false });

function setLanguage(language: 'en' | 'id') {
  currentLanguage = language;
  document.documentElement.lang = language;

  for (const item of translatable) {
    item.textContent = item.dataset[language] ?? item.textContent;
  }

  for (const item of navItems) {
    item.setAttribute('aria-label', item.dataset[language === 'en' ? 'navEn' : 'navId'] ?? item.getAttribute('aria-label') ?? '');
  }

  for (const button of [previousButton, nextButton]) {
    if (button) button.setAttribute('aria-label', button.dataset[language === 'en' ? 'labelEn' : 'labelId'] ?? '');
  }

  for (const code of languageCodes) {
    code.classList.toggle('language-code-active', code.textContent?.toLowerCase() === language);
  }

  if (languageToggle) {
    languageToggle.setAttribute('aria-pressed', String(language === 'id'));
    languageToggle.setAttribute('aria-label', language === 'en' ? 'Switch language to Indonesian' : 'Ganti bahasa ke Inggris');
  }

  for (const element of [
    document.querySelector<HTMLElement>('.brand'),
    document.querySelector<HTMLElement>('.panel-nav'),
    document.querySelector<HTMLElement>('.carousel'),
  ]) {
    if (element) element.setAttribute('aria-label', element.dataset[language === 'en' ? 'labelEn' : 'labelId'] ?? '');
  }

  const title = language === 'en' ? 'Yu Prananda — Independent Software Engineer' : 'Yu Prananda — Software Engineer Independen';
  document.title = title;
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
  setActiveSlide(activeIndex);
}

languageToggle?.addEventListener('click', () => setLanguage(currentLanguage === 'en' ? 'id' : 'en'));

const identityArt = document.querySelector<HTMLElement>('.identity-art');
if (identityArt && window.matchMedia('(pointer: fine)').matches && !reducedMotion.matches) {
  identityArt.addEventListener('pointermove', (event: PointerEvent) => {
    const bounds = identityArt.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    identityArt.style.setProperty('--pointer-x', `${x * 10}px`);
    identityArt.style.setProperty('--pointer-y', `${y * 10}px`);
  });
  identityArt.addEventListener('pointerleave', () => {
    identityArt.style.setProperty('--pointer-x', '0px');
    identityArt.style.setProperty('--pointer-y', '0px');
  });
}

setActiveSlide(0);
