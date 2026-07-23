/**
 * poster — image in /public/works/ or external URL
 * preview — optional muted loop for hover (desktop)
 * video — local mp4/webm for seamless lightbox (preferred over embed)
 * url — original platform link / YouTube
 * span — 12-col grid span on desktop
 */
export const works = [
  {
    id: "glidex",
    title: { ru: "Glidex", en: "Glidex" },
    tag: { ru: "Reel", en: "Reel" },
    poster: "/works/glidex.png",
    preview: "/works/glidex-prewiew.mp4",
    video: "/works/glidex.mp4",
    url: "https://www.instagram.com/reel/DbGSFgFhdCK/",
    vertical: true,
    span: 5,
  },
  {
    id: "chasiki",
    title: { ru: "Часики тикают", en: "Clock's Ticking" },
    tag: { ru: "Motion", en: "Motion" },
    poster: "/works/chasiki.png",
    preview: null,
    video: "/works/chasiki.mp4",
    url: "https://www.tiktok.com/@huanmrvz/video/7663483963192708373",
    vertical: true,
    span: 7,
  },
  {
    id: "burger-cut",
    title: { ru: "Burger Cut", en: "Burger Cut" },
    tag: { ru: "Стиль", en: "Style" },
    poster: "/works/burger-cut.png",
    preview: null,
    video: "/works/burger-cut.mp4",
    url: "https://www.tiktok.com/@huanmrvz/video/7661282048660868373",
    span: 8,
  },
  {
    id: "cs2-digest",
    title: { ru: "CS2 Digest", en: "CS2 Digest" },
    tag: { ru: "Дайджест", en: "Digest" },
    poster: "/works/cs2-digest.jpg",
    preview: null,
    video: null,
    url: "https://youtu.be/ViXlQpNwhg8",
    span: 4,
  },
];

export function toEmbedUrl(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (u.hostname === "youtu.be") {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
    if (u.hostname.includes("tiktok.com")) {
      const match = u.pathname.match(/\/video\/(\d+)/);
      if (match) return `https://www.tiktok.com/embed/v2/${match[1]}`;
    }
    if (u.hostname.includes("instagram.com")) {
      const match = u.pathname.match(/\/(reel|p|tv)\/([^/?]+)/);
      if (match) return `https://www.instagram.com/${match[1]}/${match[2]}/embed`;
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function isVerticalWork(workOrFlag) {
  if (typeof workOrFlag === "boolean") return workOrFlag;
  if (workOrFlag?.vertical) return true;
  const embed = workOrFlag?.embed;
  return Boolean(
    embed &&
      (embed.includes("tiktok.com") || embed.includes("instagram.com")),
  );
}
