import { motion } from "framer-motion";
import { ChevronsRight } from "lucide-react";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { IllustrationSlot } from "../ui/IllustrationSlot";
import { MarkerAccent } from "../ui/MarkerAccent";
import { fadeIn, staggerContainer } from "../../lib/motion";
import { siteConfig } from "../../data/site";
import emailImg from "../../assets/office/Email-treemate.png";
import callImg from "../../assets/office/Callus-treemate.png";
import visitImg from "../../assets/office/reception.jpg";
interface ContactCard {
  eyebrow: string;
  title: string;
  value: string;
  href: string;
  external?: boolean;
  filename: string;
  src: string;
}
const cards: ContactCard[] = [
  {
    eyebrow: "Email Us",
    title: "Start a conversation",
    value: siteConfig.emails.primary,
    href: `mailto:${siteConfig.emails.primary}`,
    filename: "office/Email-treemate.png",
    src: emailImg,
  },
  {
    eyebrow: "Call Us",
    title: "Talk to the team",
    value: siteConfig.phone.display,
    href: siteConfig.phone.href,
    filename: "office/Callus-treemate.png",
    src: callImg,
  },
  {
    eyebrow: "Visit Us",
    title: "Come by the office",
    value: siteConfig.address.full,
    href: siteConfig.address.mapsUrl,
    external: true,
    filename: "office/reception.jpg",
    src: visitImg,
  },
];
export function ContactCards() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-page">
      {}
      <MarkerAccent
        variant="star"
        className="absolute top-24 right-[6%] w-12 h-12 opacity-55"
        color="#0D9488"
        rotate={-12}
      />
      <MarkerAccent
        variant="arrow"
        className="absolute top-1/2 left-[3%] w-16 h-12 opacity-40"
        color="#0D9488"
        rotate={-40}
      />
      <Container>
        <div className="grid lg:grid-cols-12 gap-8 mb-14 md:mb-20 items-end">
          <div className="lg:col-span-8">
            <SectionTitle
              title="Get in Touch Today"
              subtitle="Let's build the loop behind your next stage of growth. Whether you need consulting, custom software, or a full operations partner — Treemate is here to help."
              align="left"
              className="mb-0 max-w-none"
            />
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">
              US · Australia
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
          {cards.map((c) => (
            <motion.a
              key={c.eyebrow}
              variants={fadeIn}
              href={c.href}
              {...(c.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group flex flex-col"
            >
              <IllustrationSlot
                src={c.src}
                aspect="aspect-[4/3]"
                filenameHint={c.filename}
                alt={c.eyebrow}
                className="mb-6 rounded-xl overflow-hidden"
                imgClassName="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal mb-2">
                {c.eyebrow}
              </span>
              <h3 className="font-heading font-bold text-xl text-ink mb-3">
                {c.title}
              </h3>
              <p className="text-ink/80 leading-relaxed mb-4 flex-1 break-words">
                {c.value}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink group-hover:text-teal transition-colors">
                {c.eyebrow}
                <ChevronsRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={2.4}
                />
              </span>
            </motion.a>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
