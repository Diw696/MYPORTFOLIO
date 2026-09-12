import { useEffect, useRef, useState } from "react";
import { Check, Copy, FileText, Phone } from "lucide-react";
import { profile } from "../../data/profile";
import { GitHubIcon, LinkedInIcon } from "../ui/BrandIcons";
import { Container } from "../ui/Container";
import { LinkButton } from "../ui/LinkButton";
import { Reveal } from "../ui/Reveal";
import { TextReveal } from "../ui/TextReveal";

const status = [
  { label: "currently", value: "B.Tech CSE (AI & Data Engineering), LPU" },
  { label: "recently", value: "Data Engineering Intern, Futurense Technologies" },
  { label: "next", value: "Going deeper into data engineering and AI" },
];

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden border-t border-line py-28 md:py-40">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-70" />

      <Container>
        <p className="flex items-center gap-3 font-mono text-xs text-fg-faint">
          <span aria-hidden="true" className="h-2 w-2 rounded-full border border-accent" />
          <span className="text-accent">07</span>
          <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
          What's next
        </p>

        <h2
          id="contact-title"
          className="mt-6 max-w-4xl text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.03] font-semibold tracking-[-0.035em] text-balance"
        >
          <TextReveal text="Building something with data?" />{" "}
          <span className="text-fg-muted">
            <TextReveal text="Let's talk." delay={0.25} />
          </span>
        </h2>

        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-pretty text-fg-muted">
            Internships, collaborations, or a question about one of the projects above. Email is the best way to reach me.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-12">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="group relative rounded font-mono text-[clamp(1.05rem,3.2vw,1.75rem)] text-fg"
            >
              {profile.email}
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex h-9 items-center gap-2 rounded-md border border-line px-3 font-mono text-xs text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
            >
              {copied ? (
                <Check aria-hidden="true" className="h-3.5 w-3.5 text-accent" />
              ) : (
                <Copy aria-hidden="true" className="h-3.5 w-3.5" />
              )}
              {copied ? "copied" : "copy"}
              <span className="sr-only"> email address</span>
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? "Email address copied to clipboard" : ""}
            </span>
          </div>

          <div className="mt-10 flex flex-wrap gap-2.5">
            <LinkButton href={profile.github} external>
              <GitHubIcon />
              GitHub
            </LinkButton>
            <LinkButton href={profile.linkedin} external>
              <LinkedInIcon />
              LinkedIn
            </LinkButton>
            <LinkButton href={profile.resume} external>
              <FileText aria-hidden="true" />
              Resume
            </LinkButton>
            <LinkButton href={`tel:${profile.phone.replace(/\s+/g, "")}`}>
              <Phone aria-hidden="true" />
              {profile.phone}
            </LinkButton>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-24">
          <dl className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
            {status.map((item) => (
              <div key={item.label} className="bg-ink px-4 py-4">
                <dt className="font-mono text-[11px] text-fg-faint">{item.label}</dt>
                <dd className="mt-1.5 text-[14px] leading-snug text-fg-muted">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
