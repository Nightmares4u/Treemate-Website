import { motion } from "framer-motion";
import { ChevronsRight, Globe2, ShieldCheck, MapPin } from "lucide-react";
import { Container } from "../layout/Container";
import { LinkButton } from "../ui/LinkButton";
import { BackgroundSpirals } from "../ui/BackgroundSpirals";
import { MarkerAccent } from "../ui/MarkerAccent";
import { HighlighterMark } from "../ui/HighlighterMark";
import { blurIn, fadeIn, staggerContainer } from "../../lib/motion";
import { siteConfig } from "../../data/site";
interface CTASectionProps {
  heading?: string;
  subtext?: string;
}
const trustPoints = [
  { icon: Globe2, label: "US & Australia" },
  { icon: ShieldCheck, label: "US & Fair Work compliant" },
  { icon: MapPin, label: "HQ in Sheridan, WY" },
];
export function CTASection({
  heading = "Let's build the loop behind your next stage of growth.",
  subtext = "Book a 20-minute discovery call. We'll map your operation and show you how the software, the staffing, and the support come together as one integrated system.",
}: CTASectionProps) {
  const parts = heading.split(/(loop)/i);
  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-32">
      <BackgroundSpirals side="both" opacity={0.18} />
      <MarkerAccent
        variant="star"
        className="absolute top-24 right-[6%] w-12 h-12 opacity-60"
        color="#0D9488"
        rotate={20}
      />
      <MarkerAccent
        variant="scribble"
        className="absolute bottom-28 left-[5%] w-24 h-16 opacity-55"
        color="#0D9488"
        rotate={-12}
      />
      <MarkerAccent
        variant="arrow"
        className="absolute bottom-32 right-[8%] w-20 h-14 opacity-45"
        color="#0D9488"
        rotate={-140}
      />
      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start"
        >
          {}
          <div className="lg:col-span-7">
            <motion.p
              variants={fadeIn}
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal mb-5"
            >
              Next Step
            </motion.p>
            <motion.h2
              variants={blurIn}
              className="font-heading font-semibold text-navy leading-[0.95] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.75rem)" }}
            >
              {parts.map((part, i) =>
                part.toLowerCase() === "loop" ? (
                  <span key={i} className="relative inline-block">
                    <HighlighterMark
                      color="#B8F0DC"
                      opacity={0.75}
                      rotate={-1.4}
                      className="absolute left-[-4%] right-[-4%] top-[18%] bottom-[10%] w-[108%] h-[72%] -z-10"
                    />
                    <span className="relative z-10">{part}</span>
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                ),
              )}
            </motion.h2>
          </div>
          {}
          <motion.div
            variants={fadeIn}
            className="lg:col-span-5 flex flex-col gap-8 lg:pt-4"
          >
            <p className="text-navy/80 leading-relaxed max-w-md">{subtext}</p>
            <div className="flex flex-wrap items-center gap-6">
              <LinkButton to="/contact" size="lg" variant="primary">
                Book a Discovery Call
                <ChevronsRight className="w-4 h-4" strokeWidth={2.4} />
              </LinkButton>
              <a
                href={`mailto:${siteConfig.emails.sales}`}
                className="text-navy font-semibold text-sm underline underline-offset-4 decoration-navy/40 hover:decoration-navy transition-colors"
              >
                Email sales
              </a>
            </div>
            {}
            <ul className="flex flex-col gap-3 pt-6 border-t border-navy/10">
              {trustPoints.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2.5 text-navy/70 text-sm font-mono"
                >
                  <Icon className="w-4 h-4 text-teal" strokeWidth={2} />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
