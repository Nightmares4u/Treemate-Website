#!/usr/bin/env node
/**
 * Regenerates public/sitemap.xml from the site's known static routes plus
 * every blog post slug. Run this whenever a route is added/removed in
 * src/App.tsx or a post is added to src/data/blog.ts.
 *
 *   node scripts/generate-sitemap.mjs
 *
 * No dependencies — plain Node (>=18). Safe to run in CI before build.
 */
import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const SITE_URL = process.env.SITE_URL ?? "https://www.treemate.us";

// Static routes — keep this in sync with the <Route> list in src/App.tsx.
const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/software-ai", priority: "0.8", changefreq: "monthly" },
  { path: "/marketing", priority: "0.8", changefreq: "monthly" },
  { path: "/hr-solutions", priority: "0.8", changefreq: "monthly" },
  { path: "/customer-success", priority: "0.8", changefreq: "monthly" },
  { path: "/portfolio", priority: "0.7", changefreq: "monthly" },
  { path: "/about", priority: "0.6", changefreq: "monthly" },
  { path: "/careers", priority: "0.8", changefreq: "weekly" },
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
  { path: "/contact", priority: "0.6", changefreq: "monthly" },
];

// Pull blog slugs + dates straight out of the TS data file with a small
// regex rather than importing it, so this plain-Node script never needs a
// TypeScript loader.
function getBlogEntries() {
  const src = readFileSync(join(root, "src/data/blog.ts"), "utf8");
  const entries = [];
  const objRe = /slug:\s*"([^"]+)"[\s\S]*?date:\s*"([^"]+)"/g;
  let match;
  while ((match = objRe.exec(src))) {
    entries.push({ slug: match[1], date: match[2] });
  }
  return entries;
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    changefreq ? `    <changefreq>${changefreq}</changefreq>` : null,
    priority ? `    <priority>${priority}</priority>` : null,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

const today = new Date().toISOString().slice(0, 10);

const staticEntries = staticRoutes.map((r) =>
  urlEntry({
    loc: `${SITE_URL}${r.path}`,
    lastmod: today,
    changefreq: r.changefreq,
    priority: r.priority,
  }),
);

const blogEntries = getBlogEntries().map((post) =>
  urlEntry({
    loc: `${SITE_URL}/blog/${post.slug}`,
    lastmod: post.date,
    changefreq: "monthly",
    priority: "0.6",
  }),
);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticEntries, ...blogEntries].join("\n")}
</urlset>
`;

writeFileSync(join(root, "public/sitemap.xml"), xml);
console.log(
  `Wrote public/sitemap.xml with ${staticRoutes.length} static routes and ${blogEntries.length} blog posts.`,
);
