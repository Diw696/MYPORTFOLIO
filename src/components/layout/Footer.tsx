import { ArrowUp } from "lucide-react";
import { profile } from "../../data/profile";
import { Container } from "../ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-4 py-8 font-mono text-xs text-fg-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Built with React, TypeScript, Tailwind CSS &amp; Motion</p>
        <a href="#top" className="group inline-flex items-center gap-1.5 self-start rounded text-fg-muted hover:text-fg sm:self-auto">
          Back to top
          <ArrowUp aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
        </a>
      </Container>
    </footer>
  );
}
