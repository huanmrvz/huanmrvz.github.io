import { useLanguage } from "../context/LanguageContext.jsx";

export function FabTelegram() {
  const { t } = useLanguage();

  return (
    <a
      className="fab-telegram"
      href="https://t.me/huanmrvz"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg className="fab-telegram-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M21.5 3.4 2.8 10.6c-1.3.5-1.3 1.2-.2 1.5l4.8 1.5 1.8 5.6c.2.7.4 1 .9 1 .6 0 .8-.2 1.1-.5l2.7-2.6 5.6 4.1c1 .6 1.8.3 2-.9L23 4.7c.3-1.3-.5-1.9-1.5-1.3Z"
        />
      </svg>
      <span>{t("fab.telegram")}</span>
    </a>
  );
}
