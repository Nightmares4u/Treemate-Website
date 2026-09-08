/**
 * Per-route SEO metadata — the single source of truth for every route's
 * <title>, meta description, and social card copy.
 *
 * Two consumers read this file:
 *   1. `src/components/RouteMeta.tsx` — keeps the document head correct
 *      during client-side navigation.
 *   2. `scripts/seo/generate-static-meta.mjs` — a post-build step that bakes
 *      these values into a real static HTML file per route, so crawlers that
 *      don't execute JavaScript (Bing, LinkedIn, Facebook, Slack) see the
 *      right tags in the served HTML rather than the shared index.html one.
 *
 * Blog post metadata is derived from `src/data/blog.ts`, not duplicated here.
 *
 * Keep titles under ~60 characters and descriptions between 140-160 —
 * past that Google truncates them in results.
 */
// Imported with explicit .ts extensions (allowed by tsconfig's
// allowImportingTsExtensions) so that scripts/seo/generate-static-meta.mjs can
// import this module directly under Node's native TypeScript stripping.
import { getBlogPost } from "./blog.ts";
import { siteConfig } from "./site.ts";

export interface RouteMeta {
  /** The <title>. Include the brand — this is what shows in search results. */
  title: string;
  /** The meta description. Not a ranking factor directly, but drives CTR. */
  description: string;
}

/** The site-wide default, also used for the 404 route. */
export const defaultMeta: RouteMeta = {
  title: `${siteConfig.shortName} — ${siteConfig.tagline}`,
  description: siteConfig.description,
};

/**
 * Static routes, keyed by pathname exactly as it appears in src/App.tsx.
 * `/blog/:slug` is handled dynamically — see `metaForPath` below.
 */
export const routeMeta: Record<string, RouteMeta> = {
  "/": defaultMeta,
  "/software-ai": {
    title: "Custom Software & AI Development | Treemate",
    description:
      "Bespoke enterprise software — CRM, HRM, POS — full-stack applications, and deep AI integration, built by Treemate's engineering team for US businesses.",
  },
  "/marketing": {
    title: "Growth & Performance Marketing Services | Treemate",
    description:
      "Full-funnel performance marketing, technical SEO, brand strategy, and creative production, run end to end by a dedicated growth team.",
  },
  "/hr-solutions": {
    title: "HR Solutions & Cross-Border Hiring | Treemate",
    description:
      "Talent acquisition, cross-border US and Pakistani payroll, and dual-jurisdiction compliance — all run through the custom HRM we build for you.",
  },
  "/customer-success": {
    title: "Customer Support & Success Outsourcing | Treemate",
    description:
      "Tiered, omnichannel customer support run inside your own CRM, with human-in-the-loop AI and proactive retention built into every tier.",
  },
  "/portfolio": {
    title: "Portfolio — Software, AI & BPO Work | Treemate",
    description:
      "Selected Treemate engagements across custom software, AI, marketing, HR, and customer support for clients in North America and Australia.",
  },
  "/about": {
    title: "About Treemate — Software Consultancy & BPO",
    description:
      "Treemate is a hybrid software consultancy and business process outsourcer: Wyoming for contracting, Karachi for delivery. Meet the team behind the loop.",
  },
  "/careers": {
    title: "Careers at Treemate — Open Roles",
    description:
      "Open roles at Treemate across sales, software engineering, design, and social media, on both our international and domestic teams. Apply by email.",
  },
  "/blog": {
    title: "Blog — Software, AI, Outsourcing & Hiring | Treemate",
    description:
      "Practical writing from the Treemate team on custom software, AI, outsourcing, cross-border hiring, and running customer support that retains.",
  },
  "/contact": {
    title: "Contact Treemate — Talk to Our Team",
    description:
      "Talk to Treemate about custom software, marketing, HR, or customer support. Email us, call the US line, or book a call directly with the team.",
  },
};

/**
 * Resolves the metadata for any pathname, including `/blog/:slug` posts,
 * whose title/description come from the post itself. Unknown paths (the 404
 * route) fall back to the site default.
 */
export function metaForPath(pathname: string): RouteMeta {
  const path = pathname !== "/" ? pathname.replace(/\/+$/, "") : "/";
  const staticMatch = routeMeta[path];
  if (staticMatch) return staticMatch;

  const blogMatch = /^\/blog\/([^/]+)$/.exec(path);
  if (blogMatch) {
    const post = getBlogPost(blogMatch[1]);
    if (post) {
      return {
        title: `${post.title} | Treemate`,
        description: post.excerpt,
      };
    }
  }
  return defaultMeta;
}
