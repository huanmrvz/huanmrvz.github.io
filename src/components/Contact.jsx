import { useReveal } from "../hooks/useReveal.js";
import { useLanguage } from "../context/LanguageContext.jsx";

const LINKS = [
  {
    key: "telegram",
    href: "https://t.me/huanmrvz",
    value: "@huanmrvz",
    external: true,
  },
  {
    key: "email",
    href: "mailto:regenson98@gmail.com",
    value: "regenson98@gmail.com",
    external: false,
  },
  {
    key: "instagram",
    href: "https://instagram.com/huanmrvz",
    value: "@huanmrvz",
    external: true,
  },
];

export function Contact() {
  const { t } = useLanguage();
  const rootRef = useReveal("[data-reveal]");

  return (
    <section
      id="contact"
      className="section contact"
      aria-labelledby="contact-title"
      ref={rootRef}
    >
      <div className="contact-layout">
        <p className="contact-float-lead" data-reveal>
          {t("contact.lead")}
        </p>

        <div className="contact-main">
          <h2 id="contact-title" className="visually-hidden">
            {t("contact.title")}
          </h2>
          <ul className="contact-huge">
            {LINKS.map((link) => (
              <li key={link.key} data-reveal>
                <a
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className="contact-huge-label">
                    {t(`contact.${link.key}`)}
                  </span>
                  <span className="contact-huge-value">{link.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
