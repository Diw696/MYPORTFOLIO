import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import { About } from "./components/about/About";
import { ContactSection } from "./components/contact/ContactSection";
import { Credentials } from "./components/credentials/Credentials";
import { Education } from "./components/education/Education";
import { ExperienceTimeline } from "./components/experience/ExperienceTimeline";
import { Hero } from "./components/hero/Hero";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { Projects } from "./components/projects/Projects";
import { Skills } from "./components/skills/Skills";

export default function App() {
  // The browser tries to jump to a #hash before React has rendered; retry once mounted.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash.startsWith("#case-")) return;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target) requestAnimationFrame(() => target.scrollIntoView());
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <ExperienceTimeline />
        <Projects />
        <Skills />
        <Education />
        <Credentials />
        <ContactSection />
      </main>
      <Footer />
    </MotionConfig>
  );
}
