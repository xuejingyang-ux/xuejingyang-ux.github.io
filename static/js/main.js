const CONFIG_PATH = "content/config.json";

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const inlineMarkdown = (value = "") =>
  escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');

const fallbackMarkdown = (markdown = "") => {
  const blocks = markdown.trim().split(/\n{2,}/);

  return blocks
    .map((block) => {
      const lines = block.split("\n");
      const firstLine = lines[0] || "";

      if (/^###\s+/.test(firstLine)) return `<h3>${inlineMarkdown(firstLine.replace(/^###\s+/, ""))}</h3>`;
      if (/^##\s+/.test(firstLine)) return `<h2>${inlineMarkdown(firstLine.replace(/^##\s+/, ""))}</h2>`;
      if (/^#\s+/.test(firstLine)) return `<h1>${inlineMarkdown(firstLine.replace(/^#\s+/, ""))}</h1>`;
      if (lines.every((line) => /^-\s+/.test(line))) {
        return `<ul>${lines.map((line) => `<li>${inlineMarkdown(line.replace(/^-\s+/, ""))}</li>`).join("")}</ul>`;
      }
      if (lines.every((line) => /^\d+\.\s+/.test(line))) {
        return `<ol>${lines.map((line) => `<li>${inlineMarkdown(line.replace(/^\d+\.\s+/, ""))}</li>`).join("")}</ol>`;
      }
      if (firstLine.startsWith("> ")) {
        return `<blockquote>${lines.map((line) => inlineMarkdown(line.replace(/^>\s?/, ""))).join("<br>")}</blockquote>`;
      }

      return `<p>${inlineMarkdown(lines.join(" "))}</p>`;
    })
    .join("\n");
};

const renderMarkdown = (markdown = "") => {
  if (window.marked?.parse) {
    window.marked.use({ mangle: false, headerIds: false });
    return window.marked.parse(markdown);
  }

  return fallbackMarkdown(markdown);
};

const fetchText = async (path) => {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Unable to load ${path}`);
  return response.text();
};

const splitMarkdownCards = (markdown = "") =>
  markdown
    .split(/^###\s+/m)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const [title = "", ...bodyLines] = chunk.split("\n");
      return {
        title: title.trim(),
        body: bodyLines.join("\n").trim(),
      };
    });

const renderProfile = (profile = {}) => {
  const affiliation = Array.isArray(profile.affiliation)
    ? profile.affiliation.join("<br>")
    : profile.affiliation || "";
  const links = (profile.links || [])
    .map((link) => `<a class="button ${link.style || "primary"}" href="${escapeHtml(link.url)}" target="${link.url?.startsWith("mailto:") ? "_self" : "_blank"}" rel="noreferrer">${escapeHtml(link.label)}</a>`)
    .join("");

  document.getElementById("profile").innerHTML = `
    <img class="avatar" src="${escapeHtml(profile.avatar || "static/assets/img/photo.png")}" alt="${escapeHtml(profile.name || "Profile")} profile photo">
    <h1>${escapeHtml(profile.name || "Your Name")}</h1>
    ${profile.nameLocal ? `<p class="name-cn">${escapeHtml(profile.nameLocal)}</p>` : ""}
    ${profile.role ? `<p class="role">${escapeHtml(profile.role)}</p>` : ""}
    ${affiliation ? `<p class="affiliation">${affiliation}</p>` : ""}
    <div class="profile-links" aria-label="Profile links">${links}</div>
  `;
};

const renderNav = (sections = []) => {
  document.getElementById("side-nav").innerHTML = sections
    .map((section, index) => `<a href="#${escapeHtml(section.id)}" class="${index === 0 ? "active" : ""}">${escapeHtml(section.title)}${section.subtitle ? ` / ${escapeHtml(section.subtitle)}` : ""}</a>`)
    .join("");
};

const sectionHeader = (section) => `
  <header class="section-header">
    <h2>${escapeHtml(section.title)}</h2>
    ${section.subtitle ? `<span>${escapeHtml(section.subtitle)}</span>` : ""}
  </header>
`;

const renderTimeline = (markdown) => {
  const items = markdown
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.replace(/^- /, ""))
    .map((line) => {
      const match = line.match(/^\*\*([^*]+)\*\*\s*\|\s*(.+)$/);
      return match ? { time: match[1], body: match[2] } : { time: "", body: line };
    });

  if (!items.length) return `<div class="card markdown">${renderMarkdown(markdown)}</div>`;

  return `<div class="timeline card">${items
    .map((item) => `<article><time>${escapeHtml(item.time)}</time><p>${renderMarkdown(item.body).replace(/^<p>|<\/p>\n?$/g, "")}</p></article>`)
    .join("")}</div>`;
};

const renderCardGrid = (markdown, className) => {
  const cards = splitMarkdownCards(markdown);
  if (!cards.length) return `<div class="card markdown">${renderMarkdown(markdown)}</div>`;

  return `<div class="grid">${cards
    .map((card) => `<article class="card ${className}"><h3>${escapeHtml(card.title)}</h3><div class="markdown">${renderMarkdown(card.body)}</div></article>`)
    .join("")}</div>`;
};

const renderProjectList = (markdown) => {
  const cards = splitMarkdownCards(markdown);
  if (!cards.length) return `<div class="card markdown">${renderMarkdown(markdown)}</div>`;

  return `<div class="project-list">${cards
    .map((card) => `<article class="card project-card"><h3>${escapeHtml(card.title)}</h3><div class="markdown">${renderMarkdown(card.body)}</div></article>`)
    .join("")}</div>`;
};

const renderPublicationList = (markdown) => {
  const cards = splitMarkdownCards(markdown);
  if (!cards.length) return `<div class="publication-list card markdown">${renderMarkdown(markdown)}</div>`;

  return `<div class="publication-list card">${cards
    .map((card) => `<article><h3>${escapeHtml(card.title)}</h3><div class="markdown">${renderMarkdown(card.body)}</div></article>`)
    .join("")}</div>`;
};

const renderSectionBody = (section, markdown) => {
  if (section.type === "timeline") return renderTimeline(markdown);
  if (section.type === "research") return renderCardGrid(markdown, "research-card");
  if (section.type === "projects") return renderProjectList(markdown);
  if (section.type === "publications") return renderPublicationList(markdown);
  if (section.type === "honors") return `<div class="honor-list card markdown">${renderMarkdown(markdown)}</div>`;
  if (section.type === "contact") return `<div class="contact-card card markdown">${renderMarkdown(markdown)}</div>`;
  return `<div class="card markdown content-card">${renderMarkdown(markdown)}</div>`;
};

const renderSections = async (config) => {
  const content = document.getElementById("content");
  const rendered = [];

  for (const section of config.sections || []) {
    const markdown = await fetchText(section.file);

    if (section.type === "hero") {
      rendered.push(`
        <section class="hero" id="${escapeHtml(section.id)}">
          <p class="eyebrow">${escapeHtml(config.hero?.eyebrow || "")}</p>
          <h2>${escapeHtml(config.hero?.title || "")}${config.hero?.titleLocal ? `<span>${escapeHtml(config.hero.titleLocal)}</span>` : ""}</h2>
          ${config.hero?.tagline ? `<p class="tagline">${escapeHtml(config.hero.tagline)}</p>` : ""}
          ${config.hero?.taglineLocal ? `<p class="tagline cn">${escapeHtml(config.hero.taglineLocal)}</p>` : ""}
          <div class="intro markdown">${renderMarkdown(markdown)}</div>
        </section>
      `);
    } else {
      rendered.push(`
        <section class="section" id="${escapeHtml(section.id)}">
          ${sectionHeader(section)}
          ${renderSectionBody(section, markdown)}
        </section>
      `);
    }
  }

  rendered.push(`<footer class="footer"><p>${escapeHtml(config.footer || "© {year} Your Name.").replace("{year}", new Date().getFullYear())}</p></footer>`);
  content.innerHTML = rendered.join("\n");
};

const activateNav = () => {
  const navLinks = Array.from(document.querySelectorAll(".side-nav a"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const scrollPosition = window.scrollY + 140;
  let currentId = sections[0]?.id;

  for (const section of sections) {
    if (section.offsetTop <= scrollPosition) currentId = section.id;
  }

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
};

const boot = async () => {
  try {
    const config = JSON.parse(await fetchText(CONFIG_PATH));
    document.title = config.site?.title || "Academic Homepage";
    document.documentElement.lang = config.site?.language || "en";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && config.site?.description) metaDescription.content = config.site.description;

    renderProfile(config.profile);
    renderNav(config.sections);
    await renderSections(config);
    activateNav();
    window.addEventListener("scroll", activateNav, { passive: true });
  } catch (error) {
    document.getElementById("content").innerHTML = `<div class="error card"><strong>Content loading failed.</strong><br>${escapeHtml(error.message)}</div>`;
  }
};

boot();
