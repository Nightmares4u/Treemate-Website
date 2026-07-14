import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { fadeIn, fadeOnly } from "../../lib/motion";
import { asideStagger } from "./asideMotion";
import { cn } from "../../lib/cn";
/**
 * The hero asides all share one skeleton: a hairline-ruled block that sits
 * directly on the hero backdrop — no card, no fill — with a soft mint bloom
 * behind it so it reads as part of the background rather than on top of it.
 *
 * It animates in once with the hero and then holds still. Everything else is
 * driven by the reader: the bloom warms, the marker lights, and the footer mark
 * turns only while the aside is hovered.
 */
interface HeroAsideProps {
  /** Small uppercase label, top-left. */
  label: string;
  /** Teal uppercase meta, top-right. */
  meta: string;
  /** Footer line. */
  footer: string;
  footerIcon: LucideIcon;
  /** Turn the footer mark on hover — for pages whose idea is a cycle. */
  spinIconOnHover?: boolean;
  children: ReactNode;
  className?: string;
}
export function HeroAside({
  label,
  meta,
  footer,
  footerIcon: FooterIcon,
  spinIconOnHover = false,
  children,
  className,
}: HeroAsideProps) {
  const reduced = useReducedMotion();
  const item = reduced ? fadeOnly : fadeIn;
  return (
    <motion.div
      variants={reduced ? fadeOnly : asideStagger}
      className={cn("group/aside relative w-full max-w-sm", className)}
    >
      {/* Bloom that ties the block into the hero's blurred backdrop. It warms
          as the reader engages with the aside. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[50%] bg-mint/30 blur-3xl transition-all duration-700 group-hover/aside:bg-mint/50 group-hover/aside:-inset-10"
      />
      <motion.div
        variants={item}
        className="flex items-center justify-between gap-4 border-b border-navy/10 pb-3 transition-colors duration-500 group-hover/aside:border-teal/30"
      >
        <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-navy/55 transition-colors duration-500 group-hover/aside:text-navy/75">
          <span className="h-1.5 w-1.5 rounded-full bg-teal/60 transition-all duration-500 group-hover/aside:bg-teal group-hover/aside:shadow-[0_0_8px_2px_rgba(13,148,136,0.45)]" />
          {label}
        </span>
        <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.18em] text-teal">
          {meta}
        </span>
      </motion.div>
      <div className="relative py-5">{children}</div>
      <motion.div
        variants={item}
        className="flex items-center gap-2 border-t border-navy/10 pt-3 transition-colors duration-500 group-hover/aside:border-teal/30"
      >
        <FooterIcon
          className={cn(
            "h-3.5 w-3.5 shrink-0 text-teal transition-transform duration-700",
            spinIconOnHover && !reduced && "group-hover/aside:rotate-180",
          )}
          strokeWidth={2}
        />
        <span className="text-xs font-medium text-navy/60 transition-colors duration-500 group-hover/aside:text-navy/80">
          {footer}
        </span>
      </motion.div>
    </motion.div>
  );
}
