/**
 * Jump to the top of the document without animating.
 *
 * globals.css sets `html { scroll-behavior: smooth }` for in-page anchor links.
 * A scroll issued with the default behavior ("auto") resolves to that computed
 * value, so `window.scrollTo({ top: 0 })` *animates*. On a route change the
 * outgoing page unmounts mid-animation, the document shrinks, and the scroll is
 * interrupted wherever it happens to be — leaving the visitor part-way down the
 * new page.
 *
 * It only reproduced on some machines because the same stylesheet drops back to
 * `scroll-behavior: auto` under `prefers-reduced-motion: reduce`. Anyone with
 * that OS setting got an instant scroll and never saw the bug.
 *
 * "instant" ignores scroll-behavior entirely, which is exactly what a route
 * change wants. Overriding the property inline does *not* work: the scroll is
 * committed after the style is restored, so `smooth` wins anyway.
 */
export function scrollToTopInstant() {
  try {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  } catch {
    // Browsers predating the "instant" enum reject the dictionary outright.
    window.scrollTo(0, 0);
  }
}
