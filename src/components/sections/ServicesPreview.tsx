import { motion } from "framer-motion";
import { Container } from "../layout/Container";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { fadeIn, staggerContainer } from "../../lib/motion";
import { Globe, Target, Megaphone, Search, Settings, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  glowColor: string;
  featured?: boolean;
}

const services: ServiceItem[] = [
  {
    title: "High-Converting Websites",
    description:
      "Premium, mobile-first websites engineered to convert visitors into leads — built for speed, trust, and local search visibility. Every pixel serves a purpose.",
    icon: Globe,
    accent: "text-primary-accent",
    glowColor: "rgba(168,85,247,0.12)",
    featured: true,
  },
  {
    title: "Local Lead Generation",
    description:
      "End-to-end systems that capture, qualify, and route leads directly to your team — forms, call tracking, and funnel automation.",
    icon: Target,
    accent: "text-accent-green",
    glowColor: "rgba(125,255,77,0.08)",
  },
  {
    title: "Paid Ads & Landing Pages",
    description:
      "Google and Meta ad campaigns paired with conversion-focused landing pages engineered to maximize every dollar of ad spend.",
    icon: Megaphone,
    accent: "text-primary",
    glowColor: "rgba(124,58,237,0.10)",
  },
  {
    title: "SEO & Search Visibility",
    description:
      "Technical SEO, local map pack optimization, and content strategy that compounds your organic visibility over time.",
    icon: Search,
    accent: "text-accent-secondary",
    glowColor: "rgba(50,213,131,0.08)",
  },
  {
    title: "Monthly Optimization",
    description:
      "Ongoing performance management — analytics reviews, A/B testing, content updates, and system maintenance.",
    icon: Settings,
    accent: "text-primary-accent",
    glowColor: "rgba(168,85,247,0.10)",
  },
];

function FeaturedCard({ service }: { service: ServiceItem }) {
  const Icon = service.icon;
  return (
    <motion.div variants={fadeIn} className="group md:row-span-2 h-full min-h-[360px] md:min-h-0">
      {/* Outer gradient border wrapper */}
      <div
        className="relative h-full rounded-2xl p-px overflow-hidden"
        style={{
          background: "linear-gradient(180deg, rgba(168,85,247,0.35) 0%, rgba(124,58,237,0.12) 40%, rgba(125,255,77,0.10) 100%)",
        }}
      >
      <div
        className="relative h-full rounded-[15px] overflow-hidden cursor-pointer"
        style={{
          background: "linear-gradient(145deg, #0D1220, #080B12)",
        }}
      >
        {/* Gradient glow core */}
        <div
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-[90px] opacity-40 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none"
          style={{ background: service.glowColor }}
        />
        {/* Grid texture */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-50" />

        {/* Bottom border accent */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 flex flex-col h-full p-8 md:p-10 justify-between">
          {/* Top: number + icon */}
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-mono text-text-muted">01</span>
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center group-hover:bg-primary/15 group-hover:border-primary/40 transition-all duration-300">
              <Icon className={`w-5 h-5 ${service.accent}`} strokeWidth={1.75} />
            </div>
          </div>

          {/* Bottom: content */}
          <div>
            <h3 className="text-2xl md:text-[1.625rem] font-heading font-bold text-text-primary mb-3 tracking-tight leading-tight">
              {service.title}
            </h3>
            <p className="text-sm md:text-[15px] text-text-secondary leading-relaxed font-light mb-5 text-pretty">
              {service.description}
            </p>
            <div className="flex items-center gap-1.5 text-primary-accent text-sm font-medium group-hover:gap-2.5 transition-all duration-200">
              <span>Learn more</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </div>
          </div>
        </div>
      </div>
      </div>
    </motion.div>
  );
}

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const Icon = service.icon;
  return (
    <motion.div variants={fadeIn} className="group h-full">
      <div
        className="relative h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-500"
        style={{
          background: "linear-gradient(180deg, #0A0E16, #070A10)",
          border: "1px solid rgba(255,255,255,0.06)",
          minHeight: "160px",
        }}
      >
        {/* Hover glow */}
        <div
          className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: service.glowColor }}
        />
        {/* Bottom accent seam on hover */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 flex flex-col h-full p-6 md:p-7 gap-4">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-lg bg-surface border border-white/[0.06] flex items-center justify-center group-hover:border-primary/30 transition-colors duration-300">
              <Icon className={`w-4 h-4 ${service.accent}`} strokeWidth={1.75} />
            </div>
            <span className="text-[10px] font-mono text-text-muted">0{index + 2}</span>
          </div>

          <div>
            <h3 className="text-base font-heading font-semibold text-text-primary mb-1.5 tracking-tight">
              {service.title}
            </h3>
            <p className="text-xs md:text-[13px] text-text-secondary leading-relaxed font-light text-pretty">
              {service.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesPreview() {
  const [featured, ...rest] = services;

  return (
    <Section id="services" className="section-seam">
      <Container>
        <SectionHeading
          label="Growth Stack"
          title="Everything your business needs to grow."
          subtitle="From premium websites to local lead generation — we build the complete digital infrastructure that turns your online presence into a predictable growth engine."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
        >
          {/* Featured card spans 2 rows on md+ */}
          <FeaturedCard service={featured} />

          {/* 4 standard cards in 2×2 grid */}
          {rest.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
