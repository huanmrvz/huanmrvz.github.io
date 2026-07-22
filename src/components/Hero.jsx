import { useLanguage } from "../context/LanguageContext.jsx";
import { BorderBeam } from "./BorderBeam.jsx";
import { HeroAtmosphere } from "./HeroAtmosphere.jsx";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero" aria-labelledby="brand">
      <div className="hero-bg" aria-hidden="true" />
      <HeroAtmosphere />
      <div className="hero-inner">
        <figure className="hero-portrait" aria-hidden="true">
          <img
            src="/hero-portrait.png"
            alt=""
            width={640}
            height={640}
            decoding="async"
          />
        </figure>
        <div className="hero-copy">
          <h1 id="brand" className="brand brand-shimmer">
            huanmrvz
          </h1>
          <p className="hero-tagline">{t("hero.tagline")}</p>
          <a className="cta cta-beam" href="#works">
            <BorderBeam size={48} duration={6} />
            <span className="cta-label">{t("hero.cta")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
