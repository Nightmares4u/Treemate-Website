import { Hero } from "../components/sections/Hero";
import { Pillars } from "../components/sections/Pillars";
import { ClosedLoop } from "../components/sections/ClosedLoop";
import { LoopInAction } from "../components/sections/LoopInAction";
import { Impact } from "../components/sections/Impact";
import { WhyChoose } from "../components/sections/WhyChoose";
import { FAQ } from "../components/sections/FAQ";
import { ContactCards } from "../components/sections/ContactCards";
import { BookingSection } from "../components/sections/BookingSection";
export function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <ClosedLoop />
      <LoopInAction />
      <Impact />
      <WhyChoose />
      <FAQ />
      <BookingSection />
      <ContactCards />
    </>
  );
}
