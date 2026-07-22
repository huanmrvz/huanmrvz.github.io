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
    "works.watch": "Смотреть",
    "about.title": "О себе",
    "about.leadHtml":
      'Монтаж — это не склейка. Это <span class="accent">темп</span>, <span class="accent">удар</span> и <span class="accent">пауза</span>.',
    "about.textHtml":
      'Собираю <span class="accent">дайджесты</span>, YouTube и короткие ролики. Ищу <span class="accent">ритм</span>, который держит внимание, и <span class="accent">кадр</span>, который говорит сам.',
    "about.mark1": "ритм",
    "about.mark2": "кадр",
    "about.mark3": "история",
    "contact.title": "Связь",
    "contact.lead": "Напиши — обсудим проект.",
    "contact.telegram": "Telegram",
    "contact.email": "Email",
    "contact.instagram": "Instagram",
    "fab.telegram": "Написать",
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
    "works.watch": "Watch",
    "about.title": "About",
    "about.leadHtml":
      'Editing isn\'t glue. It\'s <span class="accent">pace</span>, <span class="accent">hit</span>, and <span class="accent">silence</span>.',
    "about.textHtml":
      'I cut <span class="accent">digests</span>, YouTube, and short-form. Looking for <span class="accent">rhythm</span> that holds attention and <span class="accent">frames</span> that speak for themselves.',
    "about.mark1": "rhythm",
    "about.mark2": "frame",
    "about.mark3": "story",
    "contact.title": "Contact",
    "contact.lead": "Write — let's talk about a project.",
    "contact.telegram": "Telegram",
    "contact.email": "Email",
    "contact.instagram": "Instagram",
    "fab.telegram": "Message",
    footer: "© huanmrvz",
    "lightbox.open": "Open original",
  },
};

export const STORAGE_KEY = "huanmrvz-lang";

export function getInitialLang() {
  if (typeof window === "undefined") return "ru";
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "ru" || saved === "en") return saved;
  return navigator.language?.toLowerCase().startsWith("ru") ? "ru" : "en";
}
