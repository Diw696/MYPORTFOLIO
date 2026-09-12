import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { motion } from "motion/react";
import { cx } from "../../../lib/cx";
import { ease } from "../../../lib/motion";

type Strategy = "first" | "best" | "worst";
type Segment = { kind: "used" | "free"; size: number; label: string };

const REQUEST = 3;
const TOTAL = 32;

// A 32-unit memory map chosen so each strategy picks a different hole.
const memory: Segment[] = [
  { kind: "used", size: 4, label: "P1" },
  { kind: "free", size: 5, label: "hole" },
  { kind: "used", size: 3, label: "P2" },
  { kind: "free", size: 3, label: "hole" },
  { kind: "used", size: 6, label: "P3" },
  { kind: "free", size: 8, label: "hole" },
  { kind: "used", size: 2, label: "P4" },
  { kind: "free", size: 1, label: "hole" },
];

const strategies: { id: Strategy; name: string; rule: string }[] = [
  { id: "first", name: "First fit", rule: "first hole big enough" },
  { id: "best", name: "Best fit", rule: "smallest hole that fits" },
  { id: "worst", name: "Worst fit", rule: "largest hole available" },
];

function chooseHole(strategy: Strategy) {
  const fits = memory
    .map((segment, index) => ({ segment, index }))
    .filter(({ segment }) => segment.kind === "free" && segment.size >= REQUEST);
  if (strategy === "first") return fits[0].index;
  const bySize = [...fits].sort((a, b) => a.segment.size - b.segment.size);
  return strategy === "best" ? bySize[0].index : bySize[bySize.length - 1].index;
}

const grow = (size: number): CSSProperties => ({ flex: `${size} 1 0%` });

const unitGrid = (size: number): CSSProperties => ({
  backgroundImage: "linear-gradient(to right, rgb(255 255 255 / 0.06) 1px, transparent 1px)",
  backgroundSize: `calc(100% / ${size}) 100%`,
});

function Used({ segment }: { segment: Segment }) {
  return (
    <div
      className="flex min-w-0 items-center justify-center overflow-hidden rounded-[4px] border border-line-strong bg-ink-3 font-mono text-[10.5px] text-fg-muted"
      style={{ ...grow(segment.size), ...unitGrid(segment.size) }}
    >
      {segment.size >= 2 && segment.label}
    </div>
  );
}

function Free({ size, fragment = false }: { size: number; fragment?: boolean }) {
  return (
    <motion.div
      layout
      transition={{ duration: 0.45, ease }}
      className={cx(
        "flex min-w-0 items-center justify-center overflow-hidden rounded-[4px] border border-dashed font-mono text-[10px]",
        fragment ? "border-accent/50 text-accent" : "border-line-strong text-fg-faint",
      )}
      style={grow(size)}
    >
      {size >= 2 && `${size}u`}
    </motion.div>
  );
}

export function MemoryMotif() {
  const [strategy, setStrategy] = useState<Strategy>("first");
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const target = chooseHole(strategy);
  const hole = memory[target];
  const leftover = hole.size - REQUEST;
  const holeNumber = memory.slice(0, target + 1).filter((s) => s.kind === "free").length;
  const current = strategies.find((s) => s.id === strategy)!;

  // Roving tabindex + arrow keys, per the ARIA radio group pattern.
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const step = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (index + step + strategies.length) % strategies.length;
    setStrategy(strategies[next].id);
    buttons.current[next]?.focus();
  };

  return (
    <div className="p-4 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="radiogroup" aria-label="Allocation strategy" className="inline-flex rounded-md border border-line bg-ink p-0.5">
          {strategies.map((s, i) => {
            const on = s.id === strategy;
            return (
              <button
                key={s.id}
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                type="button"
                role="radio"
                aria-checked={on}
                tabIndex={on ? 0 : -1}
                onClick={() => setStrategy(s.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="relative rounded-[5px] px-2.5 py-1.5 font-mono text-[11.5px] sm:px-3 sm:text-[12px]"
              >
                {on && (
                  <motion.span
                    layoutId="memory-strategy"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-[5px] border border-line-strong bg-ink-3"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className={cx("relative transition-colors", on ? "text-fg" : "text-fg-muted hover:text-fg")}>{s.name}</span>
              </button>
            );
          })}
        </div>
        <p className="font-mono text-[11px] text-fg-faint">
          request <span className="text-accent">P5 · {REQUEST}u</span>
        </p>
      </div>

      <div className="mt-7" aria-hidden="true">
        <div className="flex h-14 gap-[3px] sm:h-16">
          {memory.map((segment, i) => {
            if (i !== target) {
              return segment.kind === "used" ? <Used key={i} segment={segment} /> : <Free key={i} size={segment.size} />;
            }
            return (
              <div key={i} className="flex min-w-0 gap-[3px]" style={grow(segment.size)}>
                <motion.div
                  key={strategy}
                  className="flex min-w-0 origin-left items-center justify-center overflow-hidden rounded-[4px] bg-accent font-mono text-[10.5px] font-medium text-ink"
                  style={{ ...grow(REQUEST), ...unitGrid(REQUEST) }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease }}
                >
                  P5
                </motion.div>
                {leftover > 0 && <Free size={leftover} fragment />}
              </div>
            );
          })}
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] text-fg-faint">
          <span>0</span>
          <span>{TOTAL / 2}</span>
          <span>{TOTAL}u</span>
        </div>
      </div>

      <p className="mt-5 min-h-[3em] text-[14px] leading-relaxed text-fg-muted" aria-live="polite">
        <span className="text-fg">{current.name}</span> takes the {current.rule}: hole {holeNumber} ({hole.size}u)
        {leftover > 0 ? (
          <>
            , leaving a <span className="text-accent">{leftover}u fragment</span>.
          </>
        ) : (
          <>, an exact fit with no fragment.</>
        )}
      </p>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 border-t border-line pt-4 font-mono text-[11px] text-fg-faint">
        <span>simplified demo for this page</span>
        <span>project also covers FIFO · LRU · Optimal</span>
      </div>
    </div>
  );
}
