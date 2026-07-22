import { useRef } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { works, toEmbedUrl } from "../data/works.js";
import { useReveal } from "../hooks/useReveal.js";

function WorkCard({ work, lang, watchLabel, onOpenWork, index }) {
  const videoRef = useRef(null);
  const title = work.title[lang] ?? work.title.en;
  const tag = work.tag[lang] ?? work.tag.en;
  const meta = `${title} / ${work.year ?? ""}`.replace(/\s\/\s$/, "");
  const span = work.span ?? (work.vertical ? 4 : 6);

  function handleClick(e) {
    const embed = work.embed || toEmbedUrl(work.url);
    if (!embed) return;
    e.preventDefault();
    onOpenWork({ embed, url: work.url, title });
  }

  function playPreview() {
    const v = videoRef.current;
    if (!v || !work.preview) return;
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
    >
      <div
        className="work-media"
        style={{ backgroundImage: `url('${work.poster}')` }}
      >
        {work.preview ? (
          <video
            ref={videoRef}
            className="work-preview"
            muted
            loop
            playsInline
            preload="none"
            tabIndex={-1}
            src={work.preview}
          />
        ) : null}
      </div>
      <div className="work-overlay">
        <span className="work-meta-line">{meta}</span>
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
