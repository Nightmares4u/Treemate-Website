import { motion } from "framer-motion";
import { Container } from "../layout/Container";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { SignalLine } from "../ui/SignalLine";
import { fadeIn, staggerContainer } from "../../lib/motion";
import { Monitor, Workflow, Brain, Rocket, ArrowUpRight } from "lucide-react";

const capabilities = [
  {
    id: "01",
    title: "Internal Tools & Dashboards",
    description:
      "Custom admin panels, client portals, and operational dashboards built for your team's exact workflow and decision-making needs.",
    icon: Monitor,
    accent: "text-primary-accent",
    tag: "Full-Stack",
    tagColor: "text-primary-accent bg-primary/[0.08] border-primary/20",
    preview: (
      <div className="flex flex-col gap-2 font-mono text-[10px] text-text-muted">
        <div className="flex items-center gap-2">
          <span className="text-primary-accent">const</span>
          <span className="text-text-secondary">dashboard</span>
          <span className="text-text-muted">= buildPanel(</span>
        </div>
        <div className="pl-4 text-text-secondary/60">{"{ role: 'admin', scope: 'ops' }"}</div>
        <div className="text-text-muted">{")"}</div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-accent-green">●</span>
          <span>Live in production</span>
        </div>
      </div>
    ),
  },
  {
    id: "02",
    title: "Workflow Automation",
    description:
      "Automated scheduling, dispatch, invoicing, and notification systems that eliminate manual busywork and scale your operations.",
    icon: Workflow,
    accent: "text-accent-green",
    tag: "Automation",
    tagColor: "text-accent-green bg-accent-green/[0.08] border-accent-green/20",
    preview: (
      <div className="flex items-center gap-2">
        {["CRM", "→", "Email", "→", "Calendar", "→", "Slack"].map((item, i) => (
          <span
            key={i}
            className={`text-[10px] font-mono ${
              item === "→"
                ? "text-accent-green/50"
                : "px-2 py-0.5 rounded bg-surface-light border border-border text-text-secondary"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    ),
  },
  {
    id: "03",
    title: "AI-Enabled Platforms",
    description:
      "Intelligent systems that leverage AI for predictive lead scoring, smart routing, automated follow-ups, and data-driven insights.",
    icon: Brain,
    accent: "text-primary",
    tag: "AI / ML",
    tagColor: "text-primary-accent bg-primary/[0.08] border-primary/20",
    preview: (
      <div className="flex flex-col gap-1.5 font-mono text-[10px]">
        {[
          { label: "Lead score", value: "0.92", color: "text-accent-green" },
          { label: "Route: team", value: "sales-A", color: "text-primary-accent" },
          { label: "Priority", value: "HIGH", color: "text-accent-green" },
        ].map((row) => (
          <div key={row.label} className="flex items-center gap-1.5">
            <span className="text-text-muted w-20">{row.label}</span>
            <span className="text-text-muted">·</span>
            <span className={row.color}>{row.value}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "04",
    title: "Custom Product Engineering",
    description:
      "Full-stack SaaS development, B2B platforms, and bespoke software products — from architecture through deployment and beyond.",
    icon: Rocket,
    accent: "text-accent-secondary",
    tag: "SaaS",
    tagColor: "text-accent-secondary bg-accent-secondary/[0.08] border-accent-secondary/20",
    preview: (
      <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
        {["Auth", "API", "DB", "CDN", "CI/CD", "Billing"].map((s) => (
          <div
            key={s}
            className="px-2 py-1 rounded bg-surface-light border border-border text-text-muted text-center"
          >
            {s}
          </div>
        ))}
      </div>
    ),
  },
];

export function CapabilitiesPreview() {
  return (
    <Section id="technology" className="section-seam relative">
      <Container>
        <SectionHeading
          label="Advanced Capabilities"
          title="Beyond marketing. Full-stack technology."
          subtitle="We don't just build growth systems — we engineer custom platforms, automation, and AI-native products. This is the technical foundation behind everything we deliver."
          align="left"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div key={cap.id} variants={fadeIn} className="group">
                <div
                  className="relative h-full rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer"
                  style={{
                    background: "linear-gradient(160deg, #0C1118, #080B12)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Signal line on top */}
                  <div className="absolute top-0 inset-x-0 h-[1px] overflow-hidden">
                    <SignalLine delay={i * 0.8} />
                  </div>

                  {/* Hover border glow */}
                  <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[inset_0_0_0_1px_rgba(168,85,247,0.20)]" />

                  <div className="p-7 md:p-8">
                    {/* Header row */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-surface border border-white/[0.06] flex items-center justify-center group-hover:border-primary/25 transition-colors duration-300">
                          <Icon className={`w-4 h-4 ${cap.accent}`} strokeWidth={1.75} />
                        </div>
                        <span
                          className={`text-[10px] font-medium uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border ${cap.tagColor}`}
                        >
                          {cap.tag}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-text-muted group-hover:text-text-secondary transition-colors duration-300">
                        <span className="text-[10px] font-mono">{cap.id}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-0.5 group-hover:translate-y-0 group-hover:-translate-x-0" strokeWidth={1.75} />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-heading font-bold text-text-primary mb-2.5 tracking-tight">
                      {cap.title}
                    </h3>
                    <p className="text-[13px] text-text-secondary leading-relaxed font-light mb-6 text-pretty">
                      {cap.description}
                    </p>

                    {/* Code/system preview panel */}
                    <div
                      className="rounded-xl p-4 overflow-hidden"
                      style={{
                        background: "rgba(5,7,11,0.7)",
                        border: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      {cap.preview}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
