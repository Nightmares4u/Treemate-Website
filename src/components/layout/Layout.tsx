import { useEffect } from "react";
import { useOutlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollProgress } from "../ui/ScrollProgress";
import { PageTransition } from "../motion/PageTransition";
import { IntroCurtain } from "../motion/IntroCurtain";
import { scrollToTopInstant } from "../../lib/scroll";

export function Layout() {
  const location = useLocation();
  // Freeze the outlet element per-location so the outgoing page keeps
  // rendering while its curtain closes over it.
  const outlet = useOutlet();

  // The browser restores the previous offset on back/forward against a document
  // that has not re-rendered yet, which fights the scroll reset below.
  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <IntroCurtain />
      <ScrollProgress />
      <Header />
      <main className="flex-1">
        {/* mode="wait" holds the outgoing page until its fade finishes, so by
            the time this fires the old page is invisible and the jump is not
            seen — but the document is still tall enough to scroll. */}
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={scrollToTopInstant}
        >
          <PageTransition key={location.pathname}>{outlet}</PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
