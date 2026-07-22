import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { isVerticalEmbed } from "../data/works.js";

export function Lightbox({ active, onClose }) {
  const { t } = useLanguage();
  const open = Boolean(active);
  const vertical = open && isVerticalEmbed(active.embed);

  useEffect(() => {
    if (!open) return undefined;

    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="lightbox"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button type="button" className="lightbox-close" aria-label="Close" onClick={onClose}>
        &times;
      </button>
      <div className={`lightbox-inner${vertical ? " is-vertical" : ""}`}>
        <iframe
          title="Work preview"
          src={active.embed}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <a
          className="lightbox-external"
          href={active.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("lightbox.open")}
        </a>
      </div>
    </div>
  );
}
