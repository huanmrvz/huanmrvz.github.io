/**
 * Replace poster paths, titles, tags, and urls with your real work.
 * poster — image in /public/works/
 * url — YouTube / Vimeo / VK / direct link
 * embed — optional embed URL for lightbox (auto-derived for YouTube if omitted)
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
    id: "city-cut",
    title: { ru: "City Cut", en: "City Cut" },
    tag: { ru: "YouTube", en: "YouTube" },
    poster: "/works/city-cut.svg",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "afterglow",
    title: { ru: "Afterglow", en: "Afterglow" },
    tag: { ru: "Короткая форма", en: "Short-form" },
    poster: "/works/afterglow.svg",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
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
  } catch {
    /* ignore */
  }
  return null;
}
