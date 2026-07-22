export const translations = {
  ru: {
    logo: "huanmrvz",
    "nav.works": "Работы",
    "nav.about": "О себе",
    "nav.contact": "Связь",
    "hero.tagline": "Монтажёр · motion designer",
    "hero.cta": "Смотреть работы",
    "works.title": "Работы",
    "works.lead": "Избранные монтажи",
    "works.watch": "Смотреть",
    "about.title": "О себе",
    "about.line1a": "Работа - не",
    "about.line1b": "walk",
    "about.line2a": "волк",
    "about.line2b": "- это ходить",
    "about.mark1": "ритм",
    "about.mark2": "кадр",
    "about.mark3": "история",
    "about.proof":
      "Делаю видео, которые досматривают до конца.\nФорматы: дайджесты, YouTube, короткие ролики.\nСекретный ингредиент: **** * *** * ***\nБеру проекты. Пиши в Telegram — не пропадаю, отвечаю в тот же день.",
    "about.chip1": "DaVinci Resolve",
    "about.chip2": "Reels / TikTok / YouTube",
    "contact.title": "Связь",
    "contact.lead": "Напиши — обсудим проект.",
    "contact.telegram": "Telegram",
    "contact.email": "Email",
    "contact.instagram": "Instagram",
    "fab.telegram": "Написать",
    footer: "© huanmrvz",
    "lightbox.open": "Открыть оригинал",
    "lightbox.close": "Закрыть",
    "lightbox.title": "Просмотр работы",
  },
  en: {
    logo: "huanmrvz",
    "nav.works": "Works",
    "nav.about": "About",
    "nav.contact": "Contact",
    "hero.tagline": "Video editor · motion designer",
    "hero.cta": "View work",
    "works.title": "Works",
    "works.lead": "Selected edits",
    "works.watch": "Watch",
    "about.title": "About",
    "about.line1a": "Work - not",
    "about.line1b": "walk",
    "about.line2a": "волк",
    "about.line2b": "- means to walk",
    "about.mark1": "rhythm",
    "about.mark2": "frame",
    "about.mark3": "story",
    "about.proof":
      "I make videos people watch to the end.\nFormats: digests, YouTube, short-form.\nSecret ingredient: **** * *** * ***\nOpen for projects. Write on Telegram — I don't disappear, I reply the same day.",
    "about.chip1": "DaVinci Resolve",
    "about.chip2": "Reels / TikTok / YouTube",
    "contact.title": "Contact",
    "contact.lead": "Write — let's talk about a project.",
    "contact.telegram": "Telegram",
    "contact.email": "Email",
    "contact.instagram": "Instagram",
    "fab.telegram": "Message",
    footer: "© huanmrvz",
    "lightbox.open": "Open original",
    "lightbox.close": "Close",
    "lightbox.title": "Work preview",
  },
};

export const STORAGE_KEY = "huanmrvz-lang";

export function getInitialLang() {
  if (typeof window === "undefined") return "ru";
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "ru" || saved === "en") return saved;
  return navigator.language?.toLowerCase().startsWith("ru") ? "ru" : "en";
}
