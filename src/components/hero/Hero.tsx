import { motion } from "motion/react";
import { ArrowDown, FileText } from "lucide-react";
import { profile } from "../../data/profile";
import { ease } from "../../lib/motion";
import { GitHubIcon, LinkedInIcon } from "../ui/BrandIcons";
import { Container } from "../ui/Container";
import { LinkButton } from "../ui/LinkButton";
import { TextReveal } from "../ui/TextReveal";
import { StackDag } from "./StackDag";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease, delay },
});

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />

      <Container className="grid items-center gap-16 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:gap-14">
        <div>
          <motion.p
            {...rise(0)}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-ink-2 py-1 pr-3 pl-2.5 font-mono text-[12px] text-fg-muted"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            {profile.degreeShort} · {profile.universityShort}
          </motion.p>

          <h1
            id="hero-title"
            className="mt-7 text-[clamp(2.75rem,7.2vw,5.25rem)] leading-[0.95] font-semibold tracking-[-0.04em]"
          >
            <TextReveal text={profile.name} trigger="mount" delay={0.1} stagger={0.08} />
          </h1>

          <motion.p {...rise(0.35)} className="mt-6 max-w-xl text-xl leading-snug text-balance text-fg md:text-[1.625rem]">
            AI &amp; Data Engineering student building data pipelines, backend APIs and analytics tools.
          </motion.p>

          <motion.p {...rise(0.45)} className="mt-4 max-w-lg leading-relaxed text-pretty text-fg-muted">
            Most recently a Data Engineering Intern at <span className="text-fg">Futurense Technologies</span>, working
            with SQL, PostgreSQL, dbt, Apache Airflow and Docker.
          </motion.p>

          <motion.div {...rise(0.55)} className="mt-9 flex flex-wrap items-center gap-2.5">
            <LinkButton href="#projects" variant="primary">
              View projects
              <ArrowDown aria-hidden="true" className="transition-transform duration-200 group-hover:translate-y-0.5" />
            </LinkButton>
            <LinkButton href={profile.github} external>
              <GitHubIcon />
              GitHub
            </LinkButton>
            <LinkButton href={profile.linkedin} external>
              <LinkedInIcon />
              LinkedIn
            </LinkButton>
            <LinkButton href={profile.resume} external variant="ghost">
              <FileText aria-hidden="true" />
              Resume
            </LinkButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.35 }}
        >
          <StackDag />
        </motion.div>
      </Container>
    </section>
  );
}
