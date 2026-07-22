import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";

/** Round cursor → watch label on [data-cursor="watch"]. Desktop fine-pointer only. */
export function CustomCursor() {
  const { lang } = useLanguage();
  const label = lang === "ru" ? "ТЫК" : "WATCH";
  const dotRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [watch, setWatch] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return undefined;

    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    document.documentElement.classList.add("has-custom-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const loop = () => {
      x += (tx - x) * 0.28;
      y += (ty - y) * 0.28;
      const el = dotRef.current;
      if (el) {
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const over = (e) => {
      const t = e.target.closest?.('[data-cursor="watch"]');
      setWatch(Boolean(t));
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      className={`cursor-dot${watch ? " is-watch" : ""}`}
      aria-hidden="true"
    >
      <span className="cursor-dot-label">{label}</span>
    </div>
  );
}
