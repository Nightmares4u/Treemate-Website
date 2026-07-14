import { Check, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroAside } from "./HeroAside";
import { rowRise, popIn } from "./asideMotion";
import { fadeOnly } from "../../lib/motion";
/**
 * HR Solutions — the people overhead we carry, cleared stage by stage. Hovering
 * a jurisdiction or a stage brings it forward; nothing moves on its own.
 */
const stages = [
  { label: "Sourced & vetted", note: "Specialized talent" },
  { label: "Onboarded in HRM", note: "Our own platform" },
  { label: "Payroll & FX", note: "Cross-border, end to end" },
  { label: "Compliant", note: "US Federal/State · Pakistan labor law" },
];
const regions = [
  { name: "United States", note: "Federal & State" },
  { name: "Pakistan", note: "Labor law" },
];
export function ComplianceAside() {
  const reduced = useReducedMotion();
  const item = reduced ? fadeOnly : rowRise;
  return (
    <HeroAside
      label="Cleared To Hire"
      meta="US + PK"
      footer="We carry the people overhead, not you."
      footerIcon={ShieldCheck}
    >
      {/* The two markets we staff across — hover one to read its regime. */}
      <motion.div variants={item} className="mb-4 flex items-stretch gap-2">
        {regions.map((r) => (
          <span
            key={r.name}
            className="group/region flex flex-1 cursor-default flex-col gap-1 border-b-2 border-navy/10 pb-1.5 transition-colors duration-300 hover:border-teal"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-navy/45 transition-colors duration-300 group-hover/region:text-teal">
              {r.name}
            </span>
            {/* The regime we're compliant under, revealed on hover. */}
            <span className="max-h-0 overflow-hidden text-[10px] leading-tight text-navy/50 opacity-0 transition-all duration-300 group-hover/region:max-h-6 group-hover/region:opacity-100">
              {r.note}
            </span>
          </span>
        ))}
      </motion.div>
      <ul className="flex flex-col gap-3">
        {stages.map((stage) => (
          <motion.li
            key={stage.label}
            variants={item}
            className="group/row flex cursor-default items-center gap-3"
          >
            {/* The tick fills in on hover, as though cleared on the spot. */}
            <motion.span
              variants={reduced ? fadeOnly : popIn}
              className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal/10 ring-1 ring-teal/30 transition-all duration-300 group-hover/row:scale-110 group-hover/row:bg-teal group-hover/row:ring-teal"
            >
              <Check
                className="h-3 w-3 text-teal transition-colors duration-300 group-hover/row:text-white"
                strokeWidth={3}
              />
            </motion.span>
            <span className="flex flex-1 items-baseline justify-between gap-3 transition-transform duration-300 group-hover/row:translate-x-1">
              <span className="font-heading text-sm font-bold text-navy">
                {stage.label}
              </span>
              <span className="text-right text-[11px] leading-tight text-navy/45 transition-colors duration-300 group-hover/row:text-navy/70">
                {stage.note}
              </span>
            </span>
          </motion.li>
        ))}
      </ul>
    </HeroAside>
  );
}
