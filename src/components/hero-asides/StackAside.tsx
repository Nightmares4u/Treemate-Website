import { Cpu } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { HeroAside } from "./HeroAside";
import { rowSlide } from "./asideMotion";
import { fadeOnly, easeOutExpo } from "../../lib/motion";
/**
 * Software & AI — the stack we build. Each layer's bar settles at its own
 * depth; hovering a layer drives it out to full and names what's in it.
 */
const layers = [
  { name: "Interface", detail: "CRM · HRM · POS", depth: 0.92 },
  { name: "Intelligence", detail: "Generative & predictive AI", depth: 0.78 },
  { name: "Data", detail: "Pipelines & analytics", depth: 0.64 },
  { name: "Cloud", detail: "AWS · Azure · GCP", depth: 0.5 },
];
/**
 * The bar fills to its resting depth on entry, then runs to full while its
 * layer is hovered — framer propagates the "hover" label down from the row.
 */
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
export function StackAside() {
  const reduced = useReducedMotion();
  return (
    <HeroAside
      label="The Stack We Build"
      meta="AI-First"
      footer="Built bespoke. Owned by you."
      footerIcon={Cpu}
    >
      <ul className="flex flex-col gap-3.5">
        {layers.map((layer) => (
          <motion.li
            key={layer.name}
            variants={reduced ? fadeOnly : rowSlide}
            whileHover={reduced ? undefined : "hover"}
            className="group/row flex cursor-default flex-col gap-1.5"
          >
            <span className="flex items-baseline justify-between gap-3">
              <span className="font-heading text-sm font-bold text-navy transition-colors duration-300 group-hover/row:text-teal">
                {layer.name}
              </span>
              {/* The contents of the layer surface on hover. */}
              <span className="text-[11px] text-navy/40 transition-colors duration-300 group-hover/row:text-navy/70">
                {layer.detail}
              </span>
            </span>
            <span className="relative h-px w-full bg-navy/10">
              <motion.span
                variants={reduced ? fadeOnly : bar(layer.depth)}
                style={{ originX: 0 }}
                className="absolute inset-0 origin-left bg-teal opacity-50 transition-opacity duration-300 group-hover/row:opacity-100 group-hover/row:shadow-[0_0_8px_1px_rgba(13,148,136,0.4)]"
              />
            </span>
          </motion.li>
        ))}
      </ul>
    </HeroAside>
  );
}
