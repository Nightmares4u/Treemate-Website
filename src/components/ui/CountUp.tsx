import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  value: string;
  duration?: number; // ms
  className?: string;
}

interface Parsed {
  isNumeric: boolean;
  prefix: string;
  suffix: string;
  target: number;
  decimals: number;
  hasComma: boolean;
}

function parseValue(value: string): Parsed {
  const empty: Parsed = {
    isNumeric: false,
    prefix: "",
    suffix: "",
    target: 0,
    decimals: 0,
    hasComma: false,
  };
  const m = value.match(/^([^\d-]*)(-?[\d,]*\.?\d+)(.*)$/s);
  if (!m) return empty;
  const [, prefix, rawNum, suffix] = m;
  const hasComma = rawNum.includes(",");
  const numStr = rawNum.replace(/,/g, "");
  const target = parseFloat(numStr);
  if (Number.isNaN(target)) return empty;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { isNumeric: true, prefix, suffix, target, decimals, hasComma };
}

function format(n: number, p: Parsed): string {
  const fixed = n.toFixed(p.decimals);
  if (!p.hasComma) return fixed;
  const [intPart, dec] = fixed.split(".");
  const withCommas = Number(intPart).toLocaleString("en-US");
  return dec ? `${withCommas}.${dec}` : withCommas;
}

// Animates a numeric value from 0 → target when scrolled into view.
// Non-numeric values (e.g. "US + AU") render unchanged.
export function CountUp({ value, duration = 1600, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const parsed = useMemo(() => parseValue(value), [value]);
  const [display, setDisplay] = useState(
    parsed.isNumeric ? format(0, parsed) : value,
  );

  useEffect(() => {
    if (!parsed.isNumeric) return;
    if (reduced) {
      setDisplay(format(parsed.target, parsed));
      return;
    }
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setDisplay(format(parsed.target * eased, parsed));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(format(parsed.target, parsed));
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, parsed, duration, reduced]);

  if (!parsed.isNumeric) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {display}
      {parsed.suffix}
    </span>
  );
}
