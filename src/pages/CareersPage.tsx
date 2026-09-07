import { PageHero } from "../components/sections/PageHero";
import { JobListings } from "../components/sections/JobListings";
import { JoinUs } from "../components/sections/JoinUs";
import { CareersAside } from "../components/hero-asides/CareersAside";

export function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build your career at Treemate."
        tagline="We're a hybrid software house and BPO scaling out of Wyoming and Karachi — sales, engineering, and creative, all on one team."
        description="Open roles across our sales floor, engineering bench, and creative team. Apply directly below."
        primaryCta={{ label: "View Open Roles", href: "#open-roles" }}
        secondaryCta={{ label: "About Treemate", to: "/about" }}
        aside={<CareersAside />}
      />
      <JobListings />
      <JoinUs />
    </>
  );
}
