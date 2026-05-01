import { motion } from "framer-motion";
import { Container } from "./Container";
import { SignalLine } from "../ui/SignalLine";
import { fadeIn, staggerContainer } from "../../lib/motion";

const footerLinks = {
  company: [
    { name: "About", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Contact", href: "#" },
  ],
  services: [
    { name: "Websites", href: "#services" },
    { name: "Lead Generation", href: "#services" },
    { name: "Paid Ads", href: "#services" },
    { name: "SEO", href: "#services" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
};

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-text-muted hover:text-text-primary hover:border-border-strong hover:bg-surface-light/40 transition-all duration-200"
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-base">
      {/* Top signal line */}
      <div className="relative h-px">
        <SignalLine />
      </div>

      <Container className="pt-16 pb-8 md:pt-20 md:pb-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16"
        >
          {/* Brand column */}
          <motion.div variants={fadeIn} className="md:col-span-5 lg:col-span-5">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-5">
              <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
                <rect x="1" y="1" width="30" height="30" rx="8" stroke="rgba(168,85,247,0.3)" strokeWidth="1" />
                <rect x="2" y="2" width="28" height="28" rx="7" fill="url(#fl)" />
                <path d="M9 10 H23 M16 10 V22" stroke="url(#fs)" strokeWidth="2" strokeLinecap="round" />
                <circle cx="9" cy="10" r="1.5" fill="#A855F7" opacity="0.8" />
                <circle cx="23" cy="10" r="1.5" fill="#A855F7" opacity="0.8" />
                <circle cx="16" cy="22" r="1.5" fill="#7DFF4D" opacity="0.9" />
                <defs>
                  <linearGradient id="fl" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1A0D3A" />
                    <stop offset="1" stopColor="#0B0F14" />
                  </linearGradient>
                  <linearGradient id="fs" x1="9" y1="10" x2="23" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C4B5FD" />
                    <stop offset="1" stopColor="#A855F7" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="font-heading font-semibold text-base tracking-tight text-text-primary">
                Treemate
              </span>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed max-w-xs font-light mb-6 text-pretty">
              Premium growth systems and technology platforms for service businesses across
              North America. We engineer the digital infrastructure that drives real results.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2">
              <SocialIcon href="#" label="Twitter / X">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="GitHub">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="LinkedIn">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </SocialIcon>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeIn} className="md:col-span-3 lg:col-span-2">
            <h4 className="text-[11px] font-heading font-semibold uppercase tracking-[0.18em] text-text-muted mb-5">
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary/70 hover:text-text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={fadeIn} className="md:col-span-2 lg:col-span-2">
            <h4 className="text-[11px] font-heading font-semibold uppercase tracking-[0.18em] text-text-muted mb-5">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary/70 hover:text-text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={fadeIn} className="md:col-span-2 lg:col-span-3">
            <h4 className="text-[11px] font-heading font-semibold uppercase tracking-[0.18em] text-text-muted mb-5">
              Legal
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary/70 hover:text-text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Wordmark + bottom bar */}
        <div className="border-t border-white/[0.04] pt-8">
          {/* Large outline wordmark */}
          <div className="mb-6 overflow-hidden select-none" aria-hidden="true">
            <p
              className="font-heading font-bold tracking-[-0.04em] leading-none text-transparent"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 6rem)",
                WebkitTextStroke: "1px rgba(255,255,255,0.06)",
              }}
            >
              Treemate
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <p className="text-text-muted/50 text-xs">
              © {new Date().getFullYear()} Treemate Inc. All rights reserved.
            </p>
            <p className="text-text-muted/40 text-xs font-mono">
              engineered · not templated
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
