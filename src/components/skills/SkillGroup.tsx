import { AnimatePresence, motion } from "motion/react";
import type { SkillGroup as SkillGroupData } from "../../data/skills";
import { workRefs } from "../../data/work";
import { cx } from "../../lib/cx";
import { ease } from "../../lib/motion";
import { Reveal } from "../ui/Reveal";

type SkillGroupProps = {
  group: SkillGroupData;
  selected: string;
  onSelect: (name: string) => void;
  onPreview: (name: string | null) => void;
  delay: number;
};

export function SkillGroup({ group, selected, onSelect, onPreview, delay }: SkillGroupProps) {
  const selectedHere = group.skills.find((s) => s.name === selected);

  return (
    <Reveal delay={delay}>
      <div className="border-t border-line pt-5">
        <div className="flex items-baseline justify-between">
          <h3 className="text-[15px] font-medium">{group.title}</h3>
          <span className="font-mono text-[11px] text-fg-faint">{String(group.skills.length).padStart(2, "0")}</span>
        </div>

        <ul className="mt-4 flex flex-wrap gap-2">
          {group.skills.map((skill) => {
            const on = skill.name === selected;
            return (
              <li key={skill.name}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => onSelect(skill.name)}
                  onMouseEnter={() => onPreview(skill.name)}
                  onFocus={() => onPreview(skill.name)}
                  onBlur={() => onPreview(null)}
                  className={cx(
                    "rounded-md border px-2.5 py-1.5 font-mono text-[12.5px] transition-[color,background-color,border-color,translate] duration-200 hover:-translate-y-px",
                    on
                      ? "border-accent/60 bg-accent/10 text-fg"
                      : "border-line bg-ink-2 text-fg-muted hover:border-line-strong hover:text-fg",
                  )}
                >
                  {skill.name}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Below lg there is no side panel, so usage expands inline under the group. */}
        <AnimatePresence initial={false}>
          {selectedHere && (
            <motion.div
              key={selectedHere.name}
              className="overflow-hidden lg:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease }}
            >
              <div className="mt-4 rounded-md border border-line bg-ink-2 px-3.5 py-3" aria-live="polite">
                <p className="font-mono text-[11px] text-fg-faint">
                  <span className="text-accent">{selectedHere.name}</span> · where it shows up
                </p>
                {selectedHere.usedIn.length > 0 ? (
                  <ul className="mt-2 space-y-1">
                    {selectedHere.usedIn.map((ref) => (
                      <li key={ref}>
                        <a href={workRefs[ref].href} className="text-[14px] text-fg-muted transition-colors hover:text-fg">
                          {workRefs[ref].label}
                          <span className="font-mono text-[11px] text-fg-faint"> · {workRefs[ref].date}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-[14px] text-fg-muted">Listed in my core skills; not tied to a project on this page.</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}
