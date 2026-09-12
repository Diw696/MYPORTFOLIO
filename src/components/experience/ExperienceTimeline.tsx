import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { internship } from "../../data/experience";
import { ease, inViewOnce } from "../../lib/motion";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { TagList } from "../ui/Tag";

const pad = (n: number) => String(n).padStart(2, "0");

export function ExperienceTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 80%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="border-t border-line py-24 md:py-36">
      <Container>
        <SectionHeading
          index="02"
          kicker="Putting it to work"
          titleId="experience-title"
          title="Data engineering, in practice"
          lead="ELT workflows, orchestration and warehousing, applied on an end-to-end project that followed industry practices."
        />

        <div className="grid gap-8 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-12">
          <Reveal>
            <div className="font-mono text-xs md:sticky md:top-28">
              <p className="text-fg">
                <time dateTime={internship.start.iso}>{internship.start.label}</time>
                <span className="text-fg-faint"> — </span>
                <time dateTime={internship.end.iso}>{internship.end.label}</time>
              </p>
              <p className="mt-2 text-fg-faint">{internship.type}</p>
              <p className="mt-8 hidden text-fg-faint md:block">stack</p>
              <TagList items={internship.stack} label="Internship tech stack" className="mt-3 hidden md:flex" />
            </div>
          </Reveal>

          <div ref={trackRef} className="relative pl-7 md:pl-10">
            <div aria-hidden="true" className="absolute top-2 bottom-0 left-0 w-px bg-line">
              <motion.div className="absolute inset-0 origin-top bg-accent" style={{ scaleY: fill }} />
            </div>
            <span
              aria-hidden="true"
              className="absolute top-[5px] -left-[4px] h-[9px] w-[9px] rounded-full border-2 border-accent bg-ink"
            />

            <article aria-labelledby="internship-role">
              <Reveal>
                <h3 id="internship-role" className="text-2xl font-semibold tracking-[-0.02em] md:text-[1.875rem]">
                  {internship.role}
                </h3>
                <p className="mt-1.5 text-lg text-fg-muted">{internship.company}</p>
                <p className="mt-5 max-w-2xl leading-relaxed text-pretty text-fg-muted">{internship.summary}</p>
              </Reveal>

              <div className="mt-10">
                <p className="font-mono text-[11px] text-fg-faint">areas covered</p>
                <ol className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-4">
                  {internship.areas.map((area, i) => (
                    <motion.li
                      key={area.name}
                      className="bg-ink-2 p-4"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={inViewOnce}
                      transition={{ duration: 0.6, ease, delay: 0.1 + i * 0.12 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] text-accent">{pad(i + 1)}</span>
                        {i < internship.areas.length - 1 && (
                          <ArrowRight aria-hidden="true" className="hidden h-3.5 w-3.5 text-fg-faint lg:block" />
                        )}
                      </div>
                      <p className="mt-7 text-[15px] leading-snug font-medium">{area.name}</p>
                      <p className="mt-1 font-mono text-[11px] text-fg-faint">{area.tools}</p>
                    </motion.li>
                  ))}
                </ol>
              </div>

              <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-12">
                <Reveal>
                  <h4 className="font-mono text-[11px] font-normal text-fg-faint">what I worked on</h4>
                  <ul className="mt-4 space-y-3.5">
                    {internship.responsibilities.map((item) => (
                      <li key={item} className="flex gap-3 leading-relaxed text-fg/90">
                        <span aria-hidden="true" className="mt-[0.8em] h-px w-3 shrink-0 bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={0.1}>
                  <h4 className="font-mono text-[11px] font-normal text-fg-faint">what I came away with</h4>
                  <p className="mt-4 leading-relaxed text-fg">{internship.outcome}</p>
                  <TagList items={internship.stack} label="Internship tech stack" className="mt-6 md:hidden" />
                </Reveal>
              </div>

              <Reveal className="mt-12">
                <a
                  href="#project-pipeone"
                  className="group inline-flex items-center gap-2 rounded font-mono text-[13px] text-fg-muted transition-colors hover:text-fg"
                >
                  <span className="text-accent">→</span>
                  The same stack shows up in Pipeone, Jul 2026
                  <ArrowDownRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  />
                </a>
              </Reveal>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
