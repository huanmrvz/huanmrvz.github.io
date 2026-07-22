# huanmrvz portfolio

Двуязычное (RU/EN) портфолио монтажёра. Стек: Vite + React. Хостинг: GitHub Pages.

## Локально

```bash
npm install
npm run dev
```

Сборка:

```bash
npm run build
npm run preview
```

## Деплой на GitHub Pages

1. Создай репозиторий `huanmrvz.github.io` (user site) и запушь этот проект в `main`.
2. В Settings → Pages выбери **GitHub Actions** как источник.
3. Workflow `.github/workflows/deploy.yml` соберёт и опубликует сайт после каждого push в `main`.

Если репозиторий не user site, а project page (`username.github.io/repo-name`), в `vite.config.js` поставь:

```js
base: "/repo-name/",
```

## Замена работ

Редактируй [`src/data/works.js`](src/data/works.js):

- `title` / `tag` — тексты RU и EN
- `poster` — картинка в `public/works/` (jpg/png/webp/svg)
- `url` — ссылка на YouTube / Vimeo / VK
- `embed` — опционально, свой embed URL (для YouTube подставится сам)

## Контакты и тексты

- Контакты — ссылки в [`index.html`](index.html) (секция `#contact`)
- Переводы — [`src/i18n.js`](src/i18n.js)
