import { motion } from "framer-motion";
import { Layers, GraduationCap, Award, type LucideIcon } from "lucide-react";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { fadeIn, staggerContainer, easeOutExpo } from "../../lib/motion";
import careerFair from "../../assets/office/career-fair.jpg";
interface Pillar {
  icon: LucideIcon;
  title: string;
  description: string;
}
const pillars: Pillar[] = [
  {
    icon: Layers,
    title: "Every level, one partner",
    description:
      "From entry-level specialists and mid-career professionals to senior leaders and executive hires — all staffed under a single managed relationship.",
  },
  {
    icon: GraduationCap,
    title: "A career-fair pipeline at scale",
    description:
      "An active recruiting presence at career fairs across the United States and Pakistan gives us a constant, pre-vetted pipeline of fresh and mid-level talent we can mobilize fast.",
  },
  {
    icon: Award,
    title: "Senior talent through corporate networks",
    description:
      "For hard-to-fill senior and executive roles, we tap established relationships with leading firms — including alumni of the Big Four — across both the US and Pakistan.",
  },
];
export function TalentNetwork() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <SectionTitle
          eyebrow="Talent Network"
          title="People at every level, sourced from a network that spans borders"
          subtitle="Need ten support specialists or one seasoned operator? We draw on a deep, two-sided talent network to put the right person in the role — at the right level, fast."
        />
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOutExpo }}
            className="relative overflow-hidden"
          >
            <div className="aspect-[3/2]">
              <img
                src={careerFair}
                alt="Treemate recruiters meeting candidates at a career fair"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/55 via-navy/5 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <p className="font-heading font-semibold text-white text-lg drop-shadow">
                Recruiting on the ground — US &amp; Pakistan
              </p>
            </div>
          </motion.div>
          {}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5"
          >
            {pillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                variants={fadeIn}
                className="flex gap-5 p-2 transition-colors"
              >
                <div className="w-12 h-12 shrink-0 rounded-xl bg-teal/10 flex items-center justify-center">
                  <pillar.icon className="w-6 h-6 text-teal" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-navy mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
