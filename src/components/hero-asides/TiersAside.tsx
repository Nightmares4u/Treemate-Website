import { useState } from "react";
import {
  Phone,
  Mail,
  MessageSquare,
  Share2,
  Bot,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroAside } from "./HeroAside";
import { rowSlide, rowRise } from "./asideMotion";
import { fadeOnly } from "../../lib/motion";
import { cn } from "../../lib/cn";
/**
 * Customer Success — the escalation ladder. Hovering a tier lights the path a
 * ticket took to reach it, so Tier 3 shows it came up through 1 and 2.
 */
const tiers = [
  { tier: "Tier 1", detail: "First response & triage" },
  { tier: "Tier 2", detail: "Deep product support" },
  { tier: "Tier 3", detail: "Engineering escalation" },
];
const channels: { icon: LucideIcon; name: string }[] = [
  { icon: Phone, name: "Phone" },
  { icon: Mail, name: "Email" },
  { icon: MessageSquare, name: "Live chat" },
  { icon: Share2, name: "Social" },
];
export function TiersAside() {
  const reduced = useReducedMotion();
  /** The tier under the cursor; every tier below it is on the ticket's path. */
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <HeroAside
      label="Support, Tiered"
      meta="24/7"
      footer="AI assists the agent. It never replaces them."
      footerIcon={Bot}
    >
      <ul className="flex flex-col" onMouseLeave={() => setHovered(null)}>
        {tiers.map((t, i) => {
          const onPath = hovered !== null && i <= hovered;
          const isTarget = hovered === i;
          return (
            <motion.li
              key={t.tier}
              variants={reduced ? fadeOnly : rowSlide}
              onMouseEnter={() => setHovered(i)}
              className="group/row relative flex cursor-default items-center gap-3 border-b border-navy/10 py-2.5 last:border-b-0"
            >
              {/* The rung. Lit for every tier the ticket passed through. */}
              <span
                className={cn(
                  "h-6 w-[3px] shrink-0 rounded-full transition-all duration-300",
                  onPath ? "bg-teal" : "bg-navy/10",
                  isTarget && "shadow-[0_0_8px_1px_rgba(13,148,136,0.45)]",
                )}
              />
              <span
                className={cn(
                  "font-mono text-[11px] font-bold tracking-[0.14em] transition-colors duration-300",
                  onPath ? "text-teal" : "text-navy/35",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "flex flex-1 items-baseline justify-between gap-3 transition-transform duration-300",
                  isTarget && "translate-x-1",
                )}
              >
                <span className="font-heading text-sm font-bold text-navy">
                  {t.tier}
                </span>
                <span
                  className={cn(
                    "text-[11px] transition-colors duration-300",
                    isTarget ? "text-navy/70" : "text-navy/45",
                  )}
                >
                  {t.detail}
                </span>
              </span>
            </motion.li>
          );
        })}
      </ul>
      {/* Every channel, one roof. */}
      <motion.div
        variants={reduced ? fadeOnly : rowRise}
        className="mt-4 flex items-center gap-2 border-t border-navy/10 pt-4"
      >
        {channels.map(({ icon: Icon, name }) => (
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
