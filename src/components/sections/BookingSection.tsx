import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { MessageSquare, Calendar, Video, Clock, Globe } from "lucide-react";
import { Container } from "../layout/Container";
import { MarkerAccent } from "../ui/MarkerAccent";
import { BackgroundSpirals } from "../ui/BackgroundSpirals";
import { Reveal } from "../motion/Reveal";
import { AnimatedHeadline } from "../motion/AnimatedHeadline";

const expectations = [
  {
    icon: MessageSquare,
    title: "A real conversation",
    description:
      "No slides, no hard sell — we listen to your operation and where it hurts.",
  },
  {
    icon: Calendar,
    title: "A tailored plan",
    description:
      "Straight answers on scope, timeline, and pricing for your exact needs.",
  },
  {
    icon: Video,
    title: "A clear next step",
    description:
      "You leave with a concrete recommendation — or an honest no.",
  },
];

const callDetails = [
  { icon: Clock, text: "20–30 minutes" },
  { icon: Video, text: "Google Meet / Zoom" },
  { icon: Globe, text: "US & Global time zones" },
];

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
      className="relative overflow-hidden py-24 md:py-32 bg-cream-soft"
    >
      <BackgroundSpirals side="left" opacity={0.15} />

      {/* Subtle ambient mint glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-32 w-[400px] h-[400px] rounded-full bg-mint blur-[130px] opacity-40 transform-gpu"
      />

      {/* Hand-drawn marker accents */}
      <MarkerAccent
        variant="scribble"
        className="absolute top-24 left-[3%] w-20 h-14 opacity-50 z-0 pointer-events-none"
        color="#0D9488"
        rotate={-12}
      />
      <MarkerAccent
        variant="star"
        className="absolute bottom-28 right-[4%] w-12 h-12 opacity-50 z-0 pointer-events-none"
        color="#0D9488"
        rotate={15}
      />
      <MarkerAccent
        variant="arrow"
        className="absolute top-1/2 right-[2%] w-16 h-12 opacity-40 z-0 pointer-events-none"
        color="#0D9488"
        rotate={-140}
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context, Expectation Cards & Call Details */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-teal mb-3 block">
                Book A Meeting
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-navy leading-tight tracking-tight mb-4">
                Let's map your next move in{" "}
                <span className="relative inline-block text-teal">
                  <AnimatedHeadline as="span" text="one call." />
                </span>
              </h2>
              <p className="text-navy/70 leading-relaxed text-base mb-8">
                Pick a time that works for you. Here's exactly what you can expect
                when we talk.
              </p>

              {/* Expectation Cards */}
              <div className="flex flex-col gap-4 mb-8">
                {expectations.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="group flex items-start gap-4 p-5 rounded-2xl bg-white/90 border border-navy/10 shadow-sm hover:shadow-md hover:border-teal/30 transition-all duration-300"
                    >
                      <span className="w-10 h-10 rounded-xl bg-teal/10 border border-teal/20 text-teal flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-teal group-hover:text-white transition-colors duration-300">
                        <Icon className="w-5 h-5" strokeWidth={2} />
                      </span>
                      <div>
                        <h3 className="font-heading font-bold text-base text-navy leading-snug mb-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-navy/70 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Call Metadata Details */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-navy/10 text-xs font-medium text-navy/70">
              {callDetails.map((detail) => {
                const Icon = detail.icon;
                return (
                  <span
                    key={detail.text}
                    className="inline-flex items-center gap-2 bg-white/80 border border-navy/10 px-3 py-1.5 rounded-full"
                  >
                    <Icon className="w-3.5 h-3.5 text-teal" strokeWidth={2} />
                    {detail.text}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Right Column: Cal.com Booking Widget Container */}
          <div className="lg:col-span-7 w-full">
            <Reveal
              variant="frame"
              as="div"
              className="w-full rounded-3xl border border-navy/10 bg-white/90 shadow-2xl p-4 md:p-6 overflow-hidden"
            >
              <Cal
                calLink="treemate"
                style={{
                  width: "100%",
                  height: "720px",
                  minWidth: "320px",
                  overflow: "scroll",
                }}
                config={{ layout: "month_view" }}
              />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
