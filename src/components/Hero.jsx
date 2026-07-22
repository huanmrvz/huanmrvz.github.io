import { useRef } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { BorderBeam } from "./BorderBeam.jsx";

export function Hero() {
  const { t } = useLanguage();
  const heroRef = useRef(null);

  function onMove(e) {
    const node = heroRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--sx", `${e.clientX - rect.left}px`);
    node.style.setProperty("--sy", `${e.clientY - rect.top}px`);
  }

  return (
    <section
      className="hero"
      aria-labelledby="brand"
      ref={heroRef}
      onMouseMove={onMove}
    >
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-spotlight" aria-hidden="true" />
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
