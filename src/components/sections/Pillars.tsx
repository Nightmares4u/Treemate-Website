import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronsRight } from "lucide-react";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { IllustrationSlot } from "../ui/IllustrationSlot";
import { MarkerAccent } from "../ui/MarkerAccent";
import { RevealGroup } from "../motion/Reveal";
import customSoftwareSvg from "../../assets/illustrations/our-expertise/custom-software.svg";
import aiPoweredSvg from "../../assets/illustrations/our-expertise/Ai-powered.svg";
import staffMeetSvg from "../../assets/illustrations/our-expertise/staff-meet.svg";
import payrollSvg from "../../assets/illustrations/our-expertise/payroll.svg";
import tieredConnectionSvg from "../../assets/illustrations/our-expertise/tiered-connection.svg";
import aiLoopSvg from "../../assets/illustrations/our-expertise/ai-loop.svg";
interface Capability {
  pillar: string;
  pillarSlug: string;
  title: string;
  description: string;
  filename: string;
  src?: string;
}
const capabilities: Capability[] = [
  {
    pillar: "Software & AI",
    pillarSlug: "software-ai",
    title: "Custom Enterprise Software",
    description:
      "Bespoke CRM, HRM, and POS systems that replace fragmented tools with one unified platform.",
    filename: "illustrations/our-expertise/custom-software.svg",
    src: customSoftwareSvg,
  },
  {
    pillar: "Software & AI",
    pillarSlug: "software-ai",
    title: "AI-Powered Integrations",
    description:
      "Generative AI, predictive analytics, and intelligent automation embedded where it earns its keep.",
    filename: "illustrations/our-expertise/Ai-powered.svg",
    src: aiPoweredSvg,
  },
  {
    pillar: "HR Solutions",
    pillarSlug: "hr-solutions",
    title: "Talent Acquisition & Staffing",
    description:
      "Specialized talent sourced, vetted, and onboarded for your US roles.",
    filename: "illustrations/our-expertise/staff-meet.svg",
    src: staffMeetSvg,
  },
  {
    pillar: "HR Solutions",
    pillarSlug: "hr-solutions",
    title: "Payroll & Compliance",
    description:
      "Cross-border payroll and strict US (Federal/State) + Pakistani labor-law compliance.",
    filename: "illustrations/our-expertise/payroll.svg",
    src: payrollSvg,
  },
  {
    pillar: "Marketing",
    pillarSlug: "marketing",
    title: "Growth & Performance Marketing",
    description:
      "Paid ads, technical SEO, brand strategy, graphic design, and video production engineered for ROAS.",
    filename: "illustrations/our-expertise/Ai-powered.svg",
    src: aiPoweredSvg,
  },
  {
    pillar: "Customer Success",
    pillarSlug: "customer-success",
    title: "Tiered, Omnichannel Support",
    description:
      "Tier 1 to Tier 3 agents on phone, email, chat, and social — inside your custom CRM.",
    filename: "illustrations/our-expertise/tiered-connection.svg",
    src: tieredConnectionSvg,
  },
  {
    pillar: "Customer Success",
    pillarSlug: "customer-success",
    title: "Human-in-the-Loop AI",
    description:
      "AI pre-triages tickets and suggests resolutions; humans stay in control of every reply.",
    filename: "illustrations/our-expertise/ai-loop.svg",
    src: aiLoopSvg,
  },
];
export function Pillars() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-cream">
      {}
      <MarkerAccent
        variant="scribble"
        className="absolute top-24 right-[5%] w-20 h-14 opacity-55"
        color="#0D9488"
        rotate={12}
      />
      <MarkerAccent
        variant="star"
        className="absolute bottom-32 left-[4%] w-12 h-12 opacity-55"
        color="#0D9488"
        rotate={-18}
      />
      <MarkerAccent
        variant="arrow"
        className="absolute top-1/2 left-[2%] w-16 h-12 opacity-45"
        color="#0D9488"
        rotate={-30}
      />
      <Container>
        <div className="grid lg:grid-cols-12 gap-8 mb-14 md:mb-20 items-end">
          <div className="lg:col-span-8">
            <SectionTitle
              title="Our Expertise"
              subtitle="Integrated operational pillars, one accountable partner — software-first, marketing-driven, staffed by us, backed by AI."
              align="left"
              className="mb-0 max-w-none"
            />
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">
              Software · Marketing · HR · Support
            </p>
          </div>
        </div>
        <RevealGroup
          as="div"
          variant="scale"
          stagger={0.1}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {capabilities.map((c) => (
            <article
              key={c.title}
              className="group flex flex-col rounded-2xl transition-transform duration-300 ease-out hover:-translate-y-1"
            >
              <IllustrationSlot
                src={c.src}
                aspect="aspect-[4/3]"
                filenameHint={c.filename}
                alt={c.title}
                className="mb-8 rounded-xl overflow-hidden p-4 lg:p-8 transition-[filter] duration-300 group-hover:drop-shadow-[0_12px_24px_rgba(13,148,136,0.25)]"
                imgClassName="object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal mb-2">
                {c.pillar}
              </span>
              <h3 className="font-heading font-bold text-xl text-navy leading-snug mb-3">
                {c.title}
              </h3>
              <p className="text-sm text-navy/70 leading-relaxed">
                {c.description}
              </p>
            </article>
          ))}
        </RevealGroup>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 flex justify-center"
        >
          <Link
            to="/software-ai"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-navy text-cream text-sm font-bold uppercase tracking-[0.1em] transition-all hover:bg-teal hover:scale-[1.02] active:scale-[0.98]"
          >
            Explore Our Solutions
            <ChevronsRight className="w-4.5 h-4.5" strokeWidth={2} />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
