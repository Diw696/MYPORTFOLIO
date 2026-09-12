import { Fragment } from "react";
import { motion } from "motion/react";
import { ease, inViewOnce } from "../../lib/motion";

type TextRevealProps = {
  text: string;
  delay?: number;
  stagger?: number;
  /** "view" waits for the viewport; "mount" plays immediately (above the fold). */
  trigger?: "view" | "mount";
};

/**
 * Word-by-word masked rise. Words stay real text (with real spaces between them)
 * so headings read correctly for screen readers and crawlers.
 */
export function TextReveal({ text, delay = 0, stagger = 0.05, trigger = "view" }: TextRevealProps) {
  const words = text.split(" ");
  const play =
    trigger === "view"
      ? { whileInView: { y: "0%" }, viewport: inViewOnce }
      : { animate: { y: "0%" } };

  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              {...play}
              transition={{ duration: 0.85, ease, delay: delay + i * stagger }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </>
  );
}
