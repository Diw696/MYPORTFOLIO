import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cx } from "../../lib/cx";
import { ease, inViewOnce } from "../../lib/motion";
import { Reveal } from "./Reveal";
import { TextReveal } from "./TextReveal";

type SectionHeadingProps = {
  index: string;
  kicker: string;
  title: string;
  titleId: string;
  lead?: ReactNode;
  className?: string;
};

/**
 * Each section opens like the next node in a pipeline: a short edge draws
 * down into an indexed node, then the title rises in.
 */
export function SectionHeading({ index, kicker, title, titleId, lead, className }: SectionHeadingProps) {
  return (
    <div className={cx("mb-14 md:mb-20", className)}>
      <div className="flex items-center gap-3 font-mono text-xs text-fg-faint">
        <span className="relative flex h-3 w-3 items-center justify-center" aria-hidden="true">
          <motion.span
            className="absolute bottom-full left-1/2 mb-1 h-12 w-px origin-bottom bg-linear-to-b from-transparent to-line-strong"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={inViewOnce}
            transition={{ duration: 0.8, ease }}
          />
          <motion.span
            className="h-2 w-2 rounded-full border border-accent"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={inViewOnce}
            transition={{ duration: 0.5, ease, delay: 0.45 }}
          />
        </span>
        <span className="text-accent">{index}</span>
        <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
        <span>{kicker}</span>
      </div>

      <h2
        id={titleId}
        className="mt-5 max-w-3xl text-[clamp(1.875rem,4vw,2.625rem)] leading-[1.1] font-semibold tracking-[-0.025em] text-balance"
      >
        <TextReveal text={title} delay={0.1} />
      </h2>

      {lead && (
        <Reveal delay={0.2}>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-pretty text-fg-muted">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
