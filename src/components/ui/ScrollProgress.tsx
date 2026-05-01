import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const spring = useSpring(0, { stiffness: 300, damping: 40 });

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const pct = scrollTop / (scrollHeight - clientHeight);
      setProgress(pct);
      spring.set(pct);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [spring]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left pointer-events-none"
      style={{
        scaleX: spring,
        background: "linear-gradient(90deg, #7C3AED, #A855F7 50%, #7DFF4D)",
      }}
      aria-hidden="true"
    />
  );
}
