import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock, ArrowRight, Send } from "lucide-react";
import { Container } from "../components/layout/Container";
import { Constellation } from "../components/ui/Constellation";
import { buttonClasses } from "../components/ui/buttonStyles";
import { fadeIn, staggerContainer } from "../lib/motion";
import { siteConfig } from "../data/site";
import { services } from "../data/services";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-navy placeholder:text-slate-400 focus:border-teal focus:ring-2 focus:ring-teal/20 focus:outline-none transition";

export function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    interest: services[0].nav,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New inquiry: ${form.interest} — ${form.company || form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nInterested in: ${form.interest}\n\n${form.message}`,
    );
    window.location.href = `mailto:${siteConfig.emails.sales}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy overflow-hidden pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="absolute inset-0 z-0 opacity-70">
          <Constellation nodeCount={30} opacity={0.6} />
        </div>
        <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-teal blur-[160px] opacity-20 pointer-events-none" />
        <Container className="relative z-10 max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-light">
            Contact
          </span>
          <h1 className="font-heading font-bold text-white tracking-tight leading-[1.05] text-4xl md:text-5xl lg:text-6xl mt-4 mb-6">
            Let's scope your team.
          </h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
            Tell us about your operation and we'll get back within one business day with a clear plan,
            timeline, and price. No obligation, no corporate runaround.
          </p>
        </Container>
      </section>

      {/* Form + details */}
      <section className="py-24 bg-base">
        <Container>
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="lg:col-span-3 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-10"
            >
              <motion.h2 variants={fadeIn} className="font-heading font-bold text-2xl text-navy mb-2">
                Send us a message
              </motion.h2>
              <motion.p variants={fadeIn} className="text-slate-600 mb-8">
                Fill this in and we'll route it to the right person on our team.
              </motion.p>

              <div className="grid sm:grid-cols-2 gap-5">
                <motion.div variants={fadeIn}>
                  <label htmlFor="name" className="block text-sm font-semibold text-navy mb-2">
                    Full name
                  </label>
                  <input id="name" name="name" required value={form.name} onChange={handleChange} className={inputClass} placeholder="Jane Smith" />
                </motion.div>
                <motion.div variants={fadeIn}>
                  <label htmlFor="company" className="block text-sm font-semibold text-navy mb-2">
                    Company
                  </label>
                  <input id="company" name="company" value={form.company} onChange={handleChange} className={inputClass} placeholder="Acme Inc." />
                </motion.div>
              </div>

              <motion.div variants={fadeIn} className="mt-5">
                <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">
                  Work email
                </label>
                <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className={inputClass} placeholder="jane@acme.com" />
              </motion.div>

              <motion.div variants={fadeIn} className="mt-5">
                <label htmlFor="interest" className="block text-sm font-semibold text-navy mb-2">
                  I'm interested in
                </label>
                <select id="interest" name="interest" value={form.interest} onChange={handleChange} className={inputClass}>
                  {services.map((s) => (
                    <option key={s.slug} value={s.nav}>
                      {s.nav}
                    </option>
                  ))}
                  <option value="Multiple / Not sure yet">Multiple / Not sure yet</option>
                </select>
              </motion.div>

              <motion.div variants={fadeIn} className="mt-5">
                <label htmlFor="message" className="block text-sm font-semibold text-navy mb-2">
                  How can we help?
                </label>
                <textarea id="message" name="message" rows={5} value={form.message} onChange={handleChange} className={inputClass} placeholder="Tell us about your volumes, tools, and what you're trying to solve." />
              </motion.div>

              <motion.div variants={fadeIn} className="mt-7">
                <button type="submit" className={buttonClasses("primary", "lg", "w-full")}>
                  <Send className="w-4 h-4" strokeWidth={2.2} />
                  Send message
                </button>
                <p className="text-xs text-slate-400 mt-3 text-center">
                  Prefer email? Reach us directly at {siteConfig.emails.sales}
                </p>
              </motion.div>
            </motion.form>

            {/* Details */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="lg:col-span-2 flex flex-col gap-4"
            >
              {[
                {
                  icon: MapPin,
                  label: "Headquarters",
                  value: siteConfig.address.full,
                  href: siteConfig.address.mapsUrl,
                },
                { icon: Phone, label: "Phone", value: siteConfig.phone.display, href: siteConfig.phone.href },
                { icon: Mail, label: "Sales", value: siteConfig.emails.sales, href: `mailto:${siteConfig.emails.sales}` },
                { icon: Clock, label: "Coverage", value: siteConfig.hours },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeIn}
                  className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-teal/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-teal" strokeWidth={2} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="font-semibold text-navy hover:text-teal transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="font-semibold text-navy">{item.value}</div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Map */}
              <motion.div variants={fadeIn} className="rounded-2xl overflow-hidden border border-slate-200 h-56">
                <iframe
                  title="Treemate headquarters map"
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=30+N+Gould+St+Ste+R+Sheridan+WY+82801&output=embed"
                />
              </motion.div>

              <motion.a
                variants={fadeIn}
                href={siteConfig.phone.href}
                className="flex items-center justify-between rounded-2xl bg-navy p-6 text-white group"
              >
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-teal-light mb-1">
                    Prefer to talk?
                  </div>
                  <div className="font-heading font-bold text-lg">Call us directly</div>
                </div>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" strokeWidth={2.2} />
              </motion.a>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
