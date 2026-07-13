import { Children, isValidElement } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  fadeIn,
  blurIn,
  frameOpen,
  scaleIn,
  fadeOnly,
  staggerContainer,
  viewportConfig,
  easeOutExpo,
} from "../../lib/motion";

export type RevealVariant = "fade" | "blur" | "frame" | "scale";

/** Tags we allow the polymorphic wrapper to render as. */
type RevealTag =
  | "div"
  | "section"
  | "article"
  | "span"
  | "ul"
  | "li"
  | "p"
  | "header"
  | "footer"
  | "figure";

const VARIANTS: Record<RevealVariant, Variants> = {
  fade: fadeIn,
  blur: blurIn,
  frame: frameOpen,
  scale: scaleIn,
};

interface RevealProps {
  children: ReactNode;
  /** Which reveal animation to play. Default "fade". */
  variant?: RevealVariant;
  /** Extra delay before the reveal, in seconds. */
  delay?: number;
  /** Element to render. Default "div". */
  as?: RevealTag;
  className?: string;
}

/**
 * Scroll-reveal wrapper. Animates once when scrolled into view.
 * Under reduced motion it becomes an instant, opacity-only fade.
 */
export function Reveal({
  children,
  variant = "fade",
  delay = 0,
  as = "div",
  className,
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];
  const variants = reduced ? fadeOnly : VARIANTS[variant];

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  /** Reveal animation applied to every direct child. Default "fade". */
  variant?: RevealVariant;
  /** Element to render as the container. Default "div". */
  as?: RevealTag;
  /** Seconds between each child's start. Default 0.1. */
  stagger?: number;
  /** Delay before the first child starts. Default 0.05. */
  delayChildren?: number;
  className?: string;
}

/**
 * Staggered scroll-reveal container. Wraps each direct child so they
 * animate in sequence when the group scrolls into view.
 */
export function RevealGroup({
  children,
  variant = "fade",
  as = "div",
  stagger = 0.1,
  delayChildren = 0.05,
  className,
}: RevealGroupProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];
  const itemVariants = reduced ? fadeOnly : VARIANTS[variant];

  const container: Variants = reduced
    ? fadeOnly
    : {
        hidden: staggerContainer.hidden,
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: stagger,
            delayChildren,
            ease: easeOutExpo,
          },
        },
      };

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      {Children.map(children, (child, i) =>
        isValidElement(child) ? (
          <motion.div key={i} variants={itemVariants}>
            {child}
          </motion.div>
        ) : (
          child
        ),
      )}
    </MotionTag>
  );
}
