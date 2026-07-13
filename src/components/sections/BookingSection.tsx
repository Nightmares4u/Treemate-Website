import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, Clock, Video, MessageSquare } from "lucide-react";
import { Container } from "../layout/Container";
import { MarkerAccent } from "../ui/MarkerAccent";
import { HighlighterMark } from "../ui/HighlighterMark";
import { fadeIn, staggerContainer } from "../../lib/motion";

const expectations = [
  {
    icon: MessageSquare,
    title: "A real conversation",
    body: "No slides, no hard sell — we listen to your operation and where it hurts.",
  },
  {
    icon: CalendarCheck,
    title: "A tailored plan",
    body: "Straight answers on scope, timeline, and pricing for your exact needs.",
  },
  {
    icon: Video,
    title: "A clear next step",
    body: "You leave with a concrete recommendation — or an honest no.",
  },
];

const meta = [
  { icon: Clock, label: "20–30 minutes" },
  { icon: Video, label: "Google Meet / Zoom" },
  { icon: CalendarCheck, label: "US & AU time zones" },
];

export function BookingSection() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#0D9488" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);
  return (
    <section
      id="booking-section"
      className="relative overflow-hidden py-24 md:py-32 bg-surface-2"
    >
      <MarkerAccent
        variant="scribble"
        className="absolute top-28 left-[4%] w-24 h-16 opacity-50"
        color="#0D9488"
        rotate={-12}
      />
      <MarkerAccent
        variant="star"
        className="absolute bottom-28 right-[5%] w-12 h-12 opacity-50"
        color="#0D9488"
        rotate={15}
      />
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left — the pitch */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            <motion.span
              variants={fadeIn}
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal"
            >
              Book a meeting
            </motion.span>
            <motion.h2
              variants={fadeIn}
              className="mt-4 font-heading font-semibold text-ink leading-[1.05] tracking-[-0.02em] text-4xl md:text-5xl"
            >
              Let&rsquo;s map your next move in{" "}
              <span className="relative inline-block">
                <HighlighterMark
                  color="#B8F0DC"
                  opacity={0.75}
                  rotate={-1.4}
                  className="absolute left-[-3%] right-[-3%] top-[20%] bottom-[8%] w-[106%] h-[72%] -z-10"
                />
                <span className="relative z-10">one call</span>
              </span>
              .
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="mt-5 text-base md:text-lg text-ink/70 leading-relaxed max-w-md"
            >
              Pick a time that works for you. Here&rsquo;s exactly what you can
              expect when we talk.
            </motion.p>

            <motion.ul variants={fadeIn} className="mt-8 flex flex-col gap-3">
              {expectations.map((item) => (
                <li
                  key={item.title}
                  className="group u-card flex items-start gap-4 rounded-2xl border border-ink/10 bg-surface p-5"
                >
                  <span className="u-icon w-11 h-11 shrink-0 rounded-xl border border-teal/20 bg-teal/10 text-teal flex items-center justify-center">
                    <item.icon className="w-5 h-5" strokeWidth={2} />
                  </span>
                  <span>
                    <span className="block font-heading font-bold text-ink">
                      {item.title}
                    </span>
                    <span className="block text-sm text-ink/65 leading-relaxed">
                      {item.body}
                    </span>
                  </span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              variants={fadeIn}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2 pt-6 border-t border-ink/10"
            >
              {meta.map((m) => (
                <span
                  key={m.label}
                  className="inline-flex items-center gap-2 text-sm font-medium text-ink/70"
                >
                  <m.icon className="w-4 h-4 text-teal" strokeWidth={2} />
                  {m.label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — the calendar, in a lifted card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl border border-ink/10 bg-surface shadow-xl shadow-ink/[0.06] p-2 sm:p-3 md:p-4">
              <Cal
                calLink="treemate"
                style={{
                  width: "100%",
                  height: "820px",
                  minWidth: "280px",
                  overflow: "scroll",
                  borderRadius: "1rem",
                }}
                config={{ layout: "month_view" }}
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
