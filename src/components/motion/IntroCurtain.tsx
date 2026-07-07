import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "../../lib/motion";
import { TreemateLogo } from "../ui/TreemateLogo";

const SESSION_KEY = "treemate_intro_seen";

/**
 * First-load brand intro, shown once per browser session.
 * A cream screen holds the Treemate word-mark blurring in, then splits
 * into two panels that part like curtains to reveal the page.
 * Total ≈ 1.3s. Skipped entirely under reduced motion.
 */
export function IntroCurtain() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return !window.sessionStorage.getItem(SESSION_KEY);
    } catch {
      return false;
    }
  });

  const markSeen = () => {
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  // Reduced motion: never play; record so nothing flashes later either.
  useEffect(() => {
    if (reduced && show) {
      markSeen();
      setShow(false);
    }
  }, [reduced, show]);

  if (!show || reduced) return null;

  const finish = () => {
    markSeen();
    setShow(false);
  };

  const panelTransition = { duration: 0.6, delay: 0.72, ease: easeOutExpo };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Left panel */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-101%" }}
        transition={panelTransition}
        className="absolute inset-y-0 left-0 w-1/2 bg-cream"
      />
      {/* Right panel — drives completion. */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "101%" }}
        transition={panelTransition}
        onAnimationComplete={finish}
        className="absolute inset-y-0 right-0 w-1/2 bg-cream"
      />
      {/* Centred word-mark */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(14px)", scale: 0.96 }}
        animate={{
          opacity: [0, 1, 1, 0],
          filter: ["blur(14px)", "blur(0px)", "blur(0px)", "blur(6px)"],
          scale: [0.96, 1, 1, 1],
        }}
        transition={{ duration: 1.2, times: [0, 0.35, 0.62, 0.85], ease: easeOutExpo }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <TreemateLogo size="lg" wordmarkCase="upper" asLink={false} />
      </motion.div>
    </div>
  );
}
