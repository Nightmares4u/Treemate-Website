import { PageHero } from "../components/sections/PageHero";
import { OurStory } from "../components/sections/OurStory";
import { Values } from "../components/sections/Values";
import { MeetTheTeam } from "../components/sections/MeetTheTeam";
import { JoinUs } from "../components/sections/JoinUs";
import { FounderQuote } from "../components/sections/FounderQuote";
import { ContactCards } from "../components/sections/ContactCards";
export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Driving Innovation. Building the Loop."
        tagline="Treemate is a hybrid IT consultancy and BPO built on one idea: software, staffing, and support should run as one integrated system — not three separate contracts."
        description="We build the software that runs your business, staff the people who manage it, and support the customers it serves. Across the US and Australia, under one accountable partnership."
        primaryCta={{ label: "Book A Meeting", to: "/contact" }}
        secondaryCta={{ label: "See our services", to: "/software-ai" }}
      />
      <MeetTheTeam />
      <OurStory />
      <Values />
      <JoinUs />
      <FounderQuote />
      <ContactCards />
    </>
  );
}
