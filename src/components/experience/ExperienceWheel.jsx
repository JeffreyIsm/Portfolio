"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, useMotionValue, useReducedMotion } from "motion/react";
import ExperienceWheelItem from "./ExperienceWheelItem";

const RAD = Math.PI / 180;
const mod = (n, m) => ((n % m) + m) % m;

// --- rotation hint --------------------------------------------------------
// Two arcs riding the outer ring, drawn in a 100x100 viewBox so they scale with
// the wheel. Angles are SVG-style (y down), so increasing the angle travels
// clockwise; the pair points the same way round the circle, which is what reads
// as "this spins" rather than as two separate one-way buttons.
const HINT_R = 49;
const HINT_SPAN = 22; // half-length of each arc, in degrees
const HEAD = 3.4; // arrowhead arm length, in viewBox units

const onRing = (deg) => [50 + HINT_R * Math.cos(deg * RAD), 50 + HINT_R * Math.sin(deg * RAD)];

// Arc from `deg - HINT_SPAN` to `deg + HINT_SPAN`, plus an arrowhead at the
// leading (clockwise) end, its arms swept back off the tangent there.
function hint(deg) {
  const [sx, sy] = onRing(deg - HINT_SPAN);
  const tipDeg = deg + HINT_SPAN;
  const [tx, ty] = onRing(tipDeg);
  // Tangent at the tip for increasing angle, i.e. the direction of travel.
  const heading = Math.atan2(Math.cos(tipDeg * RAD), -Math.sin(tipDeg * RAD)) / RAD;
  const arm = (offset) => {
    const a = (heading + 180 + offset) * RAD;
    return `${tx + HEAD * Math.cos(a)} ${ty + HEAD * Math.sin(a)}`;
  };
  return `M ${sx} ${sy} A ${HINT_R} ${HINT_R} 0 0 1 ${tx} ${ty} M ${arm(28)} L ${tx} ${ty} L ${arm(-28)}`;
}

const HINTS = [hint(-90), hint(90)];

/**
 * Radial timeline. Items sit on a circle; the slot at 3 o'clock (0deg) is the
 * active position. Rotating the wheel brings a different item into that slot.
 *
 * `rotation` is an unbounded motion value in degrees -- never wrapped, so the
 * spring always travels the short way round instead of unwinding 350deg.
 */
