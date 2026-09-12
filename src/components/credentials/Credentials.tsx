import { motion } from "motion/react";
import { Medal, Trophy } from "lucide-react";
import { achievements, certificates } from "../../data/credentials";
import { cx } from "../../lib/cx";
import { ease, inViewOnce } from "../../lib/motion";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { CertificationCard } from "./CertificationCard";

export function Credentials() {
  return (
    <section id="credentials" aria-labelledby="credentials-title" className="border-t border-line py-24 md:py-36">
      <Container>
        <SectionHeading index="06" kicker="Along the way" titleId="credentials-title" title="Achievements & certifications" />

        <div className="grid gap-4 md:grid-cols-2">
          {achievements.map((a, i) => {
            const Icon = a.highlight ? Trophy : Medal;
            return (
              <motion.article
                key={a.id}
                aria-labelledby={`${a.id}-title`}
                className={cx(
                  "relative overflow-hidden rounded-lg border p-6 transition-colors duration-300 sm:p-8",
                  a.highlight ? "border-accent/30 bg-ink-2 hover:border-accent/50" : "border-line bg-ink-2/50 hover:border-line-strong",
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inViewOnce}
                transition={{ duration: 0.7, ease, delay: i * 0.1 }}
              >
                {a.highlight && <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-accent" />}
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className={a.highlight ? "text-accent" : "text-fg-faint"}>{a.marker}</span>
                  <Icon aria-hidden="true" strokeWidth={1.5} className={cx("h-4 w-4", a.highlight ? "text-accent" : "text-fg-faint")} />
                </div>
                <h3 id={`${a.id}-title`} className="mt-10 text-2xl font-semibold tracking-[-0.02em] sm:mt-14">
                  {a.title}
                </h3>
                <p className="mt-1 text-fg">{a.event}</p>
                <p className="mt-1 font-mono text-xs text-fg-faint">{a.place}</p>
                <p className="mt-5 leading-relaxed text-pretty text-fg-muted">{a.description}</p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-20">
          <h3 className="font-mono text-xs font-normal text-fg-faint">certifications</h3>
          <ul className="mt-4 border-t border-line">
            {certificates.map((certificate, i) => (
              <CertificationCard key={certificate.name} certificate={certificate} delay={i * 0.06} />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
