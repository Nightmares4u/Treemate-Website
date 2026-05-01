import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/sections/Hero";
import { TrustStrip } from "../components/sections/TrustStrip";
import { ServicesPreview } from "../components/sections/ServicesPreview";
import { Differentiators } from "../components/sections/Differentiators";
import { CapabilitiesPreview } from "../components/sections/CapabilitiesPreview";
import { ProcessPreview } from "../components/sections/ProcessPreview";
import { CTASection } from "../components/sections/CTASection";

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <ServicesPreview />
        <Differentiators />
        <CapabilitiesPreview />
        <ProcessPreview />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
