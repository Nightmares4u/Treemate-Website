import { motion } from "framer-motion";

const capabilities = [
  "Premium Websites",
  "Lead Generation",
  "Google Ads",
  "Local SEO",
  "Landing Pages",
  "Conversion Systems",
  "Call Funnels",
  "Monthly Management",
];

const capabilities2 = [
  "Workflow Automation",
  "Internal Tools",
  "AI-Native Products",
  "SaaS Engineering",
  "Custom Platforms",
  "Analytics Systems",
  "Growth Infrastructure",
  "Performance Marketing",
];

function MarqueeRow({
  items,
  duration,
  reverse = false,
}: {
  items: string[];
  duration: number;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="flex items-center whitespace-nowrap will-change-transform"
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center">
            <span className="text-[11px] font-heading font-medium tracking-[0.18em] uppercase text-text-secondary/45 px-5 md:px-8">
              {item}
            </span>
            <span className="text-primary/25 text-[8px]" aria-hidden="true">
              ◆
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function TrustStrip() {
  return (
    <div className="relative border-y border-white/[0.04] bg-surface/30 overflow-hidden py-5 space-y-3">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-base to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-base to-transparent z-10 pointer-events-none" />

      {/* Row 1 — forward */}
      <MarqueeRow items={capabilities} duration={48} />
      {/* Row 2 — reverse (slightly faster) */}
      <MarqueeRow items={capabilities2} duration={56} reverse />
    </div>
  );
}
