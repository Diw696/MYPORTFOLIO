import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, ExternalLink, X } from "lucide-react";
import { projects, type Project } from "../../data/projects";
import { useDialog } from "../../hooks/useDialog";
import { ease } from "../../lib/motion";
import { GitHubIcon } from "../ui/BrandIcons";
import { ImageSlot } from "../ui/ImageSlot";
import { LinkButton } from "../ui/LinkButton";
import { TagList } from "../ui/Tag";

type ProjectDetailProps = {
  slug: string | null;
  onClose: () => void;
  onNavigate: (slug: string) => void;
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function ProjectDetail({ slug, onClose, onNavigate }: ProjectDetailProps) {
  const index = projects.findIndex((p) => p.slug === slug);
  const project = index >= 0 ? projects[index] : null;

  return createPortal(
    <AnimatePresence>
      {project && <Dialog key="case-study" project={project} index={index} onClose={onClose} onNavigate={onNavigate} />}
    </AnimatePresence>,
    document.body,
  );
}

type DialogProps = {
  project: Project;
  index: number;
  onClose: () => void;
  onNavigate: (slug: string) => void;
};

function Dialog({ project, index, onClose, onNavigate }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  useDialog(dialogRef, onClose);

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [project.slug]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") onNavigate(prev.slug);
      if (event.key === "ArrowRight") onNavigate(next.slug);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onNavigate, prev.slug, next.slug]);

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-black/75"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        className="relative flex max-h-[94dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-xl border border-line bg-ink shadow-2xl shadow-black/60 sm:max-h-[90dvh] sm:rounded-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30, transition: { duration: 0.25 } }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="flex items-center justify-between gap-3 border-b border-line py-2 pr-2 pl-5 sm:pl-6">
          <p className="font-mono text-[11px] text-fg-faint">
            case study <span className="text-fg-muted">{pad(index + 1)}</span> / {pad(projects.length)}
          </p>
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={() => onNavigate(prev.slug)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-ink-3 hover:text-fg"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              <span className="sr-only">Previous case study: {prev.name}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate(next.slug)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-ink-3 hover:text-fg"
            >
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
              <span className="sr-only">Next case study: {next.name}</span>
            </button>
            <span aria-hidden="true" className="mx-1.5 h-4 w-px bg-line" />
            <button
              type="button"
              data-autofocus
              onClick={onClose}
              className="inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 font-mono text-[12px] text-fg-muted transition-colors hover:bg-ink-3 hover:text-fg"
            >
              close
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="overflow-y-auto overscroll-contain">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease }}
            >
              <CaseStudy project={project} />

              <nav aria-label="More case studies" className="grid grid-cols-2 border-t border-line">
                <button
                  type="button"
                  onClick={() => onNavigate(prev.slug)}
                  className="group flex flex-col items-start gap-1.5 px-5 py-6 text-left transition-colors hover:bg-ink-2 focus-visible:-outline-offset-2 sm:px-10"
                >
                  <span className="font-mono text-[11px] text-fg-faint">← previous</span>
                  <span className="text-[14.5px] leading-snug font-medium text-fg-muted transition-colors group-hover:text-fg">
                    {prev.name}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate(next.slug)}
                  className="group flex flex-col items-end gap-1.5 border-l border-line px-5 py-6 text-right transition-colors hover:bg-ink-2 focus-visible:-outline-offset-2 sm:px-10"
                >
                  <span className="font-mono text-[11px] text-fg-faint">next →</span>
                  <span className="text-[14.5px] leading-snug font-medium text-fg-muted transition-colors group-hover:text-fg">
                    {next.name}
                  </span>
                </button>
              </nav>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <h3 className="font-mono text-[11px] font-normal text-fg-faint">{children}</h3>;
}

function CaseStudy({ project }: { project: Project }) {
  const folder = `public/images/projects/${project.slug}`;
  const repoPath = project.links.github.replace(/^https?:\/\//, "");
  const repoName = repoPath.slice(repoPath.lastIndexOf("/") + 1);
  const repoOwner = repoPath.slice(0, repoPath.lastIndexOf("/"));

  return (
    <>
      <header className="px-5 pt-8 pb-8 sm:px-10 sm:pt-10">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-fg-faint">
          <span className="text-accent">{project.index}</span>
          <span aria-hidden="true" className="h-px w-5 bg-line-strong" />
          <time>{project.date}</time>
          <span aria-hidden="true">·</span>
          <span>{project.tagline}</span>
        </p>
        <h2
          id="case-study-title"
          className="mt-4 text-[1.875rem] leading-tight font-semibold tracking-[-0.025em] text-balance sm:text-4xl"
        >
          {project.name}
        </h2>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-pretty text-fg-muted">{project.summary}</p>
        <div className="mt-7 flex flex-wrap gap-2">
          <LinkButton href={project.links.github} external variant="primary">
            <GitHubIcon />
            View source on GitHub
          </LinkButton>
          {project.links.demo && (
            <LinkButton href={project.links.demo} external>
              <ExternalLink aria-hidden="true" />
              Live demo
            </LinkButton>
          )}
        </div>
      </header>

      <div className="px-5 sm:px-10">
        <ImageSlot
          src={project.images.cover}
          alt={`Screenshot of ${project.name}`}
          label="Project screenshot"
          expectedPath={`${folder}/cover.webp`}
          className="aspect-video"
        />
      </div>

      <div className="grid gap-8 border-b border-line px-5 py-10 sm:grid-cols-2 sm:gap-12 sm:px-10">
        <div>
          <Label>purpose</Label>
          <p className="mt-3 leading-relaxed text-pretty text-fg/90">{project.purpose}</p>
        </div>
        <div>
          <Label>outcome</Label>
          <p className="mt-3 leading-relaxed text-pretty text-fg/90">{project.outcome}</p>
        </div>
      </div>

      <div className="grid gap-10 px-5 py-10 sm:px-10 md:grid-cols-[minmax(0,1fr)_13rem] md:gap-12">
        <div className="space-y-10">
          <div>
            <Label>what I built</Label>
            <ol className="mt-4 space-y-4">
              {project.built.map((item, i) => (
                <li key={item} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-2 leading-relaxed">
                  <span className="pt-[3px] font-mono text-xs text-accent">{pad(i + 1)}</span>
                  <span className="text-fg/90">{item}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <Label>key technical features</Label>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="rounded-md border border-line bg-ink-2 px-3.5 py-3 text-[14.5px] leading-snug text-fg-muted"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-8">
          <div>
            <Label>stack</Label>
            <TagList items={project.stack} label="Tech stack" className="mt-3" />
          </div>
          <div>
            <Label>when</Label>
            <p className="mt-3 text-sm text-fg">{project.date}</p>
          </div>
          <div>
            <Label>repository</Label>
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-3 block font-mono text-[12.5px] leading-relaxed text-fg-muted transition-colors hover:text-accent"
            >
              <span className="block text-fg-faint">{repoOwner}/</span>
              <span className="block [overflow-wrap:anywhere]">{repoName} ↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </aside>
      </div>

      <div className="grid gap-4 px-5 pb-10 sm:grid-cols-2 sm:px-10">
        <ImageSlot
          src={project.images.architecture}
          alt={`Architecture diagram of ${project.name}`}
          label="Architecture diagram"
          expectedPath={`${folder}/architecture.webp`}
          className="aspect-[4/3]"
        />
        <ImageSlot
          src={project.images.walkthrough}
          alt={`${project.name} in use`}
          label="Demo / walkthrough"
          expectedPath={`${folder}/walkthrough.webp`}
          className="aspect-[4/3]"
        />
      </div>
    </>
  );
}
