import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { HeroAtmosphere } from "./HeroAtmosphere.jsx";

const FALLBACK_POSTERS = [
  "/works/glidex.png",
  "/works/cs2-digest.jpg",
  "/works/chasiki.png",
  "/works/burger-cut.png",
];

export function Hero() {
  const { t } = useLanguage();
  const videoRef = useRef(null);
  const [hasVideo, setHasVideo] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const onReady = () => {
      setHasVideo(true);
      video.play().catch(() => setHasVideo(false));
    };
    const onFail = () => setHasVideo(false);

    video.addEventListener("loadeddata", onReady);
    video.addEventListener("error", onFail);
    video.load();

    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("error", onFail);
    };
  }, []);

  return (
    <section className="hero" aria-labelledby="brand">
      <div className="hero-screen">
        <div className={`hero-showreel${hasVideo ? " has-video" : ""}`} aria-hidden="true">
          <video
            ref={videoRef}
            className="hero-showreel-video"
            muted
            loop
            playsInline
            preload="metadata"
            tabIndex={-1}
          >
            <source src="/showreel.webm" type="video/webm" />
            <source src="/showreel.mp4" type="video/mp4" />
          </video>
          {!hasVideo && (
            <div className="hero-showreel-fallback">
              {FALLBACK_POSTERS.map((src) => (
                <div
                  key={src}
                  className="hero-showreel-slide"
                  style={{ backgroundImage: `url('${src}')` }}
                />
              ))}
            </div>
          )}
          <div className="hero-showreel-dim" />
        </div>
        <div className="hero-bg" aria-hidden="true" />
        <HeroAtmosphere />
        <div className="hero-inner">
          <figure className="hero-portrait" aria-hidden="true">
            <span className="hero-portrait-shine" />
            <div className="hero-portrait-frame">
              <img
                src="/hero-portrait.png"
                alt=""
                width={640}
                height={640}
                decoding="async"
              />
            </div>
          </figure>
          <div className="hero-copy">
            <h1 id="brand" className="brand brand-shimmer">
              <span className="brand-mask">
                <span className="brand-line">huanmrvz</span>
              </span>
            </h1>
            <p className="hero-tagline">
              <span className="brand-mask">
                <span className="brand-line brand-line--tag">{t("hero.tagline")}</span>
              </span>
            </p>
            <a className="cta" href="#works" data-cursor="watch">
              <span className="cta-label">{t("hero.cta")}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
