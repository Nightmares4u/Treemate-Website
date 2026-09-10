import { motion } from "framer-motion";
import { ChevronsRight } from "lucide-react";
import { Container } from "../layout/Container";
import { LinkButton } from "../ui/LinkButton";
import { IllustrationSlot } from "../ui/IllustrationSlot";
import { BackgroundSpirals } from "../ui/BackgroundSpirals";
import { CornerMarks } from "../ui/CornerMarks";
import { Reveal } from "../motion/Reveal";
import { AnimatedHeadline } from "../motion/AnimatedHeadline";
import { fadeIn, staggerContainer } from "../../lib/motion";
import heroMeeting from "../../assets/illustrations/hero-meeting.webp";
import bigTreeLogo from "../../assets/logo-treemate.png";
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F8F9FA] min-h-[100svh] flex flex-col pt-20 lg:pt-24 pb-4 lg:pb-8">
      {}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-100" />
      {}
      <BackgroundSpirals side="both" opacity={0.2} />
      {}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[10%] left-[15%] w-[800px] h-[700px] rounded-[100%] bg-[#A7F3D0]/50 blur-[130px] transform-gpu"
      />
      <Container className="relative z-10 w-full flex-1 flex flex-col justify-between h-full gap-4 lg:gap-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col w-full mt-8 lg:mt-12"
        >
          {}
          <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-8">
            {}
            <h1
              className="font-heading font-normal tracking-tight leading-[1.1]"
              style={{
                fontSize: "clamp(3rem, 6.5vw, 6.5rem)",
                color: "#0A1628",
              }}
            >
              <AnimatedHeadline as="span" text="Empowering" className="inline-block" />
              <br />
              <span className="relative inline-block">
                <AnimatedHeadline
                  as="span"
                  text="Global Businesses"
                  delay={0.3}
                  className="relative z-10 inline-block"
                />
              </span>
            </h1>
            {}
            <motion.div
              variants={fadeIn}
              className="hidden lg:block w-[140px] xl:w-[180px] shrink-0 pt-2"
            >
              <img
                src={bigTreeLogo}
                alt="Treemate Large Logo"
                className="w-full h-auto object-contain object-right"
              />
            </motion.div>
          </div>
          {}
          <motion.p
            variants={fadeIn}
            className="mt-6 max-w-[800px] text-sm md:text-base leading-relaxed font-mono tracking-tight"
            style={{ color: "#0A1628" }}
          >
            From startups to multinational corporations, we deliver scalable,
            reliable, and cost-effective services to address your unique
            challenges.
          </motion.p>
        </motion.div>
        {}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mt-2 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-end"
        >
          {}
          <Reveal
            variant="frame"
            as="div"
            className="lg:col-span-7 xl:col-span-6 lg:ml-8 xl:ml-12 relative"
          >
            <CornerMarks color="#0D9488" opacity={0.55} size={18} inset={-2} />
            <IllustrationSlot
              src={heroMeeting}
              aspect="aspect-[4/3]"
              filenameHint="illustrations/hero-meeting.webp"
              alt="Team collaborating"
              loading="eager"
              className="w-full h-full max-w-3xl"
              imgClassName="w-full h-full object-contain object-bottom left-0 max-h-[40vh] lg:max-h-[44vh]"
            />
          </Reveal>
          {}
          <div className="lg:col-span-5 xl:col-start-8 flex flex-col gap-6 lg:ml-8 xl:ml-12 self-center relative -top-7 lg:-top-10">
            {}
            <p
              className="text-sm md:text-base leading-relaxed font-mono tracking-tight max-w-[420px]"
              style={{ color: "#0A1628" }}
            >
              Transform your business with expert engineering, seamless
              migrations, and innovative digital solutions, no matter where you
              are.
            </p>
            {}
            <div className="flex flex-wrap items-center gap-6">
              <LinkButton
                to="/contact"
                size="md"
                className="bg-[#1C2C3F] text-white hover:bg-[#1C2C3F]/90 rounded-none px-6 py-3 font-heading font-medium tracking-wide flex items-center"
              >
                Book A Meeting
                <ChevronsRight className="w-5 h-5 ml-1" strokeWidth={2} />
              </LinkButton>
              <a
                href="#case-studies"
                className="font-heading font-bold text-sm underline underline-offset-4 decoration-2 hover:decoration-[#0A1628] transition-all"
                style={{
                  color: "#0A1628",
                  textDecorationColor: "rgba(10, 22, 40, 0.8)",
                }}
              >
                View Case Studies
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
