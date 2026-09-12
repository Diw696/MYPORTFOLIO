import { useState } from "react";
import { useReducedMotion } from "motion/react";
import { workRefs, type WorkRef } from "../../data/work";
import { cx } from "../../lib/cx";

type DagNode = {
  id: string;
  x: number;
  y: number;
  label: string;
  role: string;
  usedIn: WorkRef[];
  terminal?: boolean;
};

const NODE_W = 112;
const NODE_H = 46;

const nodes: DagNode[] = [
  { id: "python", x: 72, y: 150, label: "Python", role: "extract · load", usedIn: ["futurense", "pipeone", "memory", "learning", "network"] },
  { id: "bronze", x: 230, y: 150, label: "PostgreSQL", role: "bronze · raw", usedIn: ["futurense", "pipeone", "learning"] },
  { id: "silver", x: 388, y: 150, label: "dbt", role: "silver · clean", usedIn: ["futurense", "pipeone"] },
  { id: "gold", x: 388, y: 264, label: "dbt", role: "gold · model", usedIn: ["futurense", "pipeone"], terminal: true },
  { id: "api", x: 230, y: 264, label: "FastAPI", role: "serve · api", usedIn: ["learning"] },
  { id: "dash", x: 72, y: 264, label: "Dash · Plotly", role: "serve · charts", usedIn: ["learning"] },
];

const extras: Record<string, DagNode> = {
  airflow: { id: "airflow", x: 230, y: 48, label: "Apache Airflow", role: "orchestration · scheduling", usedIn: ["futurense", "pipeone"] },
  docker: { id: "docker", x: 230, y: 150, label: "Docker", role: "containerised postgres", usedIn: ["futurense", "pipeone"] },
};

const edges = [
  { from: "python", to: "bronze", d: "M128 150 H174" },
  { from: "bronze", to: "silver", d: "M286 150 H332" },
  { from: "silver", to: "gold", d: "M388 173 V241" },
  { from: "gold", to: "api", d: "M332 264 H286" },
  { from: "api", to: "dash", d: "M174 264 H128" },
];

const triggers = [
  { to: "python", d: "M72 71 V127" },
  { to: "silver", d: "M388 71 V127" },
];

const lookup = (id: string) => nodes.find((n) => n.id === id) ?? extras[id];

/** One packet per edge, each travelling only during its slot so the flow reads left→right. */
function Packet({ d, slot }: { d: string; slot: number }) {
  const start = 0.02 + slot * 0.17;
  const end = start + 0.15;
  const t = (n: number) => n.toFixed(3);
  return (
    <circle r="2.6" className="fill-accent" opacity="0">
      <animateMotion
        dur="5s"
        repeatCount="indefinite"
        path={d}
        keyPoints="0;0;1;1"
        keyTimes={`0;${t(start)};${t(end)};1`}
        calcMode="linear"
      />
      <animate
        attributeName="opacity"
        dur="5s"
        repeatCount="indefinite"
        values="0;0;1;1;0;0"
        keyTimes={`0;${t(start)};${t(start + 0.01)};${t(end - 0.01)};${t(end)};1`}
      />
    </circle>
  );
}

