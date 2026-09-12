import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { Trajectory } from "./Trajectory";

const facts = [
  { label: "Studying", value: "B.Tech, Computer Science & Engineering — AI & Data Engineering" },
  { label: "At", value: "Lovely Professional University, Punjab" },
  { label: "CGPA", value: "8.05" },
  { label: "Recently", value: "Data Engineering Intern, Futurense Technologies" },
  { label: "Works with", value: "Python · SQL · PostgreSQL · dbt · Airflow · Docker" },
  { label: "Off-screen", value: "Taekwondo — bronze medalist at Open Internationals, Delhi" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line py-24 md:py-36">
      <Container>
        <SectionHeading
          index="01"
          kicker="Where I'm at"
          titleId="about-title"
          title="Studying AI & data engineering. Building with data."
        />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-20">
          <Reveal className="space-y-6 text-[17px] leading-relaxed text-pretty text-fg-muted md:text-lg">
            <p className="text-xl leading-snug text-balance text-fg md:text-[1.375rem]">
              I'm a Computer Science undergraduate at Lovely Professional University, specialising in Artificial
              Intelligence and Data Engineering.
            </p>
            <p>
              Most of what I build sits where data meets software. Some of it is pipelines, like an ELT stack on{" "}
              <span className="text-fg">PostgreSQL, dbt and Airflow</span>. Some is backend work: APIs, JWT
              authentication, CRUD over a relational database. And some is tooling that makes a system visible, like a
              memory-allocation simulator or a live network-traffic dashboard.
            </p>
            <p>
              My internship at <span className="text-fg">Futurense Technologies</span> put that into a real workflow:
              pipeline development, orchestration, transformation and warehousing. That's the direction I'm going deeper
              into now, while exploring AI alongside my degree.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <dl className="divide-y divide-line rounded-lg border border-line bg-ink-2">
              {facts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-[6.25rem_minmax(0,1fr)] gap-4 px-4 py-3.5">
                  <dt className="pt-0.5 font-mono text-[11.5px] text-fg-faint">{fact.label}</dt>
                  <dd className="text-[14px] leading-snug text-fg">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Trajectory />
      </Container>
    </section>
  );
}
