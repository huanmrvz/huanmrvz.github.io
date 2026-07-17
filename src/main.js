import "./styles/main.css";
import { applyTranslations, getInitialLang, STORAGE_KEY } from "./i18n.js";
import { works, toEmbedUrl } from "./data/works.js";

let currentLang = getInitialLang();

function renderWorks() {
  const grid = document.getElementById("works-grid");
  if (!grid) return;

  grid.innerHTML = works
    .map((work, index) => {
      const title = work.title[currentLang] ?? work.title.en;
      const tag = work.tag[currentLang] ?? work.tag.en;
      return `
        <a
          class="work-item"
          href="${work.url}"
          data-index="${index}"
          data-url="${work.url}"
          data-embed="${work.embed ?? ""}"
          style="--i: ${index}"
        >
          <div class="work-media" style="background-image: url('${work.poster}')"></div>
          <div class="work-meta">
            <span class="work-title">${title}</span>
            <span class="work-tag">${tag}</span>
          </div>
        </a>
      `;
    })
    .join("");

  observeWorks();
  bindWorkClicks();
}

function observeWorks() {
  const items = document.querySelectorAll(".work-item");
  if (!items.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
  );

  items.forEach((el) => io.observe(el));
}

function bindWorkClicks() {
  document.querySelectorAll(".work-item").forEach((el) => {
    el.addEventListener("click", (e) => {
      const url = el.dataset.url;
      const customEmbed = el.dataset.embed;
      const embed = customEmbed || toEmbedUrl(url);
      if (!embed) return;
      e.preventDefault();
      openLightbox(embed, url);
    });
  });
}

const lightbox = document.getElementById("lightbox");
const frame = document.getElementById("lightbox-frame");
const external = document.getElementById("lightbox-external");
const closeBtn = document.querySelector(".lightbox-close");

function openLightbox(embed, url) {
  if (!lightbox || !frame || !external) return;
  frame.src = embed;
  external.href = url;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox || !frame) return;
  lightbox.hidden = true;
  frame.src = "";
  document.body.style.overflow = "";
}

closeBtn?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem(STORAGE_KEY, lang);
  applyTranslations(lang);
  renderWorks();
}

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    if (lang === "ru" || lang === "en") setLang(lang);
  });
});

applyTranslations(currentLang);
renderWorks();
