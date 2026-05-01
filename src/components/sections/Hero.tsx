import { motion } from "framer-motion";
import { Container } from "../layout/Container";
import { Section } from "../layout/Section";
import { Button } from "../ui/Button";
import { AuroraBackground } from "../ui/AuroraBackground";
import { Constellation } from "../ui/Constellation";
import { Eyebrow } from "../ui/Eyebrow";
import { blurIn, fadeIn, staggerContainer, easeOutExpo } from "../../lib/motion";
import { ArrowRight, ChevronDown, TrendingUp, Target, BarChart3 } from "lucide-react";

function FloatingPanel({
  children,
  className,
  delay = 0,
  floatY = [-8, 8, -8],
  duration = 6,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  floatY?: number[];
  duration?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay, ease: easeOutExpo }}
      className={className}
    >
      <motion.div
        animate={{ y: floatY }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <Section className="relative min-h-[100svh] flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Layer 0: deep background */}
      <div className="absolute inset-0 -z-30 bg-base" />

      {/* Layer 1: constellation signal nodes */}
      <div className="absolute inset-0 -z-20">
        <Constellation nodeCount={22} opacity={0.55} />
      </div>

      {/* Layer 2: aurora light source */}
      <AuroraBackground variant="hero" className="-z-10" />

      {/* Layer 3: subtle dot grid — masked to top-center */}
      <div
        className="absolute inset-0 -z-10 bg-dots opacity-40"
        style={{
          maskImage: "radial-gradient(ellipse 70% 50% at 50% 0%, #000 60%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 50% at 50% 0%, #000 60%, transparent 100%)",
        }}
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-4 items-center">

          {/* ═══ LEFT: Copy ═══ */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start gap-6 lg:col-span-6 xl:col-span-5"
          >
            {/* Live status eyebrow */}
            <motion.div variants={fadeIn}>
              <Eyebrow variant="live">Premium digital growth systems</Eyebrow>
            </motion.div>

            {/* Display headline */}
            <motion.h1
              variants={blurIn}
              className="font-heading font-bold text-text-primary tracking-[-0.03em] leading-[0.97]"
              style={{ fontSize: "clamp(3rem, 6.5vw, 5.5rem)" }}
            >
              Growth,{" "}
              <span
                className="text-transparent bg-clip-text bg-[length:200%_auto] animate-shimmer"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, #C4B5FD 0%, #A855F7 30%, #7DFF4D 70%, #C4B5FD 100%)",
                }}
              >
                engineered.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeIn}
              className="text-base md:text-lg text-text-secondary leading-relaxed max-w-[38ch] font-light text-pretty"
            >
              Premium websites, lead generation systems, and growth infrastructure
              for service businesses across North America.
            </motion.p>

            {/* CTA cluster */}
            <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-3 pt-1">
              <Button size="lg" magnetic>
                Get Your Growth System
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Button>
              <Button variant="ghost" size="lg" className="text-text-secondary hover:text-text-primary">
                See How It Works
                <ChevronDown className="w-4 h-4" strokeWidth={1.75} />
              </Button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeIn}
              className="flex items-center gap-7 pt-5 mt-1"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-border/0 via-border to-border/0 max-w-[1px] hidden" />
              {[
                { value: "3×", label: "Avg. Lead Increase" },
                { value: "50+", label: "Businesses Served" },
                { value: "<24h", label: "Launch Ready" },
              ].map((stat, i) => (
                <div key={i} className="flex items-stretch gap-7">
                  <div className="flex flex-col gap-1">
                    <span className="text-[1.75rem] font-heading font-bold text-text-primary leading-none tracking-[-0.03em]">
                      {stat.value}
                    </span>
                    <span className="text-[11px] text-text-muted leading-none tracking-wide whitespace-nowrap">
                      {stat.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className="w-px self-stretch bg-border/60 shrink-0" />
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ═══ RIGHT: Visual Composition ═══ */}
          <div className="relative lg:col-span-6 xl:col-span-7 h-[440px] md:h-[520px] lg:h-[600px]">

            {/* Single refined orbital */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute w-[360px] h-[360px] lg:w-[460px] lg:h-[460px] rounded-full border border-primary/[0.07] animate-spin-slower" />
              <div className="absolute w-[240px] h-[240px] lg:w-[300px] lg:h-[300px] rounded-full border border-accent-green/[0.05] animate-spin-reverse" />
              {/* Core signal dot */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(124,58,237,0)",
                    "0 0 0 12px rgba(124,58,237,0.12)",
                    "0 0 0 0 rgba(124,58,237,0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                className="w-2.5 h-2.5 rounded-full bg-primary/60"
              />
            </div>

            {/* ── Panel 1: Lead Engine (hero panel) ── */}
            <FloatingPanel
              className="absolute top-[10%] left-[5%] lg:left-[8%] w-[280px] md:w-[310px] z-30"
              delay={0.4}
              floatY={[-10, 8, -10]}
              duration={7}
            >
              <div className="glass-elevated rounded-2xl p-5 shadow-[0_32px_64px_rgba(0,0,0,0.45)]">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center">
                      <Target className="w-3.5 h-3.5 text-primary-accent" strokeWidth={1.75} />
                    </div>
                    <span className="font-heading text-sm text-text-primary font-semibold">Lead Engine</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-green/10 border border-accent-green/25">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-signal-pulse absolute h-full w-full rounded-full bg-accent-green opacity-70" />
                      <span className="relative h-1.5 w-1.5 rounded-full bg-accent-green" />
                    </span>
                    <span className="text-[10px] font-mono text-accent-green">LIVE</span>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {[
                    { label: "Conversion Rate", value: "12.4%", pct: "87%", color: "from-primary to-primary-accent" },
                    { label: "Calls Booked", value: "47 / wk", pct: "94%", color: "from-accent-secondary to-accent-green" },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="text-text-secondary">{row.label}</span>
                        <span className="text-text-primary font-mono">{row.value}</span>
                      </div>
                      <div className="w-full h-[3px] bg-surface-light rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: row.pct }}
                          transition={{ delay: 1.2, duration: 1, ease: easeOutExpo }}
                          className={`h-full bg-gradient-to-r ${row.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-white/[0.04] font-mono text-[10px] space-y-1.5 text-text-muted">
                  <div>
                    <span className="text-primary-accent/80">leads</span>
                    {".captured "}
                    <span className="text-text-secondary">312</span>
                    <span className="text-text-muted/60"> this month</span>
                  </div>
                  <div>
                    <span className="text-accent-secondary/80">funnel</span>
                    {".status "}
                    <span className="text-accent-green">● active</span>
                  </div>
                </div>
              </div>
            </FloatingPanel>

            {/* ── Panel 2: Analytics ── */}
            <FloatingPanel
              className="absolute bottom-[10%] right-[3%] lg:right-[8%] w-[210px] z-30"
              delay={0.8}
              floatY={[-6, 10, -6]}
              duration={6.5}
            >
              <div className="glass-elevated rounded-xl p-4 shadow-2xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-3.5 h-3.5 text-accent-green" strokeWidth={1.75} />
                    <span className="text-[10px] font-heading font-medium text-text-secondary uppercase tracking-widest">
                      Analytics
                    </span>
                  </div>
                  <span className="text-[10px] text-text-muted font-mono">30d</span>
                </div>
                {/* Mini bar chart */}
                <div className="flex items-end gap-0.5 h-10 mb-2.5">
                  {[35, 55, 40, 72, 55, 88, 65, 80, 92, 70, 84, 95].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 1.4 + i * 0.04, duration: 0.45, ease: easeOutExpo }}
                      style={{ height: `${h}%` }}
                      className="flex-1 rounded-[2px] bg-gradient-to-t from-accent-secondary/60 to-accent-green/90 origin-bottom"
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-text-muted">Leads Generated</span>
                  <span className="text-[11px] text-text-primary font-mono font-medium">+312</span>
                </div>
              </div>
            </FloatingPanel>

            {/* ── Panel 3: Pipeline status pill ── */}
            <FloatingPanel
              className="absolute top-[8%] right-[8%] lg:right-[14%] z-20"
              delay={1.1}
              floatY={[5, -8, 5]}
              duration={5}
            >
              <div className="glass rounded-full px-4 py-2.5 shadow-xl flex items-center gap-2.5">
                <TrendingUp className="w-3.5 h-3.5 text-primary-accent flex-shrink-0" strokeWidth={1.75} />
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-text-secondary leading-none">PIPELINE</span>
                  <span className="text-xs font-heading text-text-primary font-medium leading-none mt-0.5">
                    Capture → Convert → Close
                  </span>
                </div>
              </div>
            </FloatingPanel>

          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.7 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] font-mono text-text-muted tracking-[0.2em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-3.5 h-3.5 text-text-muted/60" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
