import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { projects } from "../../data/projects";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";

// The case-study dialog is only needed after an interaction, so it loads on demand.
const ProjectDetail = lazy(() => import("./ProjectDetail"));

const layouts = ["featured", "visual-left", "visual-right", "visual-left"] as const;

export function Projects() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [requested, setRequested] = useState(false);

  const open = useCallback((slug: string) => {
    setRequested(true);
    setOpenSlug(slug);
    history.replaceState(null, "", `#case-${slug}`);
  }, []);

  const close = useCallback(() => {
    if (openSlug) history.replaceState(null, "", `#project-${openSlug}`);
    setOpenSlug(null);
  }, [openSlug]);

  // Deep links: /#case-pipeone opens that case study directly.
  useEffect(() => {
    const fromHash = () => {
      const match = window.location.hash.match(/^#case-(.+)$/);
      if (match && projects.some((p) => p.slug === match[1])) {
        setRequested(true);
        setOpenSlug(match[1]);
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  return (
    <section id="projects" aria-labelledby="projects-title" className="border-t border-line py-24 md:py-36">
      <Container>
        <SectionHeading
          index="03"
          kicker="Things I've built"
          titleId="projects-title"
          title="Selected projects"
          lead="Four projects, most recent first: from a Dockerized ELT pipeline back to a packet-level network monitor. Each one opens into a short case study."
        />

        <div className="space-y-28 md:space-y-40">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} layout={layouts[i % layouts.length]} onOpen={open} />
          ))}
        </div>
      </Container>

      {requested && (
        <Suspense fallback={null}>
          <ProjectDetail slug={openSlug} onClose={close} onNavigate={open} />
        </Suspense>
      )}
    </section>
  );
}
