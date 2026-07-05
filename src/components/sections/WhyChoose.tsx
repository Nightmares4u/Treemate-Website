import { motion } from "framer-motion";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { IllustrationSlot } from "../ui/IllustrationSlot";
import { MarkerAccent } from "../ui/MarkerAccent";
import { fadeIn, staggerContainer } from "../../lib/motion";
import closedLoopImg from "../../assets/why-choose/one-loop.png";
import aiImg from "../../assets/why-choose/Gen-Ai.png";
import globalImg from "../../assets/why-choose/US-AUS.png";
interface Reason {
  title: string;
  description: string;
  filename: string;
  src: string;
}
const reasons: Reason[] = [
  {
    title: "One Closed Loop",
    description:
      "Software, staff, and support built to run as a single system — one accountable partner instead of four disconnected vendors.",
    filename: "/why-choose/one-loop.png",
    src: closedLoopImg,
  },
  {
    title: "AI Woven Through",
    description:
      "Generative AI, predictive analytics, and intelligent automation aren't add-ons. They're in the software we ship and the support we run.",
    filename: "/why-choose/Gen-Ai.png",
    src: aiImg,
  },
  {
    title: "US + Australia, Compliant",
    description:
      "We staff and operate across both markets, with strict adherence to US (Federal/State) and Australian (Fair Work) labor law.",
    filename: "/why-choose/US-AUS.png",
    src: globalImg,
  },
];
export function WhyChoose() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-cream">
      {}
      <MarkerAccent
        variant="scribble"
        className="absolute top-24 left-[5%] w-20 h-14 opacity-55"
        color="#0D9488"
        rotate={-14}
      />
      <MarkerAccent
        variant="star"
        className="absolute top-1/2 right-[4%] w-12 h-12 opacity-55"
        color="#0D9488"
        rotate={22}
      />
      <MarkerAccent
        variant="arrow"
        className="absolute bottom-24 left-[8%] w-16 h-12 opacity-50"
        color="#0D9488"
        rotate={45}
      />
      <Container>
        <div className="grid lg:grid-cols-12 gap-8 mb-14 md:mb-20 items-end">
          <div className="lg:col-span-8">
            <SectionTitle
              title="Why Choose Treemate?"
              subtitle="The advantage isn't any single service — it's that they're built to run as one system, so you get speed, accountability, and intelligence in every layer."
              align="left"
              className="mb-0 max-w-none"
            />
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">
              People-Powered · Tech-Enabled
            </p>
          </div>
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {reasons.map((r) => (
            <motion.article
              key={r.title}
              variants={fadeIn}
              className="flex flex-col"
            >
              <IllustrationSlot
                src={r.src}
                aspect="aspect-[4/3]"
                filenameHint={r.filename}
                alt={r.title}
                className="mb-6 rounded-xl overflow-hidden"
                imgClassName="object-cover"
              />
              <h3 className="font-heading font-bold text-xl text-navy mb-3">
                {r.title}
              </h3>
              <p className="text-navy/70 leading-relaxed">{r.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
