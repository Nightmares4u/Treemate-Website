import { motion, useReducedMotion } from "framer-motion";
import { Boxes } from "lucide-react";
import { HeroAside } from "./HeroAside";
import { railDraw, rowRise } from "./asideMotion";
import { fadeOnly } from "../../lib/motion";
import { portfolioSystems } from "../../data/portfolio";

/**
 * Portfolio — the eight shipped systems as a running index. Hovering a row
 * lights its node on the rail, the same way the About loop behaves.
 */
export function PortfolioAside() {
  const reduced = useReducedMotion();
  const item = reduced ? fadeOnly : rowRise;

  return (
    <HeroAside
      label="Selected Systems"
      meta={`${portfolioSystems.length} Builds`}
      footer="Architecture, interface, and deployment — ours."
      footerIcon={Boxes}
    >
      <motion.span
        aria-hidden="true"
        variants={reduced ? fadeOnly : railDraw}
        style={{ originY: 0 }}
        className="pointer-events-none absolute left-[5px] top-4 bottom-4 w-px bg-gradient-to-b from-teal/15 via-teal/40 to-teal/15 opacity-70 transition-opacity duration-500 group-hover/aside:opacity-100"
      />
      <ul className="flex flex-col gap-3">
        {portfolioSystems.map((system) => (
          <motion.li
            key={system.id}
            variants={item}
            className="group/row relative flex cursor-default items-center gap-4"
          >
            <span className="relative z-10 grid h-2.5 w-2.5 shrink-0 place-items-center rounded-full bg-mint ring-1 ring-teal/60 transition-all duration-300 group-hover/row:scale-150 group-hover/row:bg-teal group-hover/row:ring-teal group-hover/row:shadow-[0_0_10px_2px_rgba(13,148,136,0.45)]">
              <span className="h-1 w-1 rounded-full bg-teal transition-colors duration-300 group-hover/row:bg-mint" />
            </span>
            <span
              aria-hidden="true"
              className="absolute left-3 h-px w-0 bg-teal/50 transition-all duration-300 group-hover/row:w-2"
            />
            <span className="flex min-w-0 items-baseline gap-2.5 transition-transform duration-300 group-hover/row:translate-x-1">
              <span className="shrink-0 text-[11px] font-bold tracking-[0.08em] text-teal">
                {system.num}
              </span>
              <span className="truncate text-sm font-medium text-navy/75">
                {system.sector}
              </span>
            </span>
          </motion.li>
        ))}
      </ul>
    </HeroAside>
  );
}
