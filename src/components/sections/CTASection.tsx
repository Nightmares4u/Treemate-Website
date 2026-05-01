import { motion } from "framer-motion";
import { Container } from "../layout/Container";
import { Section } from "../layout/Section";
import { Button } from "../ui/Button";
import { AuroraBackground } from "../ui/AuroraBackground";
import { fadeIn, staggerContainer } from "../../lib/motion";
import { ArrowRight, Phone, Clock, Shield } from "lucide-react";

const trustPoints = [
  { icon: Clock, label: "3-week launch" },
  { icon: Shield, label: "No lock-in contracts" },
  { icon: Phone, label: "Dedicated team access" },
];

export function CTASection() {
  return (
    <Section className="section-seam relative overflow-hidden py-24 md:py-32 lg:py-40">
      <AuroraBackground variant="cta" />

      {/* Subtle grid — center masked */}
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"
        style={{
          maskImage: "radial-gradient(ellipse 60% 70% at 50% 50%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 70% at 50% 50%, #000 40%, transparent 100%)",
        }}
      />

      {/* Top + bottom gradient seams */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center text-center max-w-2xl mx-auto"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeIn} className="mb-7">
            <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 bg-primary/[0.10] border border-primary/30 backdrop-blur-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-signal-pulse absolute h-full w-full rounded-full bg-primary-accent opacity-75" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-primary-accent" />
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary-accent leading-none">
                Start Growing
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeIn}
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-heading font-bold tracking-[-0.025em] leading-[1.05] text-text-primary mb-5"
          >
            Ready to generate{" "}
            <span
              className="text-transparent bg-clip-text bg-[length:200%_auto] animate-shimmer"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #C4B5FD 0%, #A855F7 35%, #7DFF4D 75%, #C4B5FD 100%)",
              }}
            >
              more leads?
            </span>
          </motion.h2>

          {/* Sub-copy */}
          <motion.p
            variants={fadeIn}
            className="text-base md:text-lg text-text-secondary mb-10 font-light leading-relaxed max-w-[44ch] text-pretty"
          >
            Let&apos;s build a premium growth system for your business — websites, lead funnels,
            ads, and SEO, all engineered to drive real results.
          </motion.p>

          {/* CTA group */}
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center gap-3 mb-10">
            <Button size="lg" magnetic>
              Get Your Growth Plan
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Button>
            <Button variant="outline" size="lg">
              Book a Strategy Call
            </Button>
          </motion.div>

          {/* Trust micro-line */}
          <motion.div
            variants={fadeIn}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            {trustPoints.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-text-muted text-xs">
                <Icon className="w-3 h-3 text-text-muted/60" strokeWidth={1.75} />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
