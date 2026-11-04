const toggle = document.querySelector<HTMLButtonElement>('.language-toggle');
const languageCodes = document.querySelectorAll<HTMLElement>('.language-code');
const translatable = document.querySelectorAll<HTMLElement>('[data-en][data-id]');

function setLanguage(language: 'en' | 'id') {
  document.documentElement.lang = language;
  for (const item of translatable) {
    item.textContent = item.dataset[language] ?? item.textContent;
  }

  for (const code of languageCodes) {
    code.classList.toggle('language-code-active', code.textContent?.toLowerCase() === language);
  }

  if (toggle) {
    toggle.setAttribute('aria-pressed', String(language === 'id'));
    toggle.setAttribute('aria-label', language === 'en' ? 'Switch language to Indonesian' : 'Ganti bahasa ke Inggris');
  }
}

toggle?.addEventListener('click', () => {
  setLanguage(document.documentElement.lang === 'en' ? 'id' : 'en');
});
