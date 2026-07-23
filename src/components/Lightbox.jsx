import { useEffect, useId, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { isVerticalWork } from "../data/works.js";
import { preloadVideo } from "../lib/preloadVideo.js";

export function Lightbox({ active, onClose }) {
  const { t } = useLanguage();
  const open = Boolean(active);
  const hasVideo = open && Boolean(active.video);
  const vertical = open && isVerticalWork(active);
  const titleId = useId();
  const closeRef = useRef(null);
  const videoRef = useRef(null);
  const previouslyFocused = useRef(null);
  const [mediaReady, setMediaReady] = useState(false);

  useEffect(() => {
    if (!open) {
      setMediaReady(false);
      return undefined;
    }

    previouslyFocused.current = document.activeElement;
    document.body.style.overflow = "hidden";
    document.body.classList.add("lightbox-open");

    if (hasVideo && active.video) {
      preloadVideo(active.video);
    }

    const focusTimer = requestAnimationFrame(() => {
      if (hasVideo && videoRef.current) {
        const el = videoRef.current;
        const tryPlay = () => {
          el.play().catch(() => {});
        };
        if (el.readyState >= 3) {
          setMediaReady(true);
          el.currentTime = 0;
          tryPlay();
        } else {
          const onReady = () => {
            setMediaReady(true);
            el.currentTime = 0;
            tryPlay();
          };
          el.addEventListener("canplay", onReady, { once: true });
          tryPlay();
        }
        el.focus();
      } else {
        setMediaReady(true);
        closeRef.current?.focus();
      }
    });

    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const root = document.querySelector(".lightbox");
      if (!root) return;
      const focusables = [
        ...root.querySelectorAll(
          'button, [href], video, iframe, [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((el) => !el.hasAttribute("disabled"));
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(focusTimer);
      const el = videoRef.current;
      if (el) {
        el.pause();
        el.currentTime = 0;
      }
      document.body.style.overflow = "";
      document.body.classList.remove("lightbox-open");
      document.removeEventListener("keydown", onKey);
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose, hasVideo, active?.video]);

  if (!open) return null;

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <p id={titleId} className="visually-hidden">
        {active.title || t("lightbox.title")}
      </p>
      <button
        ref={closeRef}
        type="button"
        className="lightbox-close"
        aria-label={t("lightbox.close")}
        onClick={onClose}
      >
        &times;
      </button>
      <div
        className={`lightbox-inner${vertical ? " is-vertical" : ""}${hasVideo ? " has-native" : ""}`}
      >
        {hasVideo ? (
          <video
            key={active.video}
            ref={videoRef}
            className={`lightbox-video${mediaReady ? " is-ready" : ""}`}
            src={active.video}
            controls
            playsInline
            preload="auto"
            poster={active.poster || undefined}
            onCanPlay={() => setMediaReady(true)}
          />
        ) : (
          <iframe
            title={active.title || t("lightbox.title")}
            src={active.embed}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        {active.url ? (
          <a
            className="lightbox-external"
            href={active.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("lightbox.open")}
          </a>
        ) : null}
      </div>
    </div>
  );
}
