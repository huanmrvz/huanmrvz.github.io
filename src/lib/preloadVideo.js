const cache = new Map();

function connectionAllowsWarm() {
  if (typeof navigator === "undefined") return false;
  const c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (c?.saveData) return false;
  if (c?.effectiveType === "slow-2g" || c?.effectiveType === "2g") return false;
  return true;
}

/** Warm browser media cache so lightbox opens without waiting on the network. */
export function preloadVideo(src) {
  if (!src || typeof document === "undefined" || !connectionAllowsWarm()) {
    return null;
  }

  const existing = cache.get(src);
  if (existing) return existing;

  const el = document.createElement("video");
  el.preload = "auto";
  el.muted = true;
  el.playsInline = true;
  el.setAttribute("playsinline", "");
  el.src = src;
  el.load();

  const entry = { el, ready: false };
  const markReady = () => {
    entry.ready = true;
  };
  el.addEventListener("canplaythrough", markReady, { once: true });
  el.addEventListener("error", () => {
    cache.delete(src);
  }, { once: true });

  cache.set(src, entry);
  return entry;
}

export function warmWorkVideos(urls, { idle = true } = {}) {
  const list = [...new Set(urls.filter(Boolean))];
  if (!list.length || !connectionAllowsWarm()) return () => {};

  let cancelled = false;
  let index = 0;
  let idleId = 0;
  let timeoutId = 0;

  const step = () => {
    if (cancelled || index >= list.length) return;
    preloadVideo(list[index]);
    index += 1;
    if (index >= list.length) return;

    if (idle && typeof requestIdleCallback === "function") {
      idleId = requestIdleCallback(step, { timeout: 2500 });
    } else {
      timeoutId = window.setTimeout(step, 600);
    }
  };

  step();

  return () => {
    cancelled = true;
    if (idleId && typeof cancelIdleCallback === "function") {
      cancelIdleCallback(idleId);
    }
    if (timeoutId) clearTimeout(timeoutId);
  };
}
