import { PageHero } from "../components/sections/PageHero";
import { PortfolioManifest } from "../components/sections/PortfolioManifest";
import { PortfolioPlate } from "../components/sections/PortfolioPlate";
import { CTASection } from "../components/sections/CTASection";
import { PortfolioAside } from "../components/hero-asides/PortfolioAside";
import { portfolioSystems } from "../data/portfolio";

export function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio — Software Engineering"
        title="Systems built to carry load."
        tagline="Treemate engineers scalable software for operators: pipelines that process millions of records, ledgers that stay accurate under volume, and interfaces people can actually run a shift on."
        description="Eight systems, built from the ground up — architecture, data model, interface, and deployment."
        primaryCta={{ label: "Book A Meeting", to: "/contact" }}
        secondaryCta={{ label: "See our services", to: "/software-ai" }}
        aside={<PortfolioAside />}
      />
      <PortfolioManifest />
      {portfolioSystems.map((system, i) => (
        <PortfolioPlate key={system.id} system={system} flip={i % 2 === 1} />
      ))}
      <CTASection
        heading="Bring us the hard part."
        subtext="These platforms were built from the ground up — architecture, data model, interface and deployment. If your operation is being held back by software that can't take the volume, that's the work we do."
      />
    </>
  );
}
