import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { BackgroundSpirals } from "../ui/BackgroundSpirals";
import { Reveal } from "../motion/Reveal";
import { cn } from "../../lib/cn";
interface FaqItem {
  question: string;
  answer: string;
}
const faqs: FaqItem[] = [
  {
    question: "What industries do you serve?",
    answer:
      "We're built for operations-heavy businesses across the US and Australia — including e-commerce, SaaS, logistics, real estate, healthcare services, and professional services. Any business where custom software, staffing, and customer support have to work together.",
  },
  {
    question: "Can your solutions scale with my business?",
    answer:
      "Yes. Because we build the software, staff the people, and run the support ourselves, we can add capacity — engineers, agents, or seats — without you renegotiating three separate contracts. The loop scales as one.",
  },
  {
    question: "How do you ensure security and reliability?",
    answer:
      "We run cloud infrastructure on AWS, Azure, and GCP with 24/7 monitoring, CI/CD pipelines for zero-downtime releases, and security patching built into the maintenance rhythm — not bolted on later.",
  },
  {
    question: "Do you offer dedicated teams for ongoing projects?",
    answer:
      "Yes. Every engagement gets a dedicated team — engineers, HR-managed support agents, or both — that works exclusively on your account. Not a shared pool, not a rotating queue.",
  },
];
export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-cream">
      <BackgroundSpirals side="left" opacity={0.14} />
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 mb-14 md:mb-20 items-end">
          <div className="lg:col-span-8">
            <SectionTitle
              title="FAQs"
              subtitle="Find clear, concise answers about our services, process, and how we help businesses build their loop."
              align="left"
              className="mb-0 max-w-none"
            />
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">
              Straight answers · No fine print
            </p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal
                key={faq.question}
                variant="fade"
                delay={i * 0.08}
                as="div"
                className={cn(
                  "group overflow-hidden transition-colors border-b",
                  isOpen
                    ? "border-teal/40"
                    : "border-navy/10 hover:border-navy/25",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 md:px-7 md:py-6"
                >
                  <span
                    className={cn(
                      "font-heading font-semibold text-base md:text-lg transition-colors duration-200",
                      isOpen
                        ? "text-teal"
                        : "text-navy group-hover:text-teal",
                    )}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={cn(
                      "w-9 h-9 shrink-0 rounded-full flex items-center justify-center border transition-all duration-300",
                      isOpen
                        ? "bg-teal text-white border-teal rotate-45"
                        : "bg-cream text-navy border-navy/10 group-hover:border-teal/40 group-hover:text-teal",
                    )}
                  >
                    <Plus className="w-4 h-4" strokeWidth={2.4} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 md:px-7 md:pb-7 text-navy/70 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
