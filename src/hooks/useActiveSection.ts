import { useEffect, useState } from "react";

/**
 * Returns the id of the section whose top has passed 40% of the viewport.
 * Measured on scroll (rAF-throttled) so it stays correct for sections of any height.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
        setActive(elements[elements.length - 1].id);
        return;
      }
      const probe = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= probe) current = el.id;
      }
      setActive(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [ids]);

  return active;
}
