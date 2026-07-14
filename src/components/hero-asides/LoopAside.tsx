import { Database, UserCog, Headphones, RefreshCcw } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroAside } from "./HeroAside";
import { railDraw, rowRise } from "./asideMotion";
import { fadeOnly } from "../../lib/motion";
/**
 * About — the three pillars as one closed loop. Hovering a pillar lights its
 * node on the rail and reaches out to its caption.
 */
const nodes = [
  { icon: Database, pillar: "Software & AI", caption: "We build the system" },
  { icon: UserCog, pillar: "HR Solutions", caption: "We staff & manage it" },
  {
    icon: Headphones,
    pillar: "Customer Success",
    caption: "We support your customers",
  },
];
export function LoopAside() {
  const reduced = useReducedMotion();
  const item = reduced ? fadeOnly : rowRise;
  return (
    <HeroAside
      label="The Treemate Loop"
      meta="US · PK"
      footer="One contract. One accountable partner."
      footerIcon={RefreshCcw}
      spinIconOnHover
    >
      {/* The rail the loop runs on. It brightens as the reader engages. */}
      <motion.span
        aria-hidden="true"
        variants={reduced ? fadeOnly : railDraw}
        style={{ originY: 0 }}
        className="pointer-events-none absolute left-[5px] top-7 bottom-7 w-px bg-gradient-to-b from-teal/15 via-teal/40 to-teal/15 transition-opacity duration-500 group-hover/aside:opacity-100 opacity-70"
      />
      <ul className="flex flex-col gap-5">
        {nodes.map(({ icon: Icon, pillar, caption }) => (
          <motion.li
            key={pillar}
            variants={item}
            className="group/row relative flex cursor-default items-center gap-4"
          >
            {/* The node on the rail — it fills and haloes on hover. */}
            <span className="relative z-10 grid h-2.5 w-2.5 shrink-0 place-items-center rounded-full bg-mint ring-1 ring-teal/60 transition-all duration-300 group-hover/row:scale-150 group-hover/row:bg-teal group-hover/row:ring-teal group-hover/row:shadow-[0_0_10px_2px_rgba(13,148,136,0.45)]">
              <span className="h-1 w-1 rounded-full bg-teal transition-colors duration-300 group-hover/row:bg-mint" />
            </span>
            {/* A connector that reaches from the rail toward the pillar. */}
            <span
              aria-hidden="true"
              className="absolute left-3 h-px w-0 bg-teal/50 transition-all duration-300 group-hover/row:w-2"
            />
            <Icon
              className="h-[18px] w-[18px] shrink-0 text-teal/70 transition-all duration-300 group-hover/row:text-teal group-hover/row:-translate-y-0.5 group-hover/row:scale-110"
              strokeWidth={1.8}
            />
            <span className="flex flex-col leading-tight transition-transform duration-300 group-hover/row:translate-x-1">
              <span className="font-heading text-sm font-bold text-navy">
                {pillar}
              </span>
              <span className="text-xs text-navy/55 transition-colors duration-300 group-hover/row:text-navy/80">
                {caption}
              </span>
            </span>
          </motion.li>
        ))}
      </ul>
    </HeroAside>
  );
}
