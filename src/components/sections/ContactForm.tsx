import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronsRight, Loader2, TriangleAlert } from "lucide-react";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { MarkerAccent } from "../ui/MarkerAccent";
import { FormSuccessDialog } from "../ui/FormSuccessDialog";
import { fadeIn, staggerContainer } from "../../lib/motion";
import { cn } from "../../lib/cn";
interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  subject: string;
  message: string;
  /** Honeypot — hidden from real visitors, must stay empty. */
  website: string;
}
const initialForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  subject: "",
  message: "",
  website: "",
};
const services = [
  { value: "Software & AI", label: "Software & AI" },
  { value: "HR Solutions", label: "HR Solutions" },
  { value: "BPO Services", label: "BPO Services" },
  { value: "Not sure yet", label: "Not sure yet — help me scope" },
];
const inputBase =
  "w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-navy placeholder-navy/40 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-colors";
type Status = "idle" | "sending" | "error";
export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "The form could not be submitted.");
      }

      setForm(initialForm);
      setStatus("idle");
      setSuccessMessage(
        result.message ??
          "Your message was submitted successfully. We'll be in touch shortly.",
      );
      setSuccessOpen(true);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
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
          noValidate={false}
          className="max-w-4xl flex flex-col gap-8"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <motion.label variants={fadeIn} className="flex flex-col gap-2 group">
              <span className="text-sm font-semibold text-navy transition-colors duration-200 group-focus-within:text-teal">
                First Name
              </span>
              <input
                name="firstName"
                type="text"
                required
                maxLength={100}
                autoComplete="given-name"
                value={form.firstName}
                onChange={onChange}
                placeholder="Ada"
                className={inputBase}
              />
            </motion.label>
            <motion.label variants={fadeIn} className="flex flex-col gap-2 group">
              <span className="text-sm font-semibold text-navy transition-colors duration-200 group-focus-within:text-teal">
                Last Name
              </span>
              <input
                name="lastName"
                type="text"
                required
                maxLength={100}
                autoComplete="family-name"
                value={form.lastName}
                onChange={onChange}
                placeholder="Lovelace"
                className={inputBase}
              />
            </motion.label>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.label variants={fadeIn} className="flex flex-col gap-2 group">
              <span className="text-sm font-semibold text-navy transition-colors duration-200 group-focus-within:text-teal">
                Email Address
              </span>
              <input
                name="email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                inputMode="email"
                value={form.email}
                onChange={onChange}
                placeholder="ada@company.com"
                className={inputBase}
              />
            </motion.label>
            <motion.label variants={fadeIn} className="flex flex-col gap-2 group">
              <span className="text-sm font-semibold text-navy transition-colors duration-200 group-focus-within:text-teal">
                Phone Number
              </span>
              <input
                name="phone"
                type="tel"
                required
                maxLength={50}
                autoComplete="tel"
                inputMode="tel"
                value={form.phone}
                onChange={onChange}
                placeholder="+1 780 804 0473"
                className={inputBase}
              />
            </motion.label>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.label variants={fadeIn} className="flex flex-col gap-2 group">
              <span className="text-sm font-semibold text-navy transition-colors duration-200 group-focus-within:text-teal">
                Service
              </span>
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
            <motion.label variants={fadeIn} className="flex flex-col gap-2 group">
              <span className="text-sm font-semibold text-navy transition-colors duration-200 group-focus-within:text-teal">
                Budget
              </span>
              <input
                name="budget"
                type="text"
                maxLength={100}
                value={form.budget}
                onChange={onChange}
                placeholder="e.g. $25k–$50k / month"
                className={inputBase}
              />
            </motion.label>
          </div>
          <motion.label variants={fadeIn} className="flex flex-col gap-2 group">
            <span className="text-sm font-semibold text-navy transition-colors duration-200 group-focus-within:text-teal">
              Subject
            </span>
            <input
              name="subject"
              type="text"
              maxLength={200}
              value={form.subject}
              onChange={onChange}
              placeholder="What's this about?"
              className={inputBase}
            />
          </motion.label>
          <motion.label variants={fadeIn} className="flex flex-col gap-2 group">
            <span className="text-sm font-semibold text-navy transition-colors duration-200 group-focus-within:text-teal">
              Message
            </span>
            <textarea
              name="message"
              required
              maxLength={5000}
              value={form.message}
              onChange={onChange}
              rows={6}
              placeholder="Tell us about your business, the outcome you're after, and any constraints we should know about."
              className={cn(inputBase, "resize-y min-h-[160px]")}
            />
          </motion.label>
          {}
          <div
            aria-hidden="true"
            className="absolute -left-[10000px] h-px w-px overflow-hidden"
          >
            <label htmlFor="website">Leave this field empty</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={onChange}
            />
          </div>
          <motion.div variants={fadeIn} className="flex flex-col gap-4">
            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={status !== "sending" ? { scale: 1.03 } : undefined}
              whileTap={status !== "sending" ? { scale: 0.97 } : undefined}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-navy hover:bg-navy-light text-white font-semibold px-8 py-3.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 disabled:opacity-80"
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === "sending" ? (
                  <motion.span
                    key="sending"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center gap-2"
                  >
                    Sending
                    <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.4} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center gap-2"
                  >
                    Send Message
                    <ChevronsRight className="w-4 h-4" strokeWidth={2.4} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <AnimatePresence>
              {status === "error" && errorMessage && (
                <motion.p
                  role="alert"
                  aria-live="assertive"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="inline-flex w-fit items-center gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/5 px-4 py-3 text-sm font-medium text-rose-700"
                >
                  <TriangleAlert className="w-4 h-4 shrink-0" strokeWidth={2.2} />
                  {errorMessage}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.form>
      </Container>
      <FormSuccessDialog
        open={successOpen}
        message={successMessage}
        onClose={() => setSuccessOpen(false)}
      />
    </section>
  );
}
