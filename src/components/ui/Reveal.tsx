import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ease, inViewOnce } from "../../lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/** Fades and lifts content once as it enters the viewport. */
export function Reveal({ children, className, delay = 0, y = 20 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ duration: 0.75, ease, delay }}
    >
      {children}
    </motion.div>
  );
}
