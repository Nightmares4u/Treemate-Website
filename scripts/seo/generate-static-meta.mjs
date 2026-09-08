#!/usr/bin/env node
/**
 * Post-build step: bakes per-route <title>, meta description, canonical, and
 * social-card tags into real static HTML files, one per route.
 *
 * Why this exists: the site is a client-side SPA with a single index.html, so
 * every URL is served with the same <head>. Googlebot executes JavaScript and
 * would eventually see the tags that RouteMeta.tsx sets at runtime, but Bing,
 * LinkedIn, Facebook, Slack, and every other non-rendering crawler read only
 * the HTML that came off the wire. Those crawlers currently see the homepage's
 * title and description on all 13 URLs, which is also why every blog post
 * shares one search-result snippet.
 *
 * How it works: reads the built dist/index.html, swaps the route-specific tags
 * for each known route, and writes dist/<route>/index.html. Vercel serves those
 * files directly (the filesystem is checked before the SPA catch-all rewrite in
 * vercel.json), and React takes over on load exactly as before. If this script
 * doesn't run, nothing breaks — every route just falls back to the shared
 * index.html, which is the pre-existing behaviour.
 *
 * Metadata comes from src/data/seo.ts and src/data/blog.ts, imported directly
 * under Node's native TypeScript stripping (Node >= 24). No dependencies.
 *
 *   node scripts/seo/generate-static-meta.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..", "..");
const dist = join(root, "dist");

// Imported straight from the TypeScript sources so the metadata has exactly
// one definition. This relies on Node's built-in type stripping, on by default
// since Node 22.18 — hence the `engines.node` floor in package.json.
let routeMeta, metaForPath, blogPosts, siteConfig;
try {
  ({ routeMeta, metaForPath } = await import(join(root, "src/data/seo.ts")));
  ({ blogPosts } = await import(join(root, "src/data/blog.ts")));
  ({ siteConfig } = await import(join(root, "src/data/site.ts")));
} catch (err) {
  console.error(
    [
      `generate-static-meta: could not load the metadata sources (Node ${process.version}).`,
      "",
      "This step imports src/data/*.ts directly, which needs Node >= 22.18 (type",
      "stripping is on by default there). If this failed on a build machine,",
      "check that its Node version matches the `engines.node` field in package.json.",
      "",
      String(err?.message ?? err),
    ].join("\n"),
  );
  process.exit(1);
}

const SITE_URL = (process.env.SITE_URL ?? siteConfig.url).replace(/\/$/, "");

/** Escapes text for safe use inside an HTML attribute or text node. */
function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Replaces the `content` (or `href`) value of a single tag matched by one of
 * its other attributes. Throws if the tag isn't in the template — a silent
 * no-op here would ship pages with the wrong metadata and look fine.
 */
function setAttr(html, { match, attr = "content", value }) {
  const tagRe = new RegExp(`(<(?:meta|link)\\b[^>]*${match}[^>]*>)`, "i");
  const found = html.match(tagRe);
  if (!found) {
    throw new Error(
      `generate-static-meta: no tag matching /${match}/ in dist/index.html — ` +
        "the tag was renamed or removed from index.html.",
    );
  }
  const attrRe = new RegExp(`${attr}="[^"]*"`, "i");
  const updated = found[1].replace(attrRe, `${attr}="${esc(value)}"`);
  return html.replace(tagRe, updated);
}

function renderRoute(template, { path, title, description, jsonLd }) {
  const canonical = `${SITE_URL}${path === "/" ? "/" : path}`;
  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`);
  html = setAttr(html, { match: 'name="description"', value: description });
  html = setAttr(html, { match: 'rel="canonical"', attr: "href", value: canonical });
  html = setAttr(html, { match: 'property="og:title"', value: title });
  html = setAttr(html, { match: 'property="og:description"', value: description });
  html = setAttr(html, { match: 'property="og:url"', value: canonical });
  html = setAttr(html, { match: 'name="twitter:title"', value: title });
  html = setAttr(html, { match: 'name="twitter:description"', value: description });

  if (jsonLd) {
    html = html.replace(
      "</head>",
      `  <script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n  </script>\n</head>`,
    );
  }
  return html;
}

function write(path, html) {
  const dir = path === "/" ? dist : join(dist, path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
}

/** Article structured data, so posts can qualify for richer search results. */
function blogPostingJsonLd(post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Treemate",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-treemate.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    image: `${SITE_URL}/og-image.jpg`,
    articleSection: post.category,
    keywords: post.seoKeywords.join(", "),
    wordCount: post.body.reduce(
      (n, block) =>
        n +
        (block.type === "list"
          ? block.items.join(" ").split(/\s+/).length
          : block.text.split(/\s+/).length),
      0,
    ),
  };
}

if (!existsSync(join(dist, "index.html"))) {
  console.error("generate-static-meta: dist/index.html not found — run `vite build` first.");
  process.exit(1);
}
const template = readFileSync(join(dist, "index.html"), "utf8");

const written = [];

for (const [path, meta] of Object.entries(routeMeta)) {
  // "/" is the template itself: dist/index.html already carries the homepage's
  // own title, canonical, and hand-written og:description. Re-rendering it here
  // would overwrite that copy with the generic site description.
  if (path === "/") continue;
  write(path, renderRoute(template, { path, ...meta }));
  written.push(path);
}

for (const post of blogPosts) {
  const path = `/blog/${post.slug}`;
  const { title, description } = metaForPath(path);
  write(path, renderRoute(template, { path, title, description, jsonLd: blogPostingJsonLd(post) }));
  written.push(path);
}

console.log(
  `Wrote per-route metadata for ${written.length} routes ` +
    `(${written.length - blogPosts.length} static + ${blogPosts.length} blog posts; ` +
    `"/" is dist/index.html itself and is left as built).`,
);
