import { AnimatePresence, motion } from "motion/react";
import type { Skill } from "../../data/skills";
import { workOrder, workRefs } from "../../data/work";
import { cx } from "../../lib/cx";

export function UsagePanel({ skill }: { skill: Skill }) {
  const count = skill.usedIn.length;

  return (
    <div className="rounded-lg border border-line bg-ink-2">
      <div className="flex items-center justify-between border-b border-line px-4 py-3 font-mono text-[11px] text-fg-faint">
        <span>where it shows up</span>
        <span>{count > 0 ? `${count} of ${workOrder.length}` : "—"}</span>
      </div>

      <div className="px-4 pt-4" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={skill.name}
            className="text-lg font-medium tracking-tight"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {skill.name}
          </motion.p>
        </AnimatePresence>
      </div>

      <ul className="p-2">
        {workOrder.map((ref) => {
          const used = skill.usedIn.includes(ref);
          const work = workRefs[ref];
          return (
            <li key={ref}>
              <a
                href={work.href}
                className={cx(
                  "flex items-center gap-3 rounded-md px-2 py-2.5 transition-[opacity,background-color] duration-300 hover:bg-ink-3",
                  used ? "opacity-100" : "opacity-45 hover:opacity-80",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cx(
                    "h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300",
                    used ? "bg-accent" : "bg-line-strong",
                  )}
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] leading-snug text-fg">{work.label}</span>
                  <span className="font-mono text-[11px] text-fg-faint">
                    {work.kind} · {work.date}
                  </span>
                </span>
                <span className="sr-only">{used ? `(uses ${skill.name})` : `(does not use ${skill.name})`}</span>
              </a>
            </li>
          );
        })}
      </ul>

      {count === 0 && (
        <p className="border-t border-line px-4 py-3 text-[13.5px] leading-snug text-fg-muted">
          Listed in my core skills; not tied to a specific project on this page.
        </p>
      )}
    </div>
  );
}
