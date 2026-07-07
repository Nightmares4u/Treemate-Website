import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink as RouterNavLink } from "react-router-dom";
import { cn } from "../../lib/cn";
import { Container } from "./Container";
import { LinkButton } from "../ui/LinkButton";
import { TreemateLogo } from "../ui/TreemateLogo";
import { navigationLinks } from "../../data/navigation";
import { Menu, X, ChevronsRight } from "lucide-react";
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
            ? "py-2.5 bg-page/85 backdrop-blur-md border-b border-ink/10"
            : "py-4 bg-transparent border-b border-transparent",
        )}
      >
        <Container className="flex items-center justify-between">
          <TreemateLogo size="md" wordmarkCase="upper" />
          {}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Primary"
          >
            {navigationLinks.map((link) => (
              <RouterNavLink
                key={link.name}
                to={link.href}
                end={link.href === "/"}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors duration-200",
                    isActive ? "text-teal" : "text-ink/70 hover:text-ink",
                  )
                }
              >
                {link.name}
              </RouterNavLink>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-3">
            <LinkButton to="/contact" variant="teal" size="sm">
              Get a Booking
              <ChevronsRight className="w-4 h-4" strokeWidth={2.4} />
            </LinkButton>
          </div>
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-ink hover:bg-ink/5 transition-all duration-200"
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
                  <X size={24} strokeWidth={2} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={24} strokeWidth={2} />
                </motion.span>
              )}
            </AnimatePresence>
            </button>
          </div>
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
              className="fixed inset-0 z-40 bg-navy/30 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-4 top-[76px] z-50 bg-surface rounded-2xl p-6 shadow-xl border border-ink/10 lg:hidden"
            >
              <nav className="flex flex-col gap-1 mb-6" aria-label="Mobile">
                {navigationLinks.map((link) => (
                  <RouterNavLink
                    key={link.name}
                    to={link.href}
                    end={link.href === "/"}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "px-4 py-3 text-[13px] font-semibold uppercase tracking-[0.1em] rounded-xl transition-all duration-200",
                        isActive
                          ? "text-teal bg-teal/5"
                          : "text-ink hover:bg-ink/5",
                      )
                    }
                  >
                    {link.name}
                  </RouterNavLink>
                ))}
              </nav>
              <div className="pt-4 border-t border-ink/10">
                <LinkButton
                  to="/contact"
                  variant="teal"
                  size="md"
                  className="w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  Get a Booking
                  <ChevronsRight className="w-4 h-4" strokeWidth={2.4} />
                </LinkButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
