import { useLanguage } from "../context/LanguageContext.jsx";

export function Header() {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="site-header">
      <a className="logo" href="#top">
        {t("logo")}
      </a>
      <nav className="nav" aria-label="Primary">
        <a href="#works">{t("nav.works")}</a>
        <a href="#about">{t("nav.about")}</a>
        <a href="#contact">{t("nav.contact")}</a>
      </nav>
      <div className="lang" role="group" aria-label="Language">
        <button
          type="button"
          className="lang-btn"
          aria-pressed={lang === "ru"}
          onClick={() => setLang("ru")}
        >
          RU
        </button>
        <span className="lang-sep" aria-hidden="true">
          |
        </span>
        <button
          type="button"
          className="lang-btn"
          aria-pressed={lang === "en"}
          onClick={() => setLang("en")}
        >
          EN
        </button>
      </div>
    </header>
  );
}
