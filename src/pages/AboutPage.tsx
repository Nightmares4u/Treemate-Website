import { motion } from "framer-motion";
import { Check, ServerCog, Database, PhoneCall, ShieldCheck, Building2, Code2, Briefcase } from "lucide-react";
import { Container } from "../components/layout/Container";
import { PageHero } from "../components/sections/PageHero";
import { CTASection } from "../components/sections/CTASection";
import { SectionTitle } from "../components/ui/SectionTitle";
import { fadeIn, staggerContainer } from "../lib/motion";
import { siteConfig } from "../data/site";
import { companyStats } from "../data/company";
import reception from "../assets/office/reception.jpg";

const techStack = [
  {
    icon: PhoneCall,
    title: "Contact-center platform",
    description:
      "Self-hosted ACD and predictive dialing engineered for high call volume, with intelligent routing and live queue monitoring.",
  },
  {
    icon: Database,
    title: "Integrated CRM",
    description:
      "An enterprise-grade CRM wired directly into our dialing stack, so every interaction is logged, searchable, and reportable.",
  },
  {
    icon: ServerCog,
    title: "Owned infrastructure",
    description:
      "We run our own servers and telephony instead of renting bloated retail software, which keeps uptime high and cost low.",
  },
  {
    icon: ShieldCheck,
    title: "Quality & security",
    description:
      "Call recording, QA scoring, and access controls built in — so quality and data handling are consistent at every seat.",
  },
];

const leadership = [
  {
    icon: PhoneCall,
    title: "Enterprise telecom",
    description: "Deep, hands-on experience architecting and running high-volume contact-center operations.",
  },
  {
    icon: Code2,
    title: "Software engineering",
    description: "In-house engineering that builds the automations and tools our operations run on.",
  },
  {
    icon: Briefcase,
    title: "High-ticket B2B sales",
    description: "A team that has sold and serviced enterprise accounts and knows what they expect.",
  },
];

const values = [
  { title: "Accountability first", desc: "Clear SLAs and transparent reporting. If it's not measurable, it's not a commitment." },
  { title: "Speed without shortcuts", desc: "We move in days, not months — and never at the expense of quality." },
  { title: "Own the stack", desc: "We control our infrastructure so we control uptime, cost, and the client experience." },
  { title: "Build, don't just staff", desc: "We engineer software that makes every team we run measurably faster." },
];

export function AboutPage() {
  return (
    <>
      <PageHero
        icon={Building2}
        eyebrow="About Treemate"
        title="A US-based partner built to outperform the traditional BPO."
        intro="Treemate is a technology-enabled outsourcing company headquartered in Wyoming. We pair dedicated, well-managed teams with infrastructure we own and software we build — so enterprise clients get the speed of a startup with the reliability of an established operation."
        points={[
          "Headquartered in Sheridan, Wyoming",
          "Operations, talent, and software under one roof",
          "Lean by design — speed and savings passed to clients",
        ]}
      />

      {/* Mission */}
      <section className="py-24 bg-base">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTitle
                eyebrow="Our approach"
                title="We removed the overhead that slows traditional agencies down."
                align="left"
                className="mb-6"
              />
              <div className="flex flex-col gap-4 text-slate-600 leading-relaxed text-lg">
                <p>
                  Most outsourcing firms are weighed down by heavy overhead and expensive third-party
                  software. That cost gets passed to clients as higher prices and slower timelines.
                </p>
                <p>
                  Treemate is built differently. By running our own enterprise-grade infrastructure and
                  keeping our structure lean, we deploy dedicated US-facing teams in as little as 48
                  hours and price aggressively without cutting corners on quality.
                </p>
                <p>
                  As we grow, we turn the operational lessons from our own floor into software — tools
                  that make every team we run faster and more accurate.
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-navy/10"
            >
              <div className="aspect-[4/5]">
                <img
                  src={reception}
                  alt="Treemate reception desk with the company logo and US flag"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/45 to-transparent" />
            </motion.div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
            {companyStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-7 text-center">
                <div className="font-heading font-bold text-3xl md:text-4xl text-teal mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Leadership pedigree */}
      <section className="py-24 bg-white">
        <Container>
          <SectionTitle
            eyebrow="Leadership"
            title="Built by operators, engineers, and closers"
            subtitle="Treemate is led by people with direct, high-level experience across the three disciplines this business depends on."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-6"
          >
            {leadership.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeIn}
                className="rounded-2xl border border-slate-200 bg-base p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-teal" strokeWidth={2} />
                </div>
                <h3 className="font-heading font-bold text-lg text-navy mb-2">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Technology */}
      <section className="py-24 bg-navy">
        <Container>
          <SectionTitle
            eyebrow="Our infrastructure"
            title="Enterprise technology, owned end to end"
            subtitle="We don't rent our capability from a patchwork of vendors. We run it, so we're accountable for it."
            tone="dark"
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-6"
          >
            {techStack.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeIn}
                className="flex gap-5 rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm"
              >
                <div className="w-12 h-12 shrink-0 rounded-xl bg-teal/15 border border-teal/30 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-teal-light" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-white mb-2">{item.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-24 bg-base">
        <Container>
          <SectionTitle eyebrow="What we stand for" title="Our operating principles" />
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {values.map((value) => (
              <div key={value.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-7">
                <span className="mt-1 w-6 h-6 rounded-full bg-teal flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                </span>
                <div>
                  <h3 className="font-heading font-bold text-lg text-navy mb-1.5">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500">
              Headquartered at {siteConfig.address.full}
            </p>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
