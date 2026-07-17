export const translations = {
  ru: {
    logo: "huanmrvz",
    "nav.works": "Работы",
    "nav.about": "О себе",
    "nav.contact": "Связь",
    "hero.tagline": "Монтажёр · ритм, кадр, история",
    "hero.cta": "Смотреть работы",
    "works.title": "Работы",
    "works.lead": "Избранные монтажи — клипы, ролики, короткие формы.",
    "about.title": "О себе",
    "about.lead": "Монтаж — это не склейка. Это темп, удар и пауза.",
    "about.text":
      "Собираю дайджесты, YouTube и короткие ролики. Ищу ритм, который держит внимание, и кадр, который говорит сам.",
    "about.mark1": "ритм",
    "about.mark2": "кадр",
    "about.mark3": "история",
    "contact.title": "Связь",
    "contact.lead": "Напиши — обсудим проект.",
    "contact.telegram": "Telegram",
    "contact.email": "Email",
    "contact.instagram": "Instagram",
    footer: "© huanmrvz",
    "lightbox.open": "Открыть оригинал",
  },
  en: {
    logo: "huanmrvz",
    "nav.works": "Works",
    "nav.about": "About",
    "nav.contact": "Contact",
    "hero.tagline": "Video editor · rhythm, frame, story",
    "hero.cta": "View work",
    "works.title": "Works",
    "works.lead": "Selected edits — music videos, YouTube, short-form.",
    "about.title": "About",
    "about.lead": "Editing isn't glue. It's pace, hit, and silence.",
    "about.text":
      "I cut digests, YouTube, and short-form. Looking for rhythm that holds attention and frames that speak for themselves.",
    "about.mark1": "rhythm",
    "about.mark2": "frame",
    "about.mark3": "story",
    "contact.title": "Contact",
    "contact.lead": "Write — let's talk about a project.",
    "contact.telegram": "Telegram",
    "contact.email": "Email",
    "contact.instagram": "Instagram",
    footer: "© huanmrvz",
    "lightbox.open": "Open original",
  },
};

export const STORAGE_KEY = "huanmrvz-lang";

export function getInitialLang() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "ru" || saved === "en") return saved;
  return navigator.language?.toLowerCase().startsWith("ru") ? "ru" : "en";
}

export function applyTranslations(lang) {
  const dict = translations[lang] ?? translations.ru;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && dict[key] != null) {
      el.textContent = dict[key];
    }
  });
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
  });
}
