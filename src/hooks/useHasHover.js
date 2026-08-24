import { useEffect, useState } from "react";

/**
 * True only on devices with a real hovering pointer.
 *
 * Touch screens report `(hover: none)`. There, browsers fake hover with a
 * "first tap hovers, second tap clicks" emulation, and the hover state sticks
 * until you tap elsewhere -- so anything hover-driven needs an explicit tap
 * path instead of relying on that. Defaults to true so the first paint assumes
 * desktop; the effect corrects it immediately.
 */
export function useHasHover() {
  const [hasHover, setHasHover] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const update = () => setHasHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return hasHover;
}
