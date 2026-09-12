import type { Variants } from "motion/react";

/** Long, soft ease-out used for every entrance on the site. */
export const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const inViewOnce = { once: true, margin: "0px 0px -10% 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export const stagger = (each = 0.07, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren: delay } },
});
