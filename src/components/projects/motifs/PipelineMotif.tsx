import type { CSSProperties, ReactNode } from "react";
import { motion } from "motion/react";
import { cx } from "../../../lib/cx";
import { ease, inViewOnce } from "../../../lib/motion";

// Shapes only — they illustrate how records change layer to layer, not real data.
const rawWidths = [86, 58, 100, 42, 76, 94, 52];
const silverCells = [30, 44, 20];
const goldWidths = [100, 66, 84];

const columns = [
  { label: "source", caption: "raw records" },
  { label: "bronze", caption: "raw, as loaded" },
  { label: "silver", caption: "cleaned" },
  { label: "gold", caption: "analytics-ready" },
];

const at = (column: number, row: number): CSSProperties => ({ gridColumn: column, gridRow: row });

function Bar({ width, delay, className }: { width: number; delay: number; className: string }) {
  return (
    <motion.div
      className={cx("h-[11px] origin-left rounded-[2px]", className)}
      style={{ width: `${width}%` }}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={inViewOnce}
      transition={{ duration: 0.6, ease, delay }}
    />
  );
}

function Body({ children }: { children: ReactNode }) {
  return <div className="flex h-[140px] flex-col justify-center gap-[7px] sm:h-[158px]">{children}</div>;
}

function Connector({ delay }: { delay: number }) {
  return (
    <div aria-hidden="true" className="relative h-px w-3.5 self-center bg-line-strong sm:w-8">
      <span className="absolute -top-[3px] -right-px h-0 w-0 border-y-[3.5px] border-l-[5px] border-y-transparent border-l-line-strong" />
      <span className="packet absolute inset-0 motion-reduce:hidden" style={{ animationDelay: `${delay}s` }}>
        <span className="absolute -top-[2px] -left-[2.5px] h-[5px] w-[5px] rounded-full bg-accent" />
      </span>
    </div>
  );
}

function Bracket({ label }: { label: string }) {
  return (
    <div>
      <div aria-hidden="true" className="h-2 rounded-b-[3px] border-x border-b border-line-strong" />
      <p className="mt-1.5 text-center font-mono text-[10px] text-fg-faint sm:text-[11px]">{label}</p>
    </div>
  );
}

export function PipelineMotif() {
  const layerDelay = (layer: number, row: number) => 0.15 + layer * 0.28 + row * 0.035;

  return (
    <div className="px-3.5 pt-5 pb-5 sm:px-8 sm:pt-8 sm:pb-7">
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] gap-x-2 sm:gap-x-4">
        {columns.map((col, i) => (
          <div key={col.label} style={at(i * 2 + 1, 1)} className="min-w-0 pb-3">
            <p className={cx("font-mono text-[11px] sm:text-xs", i === 3 ? "text-accent" : "text-fg")}>{col.label}</p>
            <p className="mt-0.5 font-mono text-[9.5px] leading-tight text-fg-faint sm:text-[10.5px]">{col.caption}</p>
          </div>
        ))}

        <div style={at(1, 2)}>
          <Body>
            {rawWidths.map((w, i) => (
              <Bar
                key={i}
                width={w}
                delay={layerDelay(0, i)}
                className={i === 3 ? "border border-dashed border-fg-faint/70 bg-transparent" : "bg-line-strong"}
              />
            ))}
          </Body>
        </div>
        <div style={at(2, 2)} className="flex">
          <Connector delay={0} />
        </div>

        <div style={at(3, 2)}>
          <Body>
            {rawWidths.map((w, i) => (
              <Bar key={i} width={w} delay={layerDelay(1, i)} className="bg-bronze" />
            ))}
          </Body>
        </div>
        <div style={at(4, 2)} className="flex">
          <Connector delay={1.2} />
        </div>

        <div style={at(5, 2)}>
          <Body>
            {Array.from({ length: 6 }, (_, row) => (
              <motion.div
                key={row}
                className="flex h-[11px] origin-left gap-[3px]"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={inViewOnce}
                transition={{ duration: 0.6, ease, delay: layerDelay(2, row) }}
              >
                {silverCells.map((w, c) => (
                  <span key={c} className="rounded-[2px] bg-silver" style={{ width: `${w}%` }} />
                ))}
              </motion.div>
            ))}
          </Body>
        </div>
        <div style={at(6, 2)} className="flex">
          <Connector delay={2.4} />
        </div>

        <div style={at(7, 2)}>
          <Body>
            <div className="flex flex-col gap-3">
              {goldWidths.map((w, i) => (
                <motion.div
                  key={i}
                  className="h-[22px] origin-left rounded-[3px] bg-accent"
                  style={{ width: `${w}%`, opacity: 1 - i * 0.22 }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={inViewOnce}
                  transition={{ duration: 0.7, ease, delay: layerDelay(3, i) }}
                />
              ))}
            </div>
          </Body>
        </div>

        <div style={{ gridColumn: "5 / 8", gridRow: 3 }} className="mt-5">
          <Bracket label="dbt transformations" />
        </div>
        <div style={{ gridColumn: "3 / 8", gridRow: 4 }} className="mt-3">
          <Bracket label="postgresql · dockerized" />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 font-mono text-[10px] text-fg-faint sm:text-[11px]">
        <span aria-hidden="true" className="h-px flex-1 border-t border-dashed border-line-strong" />
        <span className="shrink-0">scheduled &amp; orchestrated by airflow</span>
        <span aria-hidden="true" className="h-px flex-1 border-t border-dashed border-line-strong" />
      </div>
    </div>
  );
}
