import { Megaphone, TrendingUp, SearchCheck, Palette, ShoppingBag, Compass } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { HeroAside } from "./HeroAside";
import { rowSlide, rowRise } from "./asideMotion";
import { fadeOnly, easeOutExpo } from "../../lib/motion";

/**
 * Growth & Marketing — full-funnel growth metrics & channels widget.
 * Hovering a channel expands its progress bar and highlights campaign performance.
 */
const channels = [
  { name: "Performance Ads", detail: "Google, Meta & LinkedIn", metric: "4.2x ROAS", depth: 0.95 },
  { name: "Creative Studio", detail: "Graphic Design & Video", metric: "High-Conv.", depth: 0.82 },
  { name: "SEO & Content", detail: "Technical & Programmatic", metric: "Top 3 Ranks", depth: 0.70 },
  { name: "Ecommerce & CRO", detail: "Storefront UX & Cart", metric: "+38% Conv.", depth: 0.60 },
];

const icons = [
  { icon: TrendingUp, name: "Paid Ads" },
  { icon: SearchCheck, name: "SEO" },
  { icon: Palette, name: "Design" },
  { icon: Compass, name: "Strategy" },
  { icon: ShoppingBag, name: "Ecommerce" },
];

const bar = (depth: number): Variants => ({
  hidden: { scaleX: 0 },
  visible: {
    scaleX: depth,
    transition: { duration: 0.8, ease: easeOutExpo, delay: 0.2 },
  },
  hover: {
    scaleX: 1,
    transition: { duration: 0.45, ease: easeOutExpo },
  },
});

export function MarketingAside() {
  const reduced = useReducedMotion();

  return (
    <HeroAside
      label="The Growth Engine"
      meta="Full-Funnel"
      footer="Data-driven creative, performance media & SEO scale."
      footerIcon={Megaphone}
    >
      <ul className="flex flex-col gap-3.5">
        {channels.map((ch) => (
          <motion.li
            key={ch.name}
            variants={reduced ? fadeOnly : rowSlide}
            whileHover={reduced ? undefined : "hover"}
            className="group/row flex cursor-default flex-col gap-1.5"
          >
            <span className="flex items-baseline justify-between gap-3">
              <span className="font-heading text-sm font-bold text-navy transition-colors duration-300 group-hover/row:text-teal">
                {ch.name}
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[11px] text-navy/45 transition-colors duration-300 group-hover/row:text-navy/70">
                  {ch.detail}
                </span>
                <span className="font-mono text-[11px] font-bold text-teal bg-teal/10 px-1.5 py-0.5 rounded">
                  {ch.metric}
                </span>
              </span>
            </span>
            <span className="relative h-px w-full bg-navy/10">
              <motion.span
                variants={reduced ? fadeOnly : bar(ch.depth)}
                style={{ originX: 0 }}
                className="absolute inset-0 origin-left bg-teal opacity-50 transition-opacity duration-300 group-hover/row:opacity-100 group-hover/row:shadow-[0_0_8px_1px_rgba(13,148,136,0.4)]"
              />
            </span>
          </motion.li>
        ))}
      </ul>

      <motion.div
        variants={reduced ? fadeOnly : rowRise}
        className="mt-4 flex items-center gap-2 border-t border-navy/10 pt-4"
      >
        {icons.map(({ icon: Icon, name }) => (
          <span
            key={name}
            title={name}
            className="group/ch grid h-8 flex-1 cursor-default place-items-center rounded-md ring-1 ring-navy/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal/10 hover:ring-teal/40"
          >
            <Icon
              className="h-4 w-4 text-navy/35 transition-colors duration-300 group-hover/ch:text-teal"
              strokeWidth={1.9}
            />
          </span>
        ))}
      </motion.div>
    </HeroAside>
  );
}
