import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "../../data/projects";
import { cx } from "../../lib/cx";
import { GitHubIcon } from "../ui/BrandIcons";
import { buttonClasses, LinkButton } from "../ui/LinkButton";
import { Reveal } from "../ui/Reveal";
import { TagList } from "../ui/Tag";
import { MotifFrame } from "./MotifFrame";

type ProjectCardProps = {
  project: Project;
  layout: "featured" | "visual-left" | "visual-right";
  onOpen: (slug: string) => void;
};

export function ProjectCard({ project, layout, onOpen }: ProjectCardProps) {
  const visualRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: visualRef, offset: ["start end", "end start"] });
  const drift = layout === "featured" ? 16 : 26;
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [drift, -drift]);
  const titleId = `${project.slug}-title`;

  const visual = (
    <div ref={visualRef}>
      <motion.div style={{ y }}>
        <Reveal y={32}>
          <MotifFrame project={project} />
        </Reveal>
      </motion.div>
    </div>
  );

  const meta = (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-fg-faint">
      <span className="text-accent">{project.index}</span>
      <span aria-hidden="true" className="h-px w-5 bg-line-strong" />
      <time>{project.date}</time>
      <span aria-hidden="true">·</span>
      <span>{project.tagline}</span>
    </p>
  );

  const title = (
    <h3 id={titleId} className="mt-4 text-[1.75rem] leading-tight font-semibold tracking-[-0.02em] text-balance md:text-[2rem]">
      {project.name}
    </h3>
  );

  const summary = <p className="mt-4 leading-relaxed text-pretty text-fg-muted">{project.summary}</p>;

  const features = (
    <ul className="space-y-2.5 text-[15px] leading-relaxed">
      {project.features.map((feature) => (
        <li key={feature} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.8em] h-px w-3 shrink-0 bg-accent" />
          <span className="text-fg/90">{feature}</span>
        </li>
      ))}
    </ul>
  );

  const actions = (
    <div className="mt-8 flex flex-wrap items-center gap-2">
      <button type="button" onClick={() => onOpen(project.slug)} aria-haspopup="dialog" className={buttonClasses("secondary")}>
        Read case study
        <span className="sr-only">: {project.name}</span>
        <ArrowUpRight
          aria-hidden="true"
          className="text-accent transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </button>
      <LinkButton href={project.links.github} external variant="ghost">
        <GitHubIcon />
        Source<span className="sr-only"> code for {project.name}</span>
      </LinkButton>
      {project.links.demo && (
        <LinkButton href={project.links.demo} external variant="ghost">
          <ExternalLink aria-hidden="true" />
          Live demo
        </LinkButton>
      )}
    </div>
  );

  if (layout === "featured") {
    return (
      <article id={`project-${project.slug}`} aria-labelledby={titleId}>
        {visual}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            {meta}
            {title}
            {summary}
            {actions}
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:pt-1">
            <h4 className="font-mono text-[11px] font-normal text-fg-faint">key technical features</h4>
            <div className="mt-4">{features}</div>
            <TagList items={project.stack} label="Tech stack" className="mt-7" />
          </Reveal>
        </div>
      </article>
    );
  }

  return (
    <article
      id={`project-${project.slug}`}
      aria-labelledby={titleId}
      className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14"
    >
      <div className={cx("lg:col-span-7", layout === "visual-right" && "lg:order-2")}>{visual}</div>
      <Reveal className="lg:col-span-5">
        {meta}
        {title}
        {summary}
        <div className="mt-6">{features}</div>
        <TagList items={project.stack} label="Tech stack" className="mt-6" />
        {actions}
      </Reveal>
    </article>
  );
}
