import { motion } from "framer-motion";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { IllustrationSlot } from "../ui/IllustrationSlot";
import { MarkerAccent } from "../ui/MarkerAccent";
import { BackgroundSpirals } from "../ui/BackgroundSpirals";
import { fadeIn, staggerContainer } from "../../lib/motion";
import founder1 from "../../assets/team/Ibraheem-treemate.jpeg";
import founder2 from "../../assets/team/yashal-treemate.jpeg";
import founder3 from "../../assets/team/sir-raza-portrait.png";
const executives = [
  {
    name: "Syed Yashal Raza",
    role: "CEO, Treemate US",
    photo: "team/yashal-treemate.jpeg",
    src: founder2,
    bio: "Yashal pairs technical depth with entrepreneurial execution. A Computer Science student at the University of Alberta, he has built enterprise-grade systems as an AI Systems Engineer at Systems Ltd. and sharpened his auditing edge at KPMG. As CEO, he architects the technology and human capital systems that let businesses scale without friction.",
  },
  {
    name: "Syed Ibraheem Hashmi",
    role: "Co-Founder & COO, Treemate US",
    photo: "team/Ibraheem-treemate.jpeg",
    src: founder1,
    bio: "Ibraheem combines full-stack development with a strong background in BPO operations. Previously at IBEX Global, he spent 5 years running high-volume campaigns for major accounts like Walmart and SquareTrade. As COO, he leverages his mastery of pipeline management and agent performance systems to build the scalable operational blueprints that power Treemate.",
  },
];
export function MeetTheTeam() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-page">
      {}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.90] scale-[1.2] lg:scale-100 overflow-hidden">
        <BackgroundSpirals />
      </div>
      <MarkerAccent
        variant="star"
        className="absolute top-[15%] left-[10%] w-12 h-12 opacity-50 z-0 pointer-events-none"
        color="#0D9488"
        rotate={-15}
      />
      <MarkerAccent
        variant="star"
        className="absolute top-[45%] right-[15%] w-8 h-8 opacity-50 z-0 pointer-events-none"
        color="#0D9488"
        rotate={45}
      />
      <MarkerAccent
        variant="scribble"
        className="absolute bottom-[20%] left-[5%] w-20 h-14 opacity-40 z-0 pointer-events-none"
        color="#0D9488"
        rotate={8}
      />
      <MarkerAccent
        variant="arrow"
        className="absolute top-[30%] right-[5%] w-16 h-12 opacity-40 z-0 pointer-events-none"
        color="#0D9488"
        rotate={-135}
      />
      <MarkerAccent
        variant="star"
        className="absolute bottom-[35%] left-[20%] w-10 h-10 opacity-30 z-0 pointer-events-none"
        color="#0D9488"
        rotate={15}
      />
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 mb-16 md:mb-24 items-end">
          <div className="lg:col-span-8">
            <SectionTitle
              title="Meet the Leadership"
              subtitle="The people behind Treemate — combining executive rigor, engineering depth, and operational scale."
              align="left"
              className="mb-0 max-w-none"
            />
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">
              Leadership · US & Australia
            </p>
          </div>
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-20"
        >
          {}
          <motion.div
            variants={fadeIn}
            className="group grid grid-cols-1 lg:grid-cols-[1fr_420px_1fr] xl:grid-cols-[1fr_460px_1fr] gap-8 lg:gap-10 xl:gap-16 items-center max-w-[1600px] mx-auto w-full px-4 lg:px-6"
          >
            {}
            <div className="hidden lg:block"></div>
            {}
            <div className="flex justify-center w-full">
              <div className="w-full">
                <IllustrationSlot
                  src={founder3}
                  aspect="aspect-square"
                  filenameHint="sir-raza-portrait.png"
                  alt="Syed Raza — Chairman, Treemate US"
                  className="u-media rounded-[3rem] overflow-hidden w-full shadow-lg ring-1 ring-ink/5 transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-teal/10"
                  imgClassName="object-cover object-top"
                />
              </div>
            </div>
            {}
            <div className="flex flex-col justify-center text-center lg:text-left">
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-ink transition-colors duration-300 group-hover:text-teal">
                Syed Raza
              </h3>
              <p className="text-[15px] text-teal font-semibold mt-1 mb-4">
                Chairman, Treemate US
              </p>
              <p className="text-ink/70 leading-relaxed text-[15px]">
                Syed Raza brings 25+ years of executive leadership across
                engineering, finance, and pharma. As Lead Project Manager at
                Siemens, he delivered complex initiatives at enterprise scale.
                As CFO, he commanded capital planning, and across 15 years in
                corporate pharma, he mastered rigorous compliance. As Chairman,
                he brings that same precision and governance to Treemate US.
              </p>
            </div>
          </motion.div>
          {}
          <div className="flex flex-col md:flex-row justify-center items-start gap-16 lg:gap-32 max-w-6xl mx-auto w-full px-4 lg:px-8">
            {executives.map((f, i) => (
              <motion.figure
                key={i}
                variants={fadeIn}
                className="flex flex-col w-full md:max-w-[420px] text-center mx-auto"
              >
                <IllustrationSlot
                  src={f.src}
                  aspect="aspect-square"
                  filenameHint={f.photo}
                  alt={`${f.name} — ${f.role}`}
                  className="mb-6 rounded-[2rem] overflow-hidden shadow-sm"
                  imgClassName="object-cover object-top"
                />
                <figcaption className="flex flex-col flex-grow px-2">
                  <div className="font-heading font-bold text-2xl text-ink leading-tight">
                    {f.name}
                  </div>
                  <div className="text-[15px] text-teal font-semibold mt-1 mb-4">
                    {f.role}
                  </div>
                  <p className="text-[15px] text-ink/70 leading-relaxed">
                    {f.bio}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
