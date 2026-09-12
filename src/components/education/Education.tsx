import { motion } from "motion/react";
import { education } from "../../data/education";
import { ease, inViewOnce } from "../../lib/motion";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="border-t border-line py-24 md:py-36">
      <Container>
        <SectionHeading index="05" kicker="Foundation" titleId="education-title" title="Education" />

        <ol className="border-t border-line">
          {education.map((entry, i) => (
            <motion.li
              key={entry.institution}
              className="grid gap-4 border-b border-line py-8 md:grid-cols-[12rem_minmax(0,1fr)_auto] md:gap-10 md:py-10"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.7, ease, delay: i * 0.1 }}
            >
              <div className="flex items-center gap-3 font-mono text-xs md:flex-col md:items-start md:gap-2">
                <p className="text-fg-muted">
                  {entry.start} — {entry.end}
                </p>
                {entry.current && (
                  <span className="rounded border border-accent/40 px-1.5 py-0.5 text-[10.5px] text-accent">in progress</span>
                )}
              </div>

              <div>
                <h3 className="text-xl font-medium tracking-tight">{entry.institution}</h3>
                <p className="mt-2 text-fg">{entry.qualification}</p>
                {entry.field && <p className="mt-0.5 text-pretty text-fg-muted">{entry.field}</p>}
                <p className="mt-3 font-mono text-xs text-fg-faint">{entry.location}</p>
              </div>

              <div className="flex items-baseline gap-3 md:flex-col md:items-end md:gap-1">
                <p className="font-mono text-[11px] text-fg-faint">{entry.score.label}</p>
                <p className="text-2xl font-medium tracking-tight tabular-nums">{entry.score.value}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
