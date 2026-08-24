"use client";
/**
 * @author: @dorianbaffier (original)
 * @description: Card Flip
 * @license: MIT
 * @website: https://kokonutui.com
 *
 * LOCAL EDIT: heavily adapted. The upstream card is a fixed 320x280 marketing
 * tile with a decorative blob front and a hardcoded orange accent. This version
 * fronts a real image, fills its container, uses the site's white/5 + red-500
 * surface idiom, and flips on tap as well as hover. The upstream `<style jsx>`
 * block (Next.js-only syntax) is gone with the blob it powered.
 */

import { ArrowRight, Repeat2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useHasHover } from "@/hooks/useHasHover";

const FACE =
  "absolute inset-0 h-full w-full [backface-visibility:hidden] overflow-hidden " +
  "rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm";

export default function CardFlip({
  image,
  imageAlt = "",
  title,
  subtitle,
  badge,
  meta = [],
  description = [],
  features = [],
  className,
}) {
  const hasHover = useHasHover();
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  // On touch, a tap fires the emulated mouseenter *and* the click, and the
  // hover sticks -- so `hovered` would pin the card open forever. Ignore it
  // entirely where there is no real hovering pointer; tap drives the flip.
  const flipped = (hasHover && hovered) || pinned;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={pinned}
      aria-label={`${title}. Activate to ${flipped ? "show image" : "read details"}.`}
      onMouseEnter={hasHover ? () => setHovered(true) : undefined}
      onMouseLeave={hasHover ? () => setHovered(false) : undefined}
      onClick={() => setPinned((p) => !p)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setPinned((p) => !p);
        }
      }}
      className={cn(
        "group relative w-full cursor-pointer [perspective:2000px]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-3xl",
        className
      )}
    >
      <div
        className={cn(
          "relative h-full w-full [transform-style:preserve-3d]",
          "transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]",
          "motion-reduce:transition-none",
          flipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
        )}
      >
        {/* ---------- Front: the image ---------- */}
        <div className={cn(FACE, "[transform:rotateY(0deg)]")}>
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Scrim so the title stays legible over any photo. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          <div className="absolute right-0 bottom-0 left-0 p-5 md:p-6">
            <div className="flex items-end justify-between gap-3">
              <div className="space-y-1.5">
                {badge && (
                  <span className="inline-block px-3 py-1 rounded-lg text-xs border border-white/20 text-white/70">
                    {badge}
                  </span>
                )}
                <h3 className="font-michroma-regular font-bold text-[clamp(1.125rem,1.9vw,1.5rem)] text-white leading-snug transition-transform duration-500 group-hover:-translate-y-1">
                  {title}
                </h3>
                <p className="text-sm md:text-base text-red-400 font-semibold transition-transform delay-[50ms] duration-500 group-hover:-translate-y-1">
                  {subtitle}
                </p>
              </div>
              <Repeat2
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-red-500 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
              />
            </div>
          </div>
        </div>

        {/* ---------- Back: the write-up ---------- */}
        <div className={cn(FACE, "[transform:rotateY(180deg)] flex flex-col p-[clamp(1.25rem,2.2vw,2rem)]")}>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-michroma-regular font-bold text-[clamp(1.05rem,1.8vw,1.5rem)] text-white">
              {title}
            </h3>
            {badge && (
              <span className="px-3 py-1 rounded-lg text-xs border border-white/20 text-white/70">
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm md:text-base text-red-400 font-semibold pt-1">{subtitle}</p>

          {meta.length > 0 && (
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-400 pt-3">
              {meta.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          )}

          {/* Bullet counts vary a lot between roles, and both faces are absolutely
              positioned -- so the overflow scrolls rather than blowing the height. */}
          <div className="thin-scrollbar flex-1 min-h-0 overflow-y-auto pr-2 pt-5 mt-5 border-t border-white/10">
            <h4 className="font-michroma-regular text-sm text-white/80 mb-3">My Role</h4>
            <ul className="space-y-3">
              {description.map((bullet, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm md:text-base text-gray-200 leading-relaxed transition-[transform,opacity] duration-300"
                  style={{
                    transform: flipped ? "translateX(0)" : "translateX(-10px)",
                    opacity: flipped ? 1 : 0,
                    transitionDelay: `${i * 50 + 150}ms`,
                  }}
                >
                  <ArrowRight aria-hidden="true" className="h-3 w-3 mt-1.5 shrink-0 text-red-500" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {features.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-5 mt-5 border-t border-white/10">
              {features.map((f) => (
                <span
                  key={f}
                  className="px-3 py-1 rounded-lg text-xs md:text-sm border border-white/20 text-gray-300 transition-all hover:border-white/40"
                >
                  {f}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
