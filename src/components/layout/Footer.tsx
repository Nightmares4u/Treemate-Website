import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";
import { Container } from "./Container";
import { fadeIn, staggerContainer } from "../../lib/motion";
import { footerNavigation } from "../../data/navigation";
import { siteConfig } from "../../data/site";

function TreemateLogoLarge() {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Treemate home">
      <div className="h-11">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
          <path d="M15 12 L13 28 L19 28 L17 12 Z" fill="#0A1628" />
          <path d="M16 10 L6 4 L8 2 L16 8 L24 2 L26 4 Z" fill="#0A1628" />
          <circle cx="16" cy="5" r="3.5" fill="#0D9488" />
        </svg>
      </div>
      <span className="font-heading font-bold text-3xl tracking-tight leading-none flex">
        <span className="text-navy">Tree</span>
        <span className="text-teal">mate</span>
      </span>
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-white border-t border-slate-200">
      <Container className="pt-20 pb-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16"
        >
          {/* Brand + address */}
          <motion.div variants={fadeIn} className="md:col-span-5">
            <div className="mb-6">
              <TreemateLogoLarge />
            </div>
            <p className="text-base font-semibold text-navy mb-3">{siteConfig.tagline}</p>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm mb-6">
              {siteConfig.description}
            </p>
            <ul className="flex flex-col gap-3 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal mt-0.5 shrink-0" strokeWidth={2} />
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
                <a href={siteConfig.phone.href} className="hover:text-teal transition-colors">
                  {siteConfig.phone.display}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal shrink-0" strokeWidth={2} />
                <a href={`mailto:${siteConfig.emails.primary}`} className="hover:text-teal transition-colors">
                  {siteConfig.emails.primary}
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeIn} className="md:col-span-2">
            <h4 className="text-[13px] font-heading font-bold uppercase tracking-wider text-navy mb-6">
              Services
            </h4>
            <ul className="flex flex-col gap-4">
              {footerNavigation.services.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-slate-600 hover:text-teal font-medium transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={fadeIn} className="md:col-span-2">
            <h4 className="text-[13px] font-heading font-bold uppercase tracking-wider text-navy mb-6">
              Company
            </h4>
            <ul className="flex flex-col gap-4">
              {footerNavigation.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-slate-600 hover:text-teal font-medium transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div variants={fadeIn} className="md:col-span-3">
            <h4 className="text-[13px] font-heading font-bold uppercase tracking-wider text-navy mb-6">
              Connect
            </h4>
            <ul className="flex flex-col gap-4">
              <li>
                <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-teal font-medium transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.emails.sales}`} className="text-sm text-slate-600 hover:text-teal font-medium transition-colors">
                  {siteConfig.emails.sales}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.emails.support}`} className="text-sm text-slate-600 hover:text-teal font-medium transition-colors">
                  {siteConfig.emails.support}
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <div className="border-t border-slate-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <p className="text-slate-400 text-sm">{siteConfig.hours}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
