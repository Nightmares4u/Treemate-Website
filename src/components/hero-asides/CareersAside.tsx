import { motion, useReducedMotion } from "framer-motion";
import { Send } from "lucide-react";
import { HeroAside } from "./HeroAside";
import { rowRise } from "./asideMotion";
import { fadeOnly } from "../../lib/motion";
import { jobOpenings, groupByDepartment } from "../../data/careers";

/**
 * Careers — open roles by department, mirroring the office-list rhythm of
 * ContactAside. Hovering a row nudges it the same way every other aside does.
 */
const departmentGroups = Array.from(groupByDepartment(jobOpenings).entries());

export function CareersAside() {
  const reduced = useReducedMotion();
  const item = reduced ? fadeOnly : rowRise;

  return (
    <HeroAside
      label="Now Hiring"
      meta={`${jobOpenings.length} Roles Open`}
      footer="Apply directly — we respond within a few business days."
      footerIcon={Send}
    >
      <ul className="flex flex-col">
        {departmentGroups.map(([department, jobs]) => (
          <motion.li
            key={department}
            variants={item}
            className="group/row flex cursor-default items-center justify-between gap-4 border-b border-navy/10 py-3 first:pt-0 last:border-b-0 last:pb-0"
          >
            <span className="font-heading text-sm font-bold text-navy transition-transform duration-300 group-hover/row:translate-x-1">
              {department}
            </span>
            <span className="flex shrink-0 items-center gap-2.5">
              <span className="font-heading text-xl font-semibold tabular-nums leading-none tracking-tight text-navy">
                {jobs.length}
              </span>
              <span className="h-2 w-2 rounded-full bg-teal transition-all duration-300 group-hover/row:shadow-[0_0_10px_2px_rgba(13,148,136,0.5)]" />
            </span>
          </motion.li>
        ))}
      </ul>
    </HeroAside>
  );
}
