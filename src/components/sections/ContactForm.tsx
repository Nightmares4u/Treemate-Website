import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ChevronsRight } from "lucide-react";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { MarkerAccent } from "../ui/MarkerAccent";
import { fadeIn, staggerContainer } from "../../lib/motion";
import { siteConfig } from "../../data/site";
import { cn } from "../../lib/cn";
interface FormState {
  firstName: string;
  lastName: string;
  service: string;
  budget: string;
  subject: string;
  message: string;
}
const initialForm: FormState = {
  firstName: "",
  lastName: "",
  service: "",
  budget: "",
  subject: "",
  message: "",
};
const services = [
  { value: "software-ai", label: "Software & AI" },
  { value: "hr-solutions", label: "HR Solutions" },
  { value: "customer-success", label: "Customer Success" },
  { value: "not-sure", label: "Not sure yet — help me scope" },
];
const inputBase =
  "w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-navy placeholder-navy/40 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-colors";
export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = form.subject.trim() || "New inquiry via treemate.us";
    const body = [
      `Name: ${form.firstName} ${form.lastName}`.trim(),
      `Service: ${services.find((s) => s.value === form.service)?.label ?? "Not specified"}`,
      form.budget ? `Budget: ${form.budget}` : null,
      "",
      form.message,
    ]
      .filter(Boolean)
      .join("\n");
    const href = `mailto:${siteConfig.emails.sales}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  };
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-cream">
      {}
      <MarkerAccent
        variant="scribble"
        className="absolute top-32 right-[6%] w-20 h-14 opacity-60"
        color="#0D9488"
        rotate={-10}
      />
      <MarkerAccent
        variant="star"
        className="absolute top-1/2 right-[10%] w-10 h-10 opacity-60"
        color="#0D9488"
        rotate={20}
      />
      <MarkerAccent
        variant="arrow"
        className="absolute bottom-32 right-[8%] w-20 h-14 opacity-60"
        color="#0D9488"
        rotate={35}
      />
      <MarkerAccent
        variant="circle"
        className="absolute bottom-16 right-[16%] w-20 h-14 opacity-40"
        color="#0D9488"
        rotate={-6}
      />
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 mb-14 md:mb-20 items-end">
          <div className="lg:col-span-8">
            <SectionTitle
              title="Send us a message"
              subtitle="Tell us about your business and we'll come back within a business day. No sales pipeline dance — just a real conversation about whether we're the right fit."
              align="left"
              className="mb-0 max-w-none"
            />
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">
              1 business day response
            </p>
          </div>
        </div>
        <motion.form
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          onSubmit={onSubmit}
          className="max-w-4xl flex flex-col gap-8"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <motion.label variants={fadeIn} className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-navy">
                First Name
              </span>
              <input
                name="firstName"
                type="text"
                required
                value={form.firstName}
                onChange={onChange}
                placeholder="Ada"
                className={inputBase}
              />
            </motion.label>
            <motion.label variants={fadeIn} className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-navy">Last Name</span>
              <input
                name="lastName"
                type="text"
                required
                value={form.lastName}
                onChange={onChange}
                placeholder="Lovelace"
                className={inputBase}
              />
            </motion.label>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.label variants={fadeIn} className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-navy">Service</span>
              <select
                name="service"
                required
                value={form.service}
                onChange={onChange}
                className={cn(inputBase, "appearance-none cursor-pointer")}
              >
                <option value="" disabled>
                  Select a service
                </option>
                {services.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </motion.label>
            <motion.label variants={fadeIn} className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-navy">Budget</span>
              <input
                name="budget"
                type="text"
                value={form.budget}
                onChange={onChange}
                placeholder="e.g. $25k–$50k / month"
                className={inputBase}
              />
            </motion.label>
          </div>
          <motion.label variants={fadeIn} className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-navy">Subject</span>
            <input
              name="subject"
              type="text"
              value={form.subject}
              onChange={onChange}
              placeholder="What's this about?"
              className={inputBase}
            />
          </motion.label>
          <motion.label variants={fadeIn} className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-navy">Message</span>
            <textarea
              name="message"
              required
              value={form.message}
              onChange={onChange}
              rows={6}
              placeholder="Tell us about your business, the outcome you're after, and any constraints we should know about."
              className={cn(inputBase, "resize-y min-h-[160px]")}
            />
          </motion.label>
          <motion.div variants={fadeIn}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-navy hover:bg-navy-light text-white font-semibold px-8 py-3.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2"
            >
              Send Message
              <ChevronsRight className="w-4 h-4" strokeWidth={2.4} />
            </button>
          </motion.div>
        </motion.form>
      </Container>
    </section>
  );
}
