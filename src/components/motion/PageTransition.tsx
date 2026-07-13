import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeOnly } from "../../lib/motion";

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Wraps a single routed page. Rendered inside an
 * <AnimatePresence mode="wait"> keyed by pathname. Pages now cross-fade
 * on navigation — a plain, quick opacity swap with no curtain overlay.
 */
export function PageTransition({ children }: PageTransitionProps) {
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
