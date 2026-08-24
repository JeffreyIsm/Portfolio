"use client";

import { motion, useTransform } from "motion/react";

const RAD = Math.PI / 180;

// Shortest signed distance from `angle` to 0deg (the active position), in degrees.
function signedDelta(angle) {
  return (((angle % 360) + 540) % 360) - 180;
}

/**
 * One item on the wheel. It reads the shared `rotation` motion value and derives
 * its own position/scale/opacity from it, so the wheel animates on the compositor
 * without re-rendering React on every frame.
 */
export default function ExperienceWheelItem({
  experience,
  baseAngle,
  rotation,
  radius,
  itemSize,
  spacing,
  isActive,
  onSelect,
}) {
  // 1 when parked at the active position, falling to 0 one slot away.
  const proximity = useTransform(rotation, (r) => {
    const d = Math.abs(signedDelta(baseAngle + r));
    return Math.max(0, 1 - d / spacing);
  });

  const x = useTransform(rotation, (r) => radius * Math.cos((baseAngle + r) * RAD));
  const y = useTransform(rotation, (r) => radius * Math.sin((baseAngle + r) * RAD));
  const scale = useTransform(proximity, (p) => 0.58 + p * 0.62);
  const opacity = useTransform(proximity, (p) => 0.4 + p * 0.6);
  const labelOpacity = useTransform(proximity, (p) => Math.max(0, p * 1.6 - 0.6));

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-current={isActive ? "true" : undefined}
      aria-label={`${experience.name}, ${experience.year}`}
      style={{
        x,
        y,
        scale,
        opacity,
        width: itemSize,
        marginLeft: -itemSize / 2,
        marginTop: -itemSize / 2,
        transformOrigin: `50% ${itemSize / 2}px`,
      }}
      className="absolute left-1/2 top-1/2 flex flex-col items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-2xl"
    >
      <img
        src={experience.logo}
        alt=""
        draggable={false}
        style={{ width: itemSize, height: itemSize }}
        className={`object-cover select-none [-webkit-user-drag:none] ${
          experience.logoRounded ? "rounded-full" : "rounded-2xl"
        }`}
      />
      {/* Text only resolves for the item at the active position, so selection is
          legible without relying on colour alone. */}
      <motion.span
        style={{ opacity: labelOpacity }}
        className="pointer-events-none whitespace-nowrap text-center leading-tight"
      >
        <span className="block font-michroma-regular text-[11px] md:text-xs text-white">
          {experience.name}
        </span>
        <span className="block text-[10px] md:text-[11px] text-red-400">{experience.year}</span>
      </motion.span>
    </motion.button>
  );
}
