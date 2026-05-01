import { motion } from "framer-motion";
import { Container } from "../layout/Container";
import { Section } from "../layout/Section";
import { fadeIn, fadeInLeft, fadeInRight, staggerContainer } from "../../lib/motion";
import { Code2, Cog, Zap, Shield, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AuroraBackground } from "../ui/AuroraBackground";

interface DifferentiatorItem {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  bullets: string[];
  accent: string;
  borderAccent: string;
}

const items: DifferentiatorItem[] = [
  {
    number: "01",
    title: "Engineering-First Approach",
    description:
      "Every system we build is custom-engineered — no templates, no drag-and-drop builders. Real code, real performance, real results.",
    icon: Code2,
    bullets: [
      "Custom-coded, not Webflow or Squarespace",
      "Sub-1s load times, Core Web Vitals optimized",
      "Built on production engineering standards",
    ],
    accent: "text-primary-accent",
    borderAccent: "rgba(168,85,247,0.35)",
  },
  {
    number: "02",
    title: "Systems, Not Campaigns",
    description:
      "We don't run one-off campaigns. We build integrated growth infrastructure that compounds value month over month.",
    icon: Cog,
    bullets: [
      "Integrated funnel architecture",
      "Compounding monthly returns",
      "Infrastructure you own, not rent",
    ],
    accent: "text-accent-green",
    borderAccent: "rgba(125,255,77,0.25)",
  },
  {
    number: "03",
    title: "Technical Foundation",
    description:
      "Our team builds AI platforms, automation systems, and SaaS products. Your growth stack is built on the same engineering rigor.",
    icon: Zap,
    bullets: [
      "AI-assisted optimization systems",
      "Enterprise-grade reliability",
      "Tech DNA in everything we touch",
    ],
    accent: "text-primary",
    borderAccent: "rgba(124,58,237,0.30)",
  },
  {
    number: "04",
    title: "Dedicated Partnership",
    description:
      "No account manager runaround. You get a dedicated team, monthly strategy calls, and transparent reporting.",
    icon: Shield,
    bullets: [
      "Direct access to your team",
      "Monthly strategy reviews",
      "Full transparency reporting",
    ],
    accent: "text-accent-secondary",
    borderAccent: "rgba(50,213,131,0.25)",
  },
];

export function Differentiators() {
  return (
    <Section id="why-us" className="section-seam relative overflow-hidden">
      <AuroraBackground variant="section" />

      <Container className="relative z-10">
        {/* Editorial header — left-aligned, large display */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 md:mb-20"
        >
          <motion.div variants={fadeIn} className="mb-5">
            <div className="inline-flex items-center gap-2.5 rounded-full px-3.5 py-1 bg-primary/[0.08] border border-primary/20">
              <span className="w-1 h-1 rounded-full bg-primary-accent" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary-accent leading-none">
                The Treemate Difference
              </span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-end">
            <motion.h2
              variants={fadeInLeft}
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-heading font-bold text-text-primary tracking-[-0.025em] leading-[1.05]"
            >
              We&apos;re not another{" "}
              <span className="text-gradient-brand">marketing agency.</span>
            </motion.h2>
            <motion.p
              variants={fadeInRight}
              className="text-base md:text-lg text-text-secondary leading-relaxed font-light text-pretty lg:pb-1"
            >
              Most agencies sell you templates and dashboards. We engineer growth
              systems with the same rigor we bring to custom software and AI
              platforms.
            </motion.p>
          </div>
        </motion.div>

        {/* 2×2 grid with editorial card layout */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} variants={fadeIn} className="group">
                <div
                  className="relative h-full rounded-2xl p-8 md:p-9 overflow-hidden transition-all duration-500"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(13,18,32,0.95), rgba(7,10,16,0.98))",
                    border: `1px solid rgba(255,255,255,0.06)`,
                  }}
                >
                  {/* Top gradient border accent on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: "transparent",
                      boxShadow: `inset 0 1px 0 ${item.borderAccent}`,
                    }}
                  />

                  {/* Ambient glow */}
                  <div
                    className="absolute top-0 right-0 w-56 h-56 rounded-full blur-[90px] opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"
                    style={{ background: item.borderAccent.replace("0.35", "0.15").replace("0.25", "0.10").replace("0.30", "0.12") }}
                  />

                  {/* Number badge */}
                  <div className="flex items-center justify-between mb-7">
                    <span className="text-[11px] font-mono text-text-muted">{item.number}</span>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{
                        background: `${item.borderAccent.replace(/[\d.]+\)$/, "0.08)")}`,
                        border: `1px solid ${item.borderAccent.replace(/[\d.]+\)$/, "0.25)")}`,
                      }}
                    >
                      <Icon className={`w-4 h-4 ${item.accent}`} strokeWidth={1.75} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl md:text-[1.375rem] font-heading font-bold text-text-primary mb-2.5 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[13px] md:text-sm text-text-secondary leading-relaxed font-light mb-6 text-pretty">
                    {item.description}
                  </p>

                  {/* Bullet list */}
                  <ul className="space-y-2">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5 text-xs text-text-muted">
                        <Check
                          className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${item.accent} opacity-80`}
                          strokeWidth={2.5}
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
