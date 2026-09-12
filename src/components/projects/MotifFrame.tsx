import type { Project } from "../../data/projects";
import { cx } from "../../lib/cx";
import { motifs } from "./motifs";

export function MotifFrame({ project, className }: { project: Project; className?: string }) {
  const Motif = motifs[project.motif];
  const interactive = project.motif === "memory";

  return (
    <figure
      className={cx(
        "overflow-hidden rounded-lg border border-line bg-ink-2 transition-colors duration-500 hover:border-line-strong",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-2.5 font-mono text-[11px] text-fg-faint">
        <span className="truncate">
          <span className="text-fg-muted">{project.slug}</span> / {project.motifLabel}
        </span>
        <span className={cx("shrink-0", interactive && "text-accent")}>{interactive ? "interactive" : "illustrative"}</span>
      </div>
      <Motif />
      <figcaption className="sr-only">
        {interactive
          ? `Interactive, simplified demo of memory allocation strategies from ${project.name}.`
          : `Illustrative visual for ${project.name} (${project.motifLabel}); not real project data.`}
      </figcaption>
    </figure>
  );
}
