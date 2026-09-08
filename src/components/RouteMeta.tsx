import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { metaForPath } from "../data/seo";
import { siteConfig } from "../data/site";

/**
 * Keeps the document head in sync with the current route.
 *
 * The served HTML for each route already carries the correct tags — they're
 * baked in at build time by scripts/seo/generate-static-meta.mjs, which is
 * what non-JavaScript crawlers read. This component covers the other half:
 * client-side navigation, where no new document is ever fetched and the head
 * would otherwise keep the first-loaded page's title forever.
 *
 * It updates the existing tags in place rather than appending new ones, so
 * the head never ends up with duplicate descriptions or canonicals.
 */
function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(selector.startsWith("link") ? "link" : "meta");
    for (const [key, value] of Object.entries(attrs)) {
      if (key !== "content" && key !== "href") el.setAttribute(key, value);
    }
    document.head.appendChild(el);
  }
  if (attrs.content !== undefined) el.setAttribute("content", attrs.content);
  if (attrs.href !== undefined) el.setAttribute("href", attrs.href);
}

export function RouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const { title, description } = metaForPath(pathname);
    const canonical = `${siteConfig.url}${pathname === "/" ? "/" : pathname.replace(/\/+$/, "")}`;

    document.title = title;
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('link[rel="canonical"]', { rel: "canonical", href: canonical });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
  }, [pathname]);

  return null;
}
