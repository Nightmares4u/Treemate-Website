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
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38C1.35 2.68.93 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13.67.66 1.34 1.08 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.13-1.38.66-.67 1.08-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.38-2.13C21.32 1.35 20.65.93 19.86.63 19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
    </svg>
  );
}
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
    </svg>
  );
}
import { Container } from "./Container";
import { TreemateLogo } from "../ui/TreemateLogo";
import { BackgroundSpirals } from "../ui/BackgroundSpirals";
import { fadeIn, staggerContainer } from "../../lib/motion";
import { footerNavigation } from "../../data/navigation";
import { siteConfig } from "../../data/site";
const socials = [
  {
    name: "LinkedIn",
    href: siteConfig.social.linkedin,
    icon: LinkedinIcon,
  },
  {
    name: "Instagram",
    href: siteConfig.social.instagram,
    icon: InstagramIcon,
  },
  {
    name: "Facebook",
    href: siteConfig.social.facebook,
    icon: FacebookIcon,
  },
];
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
            <div className="mt-10 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Treemate on ${social.name}`}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-navy/5 border border-navy/10 text-navy/80 hover:bg-teal hover:border-teal hover:text-white hover:-translate-y-0.5 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
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
