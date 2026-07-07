import { useOutlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollProgress } from "../ui/ScrollProgress";
import { PageTransition } from "../motion/PageTransition";
import { IntroCurtain } from "../motion/IntroCurtain";

export function Layout() {
  const location = useLocation();
  // Freeze the outlet element per-location so the outgoing page keeps
  // rendering while its curtain closes over it.
  const outlet = useOutlet();

  return (
    <div className="flex flex-col min-h-screen">
      <IntroCurtain />
      <ScrollProgress />
      <Header />
      <main className="flex-1">
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => window.scrollTo({ top: 0, left: 0 })}
        >
          <PageTransition key={location.pathname}>{outlet}</PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
