import { motion } from "motion/react";
import { milestoneKinds, milestones, type MilestoneKind } from "../../data/timeline";
import { cx } from "../../lib/cx";
import { fadeUp, inViewOnce, stagger } from "../../lib/motion";

const years = [...new Set(milestones.map((m) => m.year))];
const legendOrder: MilestoneKind[] = ["build", "work", "learning", "education"];

function KindMark({ kind, className }: { kind: MilestoneKind; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        "h-2 w-2 shrink-0 rounded-full",
        kind === "build" && "bg-accent",
        kind === "work" && "border-[1.5px] border-accent",
        kind === "learning" && "bg-fg-faint",
        kind === "education" && "border-[1.5px] border-fg-faint",
        className,
      )}
    />
  );
}

/** Chronological log of every dated item on the CV — the story from first semester to now. */
export function Trajectory() {
  return (
    <div className="mt-24 md:mt-32">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-4">
        <div>
          <h3 className="text-lg font-medium tracking-tight">The path so far</h3>
          <p className="mt-1 font-mono text-xs text-fg-faint">Aug 2024 → now, oldest first</p>
        </div>
        <ul aria-label="Legend" className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] text-fg-faint">
          {legendOrder.map((kind) => (
            <li key={kind} className="flex items-center gap-2">
              <KindMark kind={kind} />
              {milestoneKinds[kind].toLowerCase()}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid md:grid-cols-3 md:divide-x md:divide-line">
        {years.map((year, yearIndex) => (
          <motion.div
            key={year}
            className="border-b border-line py-7 last:border-b-0 md:border-b-0 md:px-6 md:first:pl-0 md:last:pr-0"
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
            variants={stagger(0.06, yearIndex * 0.12)}
          >
            <motion.p variants={fadeUp} className="font-mono text-sm text-fg">
              {year}
            </motion.p>
            <ol className="mt-4 space-y-0.5">
              {milestones
                .filter((m) => m.year === year)
                .map((m) => (
                  <motion.li key={`${m.month}-${m.title}`} variants={fadeUp}>
                    <a
                      href={m.href}
                      className="group -mx-2 flex items-start gap-3 rounded-md px-2 py-2 transition-colors duration-200 hover:bg-ink-2"
                    >
                      <span className="w-8 shrink-0 pt-px font-mono text-[11.5px] text-fg-faint">{m.month}</span>
                      <KindMark kind={m.kind} className="mt-[7px]" />
                      <span className="min-w-0">
                        <span className="block text-[14.5px] leading-snug text-fg-muted transition-colors group-hover:text-fg">
                          {m.title}
                        </span>
                        <span className="mt-0.5 block font-mono text-[11px] text-fg-faint">
                          <span className="sr-only">{milestoneKinds[m.kind]}: </span>
                          {m.detail}
                        </span>
                      </span>
                    </a>
                  </motion.li>
                ))}
            </ol>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
