import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";
import { blurIn, fadeOnly, easeOutQuart, viewportConfig } from "../../lib/motion";

interface CounterProps {
  /** The stat to display, e.g. "48", "99.9%", "24/7". */
  value: string;
  className?: string;
  /** Count-up duration in seconds. Default 1.6. */
  duration?: number;
}

interface Parsed {
  prefix: string;
  target: number;
  decimals: number;
  suffix: string;
}

/** Pull the first numeric run out of the string; null if there isn't one. */
function parse(value: string): Parsed | null {
  const match = value.match(/-?\d[\d,]*(\.\d+)?/);
  if (!match) return null;
  const raw = match[0];
  const start = match.index ?? 0;
  const numeric = raw.replace(/,/g, "");
  const dot = numeric.indexOf(".");
  return {
    prefix: value.slice(0, start),
    target: parseFloat(numeric),
    decimals: dot === -1 ? 0 : numeric.length - dot - 1,
    suffix: value.slice(start + raw.length),
  };
}

/**
 * Counts a number up from zero when it scrolls into view, keeping any
 * prefix/suffix intact ("99.9%" animates 0 → 99.9, then renders "%").
 * Non-numeric values (or reduced motion) simply blur/fade in.
 */
export function Counter({ value, className, duration = 1.6 }: CounterProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, viewportConfig);
  const parsed = parse(value);

  const count = useMotionValue(0);
  const text = useTransform(count, (v) => {
    const n = parsed ? v.toFixed(parsed.decimals) : "0";
    return n;
  });

  useEffect(() => {
    if (!parsed || reduced || !inView) return;
    const controls = animate(count, parsed.target, {
      duration,
      ease: easeOutQuart,
    });
    return () => controls.stop();
  }, [inView, parsed, reduced, duration, count]);

  // Not parseable, or reduced motion: just reveal the intact string.
  if (!parsed || reduced) {
    return (
      <motion.span
        ref={ref}
        className={className}
        variants={reduced ? fadeOnly : blurIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        {value}
      </motion.span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      <motion.span>{text}</motion.span>
      {parsed.suffix}
    </span>
  );
}
