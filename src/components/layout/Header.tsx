import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink as RouterNavLink } from "react-router-dom";
import { cn } from "../../lib/cn";
import { Container } from "./Container";
import { LinkButton } from "../ui/LinkButton";
import { navigationLinks } from "../../data/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

function TreemateLogo() {
  return (
    <Link to="/" className="flex items-center gap-2 group" aria-label="Treemate home">
      <div className="h-8">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
          <path d="M15 12 L13 28 L19 28 L17 12 Z" fill="#0A1628" className="transition-colors group-hover:fill-teal duration-300" />
          <path d="M16 10 L6 4 L8 2 L16 8 L24 2 L26 4 Z" fill="#0A1628" className="transition-colors group-hover:fill-teal duration-300" />
          <circle cx="16" cy="5" r="3.5" fill="#0D9488" />
        </svg>
      </div>
      <span className="font-heading font-bold text-[22px] tracking-tight leading-none flex">
        <span className="text-navy">Tree</span>
        <span className="text-teal">mate</span>
      </span>
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "py-2.5 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm"
            : "py-4 bg-white/70 backdrop-blur-sm border-b border-transparent",
        )}
      >
        <Container className="flex items-center justify-between">
          <TreemateLogo />

          <nav className="hidden lg:flex items-center gap-1">
            {navigationLinks.map((link) => (
              <RouterNavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    "relative px-4 py-2 text-[14px] font-medium rounded-full transition-colors duration-200",
                    isActive ? "text-teal bg-teal/5" : "text-slate-600 hover:text-navy hover:bg-slate-100",
                  )
                }
              >
                {link.name}
              </RouterNavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <LinkButton to="/contact" variant="ghost" size="sm" className="text-navy">
              Book a Call
            </LinkButton>
            <LinkButton to="/contact" size="sm">
              Get Started
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </LinkButton>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-navy hover:bg-slate-100 transition-all duration-200"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={24} strokeWidth={2} />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={24} strokeWidth={2} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </Container>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-4 top-[76px] z-50 bg-white rounded-2xl p-6 shadow-xl border border-slate-100 lg:hidden"
            >
              <nav className="flex flex-col gap-1 mb-6">
                {navigationLinks.map((link) => (
                  <RouterNavLink
                    key={link.name}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "px-4 py-3 text-base font-medium rounded-xl transition-all duration-200",
                        isActive ? "text-teal bg-teal/5" : "text-navy hover:bg-slate-50",
                      )
                    }
                  >
                    {link.name}
                  </RouterNavLink>
                ))}
              </nav>

              <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                <LinkButton to="/contact" variant="outline" size="md" className="w-full" onClick={() => setMobileOpen(false)}>
                  Book a Call
                </LinkButton>
                <LinkButton to="/contact" size="md" className="w-full" onClick={() => setMobileOpen(false)}>
                  Get Started
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </LinkButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
