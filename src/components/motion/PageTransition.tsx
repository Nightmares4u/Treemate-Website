import { useLayoutEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeOnly } from "../../lib/motion";
import { scrollToTopInstant } from "../../lib/scroll";

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Wraps a single routed page. Rendered inside an
 * <AnimatePresence mode="wait"> keyed by pathname. Pages now cross-fade
 * on navigation — a plain, quick opacity swap with no curtain overlay.
 */
export function PageTransition({ children }: PageTransitionProps) {
  // Backstop for the reset in Layout: keyed by pathname, so this runs once per
  // page as it mounts, before paint. An explicit hash is the visitor asking for
  // a specific anchor, so leave it alone.
  useLayoutEffect(() => {
    if (!window.location.hash) scrollToTopInstant();
  }, []);

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
