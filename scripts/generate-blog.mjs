/**
 * Skrypt konwertujący pliki MD z blog-source/ → src/content/blog.ts
 * Uruchomienie: node scripts/generate-blog.mjs
 */

import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const BLOG_SOURCE = join(import.meta.dirname, "..", "blog-source");
const OUTPUT = join(import.meta.dirname, "..", "src", "content", "blog.ts");

const AUTHORS = [
  { name: "Karol Kulis", role: "Założyciel VoiceLink", avatar: "/images/karol.webp" },
  { name: "Jan Kulis", role: "Dyrektor sprzedaży", avatar: "/images/jan.webp" },
];

const CATEGORY_COVER_MAP = {
  "AI w medycynie": "/images/blog/ai-w-medycynie.jpg",
  "Poradniki": "/images/blog/poradniki.jpg",
  "Porównania": "/images/blog/porownania.jpg",
  "Specjalizacje": "/images/blog/case-study.jpg",
  "Technologia": "/images/blog/technologia.jpg",
  "Aktualności": "/images/blog/aktualnosci.jpg",
};

function normalizeCategory(raw) {
  if (!raw) return "AI w medycynie";
  const lower = raw.toLowerCase();

  if (lower.includes("aktualn") || lower.includes("prawn") || lower.includes("news"))
    return "Aktualności";
  if (lower.includes("porad") || lower.includes("guide") || lower.includes("analityk") || lower.includes("optymalizac") || lower.includes("praktyk") || lower.includes("implementac") || lower.includes("wdroż") || lower.includes("skalowa") || lower.includes("strateg"))
    return "Poradniki";
  if (lower.includes("porówn") || lower.includes("vs") || lower.includes("versus") || lower.includes("analiza komparatywna"))
    return "Porównania";
  if (lower.includes("case") || lower.includes("studi") || lower.includes("specjalizac") || lower.includes("branż"))
    return "Specjalizacje";
  if (lower.includes("technol") || lower.includes("nlp") || lower.includes("infra") || lower.includes("integrac") || lower.includes("api") || lower.includes("architektur") || lower.includes("bezpiecze") || lower.includes("cyber"))
    return "Technologia";
  if (lower.includes("ai") || lower.includes("medycy") || lower.includes("zdrow"))
    return "AI w medycynie";

  return "Poradniki";
}

