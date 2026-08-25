"use client";

import { motion, useReducedMotion } from "motion/react";
import CardFlip from "@/components/kokonutui/card-flip";
import { useHasHover } from "@/hooks/useHasHover";

/**
 * All cards stay mounted and cross-fade; only the active one is interactive.
 *
 * Swapping them through AnimatePresence unmounted the <img>, and the browser
 * only caches the *file*, never the decoded bitmap -- so returning to an
 * experience paid the full JPEG decode again. Keeping them mounted pays it once.
 */
export default function ExperienceDetails({ experiences, index }) {
  const reduceMotion = useReducedMotion();
  const hasHover = useHasHover();

  return (
    <div className="w-full">
      {/* The flip is the only way to reach the write-up, and nothing about a
          photo advertises that -- so it needs saying. Wording tracks the input
          the device actually has, same source of truth as the flip itself.
          aria-hidden: CardFlip's own aria-label already says how to activate it. */}
      <p
        aria-hidden="true"
        className="font-michroma-regular text-[10px] md:text-xs text-white/40 text-right pr-1 pb-2"
      >
        ({hasHover ? "hover" : "tap"} me)
      </p>

      <div className="relative w-full h-[clamp(22rem,34vw,25rem)]">
        {experiences.map((exp, i) => {
          const active = i === index;
          return (
            <motion.div
              key={exp.id}
              aria-hidden={!active}
              initial={false}
              animate={{
                opacity: active ? 1 : 0,
                y: active || reduceMotion ? 0 : 12,
              }}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              style={{ pointerEvents: active ? "auto" : "none" }}
              className="absolute inset-0"
            >
              <CardFlip
                className="h-full"
                image={exp.image}
                imageAlt={exp.org}
                title={exp.name}
                subtitle={exp.role}
                badge={exp.year}
                meta={[`${exp.date}`, ` ${exp.location}`]}
                description={exp.description}
                features={exp.techStack}
              />
            </motion.div>
            );
          })}
      </div>
    </div>
  );
}