export function StackDag() {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = activeId ? lookup(activeId) : null;

  const isLinked = (id: string) => {
    if (!activeId) return true;
    if (id === activeId) return true;
    if (activeId === "airflow") return id === "python" || id === "silver";
    if (activeId === "docker") return id === "bronze";
    return edges.some((e) => (e.from === activeId && e.to === id) || (e.to === activeId && e.from === id));
  };

  const focusProps = (id: string, node: DagNode) => ({
    tabIndex: 0,
    role: "button" as const,
    "aria-label": `${node.label}, ${node.role}. Used in: ${node.usedIn.map((r) => workRefs[r].short).join(", ")}`,
    "aria-pressed": activeId === id,
    onMouseEnter: () => setActiveId(id),
    onFocus: () => setActiveId(id),
    onClick: () => setActiveId(id),
    className: "cursor-default outline-none [&:focus-visible_.node-box]:stroke-accent",
  });

  return (
    <figure className="overflow-hidden rounded-xl border border-line bg-ink-2/80">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[11px] text-fg-faint">
        <span>
          <span className="text-fg-muted">~/stack</span>.dag
        </span>
        <span>composite view</span>
      </div>

      <svg
        viewBox="0 0 460 312"
        className="block h-auto w-full px-2 pt-3"
        onMouseLeave={() => setActiveId(null)}
        aria-labelledby="dag-caption"
      >
        <defs>
          <marker id="dag-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0.5 L7.5 4 L0 7.5 Z" className="fill-line-strong" />
          </marker>
        </defs>

        {/* Orchestrator */}
        <g {...focusProps("airflow", extras.airflow)} opacity={isLinked("airflow") ? 1 : 0.35} style={{ transition: "opacity .3s" }}>
          <rect
            x="16" y="26" width="428" height="45" rx="7"
            className={cx("node-box fill-ink stroke-line-strong transition-[stroke] duration-300", activeId === "airflow" && "stroke-accent")}
          />
          <text x="34" y="46" className="fill-fg text-[13px] font-medium">Apache Airflow</text>
          <text x="34" y="61" className="fill-fg-faint font-mono text-[10px]">orchestration · scheduling</text>
          <text x="426" y="53" textAnchor="end" className="fill-fg-faint font-mono text-[10px]">triggers ↓</text>
        </g>

        {triggers.map((t) => (
          <path
            key={t.to}
            d={t.d}
            fill="none"
            strokeDasharray="3 4"
            className={cx("stroke-line-strong transition-[stroke] duration-300", activeId === "airflow" && "stroke-accent/70")}
          />
        ))}

        {/* Docker boundary around the warehouse */}
        <g {...focusProps("docker", extras.docker)} opacity={isLinked("docker") ? 1 : 0.35} style={{ transition: "opacity .3s" }}>
          <rect
            x="164" y="112" width="132" height="76" rx="9"
            fill="none"
            strokeDasharray="2 4"
            className={cx("node-box stroke-fg-faint/60 transition-[stroke] duration-300", activeId === "docker" && "stroke-accent")}
          />
          <text x="172" y="107" className="fill-fg-faint font-mono text-[9.5px]">docker</text>
        </g>

        {edges.map((e) => (
          <path
            key={`${e.from}-${e.to}`}
            d={e.d}
            fill="none"
            markerEnd="url(#dag-arrow)"
            className={cx(
              "transition-[stroke] duration-300",
              activeId && (e.from === activeId || e.to === activeId) ? "stroke-accent/70" : "stroke-line-strong",
            )}
          />
        ))}

        {nodes.map((n) => {
          const on = activeId === n.id;
          return (
            <g
              key={n.id}
              {...focusProps(n.id, n)}
              opacity={isLinked(n.id) ? 1 : 0.35}
              style={{ transition: "opacity .3s" }}
            >
              <rect
                x={n.x - NODE_W / 2}
                y={n.y - NODE_H / 2}
                width={NODE_W}
                height={NODE_H}
                rx="7"
                className={cx("node-box fill-ink transition-[stroke] duration-300", on ? "stroke-accent" : "stroke-line-strong")}
              />
              {n.terminal && <circle cx={n.x + NODE_W / 2 - 11} cy={n.y - NODE_H / 2 + 11} r="2.5" className="fill-accent" />}
              <text x={n.x - NODE_W / 2 + 12} y={n.y - 3} className="fill-fg text-[13px] font-medium">
                {n.label}
              </text>
              <text x={n.x - NODE_W / 2 + 12} y={n.y + 12} className="fill-fg-faint font-mono text-[10px]">
                {n.role}
              </text>
            </g>
          );
        })}

        {!reduce && edges.map((e, i) => <Packet key={`p-${e.from}`} d={e.d} slot={i} />)}
      </svg>

      <figcaption id="dag-caption" className="h-[5.5rem] border-t border-line px-4 py-3" aria-live="polite">
        {active ? (
          <div>
            <p className="font-mono text-[11px] text-fg-faint">
              <span className="text-accent">{active.label}</span> · {active.role}
            </p>
            <p className="mt-1.5 text-[13.5px] leading-snug text-fg-muted">
              <span className="text-fg">Used in </span>
              {active.usedIn.map((r) => workRefs[r].short).join(" · ")}
            </p>
          </div>
        ) : (
          <p className="text-[13.5px] leading-snug text-fg-muted">
            A composite of tools from the work below, not a single system.{" "}
            <span className="text-fg-faint">Hover or tab through a node to see where each one shows up.</span>
          </p>
        )}
      </figcaption>
    </figure>
  );
}