function parseFrontmatter(content) {
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return { meta: {}, body: content };

  const fmStr = fmMatch[1];
  const body = content.slice(fmMatch[0].length).trim();
  const meta = {};

  for (const line of fmStr.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
    meta[key] = val;
  }

  // Parse secondary_keywords as array
  const kwMatch = fmStr.match(/secondary_keywords:\s*\[([\s\S]*?)\]/);
  if (kwMatch) {
    meta.secondary_keywords = kwMatch[1]
      .split(",")
      .map((s) => s.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }

  return { meta, body };
}

function mdToHtml(md) {
  let html = md;

  // Remove [METADATA FOR LLM] blocks
  html = html.replace(/\[METADATA FOR LLM\]:[\s\S]*?(?=\n---|\n##|\n\n)/g, "");

  // Horizontal rules
  html = html.replace(/^---$/gm, "");

  // Tables
  html = html.replace(
    /(\|[^\n]+\|\n)((?:\|[\s:|-]+\|\n))((?:\|[^\n]+\|\n?)+)/g,
    (match, headerRow, separator, bodyRows) => {
      const parseRow = (row) =>
        row
          .split("|")
          .slice(1, -1)
          .map((c) => c.trim());
      const headers = parseRow(headerRow);
      const rows = bodyRows.trim().split("\n").map(parseRow);

      let table = "<table><thead><tr>";
      for (const h of headers) table += `<th>${h}</th>`;
      table += "</tr></thead><tbody>";
      for (const row of rows) {
        table += "<tr>";
        for (const cell of row) table += `<td>${cell}</td>`;
        table += "</tr>";
      }
      table += "</tbody></table>";
      return table;
    }
  );

  // Headers
  html = html.replace(/^#### (.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  // Blockquotes
  html = html.replace(/^>\s*(.+)$/gm, "<blockquote><p>$1</p></blockquote>");
  html = html.replace(/<\/blockquote>\n<blockquote>/g, "\n");

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Links — convert MD links to text (no external linking)
  html = html.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  // Unordered lists
  html = html.replace(/((?:^[-*]\s+.+\n?)+)/gm, (match) => {
    const items = match
      .trim()
      .split("\n")
      .map((l) => `<li>${l.replace(/^[-*]\s+/, "")}</li>`)
      .join("\n");
    return `<ul>\n${items}\n</ul>`;
  });

  // Ordered lists
  html = html.replace(/((?:^\d+\.\s+.+\n?)+)/gm, (match) => {
    const items = match
      .trim()
      .split("\n")
      .map((l) => `<li>${l.replace(/^\d+\.\s+/, "")}</li>`)
      .join("\n");
    return `<ol>\n${items}\n</ol>`;
  });

  // Paragraphs: wrap lines that are not already HTML
  const lines = html.split("\n\n");
  html = lines
    .map((block) => {
      block = block.trim();
      if (!block) return "";
      if (
        block.startsWith("<h") ||
        block.startsWith("<ul") ||
        block.startsWith("<ol") ||
        block.startsWith("<table") ||
        block.startsWith("<blockquote") ||
        block.startsWith("<p") ||
        block.startsWith("<div")
      ) {
        return block;
      }
      return `<p>${block.replace(/\n/g, " ")}</p>`;
    })
    .filter(Boolean)
    .join("\n\n");

  // Clean up multiple blank lines
  html = html.replace(/\n{3,}/g, "\n\n").trim();

  return html;
}

function estimateReadTime(text) {
  const words = text.replace(/<[^>]+>/g, " ").split(/\s+/).length;
  return Math.max(3, Math.ceil(words / 200));
}

function extractExcerpt(body) {
  // Find the first substantial paragraph after frontmatter/metadata
  const clean = body
    .replace(/\[METADATA FOR LLM\]:[\s\S]*?(?=\n---|\n##|\n\n)/g, "")
    .replace(/^---$/gm, "")
    .trim();

  const paragraphs = clean.split("\n\n");
  for (const p of paragraphs) {
    const trimmed = p.trim();
    if (
      trimmed.length > 60 &&
      !trimmed.startsWith("#") &&
      !trimmed.startsWith("|") &&
      !trimmed.startsWith(">") &&
      !trimmed.startsWith("-") &&
      !trimmed.startsWith("[")
    ) {
      let excerpt = trimmed.replace(/\*\*/g, "").replace(/\*/g, "");
      if (excerpt.length > 200) excerpt = excerpt.slice(0, 197) + "...";
      return excerpt;
    }
  }
  return "Artykuł z bloga VoiceLink.";
}

function extractTags(meta, body) {
  const tags = new Set();
  if (meta.primary_keyword) tags.add(meta.primary_keyword);
  if (meta.secondary_keywords) {
    for (const kw of meta.secondary_keywords) {
      if (kw.length < 40) tags.add(kw);
    }
  }
  // Limit to 5 tags
  return Array.from(tags).slice(0, 5);
}

function escapeForTemplate(str) {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

// --- MAIN ---

const files = readdirSync(BLOG_SOURCE)
  .filter((f) => f.endsWith(".md"))
  .sort();

console.log(`Found ${files.length} markdown files`);

const posts = [];
let dateCounter = 0;

for (const file of files) {
  const raw = readFileSync(join(BLOG_SOURCE, file), "utf-8");
  const { meta, body } = parseFrontmatter(raw);

  const slug = meta.slug || file.replace(/\.md$/, "");
  const title = meta.title || meta.h1 || slug.replace(/-/g, " ");
  const metaDesc = meta.meta_description || extractExcerpt(body);
  const category = normalizeCategory(meta.category);
  const content = mdToHtml(body);
  const readTime = estimateReadTime(content);
  const excerpt = extractExcerpt(body);
  const tags = extractTags(meta, body);
  const keywords = meta.secondary_keywords || [meta.primary_keyword].filter(Boolean);

  // Generate dates spread across 2025-2026
  const baseDate = new Date("2025-06-01");
  baseDate.setDate(baseDate.getDate() + dateCounter * 3);
  const dateStr = baseDate.toISOString().split("T")[0];
  dateCounter++;

  const coverImage = CATEGORY_COVER_MAP[category] || "/images/blog/ai-w-medycynie.jpg";
  const author = AUTHORS[dateCounter % AUTHORS.length];

  posts.push({
    slug,
    title,
    excerpt,
    content,
    coverImage,
    date: dateStr,
    author,
    category,
    tags,
    readTime,
    keywords,
    metaTitle: (meta.h1 || title).slice(0, 65),
    metaDescription: metaDesc.slice(0, 160),
  });
}

console.log(`Processed ${posts.length} posts`);

// Generate TypeScript file
let ts = `import type { BlogPost, BlogCategory } from "@/types/content";

/* ──────────────────────────────────────────────────────────
 * KATEGORIE BLOGA
 * ────────────────────────────────────────────────────────── */

export const BLOG_CATEGORIES: {
  name: BlogCategory;
  color: string;
  bg: string;
  text: string;
}[] = [
  { name: "AI w medycynie", color: "blue", bg: "bg-blue-50", text: "text-blue-700" },
  { name: "Poradniki", color: "green", bg: "bg-emerald-50", text: "text-emerald-700" },
  { name: "Porównania", color: "purple", bg: "bg-violet-50", text: "text-violet-700" },
  { name: "Specjalizacje", color: "amber", bg: "bg-amber-50", text: "text-amber-700" },
  { name: "Technologia", color: "cyan", bg: "bg-cyan-50", text: "text-cyan-700" },
  { name: "Aktualności", color: "rose", bg: "bg-rose-50", text: "text-rose-700" },
];

export function getCategoryStyle(category: BlogCategory) {
  return BLOG_CATEGORIES.find((c) => c.name === category) ?? BLOG_CATEGORIES[0];
}

/* ──────────────────────────────────────────────────────────
 * POSTY BLOGOWE — wygenerowane automatycznie z plików MD
 * ────────────────────────────────────────────────────────── */

export const blogPosts: BlogPost[] = [\n`;

for (const post of posts) {
  ts += `  {
    slug: ${JSON.stringify(post.slug)},
    title: ${JSON.stringify(post.title)},
    excerpt: ${JSON.stringify(post.excerpt)},
    content: \`${escapeForTemplate(post.content)}\`,
    coverImage: ${JSON.stringify(post.coverImage)},
    date: ${JSON.stringify(post.date)},
    author: { name: ${JSON.stringify(post.author.name)}, role: ${JSON.stringify(post.author.role)}, avatar: ${JSON.stringify(post.author.avatar)} },
    category: ${JSON.stringify(post.category)} as BlogCategory,
    tags: ${JSON.stringify(post.tags)},
    readTime: ${post.readTime},
    keywords: ${JSON.stringify(post.keywords)},
    metaTitle: ${JSON.stringify(post.metaTitle)},
    metaDescription: ${JSON.stringify(post.metaDescription)},
  },\n`;
}

ts += `];

/* ──────────────────────────────────────────────────────────
 * HELPERY
 * ────────────────────────────────────────────────────────── */

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getFeaturedPost(): BlogPost | undefined {
  return blogPosts.find((p) => p.featured) ?? blogPosts[0];
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return blogPosts.filter((p) => p.category === category);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getBlogPostBySlug(currentSlug);
  if (!current) return blogPosts.slice(0, limit);

  const sameCat = blogPosts.filter(
    (p) => p.slug !== currentSlug && p.category === current.category
  );
  const rest = blogPosts.filter(
    (p) => p.slug !== currentSlug && p.category !== current.category
  );

  return [...sameCat, ...rest].slice(0, limit);
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  blogPosts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

export function getUsedCategories(): BlogCategory[] {
  const catSet = new Set<BlogCategory>();
  blogPosts.forEach((p) => catSet.add(p.category));
  return Array.from(catSet);
}
`;

writeFileSync(OUTPUT, ts, "utf-8");
console.log(`✅ Generated ${OUTPUT} with ${posts.length} blog posts`);
