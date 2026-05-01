import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container } from "../layout/Container";
import { Section } from "../layout/Section";
import { fadeIn, staggerContainer, easeOutExpo } from "../../lib/motion";
import { Search, Hammer, TrendingUp, BarChart2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const steps: {
  num: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  detail: string;
  accent: string;
}[] = [
  {
    num: "01",
    title: "Discovery & Strategy",
    desc: "We analyze your market, competitors, and current digital presence to design a growth system tailored to your business goals and service area.",
    icon: Search,
    detail: "Market analysis · Competitor mapping · Growth blueprint",
    accent: "text-primary-accent",
  },
  {
    num: "02",
    title: "Build & Launch",
    desc: "Your premium website, lead funnels, and ad infrastructure are custom-built and launched — typically within 2–3 weeks, ready to generate leads from day one.",
    icon: Hammer,
    detail: "Custom dev · CMS setup · Ad account launch",
    accent: "text-accent-green",
  },
  {
    num: "03",
    title: "Optimize & Scale",
    desc: "We run your ads, refine your SEO, A/B test your pages, and continuously optimize for more leads and lower cost per acquisition.",
    icon: TrendingUp,
    detail: "CRO testing · SEO refinement · Ad optimization",
    accent: "text-primary",
  },
  {
    num: "04",
    title: "Measure & Grow",
    desc: "Monthly reporting, strategy calls, and system expansion — we grow with you as your business scales into new markets and service areas.",
    icon: BarChart2,
    detail: "Monthly reports · Strategy calls · Market expansion",
    accent: "text-accent-secondary",
  },
];

export function ProcessPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.4"],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="process" className="section-seam">
      <Container>
        {/* Header */}
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
                How We Work
              </span>
            </div>
          </motion.div>
          <motion.h2
            variants={fadeIn}
            className="text-4xl md:text-5xl lg:text-[3.25rem] font-heading font-bold text-text-primary tracking-[-0.025em] leading-[1.05] max-w-2xl"
          >
            From strategy to{" "}
            <span className="text-gradient-brand">results.</span>
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="mt-5 text-base md:text-lg text-text-secondary font-light max-w-xl text-pretty"
          >
            A clear, disciplined process designed to get your growth system live
            fast — and keep it performing month after month.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div ref={containerRef} className="relative max-w-4xl">
          {/* Vertical timeline rail */}
          <div className="hidden md:block absolute left-[52px] top-0 bottom-0 w-px bg-white/[0.04]">
            {/* Animated fill */}
            <motion.div
              style={{ height: progressHeight }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-primary-accent to-accent-green origin-top"
            />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="flex flex-col gap-3"
          >
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className="group flex items-start gap-6 md:gap-10 py-7 md:py-9 relative"
                >
                  {/* Step node */}
                  <div className="relative z-10 flex-shrink-0 md:ml-[0px]">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="w-[72px] h-[72px] md:w-[104px] md:h-[104px] rounded-2xl flex flex-col items-center justify-center gap-2 relative overflow-hidden transition-all duration-500"
                      style={{
                        background: "linear-gradient(145deg, #0D1220, #070A10)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {/* Hover glow */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ boxShadow: "inset 0 1px 0 rgba(168,85,247,0.3), 0 0 28px rgba(124,58,237,0.12)" }}
                      />
                      <Icon className={`w-5 h-5 ${step.accent} opacity-70 group-hover:opacity-100 transition-opacity duration-300`} strokeWidth={1.5} />
                      <span className="text-[13px] font-heading font-bold text-text-primary/70 group-hover:text-text-primary transition-colors duration-300">
                        {step.num}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="pt-2 flex-1 pb-2">
                    <div className="flex flex-wrap items-center gap-3 mb-2.5">
                      <h4 className="text-xl md:text-2xl font-heading font-bold text-text-primary tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-text-primary group-hover:to-primary-accent transition-all duration-500">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-sm md:text-[15px] text-text-secondary leading-relaxed font-light mb-3 max-w-lg text-pretty">
                      {step.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {step.detail.split(" · ").map((d) => (
                        <span
                          key={d}
                          className="text-[10px] font-mono text-text-muted bg-surface border border-border px-2.5 py-1 rounded-md"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Step connector line (mobile) */}
                  {i < steps.length - 1 && (
                    <div className="md:hidden absolute left-9 bottom-0 w-px h-3 bg-gradient-to-b from-border to-transparent" />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
