import { useLanguage } from "../context/LanguageContext.jsx";

export function About() {
  const { t, tHtml } = useLanguage();

  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="about-copy">
        <h2 id="about-title">{t("about.title")}</h2>
        <p
          className="about-lead"
          dangerouslySetInnerHTML={{ __html: tHtml("about.leadHtml") }}
        />
        <p
          className="about-text"
          dangerouslySetInnerHTML={{ __html: tHtml("about.textHtml") }}
        />
        <ul className="about-marks">
          <li>{t("about.mark1")}</li>
          <li>{t("about.mark2")}</li>
          <li>{t("about.mark3")}</li>
        </ul>
      </div>
    </section>
  );
}
