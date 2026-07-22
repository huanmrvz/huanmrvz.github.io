import { useLanguage } from "../context/LanguageContext.jsx";

export function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="section-head">
        <h2 id="contact-title">{t("contact.title")}</h2>
        <p className="section-lead">{t("contact.lead")}</p>
      </div>
      <ul className="contact-list">
        <li>
          <a href="https://t.me/huanmrvz" target="_blank" rel="noopener noreferrer">
            <span className="contact-label">{t("contact.telegram")}</span>
            <span className="contact-value">@huanmrvz</span>
          </a>
        </li>
        <li>
          <a href="mailto:regenson98@gmail.com">
            <span className="contact-label">{t("contact.email")}</span>
            <span className="contact-value">regenson98@gmail.com</span>
          </a>
        </li>
        <li>
          <a
            href="https://instagram.com/huanmrvz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-label">{t("contact.instagram")}</span>
            <span className="contact-value">@huanmrvz</span>
          </a>
        </li>
      </ul>
    </section>
  );
}
