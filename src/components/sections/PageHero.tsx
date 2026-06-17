import { motion } from "framer-motion";
import { Check, type LucideIcon } from "lucide-react";
import { Container } from "../layout/Container";
import { Constellation } from "../ui/Constellation";
import { LinkButton } from "../ui/LinkButton";
import { fadeIn, staggerContainer } from "../../lib/motion";
import { siteConfig } from "../../data/site";

interface PageHeroProps {
  icon?: LucideIcon;
  eyebrow: string;
  title: string;
  intro: string;
  points?: string[];
}

export function PageHero({ icon: Icon, eyebrow, title, intro, points }: PageHeroProps) {
  return (
    <section className="relative bg-navy overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="absolute inset-0 z-0 opacity-70">
        <Constellation nodeCount={32} opacity={0.6} />
      </div>
      <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-teal blur-[160px] opacity-20 pointer-events-none" />

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.div variants={fadeIn} className="flex items-center gap-3 mb-6">
            {Icon && (
              <span className="w-11 h-11 rounded-xl bg-teal/15 border border-teal/30 flex items-center justify-center">
                <Icon className="w-5 h-5 text-teal-light" strokeWidth={2.2} />
              </span>
            )}
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-light">
              {eyebrow}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeIn}
            className="font-heading font-bold text-white tracking-tight leading-[1.05] text-4xl md:text-5xl lg:text-6xl mb-6"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={fadeIn}
            className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl text-pretty"
          >
            {intro}
          </motion.p>

          {points && points.length > 0 && (
            <motion.ul variants={fadeIn} className="mt-8 flex flex-col gap-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-teal flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-slate-200 font-medium">{point}</span>
                </li>
              ))}
            </motion.ul>
          )}

          <motion.div variants={fadeIn} className="mt-10 flex flex-wrap gap-4">
            <LinkButton to="/contact" variant="primary" size="lg" className="bg-teal hover:bg-teal-light">
              Book a Discovery Call
            </LinkButton>
            <LinkButton href={`mailto:${siteConfig.emails.sales}`} variant="white" size="lg">
              Talk to Sales
            </LinkButton>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
