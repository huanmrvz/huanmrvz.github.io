import { useLanguage } from "../context/LanguageContext.jsx";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <p>{t("footer")}</p>
    </footer>
  );
}
