import { motion } from "framer-motion";
import { ArrowRight, Clock, ShieldCheck, MapPin } from "lucide-react";
import { Container } from "../layout/Container";
import { LinkButton } from "../ui/LinkButton";
import { fadeIn, staggerContainer } from "../../lib/motion";
import { siteConfig } from "../../data/site";

interface CTASectionProps {
  heading?: string;
  subtext?: string;
}

const trustPoints = [
  { icon: Clock, label: "Live in 48 hours" },
  { icon: ShieldCheck, label: "Defined SLAs, no lock-in" },
  { icon: MapPin, label: "US-based · Sheridan, WY" },
];

export function CTASection({
  heading = "Let's build the team behind your next stage of growth.",
  subtext = "Book a 20-minute discovery call. We'll map your operation, scope the right team, and show you exactly how fast we can stand it up.",
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-navy py-24 md:py-32">
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-teal blur-[120px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-teal blur-[120px] opacity-20 pointer-events-none" />

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
        >
          <motion.h2
            variants={fadeIn}
            className="font-heading font-bold text-white text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.08] mb-6"
          >
            {heading}
          </motion.h2>
          <motion.p variants={fadeIn} className="text-lg text-slate-300 leading-relaxed mb-10 max-w-2xl">
            {subtext}
          </motion.p>
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <LinkButton to="/contact" size="lg" className="bg-teal hover:bg-teal-light">
              Book a Discovery Call
              <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
            </LinkButton>
            <LinkButton href={`mailto:${siteConfig.emails.sales}`} variant="white" size="lg">
              Email Sales
            </LinkButton>
          </motion.div>
          <motion.div
            variants={fadeIn}
            className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3"
          >
            {trustPoints.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-slate-400 text-sm">
                <Icon className="w-4 h-4 text-teal" strokeWidth={2} />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