export default function ExperienceWheel({ experiences, index, onIndexChange }) {
  const wrapRef = useRef(null);
  const rotation = useMotionValue(0);
  const [radius, setRadius] = useState(150);
  const reduceMotion = useReducedMotion();

  const count = experiences.length;
  const spacing = 360 / count;
  const itemSize = Math.max(44, Math.round(radius * 0.42));

  // Animate to the rotation that parks `i` at 0deg, via the nearest equivalent
  // angle to where we are now.
  // False while a snap is in flight. The wheel handler refuses to queue a step
  // until the motion has actually finished, so scrolls can't stack up.
  const settled = useRef(true);

  const snapTo = useCallback(
    (i) => {
      const raw = -i * spacing;
      const turns = Math.round((rotation.get() - raw) / 360);
      const target = raw + turns * 360;
      if (reduceMotion) {
        rotation.set(target);
        settled.current = true;
        return;
      }
      settled.current = false;
      const controls = animate(rotation, target, {
        type: "spring",
        stiffness: 110,
        damping: 18,
        mass: 0.9,
      });
      controls.then(() => (settled.current = true));
    },
    [rotation, spacing, reduceMotion]
  );

  useEffect(() => {
    snapTo(index);
  }, [index, snapTo]);

  // Radius follows the container, so the wheel scales across breakpoints.
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setRadius(el.clientWidth * 0.36));
    ro.observe(el);
    setRadius(el.clientWidth * 0.36);
    return () => ro.disconnect();
  }, []);

  const step = useCallback(
    (dir) => onIndexChange(mod(index + dir, count)),
    [index, count, onIndexChange]
  );

  // --- wheel / trackpad -----------------------------------------------------
  // Native listener with { passive: false }: React's onWheel is passive and so
  // cannot preventDefault. Scoped to this element, so the rest of the page
  // scrolls normally -- only a cursor over the wheel rotates it.
  //
  // One step per gesture. A gesture is a burst of wheel events; it ends after
  // GESTURE_END ms of silence, which also swallows trackpad/smooth-scroll
  // momentum. Once a gesture has produced a step -- or been rejected because a
  // snap was still running -- it is spent, so spamming does nothing. The next
  // step needs both a settled wheel and a fresh gesture.
  useEffect(() => {
    const el = wrapRef.current;
    // With a single item a step is a no-op, so `index` never changes, the snap
    // effect never re-runs, and the gate would never reopen. Don't listen.
    if (!el || count < 2) return;

    const GESTURE_END = 140;
    const THRESHOLD = 40;

    let acc = 0;
    let active = false; // a gesture is in progress
    let spent = false; // this gesture has already been judged
    let idle;

    const onWheel = (e) => {
      e.preventDefault();

      if (!active) {
        active = true;
        spent = false;
        acc = 0;
      }
      clearTimeout(idle);
      idle = setTimeout(() => (active = false), GESTURE_END);

      if (spent) return;

      // A scroll that arrives mid-snap burns the gesture rather than queueing.
      if (!settled.current) {
        spent = true;
        return;
      }

      acc += e.deltaY;
      if (Math.abs(acc) < THRESHOLD) return;

      spent = true;
      settled.current = false; // hold the gate until snapTo's animation lands
      step(acc > 0 ? 1 : -1);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      clearTimeout(idle);
      el.removeEventListener("wheel", onWheel);
    };
  }, [step, count]);

  // --- drag -----------------------------------------------------------------
  const drag = useRef(null);

  const pointerAngle = (e, el) => {
    const r = el.getBoundingClientRect();
    return (
      Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) / RAD
    );
  };

  const onPointerDown = (e) => {
    const el = wrapRef.current;
    if (!el) return;
    drag.current = {
      start: pointerAngle(e, el),
      from: rotation.get(),
      last: 0,
      id: e.pointerId,
      captured: false,
    };
  };

  const onPointerMove = (e) => {
    const el = wrapRef.current;
    if (!drag.current || !el) return;
    let delta = pointerAngle(e, el) - drag.current.start;
    // Unwrap across the +/-180 seam so a drag past the top doesn't jump a turn.
    while (delta - drag.current.last > 180) delta -= 360;
    while (delta - drag.current.last < -180) delta += 360;
    drag.current.last = delta;

    // Only claim the pointer once this is unambiguously a drag -- capturing on
    // pointerdown would retarget the click and break tap-to-select.
    if (!drag.current.captured && Math.abs(delta) > 2) {
      el.setPointerCapture?.(drag.current.id);
      drag.current.captured = true;
    }
    if (drag.current.captured) rotation.set(drag.current.from + delta);
  };

  const endDrag = () => {
    if (!drag.current) return;
    const wasDrag = drag.current.captured;
    drag.current = null;
    if (!wasDrag) return; // a tap: let the item's own onClick decide

    const nearest = mod(Math.round(-rotation.get() / spacing), count);
    onIndexChange(nearest);
    snapTo(nearest); // fires even when the index is unchanged, so it still settles
  };

  return (
    <div
      ref={wrapRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className="relative aspect-square w-full mx-auto touch-none select-none cursor-grab active:cursor-grabbing max-w-[min(85vw,25rem)] lg:max-w-[clamp(15rem,26vw,34rem)]"
    >
      {/* Rings, in the site's existing hairline-white idiom */}
      <div className="absolute inset-0 rounded-full border border-white/10" />
      <div className="absolute inset-[12%] rounded-full border border-white/[0.07]" />
      <div className="absolute inset-[26%] rounded-full border border-dashed border-white/[0.06]" />

      {/* Direction hint. overflow-visible because the stroke straddles the ring,
          and non-scaling-stroke so it stays a hairline at every breakpoint
          instead of thickening with the viewBox. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none text-white/30"
      >
        {HINTS.map((d) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* The fixed active slot at 3 o'clock */}
      <div
        aria-hidden="true"
        style={{
          width: itemSize * 1.5,
          height: itemSize * 1.5,
          marginLeft: -(itemSize * 1.5) / 2,
          marginTop: -(itemSize * 1.5) / 2,
          transform: `translateX(${radius}px)`,
        }}
        className="absolute left-1/2 top-1/2 rounded-full border border-red-500/50 bg-red-500/5 shadow-[0_0_30px_-5px_rgba(239,68,68,0.5)]"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="font-michroma-regular text-white/70 text-[10px] md:text-xs leading-relaxed text-center">
          CLICK, SCROLL,
          <br />
          OR DRAG
        </span>
        <span className="mt-2 text-[10px] md:text-xs text-white/40">
          {index + 1} / {count}
        </span>
      </div>

      {experiences.map((exp, i) => (
        <ExperienceWheelItem
          key={exp.id}
          experience={exp}
          baseAngle={i * spacing}
          rotation={rotation}
          radius={radius}
          itemSize={itemSize}
          spacing={spacing}
          isActive={i === index}
          onSelect={() => onIndexChange(i)}
        />
      ))}
    </div>
  );
}
