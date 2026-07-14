import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroAside } from "./HeroAside";
import { rowRise } from "./asideMotion";
import { fadeOnly } from "../../lib/motion";
import { siteConfig } from "../../data/site";
/**
 * Contact — the two desks you're reaching, in their own local time. Hovering an
 * office says what it does for you.
 *
 * Deliberately no open/closed state: coverage is 24/7, so a business-hours
 * badge would read as "closed" to most of the world for most of the day.
 */
const offices = siteConfig.offices;
/** Local wall-clock time at a desk, e.g. "04:35". */
function readTime(tz: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}
export function ContactAside() {
  const reduced = useReducedMotion();
  const [times, setTimes] = useState<string[]>(() =>
    offices.map((o) => readTime(o.tz)),
  );
  // The clock is real, so it has to keep up with the wall — but it only
  // re-reads the time, and nothing animates when it does.
  useEffect(() => {
    const id = setInterval(
      () => setTimes(offices.map((o) => readTime(o.tz))),
      30_000,
    );
    return () => clearInterval(id);
  }, []);
  return (
    <HeroAside
      label="Where We Are"
      meta="Local Time"
      footer="Covered around the clock. We reply within one business day."
      footerIcon={Send}
    >
      <ul className="flex flex-col">
        {offices.map((office, i) => (
          <motion.li
            key={office.city}
            variants={reduced ? fadeOnly : rowRise}
            className="group/row flex cursor-default items-center justify-between gap-4 border-b border-navy/10 py-3 first:pt-0 last:border-b-0 last:pb-0"
          >
            <span className="flex min-w-0 flex-col leading-tight transition-transform duration-300 group-hover/row:translate-x-1">
              <span className="font-heading text-sm font-bold text-navy">
                {office.city}
              </span>
              {/* The region rolls up to reveal what the office actually does.
                  Both labels stay in flow, so the taller/wider one sizes the
                  window and neither gets clipped. */}
              <span className="block h-4 overflow-hidden">
                <span className="flex flex-col transition-transform duration-300 group-hover/row:-translate-y-4">
                  <span className="flex h-4 items-center whitespace-nowrap text-[11px] uppercase tracking-[0.14em] text-navy/45">
                    {office.region}
                  </span>
                  <span className="flex h-4 items-center whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.14em] text-teal">
                    {office.role}
                  </span>
                </span>
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-2.5">
              <span className="font-heading text-xl font-semibold tabular-nums leading-none tracking-tight text-navy">
                {times[i]}
              </span>
              {/* Always lit — both desks are inside 24/7 coverage. */}
              <span className="h-2 w-2 rounded-full bg-teal transition-all duration-300 group-hover/row:shadow-[0_0_10px_2px_rgba(13,148,136,0.5)]" />
            </span>
          </motion.li>
        ))}
      </ul>
    </HeroAside>
  );
}
