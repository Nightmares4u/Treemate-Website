import { useEffect } from "react";
import { motion, useSpring } from "framer-motion";

/** Slim top progress indicator that fills left-to-right with scroll. */
export function ScrollProgress() {
  const spring = useSpring(0, { stiffness: 300, damping: 40 });

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      spring.set(max > 0 ? scrollTop / max : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [spring]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left pointer-events-none"
      style={{
        scaleX: spring,
        // Match the logo teal exactly (the "mate" wordmark / head dot).
        background: "#0D9488",
      }}
      aria-hidden="true"
    />
  );
}
