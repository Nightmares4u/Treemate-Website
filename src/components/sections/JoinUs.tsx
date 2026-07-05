import { motion } from "framer-motion";
import { ChevronsRight } from "lucide-react";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { IllustrationSlot } from "../ui/IllustrationSlot";
import { LinkButton } from "../ui/LinkButton";
import { MarkerAccent } from "../ui/MarkerAccent";
import { fadeIn, staggerContainer } from "../../lib/motion";
import { siteConfig } from "../../data/site";
import inclusiveImg from "../../assets/office/office-1.jpeg";
import flexibleImg from "../../assets/office/office-2.jpeg";
import recognitionImg from "../../assets/office/office-3.jpeg";
interface Pillar {
  title: string;
  description: string;
  filename: string;
  src: string;
}
const pillars: Pillar[] = [
  {
    title: "Inclusive Environment",
    description:
      "We hire across the US and Australia — cultures, backgrounds, and time zones — and design work around what makes each team member effective.",
    filename: "office/office-1.jpeg",
    src: inclusiveImg,
  },
  {
    title: "Flexible Work Options",
    description:
      "Work remotely, on-site, or in a hybrid setup that fits your life. Our HRM is built to support the flexibility we promise.",
    filename: "office/office-2.jpeg",
    src: flexibleImg,
  },
  {
    title: "Recognition & Rewards",
    description:
      "Your contributions are noticed. We celebrate impact — with clear career paths, competitive pay, and ownership stakes where it applies.",
    filename: "office/office-3.jpeg",
    src: recognitionImg,
  },
];
export function JoinUs() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-cream-soft">
      {}
      <MarkerAccent
        variant="scribble"
        className="absolute top-24 right-[5%] w-20 h-14 opacity-55"
        color="#0D9488"
        rotate={14}
      />
      <MarkerAccent
        variant="star"
        className="absolute bottom-24 left-[5%] w-12 h-12 opacity-55"
        color="#0D9488"
        rotate={-20}
      />
      <MarkerAccent
        variant="arrow"
        className="absolute top-1/2 left-[3%] w-16 h-12 opacity-45"
        color="#0D9488"
        rotate={35}
      />
      <Container>
        <div className="grid lg:grid-cols-12 gap-8 mb-14 md:mb-20 items-end">
          <div className="lg:col-span-8">
            <SectionTitle
              title="Join Us"
              subtitle="Looking for a career where you can innovate and make an impact? Treemate is always on the lookout for passionate people to join our growing team."
              align="left"
              className="mb-0 max-w-none"
            />
          </div>
          <div className="lg:col-span-4 lg:justify-self-end flex flex-col items-start lg:items-end gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">
              Announcement · We're hiring
            </p>
            <LinkButton
              href={`mailto:${siteConfig.emails.sales}?subject=Careers%20at%20Treemate`}
              size="md"
              variant="primary"
            >
              Join our team
              <ChevronsRight className="w-4 h-4" strokeWidth={2.4} />
            </LinkButton>
          </div>
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-3 gap-10 md:gap-8"
        >
          {pillars.map((p) => (
            <motion.article
              key={p.title}
              variants={fadeIn}
              className="flex flex-col"
            >
              <IllustrationSlot
                src={p.src}
                aspect="aspect-[4/3]"
                filenameHint={p.filename}
                alt={p.title}
                className="mb-6 rounded-xl overflow-hidden"
                imgClassName="object-cover"
              />
              <h3 className="font-heading font-bold text-xl text-navy mb-3">
                {p.title}
              </h3>
              <p className="text-navy/70 leading-relaxed">{p.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
