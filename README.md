# Markdown Academic Homepage

A clean bilingual academic homepage template for GitHub Pages.

This project is a pure static, Markdown-driven academic homepage. It is designed for easy editing, direct deployment on GitHub Pages, and reuse as an open-source personal academic homepage template.

Markdown is rendered in the browser with Marked.js from CDN, with a lightweight built-in fallback for common Markdown syntax.

## Features

- Markdown-first content editing
- Bilingual section titles
- Fixed profile sidebar
- Responsive desktop/mobile layout
- Built-in section types for timeline, research cards, publications, projects, honors, and contact
- No build step required
- MIT licensed

## Customize

Edit these files:

```text
content/config.json              site title, profile, links, section order
content/about.md                 homepage introduction
content/news.md                  timeline entries
content/research.md              research cards
content/publications.md          publication list
content/projects.md              project cards
content/honors.md                honors and achievements
content/contact.md               contact information
static/css/main.css              visual design
static/assets/img/photo.png      profile photo
```

The section order and section type are controlled in `content/config.json`.

Supported section types:

```text
hero
timeline
research
publications
projects
honors
contact
plain
```

For card-like sections such as research, publications, and projects, each Markdown `### Heading` starts a new card.

For timeline sections, use this format:

```md
- **2026.05** | **[Publication]** Paper accepted by Conference 2026.
```

## Local Preview

Run a static server:

```bash
python -m http.server 8000 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:8000/
```

## Deploy

For a personal GitHub Pages site, create a repository named:

```text
<username>.github.io
```

Then push this project to the `main` branch and enable GitHub Pages from `Settings -> Pages -> Deploy from a branch -> main -> / (root)`.

## License

MIT License.
