/**
 * Replace poster paths, titles, tags, and urls with your real work.
 * poster — image in /public/works/ or external thumbnail URL
 * url — YouTube / Vimeo / TikTok / VK / direct link
 * embed — optional embed URL for lightbox (auto-derived for YT/Vimeo/TikTok if omitted)
 */
export const works = [
  {
    id: "cs2-digest",
    title: { ru: "CS2 Digest", en: "CS2 Digest" },
    tag: { ru: "Дайджест", en: "Digest" },
    poster: "https://img.youtube.com/vi/ViXlQpNwhg8/maxresdefault.jpg",
    url: "https://youtu.be/ViXlQpNwhg8",
  },
  {
    id: "chasiki",
    title: { ru: "Часики тикают", en: "Clock's Ticking" },
    tag: { ru: "Motion", en: "Motion" },
    poster: "/works/chasiki.png",
    url: "https://www.tiktok.com/@huanmrvz/video/7663483963192708373",
    vertical: true,
  },
  {
    id: "burger-cut",
    title: { ru: "Burger Cut", en: "Burger Cut" },
    tag: { ru: "Стиль", en: "Style" },
    poster: "/works/burger-cut.png",
    url: "https://www.tiktok.com/@huanmrvz/video/7661282048660868373",
  },
  {
    id: "brand-reel",
    title: { ru: "Brand Reel", en: "Brand Reel" },
    tag: { ru: "Реклама", en: "Commercial" },
    poster: "/works/brand-reel.svg",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
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
  } catch {
    /* ignore */
  }
  return null;
}

export function isVerticalEmbed(embedUrl) {
  return Boolean(embedUrl && embedUrl.includes("tiktok.com"));
}
