import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/cn";
import { Container } from "./Container";
import { Button } from "../ui/Button";
import { navigationLinks } from "../../data/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

function TreemateLogo() {
  return (
    <a href="/" className="flex items-center gap-3 group" aria-label="Treemate home">
      {/* Custom SVG mark: T built from signal-line nodes */}
      <div className="relative w-8 h-8 flex-shrink-0">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Outer ring */}
          <rect
            x="1"
            y="1"
            width="30"
            height="30"
            rx="8"
            stroke="rgba(168,85,247,0.35)"
            strokeWidth="1"
          />
          {/* Inner gradient fill */}
          <rect
            x="2"
            y="2"
            width="28"
            height="28"
            rx="7"
            fill="url(#logo-fill)"
            className="group-hover:opacity-100 opacity-80 transition-opacity duration-300"
          />
          {/* T shape */}
          <path
            d="M9 10 H23 M16 10 V22"
            stroke="url(#logo-stroke)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Node dots on T endpoints */}
          <circle cx="9" cy="10" r="1.5" fill="#A855F7" opacity="0.8" />
          <circle cx="23" cy="10" r="1.5" fill="#A855F7" opacity="0.8" />
          <circle cx="16" cy="22" r="1.5" fill="#7DFF4D" opacity="0.9" />
          <defs>
            <linearGradient id="logo-fill" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1A0D3A" />
              <stop offset="1" stopColor="#0B0F14" />
            </linearGradient>
            <linearGradient id="logo-stroke" x1="9" y1="10" x2="23" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#C4B5FD" />
              <stop offset="1" stopColor="#A855F7" />
            </linearGradient>
          </defs>
        </svg>
        {/* Subtle glow behind logo */}
        <div className="absolute inset-0 rounded-lg bg-primary/20 blur-[10px] opacity-0 group-hover:opacity-70 transition-opacity duration-500 -z-10" />
      </div>

      <span className="font-heading font-semibold text-[17px] tracking-[-0.01em] text-text-primary group-hover:text-white transition-colors duration-200">
        Treemate
      </span>
    </a>
  );
}

function NavLink({ name, href }: { name: string; href: string }) {
  return (
    <a
      href={href}
      className={cn(
        "relative px-4 py-2 text-[13px] font-medium text-text-secondary rounded-full",
        "hover:text-text-primary",
        "transition-colors duration-200",
        "group"
      )}
    >
      <span className="relative z-10">{name}</span>
      {/* Hover pill */}
      <span className="absolute inset-0 rounded-full bg-surface-light/0 group-hover:bg-surface-light/60 transition-all duration-200" />
    </a>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? [
                "py-2.5",
                "bg-base/80 backdrop-blur-2xl",
                "border-b border-white/[0.05]",
                "shadow-[0_1px_0_rgba(255,255,255,0.03),0_8px_40px_rgba(0,0,0,0.4)]",
              ].join(" ")
            : "py-5 bg-transparent"
        )}
      >
        {/* Top gradient seam when scrolled */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none"
            />
          )}
        </AnimatePresence>

        <Container className="flex items-center justify-between">
          <TreemateLogo />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navigationLinks.map((link) => (
              <NavLink key={link.name} {...link} />
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Button variant="ghost" size="sm">
              Book a Call
            </Button>
            <Button size="sm" magnetic>
              Get Started
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light/50 transition-all duration-200"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={20} strokeWidth={1.75} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={20} strokeWidth={1.75} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </Container>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-base/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-3 top-[70px] z-50 glass-elevated rounded-2xl p-5 lg:hidden"
            >
              {/* Top accent */}
              <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

              <nav className="flex flex-col gap-0.5 mb-5">
                {navigationLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-light/50 rounded-xl transition-all duration-200"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              <div className="flex flex-col gap-2.5 pt-4 border-t border-border">
                <Button variant="outline" size="md" className="w-full justify-center">
                  Book a Call
                </Button>
                <Button size="md" className="w-full justify-center">
                  Get Started
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
