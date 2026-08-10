import type { Variants, Transition } from "framer-motion";

/* ------------------------------------------------------------------ *
 * Easings
 * ------------------------------------------------------------------ */
export const easeOutExpo = [0.22, 1, 0.36, 1] as const;
export const easeInOutQuint = [0.83, 0, 0.17, 1] as const;
export const easeOutQuart = [0.25, 1, 0.5, 1] as const;
export const easeOutBack = [0.34, 1.56, 0.64, 1] as const;

/** Named easing collection for convenient, typed access. */
export const easings = {
  expo: easeOutExpo,
  inOutQuint: easeInOutQuint,
  outQuart: easeOutQuart,
  outBack: easeOutBack,
  /** The curtain / page-transition curve. */
  curtain: easeOutExpo,
} as const;

/** Shared whileInView viewport config: reveal once, slightly before fully in view. */
export const viewportConfig = { once: true, margin: "-80px" } as const;

const t = (duration = 0.7, delay = 0): Transition => ({
  duration,
  delay,
  ease: easeOutExpo,
});

/* ------------------------------------------------------------------ *
 * Core reveal variants (existing exports preserved)
 * ------------------------------------------------------------------ */
export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: t(0.7) },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

/** Opacity-only variant used as the reduced-motion fallback everywhere. */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: easeOutExpo } },
};

/* ------------------------------------------------------------------ *
 * New reveal variants
 * ------------------------------------------------------------------ */

/** Clip-path "frame opening" wipe — content is unveiled top-to-bottom. */
export const frameOpen: Variants = {
  hidden: {
    opacity: 0,
    clipPath: "inset(0% 0% 100% 0%)",
    y: 12,
  },
  visible: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    y: 0,
    transition: { duration: 0.85, ease: easeOutExpo },
  },
};

/** A line / word that rises from below its own baseline (pair with overflow-hidden). */
export const lineRise: Variants = {
  hidden: { opacity: 0, y: "115%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

/** Word that rises — used by AnimatedHeadline. */
export const wordRise: Variants = {
  hidden: { opacity: 0, y: "0.3em" },
  visible: {
    opacity: 1,
    y: "0em",
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

/** Gentle scale-up reveal for cards / media. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

/* ------------------------------------------------------------------ *
 * Page transition variants (curtain)
 * ------------------------------------------------------------------ */

/** Timings for the route curtain, kept ≤ 700ms total. */
export const CURTAIN = {
  /** Old page: panels sweep shut. */
  close: 0.28,
  /** New page: panels part open. */
  open: 0.4,
  ease: easeOutExpo,
} as const;

/** The freeze/reveal of the page body underneath the curtain. */
export const pageContentVariants: Variants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 0.3, delay: 0.12, ease: easeOutExpo },
  },
  exit: {
    // Stay visible while the curtain closes over the top.
    opacity: 1,
    transition: { duration: CURTAIN.close },
  },
};

/**
 * Top curtain panel. A freshly mounted page starts covered (`initial`),
 * opens on `enter`, and an outgoing page closes back over on `exit`.
 */
export const curtainTopVariants: Variants = {
  initial: { y: "0%" },
  enter: {
    y: "-100%",
    transition: { duration: CURTAIN.open, ease: easeOutExpo },
  },
  exit: {
    y: "0%",
    transition: { duration: CURTAIN.close, ease: easeOutExpo },
  },
};

/** Bottom curtain panel — mirror of the top. */
export const curtainBottomVariants: Variants = {
  initial: { y: "0%" },
  enter: {
    y: "100%",
    transition: { duration: CURTAIN.open, ease: easeOutExpo },
  },
  exit: {
    y: "0%",
    transition: { duration: CURTAIN.close, ease: easeOutExpo },
  },
};

/** The small word-mark shown centred while the curtain covers the screen. */
export const curtainMarkVariants: Variants = {
  initial: { opacity: 0.9 },
  enter: { opacity: 0, transition: { duration: 0.2, ease: easeOutExpo } },
  exit: { opacity: 0.9, transition: { duration: CURTAIN.close, ease: easeOutExpo } },
};
