import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { cx } from "../../../lib/cx";
import { ease } from "../../../lib/motion";

const CX = 150;
const CY = 104;
const FLAGGED = 1;

const hosts = Array.from({ length: 6 }, (_, i) => {
  const angle = ((i * 60 - 60) * Math.PI) / 180;
  return { x: CX + Math.cos(angle) * 112, y: CY + Math.sin(angle) * 72 };
});

// Documentation-range addresses (RFC 5737). A repeated hit on :22 stands in for a brute-force pattern.
const pool = [
  { src: "192.0.2.14", port: "443", proto: "TCP", size: "1.2 KB", flag: false },
  { src: "203.0.113.9", port: "22", proto: "TCP", size: "74 B", flag: true },
  { src: "198.51.100.7", port: "53", proto: "UDP", size: "88 B", flag: false },
  { src: "203.0.113.9", port: "22", proto: "TCP", size: "74 B", flag: true },
  { src: "192.0.2.31", port: "80", proto: "TCP", size: "512 B", flag: false },
  { src: "198.51.100.22", port: "443", proto: "TCP", size: "1.4 KB", flag: false },
  { src: "203.0.113.9", port: "22", proto: "TCP", size: "74 B", flag: true },
  { src: "192.0.2.8", port: "123", proto: "UDP", size: "90 B", flag: false },
];

const ROWS = 5;
const cols = "grid grid-cols-[minmax(0,1fr)_2.5rem_2.5rem_3.25rem] gap-2";

export function NetworkMotif() {
  const reduce = useReducedMotion();
  const logRef = useRef<HTMLDivElement>(null);
  const inView = useInView(logRef, { margin: "-10% 0px" });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 1600);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const rows = Array.from({ length: ROWS }, (_, i) => {
    const seq = tick + ROWS - 1 - i;
    return { ...pool[seq % pool.length], key: seq };
  });

  const flagged = hosts[FLAGGED];

  return (
    <div className="grid grid-cols-1 items-center gap-3 p-3 sm:grid-cols-[1.05fr_1fr] sm:gap-4 sm:p-5">
      <svg viewBox="0 0 300 208" className="h-auto w-full" aria-hidden="true">
        {hosts.map((h, i) => (
          <line
            key={i}
            x1={h.x}
            y1={h.y}
            x2={CX}
            y2={CY}
            strokeDasharray={i === FLAGGED ? undefined : "2 3"}
            className={i === FLAGGED ? "stroke-accent/40" : "stroke-line-strong"}
          />
        ))}

        <circle cx={CX} cy={CY} r="23" className="fill-ink-3 stroke-line-strong" />
        <text x={CX} y={CY + 3.5} textAnchor="middle" className="fill-fg-muted font-mono text-[9px]">
          capture
        </text>

        {hosts.map((h, i) =>
          i === FLAGGED ? (
            <circle key={i} cx={h.x} cy={h.y} r="6" className="fill-accent" />
          ) : (
            <circle key={i} cx={h.x} cy={h.y} r="5" className="fill-ink stroke-fg-faint" />
          ),
        )}

        <text x={flagged.x} y={flagged.y - 16} textAnchor="middle" className="fill-accent font-mono text-[9.5px]">
          flagged
        </text>

        {!reduce && (
          <>
            <circle cx={flagged.x} cy={flagged.y} r="6" fill="none" className="stroke-accent">
              <animate attributeName="r" values="6;17" dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0" dur="2.2s" repeatCount="indefinite" />
            </circle>
            {hosts.map((h, i) => {
              const path = `M${h.x} ${h.y} L${CX} ${CY}`;
              const bursts = i === FLAGGED ? [0, 0.35, 0.7] : [i * 0.5];
              return bursts.map((begin) => (
                <circle key={`${i}-${begin}`} r={i === FLAGGED ? 2.3 : 2} opacity="0" className={i === FLAGGED ? "fill-accent" : "fill-fg-faint"}>
                  <set attributeName="opacity" to="1" begin={`${begin}s`} />
                  <animateMotion
                    dur={i === FLAGGED ? "1.05s" : `${2.4 + i * 0.35}s`}
                    begin={`${begin}s`}
                    repeatCount="indefinite"
                    path={path}
                  />
                </circle>
              ));
            })}
          </>
        )}
      </svg>

      <div ref={logRef} className="rounded-md border border-line bg-ink font-mono text-[10.5px] sm:text-[11px]">
        <div className={cx(cols, "border-b border-line px-3 py-2 text-fg-faint")}>
          <span>src ip</span>
          <span>port</span>
          <span>proto</span>
          <span className="text-right">size</span>
        </div>
        <div className="relative h-[150px] overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout">
            {rows.map((row) => (
              <motion.div
                key={row.key}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease }}
                className={cx(cols, "h-[30px] items-center px-3", row.flag ? "text-accent" : "text-fg-muted")}
              >
                <span className="flex min-w-0 items-center gap-1.5">
                  <span aria-hidden="true" className={cx("h-1 w-1 shrink-0 rounded-full", row.flag ? "bg-accent" : "bg-line-strong")} />
                  <span className="truncate">{row.src}</span>
                </span>
                <span>{row.port}</span>
                <span>{row.proto}</span>
                <span className="text-right">{row.size}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="border-t border-line px-3 py-2 text-fg-faint">rules · ddos · brute-force</div>
      </div>
    </div>
  );
}
