import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5v-9h3v9Zm-1.5-10.28a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5ZM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a1 1 0 0 0 0 .3V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66L19 19Z" />
    </svg>
  );
}
import { Container } from "./Container";
import { TreemateLogo } from "../ui/TreemateLogo";
import { BackgroundSpirals } from "../ui/BackgroundSpirals";
import { fadeIn, staggerContainer } from "../../lib/motion";
import { footerNavigation } from "../../data/navigation";
import { siteConfig } from "../../data/site";
export function Footer() {
  return (
    <footer className="relative bg-[#F8F9FA] text-navy overflow-hidden">
      {}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-100" />
      {}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[10%] left-[15%] w-[800px] h-[700px] rounded-[100%] bg-[#A7F3D0]/40 blur-[130px]"
      />
      {}
      <BackgroundSpirals side="both" opacity={0.2} />
      <Container className="pt-20 pb-10 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16"
        >
          {}
          <motion.div variants={fadeIn} className="md:col-span-5">
            <div className="mb-5">
              <TreemateLogo size="lg" variant="navy" wordmarkCase="upper" />
            </div>
            <p className="text-base font-semibold text-navy mb-3">
              {siteConfig.tagline}
            </p>
            <p className="text-sm text-navy/60 leading-relaxed max-w-md mb-8">
              {siteConfig.description}
            </p>
            <ul className="flex flex-col gap-3 text-sm text-navy/70">
              <li className="flex items-start gap-2.5">
                <MapPin
                  className="w-4 h-4 text-teal mt-0.5 shrink-0"
                  strokeWidth={2}
                />
                <a
                  href={siteConfig.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal transition-colors"
                >
                  {siteConfig.address.full}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal shrink-0" strokeWidth={2} />
                <a
                  href={siteConfig.phone.href}
                  className="hover:text-teal transition-colors"
                >
                  {siteConfig.phone.display}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal shrink-0" strokeWidth={2} />
                <a
                  href={`mailto:${siteConfig.emails.primary}`}
                  className="hover:text-teal transition-colors"
                >
                  {siteConfig.emails.primary}
                </a>
              </li>
            </ul>
          </motion.div>
          {}
          <motion.div variants={fadeIn} className="md:col-span-3">
            <h4 className="text-[12px] font-heading font-bold uppercase tracking-[0.14em] text-teal mb-6">
              Navigation
            </h4>
            <ul className="flex flex-col gap-4">
              {footerNavigation.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-navy/70 hover:text-teal font-medium transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/"
                  className="text-sm text-navy/70 hover:text-teal font-medium transition-colors"
                >
                  Home
                </Link>
              </li>
            </ul>
          </motion.div>
          {}
          <motion.div variants={fadeIn} className="md:col-span-4">
            <h4 className="text-[12px] font-heading font-bold uppercase tracking-[0.14em] text-teal mb-6">
              Services
            </h4>
            <ul className="flex flex-col gap-4">
              {footerNavigation.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-navy/70 hover:text-teal font-medium transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Treemate on LinkedIn"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-navy/5 border border-navy/10 text-navy/80 hover:bg-teal hover:border-teal hover:text-white transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
        <div className="border-t border-navy/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-navy/50 text-sm">
              © {new Date().getFullYear()} {siteConfig.name}. All rights
              reserved.
            </p>
            <p className="text-navy/40 text-sm">{siteConfig.hours}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
