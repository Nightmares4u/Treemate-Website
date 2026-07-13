import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { NavLink as RouterNavLink } from "react-router-dom";
import { cn } from "../../lib/cn";
import { Container } from "./Container";
import { LinkButton } from "../ui/LinkButton";
import { TreemateLogo } from "../ui/TreemateLogo";
import { navigationLinks } from "../../data/navigation";
import { easeOutExpo } from "../../lib/motion";
import { Menu, X, ChevronsRight } from "lucide-react";

export function Header() {
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while the full-screen mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const overlayVariants: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.15 } },
      }
    : {
        hidden: { clipPath: "inset(0% 0% 100% 0%)" },
        visible: {
          clipPath: "inset(0% 0% 0% 0%)",
          transition: {
            duration: 0.5,
            ease: easeOutExpo,
            when: "beforeChildren",
            staggerChildren: 0.07,
            delayChildren: 0.12,
          },
        },
        exit: {
          clipPath: "inset(0% 0% 100% 0%)",
          transition: { duration: 0.35, ease: easeOutExpo },
        },
      };

  const linkVariants: Variants = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: easeOutExpo },
        },
      };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "py-2.5 bg-[#F8F9FA]/85 backdrop-blur-md border-b border-navy/10 shadow-[0_1px_20px_-8px_rgba(10,22,40,0.25)]"
            : "py-4 bg-transparent border-b border-transparent",
        )}
      >
        <Container className="flex items-center justify-between">
          <TreemateLogo size="md" wordmarkCase="upper" />

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
                    "relative px-3 py-2 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors duration-200",
                    isActive ? "text-teal" : "text-navy/70 hover:text-navy",
                  )
                }
              >
                {({ isActive }) => (
                  <span className="relative inline-block">
                    {link.name}
                    {isActive &&
                      (reduced ? (
                        <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-teal" />
                      ) : (
                        <motion.span
                          layoutId="header-underline"
                          className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-teal"
                          transition={{ duration: 0.35, ease: easeOutExpo }}
                        />
                      ))}
                  </span>
                )}
              </RouterNavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            <LinkButton to="/contact" variant="teal" size="sm">
              Get a Booking
              <ChevronsRight className="w-4 h-4" strokeWidth={2.4} />
            </LinkButton>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-[70] p-2 rounded-lg text-navy hover:bg-navy/5 transition-all duration-200"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
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
        </Container>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[60] bg-cream lg:hidden"
          >
            <div className="flex h-full flex-col justify-center px-8">
              <nav
                className="flex flex-col gap-2"
                aria-label="Mobile"
              >
                {navigationLinks.map((link) => (
                  <motion.div key={link.name} variants={linkVariants}>
                    <RouterNavLink
                      to={link.href}
                      end={link.href === "/"}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "block py-3 font-heading text-3xl font-semibold tracking-tight transition-colors duration-200",
                          isActive
                            ? "text-teal"
                            : "text-navy hover:text-teal",
                        )
                      }
                    >
                      {link.name}
                    </RouterNavLink>
                  </motion.div>
                ))}
              </nav>
              <motion.div variants={linkVariants} className="mt-10">
                <LinkButton
                  to="/contact"
                  variant="teal"
                  size="lg"
                  className="w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  Get a Booking
                  <ChevronsRight className="w-4 h-4" strokeWidth={2.4} />
                </LinkButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
