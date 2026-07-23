import { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { works, toEmbedUrl } from "../data/works.js";
import { useReveal } from "../hooks/useReveal.js";
import { preloadVideo, warmWorkVideos } from "../lib/preloadVideo.js";

function WorkCard({ work, lang, watchLabel, onOpenWork, index }) {
  const videoRef = useRef(null);
  const title = work.title[lang] ?? work.title.en;
  const tag = work.tag[lang] ?? work.tag.en;
  const span = work.span ?? (work.vertical ? 4 : 6);
  const hoverSrc = work.preview || work.video;
  const fullSrc = work.video || work.preview || null;

  function warmFull() {
    if (fullSrc) preloadVideo(fullSrc);
  }

  function handleClick(e) {
    const video = fullSrc;
    const embed = work.embed || toEmbedUrl(work.url);
    if (!video && !embed) return;
    e.preventDefault();
    if (video) preloadVideo(video);
    onOpenWork({
      video,
      embed: video ? null : embed,
      url: work.url,
      title,
      poster: work.poster,
      vertical: Boolean(work.vertical),
    });
  }

  function playPreview() {
    warmFull();
    const v = videoRef.current;
    if (!v || !hoverSrc) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  }

  function stopPreview() {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  }

  return (
    <a
      className={`work-item${work.vertical ? " work-item--vertical" : ""}`}
      href={work.url}
      data-reveal
      data-cursor="watch"
      data-span={span}
      style={{ "--i": index, "--span": span }}
      onClick={handleClick}
      onPointerEnter={playPreview}
      onPointerLeave={stopPreview}
      onFocus={warmFull}
      onPointerDown={warmFull}
    >
      <div
        className="work-media"
        style={{ backgroundImage: `url('${work.poster}')` }}
      >
        {hoverSrc ? (
          <video
            ref={videoRef}
            className="work-preview"
            muted
            loop
            playsInline
            preload="metadata"
            tabIndex={-1}
            src={hoverSrc}
          />
        ) : null}
      </div>
      <div className="work-overlay">
        <span className="work-meta-line">{title}</span>
        <span className="work-tag">{tag}</span>
      </div>
      <span className="work-play" aria-hidden="true">
        {watchLabel}
      </span>
    </a>
  );
}

export function Works({ onOpenWork }) {
  const { lang, t } = useLanguage();
  const rootRef = useReveal("[data-reveal]", [lang]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const urls = works.map((w) => w.video).filter(Boolean);
    let stopWarm = () => {};
    let started = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || started) return;
        started = true;
        stopWarm = warmWorkVideos(urls);
        io.disconnect();
      },
      { rootMargin: "200px 0px", threshold: 0.05 },
    );

    io.observe(root);
    return () => {
      io.disconnect();
      stopWarm();
    };
  }, [rootRef]);

  return (
    <section
      id="works"
      className="section works"
      aria-labelledby="works-title"
      ref={rootRef}
    >
      <div className="section-head" data-reveal>
        <h2 id="works-title">{t("works.title")}</h2>
        <p className="section-lead">{t("works.lead")}</p>
      </div>
      <div className="works-grid">
        {works.map((work, index) => (
          <WorkCard
            key={work.id}
            work={work}
            lang={lang}
            watchLabel={t("works.watch")}
            onOpenWork={onOpenWork}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
