/**
 * poster — image in /public/works/ or external URL
 * preview — optional muted loop .webm/.mp4 for hover (desktop)
 * url — YouTube / Vimeo / TikTok / Instagram / direct
 * span — 12-col grid span on desktop (asymmetric masonry)
 * year — shown in overlay meta
 */
export const works = [
  {
    id: "glidex",
    title: { ru: "Glidex", en: "Glidex" },
    tag: { ru: "Reel", en: "Reel" },
    year: 2025,
    poster: "/works/glidex.png",
    preview: "/works/glidex-prewiew.mp4",
    url: "https://www.instagram.com/reel/DbGSFgFhdCK/",
    vertical: true,
    span: 5,
  },
  {
    id: "cs2-digest",
    title: { ru: "CS2 Digest", en: "CS2 Digest" },
    tag: { ru: "Дайджест", en: "Digest" },
    year: 2025,
    poster: "/works/cs2-digest.jpg",
    preview: null,
    url: "https://youtu.be/ViXlQpNwhg8",
    span: 7,
  },
  {
    id: "chasiki",
    title: { ru: "Часики тикают", en: "Clock's Ticking" },
    tag: { ru: "Motion", en: "Motion" },
    year: 2025,
    poster: "/works/chasiki.png",
    preview: null,
    url: "https://www.tiktok.com/@huanmrvz/video/7663483963192708373",
    vertical: true,
    span: 4,
  },
  {
    id: "burger-cut",
    title: { ru: "Burger Cut", en: "Burger Cut" },
    tag: { ru: "Стиль", en: "Style" },
    year: 2025,
    poster: "/works/burger-cut.png",
    preview: null,
    url: "https://www.tiktok.com/@huanmrvz/video/7661282048660868373",
    span: 8,
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

export function isVerticalEmbed(embedUrl) {
  return Boolean(
    embedUrl &&
      (embedUrl.includes("tiktok.com") || embedUrl.includes("instagram.com")),
  );
}
