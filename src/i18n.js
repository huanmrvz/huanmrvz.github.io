export const translations = {
  ru: {
    logo: "huanmrvz",
    "nav.works": "Работы",
    "nav.about": "О себе",
    "nav.contact": "Связь",
    "hero.tagline": "Монтажёр коротких видео · motion designer",
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
      "Монтирую короткие вертикальные видео для авторов, экспертов и брендов. Форматы: Instagram Reels, TikTok и YouTube Shorts.\n\nРаботаю с ритмом, историей, звуком, типографикой и motion graphics — от чистого динамичного монтажа до более сложной визуальной подачи.\n\nОткрыт к разовым проектам и долгосрочному сотрудничеству. Напиши в Telegram или на почту — обсудим задачу.",
    "about.chip1": "DaVinci Resolve",
    "about.chip2": "After Effects",
    "about.chip3": "Reels / TikTok / YouTube Shorts",
    "contact.title": "Связь",
    "contact.lead": "Есть проект? Давай обсудим.",
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
    "hero.tagline": "Short-form video editor · motion designer",
    "hero.cta": "View work",
    "works.title": "Selected work",
    "works.lead": "Editing · Motion · Short-form",
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
      "I edit short-form videos for creators, experts and brands — including Instagram Reels, TikTok and YouTube Shorts.\n\nMy work combines pacing, storytelling, sound design, typography and motion graphics — from clean, dynamic edits to more crafted visual treatments.\n\nAvailable for one-off projects and ongoing collaborations. Get in touch via Telegram or email to discuss your project.",
    "about.chip1": "DaVinci Resolve",
    "about.chip2": "After Effects",
    "about.chip3": "Reels / TikTok / YouTube Shorts",
    "contact.title": "Contact",
    "contact.lead": "Have a project? Let's talk.",
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
