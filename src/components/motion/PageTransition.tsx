import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  pageContentVariants,
  curtainTopVariants,
  curtainBottomVariants,
  curtainMarkVariants,
  fadeOnly,
} from "../../lib/motion";

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Wraps a single routed page. Rendered inside an
 * <AnimatePresence mode="wait"> keyed by pathname, so:
 *
 *  1. EXIT (old page, ~280ms) — two navy panels sweep shut from the top
 *     and bottom, meeting at a 2px teal seam. The page-mark fades in.
 *  2. Hand-off — the screen is fully covered navy; AnimatePresence swaps
 *     the frozen outlet and the parent scrolls to top.
 *  3. ENTER (new page, ~400ms) — the panels part back off-screen and the
 *     new page content fades up beneath them.
 *
 * Total ≤ 700ms, ease [0.22, 1, 0.36, 1]. Under reduced motion the
 * curtain is dropped entirely in favour of a plain cross-fade.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <motion.div
        variants={fadeOnly}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div initial="initial" animate="enter" exit="exit">
      <motion.div variants={pageContentVariants}>{children}</motion.div>

      {/* Curtain overlay — fixed, non-interactive. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
      >
        {/* Top panel: navy, teal seam along its bottom edge. */}
        <motion.div
          variants={curtainTopVariants}
          className="absolute inset-x-0 top-0 h-[calc(50%+1px)] bg-navy border-b-2 border-teal"
        />
        {/* Bottom panel: navy, teal seam along its top edge. */}
        <motion.div
          variants={curtainBottomVariants}
          className="absolute inset-x-0 bottom-0 h-[calc(50%+1px)] bg-navy border-t-2 border-teal"
        />
        {/* Centred word-mark, visible only while covered. */}
        <motion.div
          variants={curtainMarkVariants}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="font-heading text-sm font-semibold uppercase tracking-[0.4em] text-mint">
            Treemate
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
