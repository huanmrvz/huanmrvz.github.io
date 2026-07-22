import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext.jsx";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const { t, lang } = useLanguage();
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const marks = root.querySelectorAll(".about-float");
    const tweens = [...marks].map((el, i) =>
      gsap.to(el, {
        y: i % 2 === 0 ? -36 : 28,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }),
    );

    const lines = root.querySelectorAll("[data-about-line]");
    const reveals = [...lines].map((el) =>
      gsap.fromTo(
        el,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
          },
        },
      ),
    );

    return () => {
      [...tweens, ...reveals].forEach((tw) => {
        tw.scrollTrigger?.kill();
        tw.kill();
      });
    };
  }, [lang]);

  return (
    <section
      id="about"
      className="section about"
      aria-labelledby="about-title"
      ref={rootRef}
    >
      <p className="about-kicker" id="about-title">
        {t("about.title")}
      </p>

      <div className="about-stage">
        <span className="about-float about-float--a" aria-hidden="true">
          {t("about.mark1")}
        </span>
        <span className="about-float about-float--b" aria-hidden="true">
          {t("about.mark2")}
        </span>
        <span className="about-float about-float--c" aria-hidden="true">
          {t("about.mark3")}
        </span>

        <h2 className="about-statement">
          <span className="about-line" data-about-line>
            {t("about.line1a")} <em className="accent soft">{t("about.line1b")}</em>
          </span>
          <span className="about-line" data-about-line>
            <em className="accent">{t("about.line2a")}</em> {t("about.line2b")}
          </span>
        </h2>
      </div>

      <div className="about-proof" data-about-line>
        <p className="about-text">{t("about.proof")}</p>
        <ul className="about-chips">
          <li>{t("about.chip1")}</li>
          <li>{t("about.chip2")}</li>
        </ul>
      </div>
    </section>
  );
}
