import { RevealGroup } from "../motion/Reveal";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { IllustrationSlot } from "../ui/IllustrationSlot";
import { MarkerAccent } from "../ui/MarkerAccent";
import innovationImg from "../../assets/illustrations/about-page/innovation.svg";
import reliabilityImg from "../../assets/illustrations/about-page/reliability.svg";
import collaborationImg from "../../assets/illustrations/about-page/team-collaboration.svg";
import integrityImg from "../../assets/illustrations/about-page/integrity.svg";
interface Value {
  title: string;
  description: string;
  filename: string;
  src: string;
}
const values: Value[] = [
  {
    title: "Innovation",
    description:
      "AI-first by default. Generative and predictive intelligence is built into every product we ship — not added later.",
    filename: "illustrations/about-page/innovation.svg",
    src: innovationImg,
  },
  {
    title: "Reliability",
    description:
      "Defined SLAs, 24/7 monitoring, and cloud infrastructure engineered for uptime — the fundamentals, done right.",
    filename: "illustrations/about-page/reliability.svg",
    src: reliabilityImg,
  },
  {
    title: "Collaboration",
    description:
      "One closed loop across software, staff, and support — because handoffs between vendors are where projects break.",
    filename: "illustrations/about-page/team-collaboration.svg",
    src: collaborationImg,
  },
  {
    title: "Integrity",
    description:
      "Transparent reporting, honest numbers, and a partnership model that stays accountable long after signing.",
    filename: "illustrations/about-page/integrity.svg",
    src: integrityImg,
  },
];
export function Values() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-cream-soft">
      {}
      <MarkerAccent
        variant="star"
        className="absolute top-24 right-[5%] w-12 h-12 opacity-55"
        color="#0D9488"
        rotate={20}
      />
      <MarkerAccent
        variant="scribble"
        className="absolute top-1/2 left-[3%] w-20 h-14 opacity-55"
        color="#0D9488"
        rotate={-14}
      />
      <MarkerAccent
        variant="arrow"
        className="absolute bottom-24 right-[6%] w-20 h-14 opacity-50"
        color="#0D9488"
        rotate={-125}
      />
      <Container>
        <div className="grid lg:grid-cols-12 gap-8 mb-14 md:mb-20 items-end">
          <div className="lg:col-span-8">
            <SectionTitle
              title="What We Stand For"
              subtitle="The values that shape how we build software, staff teams, and support customers — every engagement, every day."
              align="left"
              className="mb-0 max-w-none"
            />
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">
              Four principles · One partnership
            </p>
          </div>
        </div>
        <RevealGroup
          as="div"
          variant="scale"
          stagger={0.1}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10"
        >
          {values.map((v) => (
            <article
              key={v.title}
              className="group flex flex-col rounded-2xl transition-transform duration-300 ease-out hover:-translate-y-1"
            >
              <IllustrationSlot
                src={v.src}
                aspect="aspect-square"
                filenameHint={v.filename}
                alt={v.title}
                className="mb-8 rounded-2xl overflow-hidden transition-[filter] duration-300 group-hover:drop-shadow-[0_12px_24px_rgba(13,148,136,0.25)]"
                imgClassName="object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <h3 className="font-heading font-bold text-xl text-navy mb-3">
                {v.title}
              </h3>
              <p className="text-navy/70 leading-relaxed">{v.description}</p>
            </article>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
