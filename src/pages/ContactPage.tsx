import { PageHero } from "../components/sections/PageHero";
import { ContactForm } from "../components/sections/ContactForm";
import { ContactCards } from "../components/sections/ContactCards";
import { BookingSection } from "../components/sections/BookingSection";
export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get In Touch"
        tagline="Let's create the future of your business together."
        description="Whether you need consulting, custom software, or a full operations partner — Treemate is here to help. Book a call or send us the details below."
        primaryCta={{ label: "Book A Meeting", href: "#send-us-a-message" }}
        secondaryCta={{ label: "See our services", to: "/software-ai" }}
        backdrop
      />
      <BookingSection />
      <div id="send-us-a-message">
        <ContactForm />
      </div>
      <ContactCards />
    </>
  );
}
