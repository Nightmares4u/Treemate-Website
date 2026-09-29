import { PageHero } from "../components/sections/PageHero";
import { OurStory } from "../components/sections/OurStory";
import { Values } from "../components/sections/Values";
import { JoinUs } from "../components/sections/JoinUs";
import { ContactCards } from "../components/sections/ContactCards";
import { LoopAside } from "../components/hero-asides/LoopAside";
export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="One Company. One Accountable Operating Model."
        tagline="Treemate is a hybrid IT consultancy and BPO built on one idea: software, staffing, and support should run as one integrated system — not three separate contracts."
        description="Treemate brings product engineering, managed operations, and customer support together under one accountable company. We take responsibility for the systems, delivery, and outcomes that keep client operations moving."
        primaryCta={{ label: "Book A Meeting", to: "/contact" }}
        secondaryCta={{ label: "See our services", to: "/software-ai" }}
        aside={<LoopAside />}
      />
      <OurStory />
      <Values />
      <JoinUs />
      <ContactCards />
    </>
  );
}
