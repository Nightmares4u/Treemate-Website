import type { Variants, Transition } from "framer-motion";
export const easeOutExpo = [0.22, 1, 0.36, 1] as const;
const t = (duration = 0.7, delay = 0): Transition => ({
  duration,
  delay,
  ease: easeOutExpo,
});
export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: t(0.7) },
};
export const blurIn: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: easeOutExpo },
  },
};
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};
