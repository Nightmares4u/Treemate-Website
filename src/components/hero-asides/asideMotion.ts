import type { Variants } from "framer-motion";
import { easeOutExpo, easeOutBack } from "../../lib/motion";
/**
 * Entry motion shared by the hero asides. Nothing here loops — the asides
 * animate in once with the hero, then stay still until the reader touches them.
 */
/** Body children rise in sequence once the hero's own stagger reaches the aside. */
export const asideStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};
/** A row rising into place. */
export const rowRise: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};
/** A row arriving from the left — used where the content reads as a stack. */
export const rowSlide: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};
/** A mark that pops in, with a little overshoot. */
export const popIn: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.45, ease: easeOutBack, delay: 0.25 },
  },
};
/** A rule that draws itself downward, once. */
export const railDraw: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.9, ease: easeOutExpo, delay: 0.4 },
  },
};
/** A bar that fills to a given depth, once. */
export const barFill = (fill: number): Variants => ({
  hidden: { scaleX: 0 },
  visible: {
    scaleX: fill,
    transition: { duration: 0.8, ease: easeOutExpo, delay: 0.2 },
  },
});
