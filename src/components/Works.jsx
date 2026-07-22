import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { works, toEmbedUrl } from "../data/works.js";

export function Works({ onOpenWork }) {
  const { lang, t } = useLanguage();
  const [visible, setVisible] = useState(() => new Set());
  const itemRefs = useRef([]);

  useEffect(() => {
    const nodes = itemRefs.current.filter(Boolean);
    if (!nodes.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(new Set(works.map((_, i) => i)));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.dataset.index);
          setVisible((prev) => {
            const next = new Set(prev);
            next.add(index);
            return next;
          });
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  function handleClick(e, work) {
    const embed = work.embed || toEmbedUrl(work.url);
    if (!embed) return;
    e.preventDefault();
    onOpenWork({ embed, url: work.url });
  }

  return (
    <section id="works" className="section works" aria-labelledby="works-title">
      <div className="section-head">
        <h2 id="works-title">{t("works.title")}</h2>
        <p className="section-lead">{t("works.lead")}</p>
      </div>
      <div className="works-grid">
        {works.map((work, index) => {
          const title = work.title[lang] ?? work.title.en;
          const tag = work.tag[lang] ?? work.tag.en;
          const isVisible = visible.has(index);
          return (
            <a
              key={work.id}
              className={`work-item${work.vertical ? " work-item--vertical" : ""}${isVisible ? " is-visible" : ""}`}
              href={work.url}
              data-index={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              onClick={(e) => handleClick(e, work)}
              style={{ "--i": index }}
            >
              <div className="work-flip">
                <div className="work-face work-face--front">
                  <div
                    className="work-media"
                    style={{ backgroundImage: `url('${work.poster}')` }}
                  />
                  <div className="work-meta">
                    <span className="work-title">{title}</span>
                    <span className="work-tag">{tag}</span>
                  </div>
                </div>
                <div className="work-face work-face--back">
                  <span className="work-tag">{tag}</span>
                  <span className="work-title">{title}</span>
                  <span className="work-watch">{t("works.watch")}</span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
