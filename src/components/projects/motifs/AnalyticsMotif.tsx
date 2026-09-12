import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Lock } from "lucide-react";
import { cx } from "../../../lib/cx";
import { ease, inViewOnce } from "../../../lib/motion";

// Illustrative curves only — no axis values, no claims.
const engagement = [96, 84, 90, 66, 72, 50, 58, 38, 42];
const performance = [118, 110, 104, 98, 86, 90, 76, 70, 62];
const bars = [42, 68, 54, 86, 60, 74, 48];

const toPath = (points: number[]) =>
  points.map((y, i) => `${i === 0 ? "M" : "L"}${((i * 300) / (points.length - 1)).toFixed(1)} ${y}`).join(" ");

function Panel({ title, aside, className, children }: { title: string; aside?: ReactNode; className?: string; children: ReactNode }) {
  return (
    <div className={cx("rounded-md border border-line bg-ink p-3 sm:p-3.5", className)}>
      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 font-mono text-[10.5px] text-fg-faint">
        <span>{title}</span>
        {aside}
      </div>
      {children}
    </div>
  );
}

export function AnalyticsMotif() {
  return (
    <div className="p-3 sm:p-5">
      <div className="mb-3 flex items-center justify-between px-1 font-mono text-[11px] text-fg-faint">
        <span>learners / engagement</span>
        <span className="inline-flex items-center gap-1.5 rounded border border-line px-1.5 py-0.5 text-fg-muted">
          <Lock aria-hidden="true" className="h-3 w-3" />
          jwt
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-5">
        <Panel
          className="sm:col-span-3"
          title="over time"
          aside={
            <span className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="h-px w-3 bg-accent" />
                engagement
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-px w-3 bg-fg-faint" />
                performance
              </span>
            </span>
          }
        >
          <svg viewBox="0 0 300 140" className="mt-4 h-auto w-full overflow-visible" aria-hidden="true">
            {[35, 70, 105].map((y) => (
              <line key={y} x1="0" x2="300" y1={y} y2={y} className="stroke-line" strokeDasharray="2 4" />
            ))}
            <motion.path
              d={toPath(performance)}
              fill="none"
              strokeWidth="1.5"
              className="stroke-fg-faint"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={inViewOnce}
              transition={{ duration: 1.6, ease, delay: 0.2 }}
            />
            <motion.path
              d={toPath(engagement)}
              fill="none"
              strokeWidth="2"
              strokeLinejoin="round"
              className="stroke-accent"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={inViewOnce}
              transition={{ duration: 1.6, ease, delay: 0.35 }}
            />
            <motion.circle
              cx="300"
              cy={engagement[engagement.length - 1]}
              r="3.5"
              className="fill-accent"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={inViewOnce}
              transition={{ delay: 1.8 }}
            />
          </svg>
        </Panel>

        <div className="grid gap-2.5 sm:col-span-2">
          <Panel title="distribution">
            <div className="mt-3 flex h-16 items-end gap-1.5">
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  className={cx("flex-1 origin-bottom rounded-t-[2px]", i === 3 ? "bg-accent" : "bg-line-strong")}
                  style={{ height: `${h}%` }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={inViewOnce}
                  transition={{ duration: 0.7, ease, delay: 0.3 + i * 0.06 }}
                />
              ))}
            </div>
          </Panel>
          <Panel title="rest api · crud">
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {["GET", "POST", "PUT", "DELETE"].map((verb) => (
                <li key={verb} className="rounded border border-line px-1.5 py-0.5 font-mono text-[10.5px] text-fg-muted">
                  {verb}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
