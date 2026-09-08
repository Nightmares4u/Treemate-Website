#!/usr/bin/env node
/**
 * Verifies the built output actually carries distinct per-route metadata.
 *
 * generate-static-meta.mjs failing silently would be invisible: the site would
 * still build, still deploy, still work — every page would just quietly go back
 * to sharing the homepage's title and description in search results, which is
 * the exact problem that script exists to solve. This check runs in CI after
 * the build so that regression can't ship unnoticed.
 *
 *   node scripts/seo/verify-route-meta.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..", "..");
const dist = join(root, "dist");

const { routeMeta } = await import(join(root, "src/data/seo.ts"));
const { blogPosts } = await import(join(root, "src/data/blog.ts"));

const paths = [
  ...Object.keys(routeMeta),
  ...blogPosts.map((post) => `/blog/${post.slug}`),
];

const problems = [];
const seenTitles = new Map();
const seenDescriptions = new Map();

for (const path of paths) {
  const file = path === "/" ? join(dist, "index.html") : join(dist, path, "index.html");
  if (!existsSync(file)) {
    problems.push(`${path}: no HTML file at ${file.replace(`${root}/`, "")}`);
    continue;
  }
  const html = readFileSync(file, "utf8");

  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  const description = html
    .match(/<meta[^>]*name="description"[^>]*>/i)?.[0]
    ?.match(/content="([^"]*)"/i)?.[1]
    ?.trim();
  const canonical = html
    .match(/<link[^>]*rel="canonical"[^>]*>/i)?.[0]
    ?.match(/href="([^"]*)"/i)?.[1];

  if (!title) problems.push(`${path}: no <title>`);
  if (!description) problems.push(`${path}: no meta description`);
  if (!canonical) problems.push(`${path}: no canonical link`);

  const expectedCanonical = path === "/" ? "/" : path;
  if (canonical && !canonical.endsWith(expectedCanonical)) {
    problems.push(`${path}: canonical points at ${canonical}`);
  }

  // Two routes sharing a title or description is the failure this whole
  // pipeline exists to prevent, so treat it as an error rather than a warning.
  if (title) {
    if (seenTitles.has(title)) {
      problems.push(`${path}: shares its <title> with ${seenTitles.get(title)} — "${title}"`);
    } else {
      seenTitles.set(title, path);
    }
  }
  if (description) {
    if (seenDescriptions.has(description)) {
      problems.push(`${path}: shares its description with ${seenDescriptions.get(description)}`);
    } else {
      seenDescriptions.set(description, path);
    }
  }
}

if (problems.length) {
  console.error(`Per-route metadata check failed on ${problems.length} route(s):\n`);
  for (const problem of problems) console.error(`  - ${problem}`);
  console.error("\nRun `npm run build` locally and check scripts/seo/generate-static-meta.mjs.");
  process.exit(1);
}

console.log(
  `Per-route metadata OK: ${paths.length} routes, each with a unique title and description.`,
);
