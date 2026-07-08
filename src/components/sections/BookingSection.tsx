import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { Container } from "../layout/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { MarkerAccent } from "../ui/MarkerAccent";
import { Reveal } from "../motion/Reveal";
export function BookingSection() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#0D9488" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);
  return (
    <section
      id="booking-section"
      className="relative overflow-hidden py-24 md:py-32 bg-white"
    >
      {}
      <MarkerAccent
        variant="scribble"
        className="absolute top-32 left-[5%] w-24 h-16 opacity-60"
        color="#0D9488"
        rotate={-12}
      />
      <MarkerAccent
        variant="star"
        className="absolute bottom-32 right-[6%] w-12 h-12 opacity-60"
        color="#0D9488"
        rotate={15}
      />
      <MarkerAccent
        variant="arrow"
        className="absolute top-1/3 right-[4%] w-20 h-14 opacity-50"
        color="#0D9488"
        rotate={-140}
      />
      <Container className="relative z-10">
        <div className="mb-12 md:mb-16">
          <SectionTitle
            title="Book A Meeting"
            subtitle="Choose a time that works for you to discuss how Treemate can help your business."
            align="center"
          />
        </div>
        <Reveal variant="frame" as="div" className="w-full max-w-5xl mx-auto">
          <Cal
            calLink="treemate"
            style={{
              width: "100%",
              height: "900px",
              minWidth: "320px",
              overflow: "scroll",
            }}
            config={{ layout: "month_view" }}
          />
        </Reveal>
      </Container>
    </section>
  );
}
