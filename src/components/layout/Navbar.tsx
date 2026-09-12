import { useCallback, useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, Menu } from "lucide-react";
import { navItems, sectionIds } from "../../data/navigation";
import { profile } from "../../data/profile";
import { useActiveSection } from "../../hooks/useActiveSection";
import { cx } from "../../lib/cx";
import { Logo } from "../ui/Logo";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const current = useActiveSection(sectionIds);
  const activeId =
    navItems.find((item) => item.id === current || (current !== null && item.covers?.includes(current)))?.id ?? null;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 32, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[2px] origin-left bg-accent"
          style={{ scaleX: progress }}
        />
        <div className="mx-auto max-w-6xl px-3 pt-3 sm:px-5">
          <div
            className={cx(
              "flex h-12 items-center justify-between rounded-lg border pr-1.5 pl-2.5 transition-[background-color,border-color] duration-300",
              scrolled ? "border-line bg-ink/85 backdrop-blur-md" : "border-transparent",
            )}
          >
            <a href="#top" className="flex items-center gap-2.5 rounded-md py-1 pr-2">
              <Logo className="h-7 w-7" />
              <span className="font-mono text-[13px] text-fg">
                diwakar<span className="text-fg-faint">.kaushik</span>
              </span>
              <span className="sr-only">, back to top</span>
            </a>

            <nav aria-label="Primary" className="hidden md:block">
              <ul className="flex items-center gap-0.5">
                {navItems.map((item) => {
                  const active = item.id === activeId;
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        aria-current={active ? "location" : undefined}
                        className={cx(
                          "relative block rounded-md px-3 py-1.5 text-[13.5px] transition-colors duration-200",
                          active ? "text-fg" : "text-fg-muted hover:text-fg",
                        )}
                      >
                        {active && (
                          <motion.span
                            layoutId="nav-active"
                            aria-hidden="true"
                            className="absolute inset-0 rounded-md border border-line-strong bg-ink-3"
                            transition={{ type: "spring", stiffness: 420, damping: 36 }}
                          />
                        )}
                        <span className="relative">{item.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center">
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="group hidden h-9 items-center gap-1.5 rounded-md px-3 text-[13.5px] text-fg-muted transition-colors hover:bg-ink-3 hover:text-fg md:inline-flex"
              >
                Resume
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </a>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="inline-flex h-9 items-center gap-2 rounded-md px-3 text-[13px] text-fg-muted transition-colors hover:bg-ink-3 hover:text-fg md:hidden"
              >
                <span className="font-mono">menu</span>
                <Menu aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} activeId={activeId} />
    </>
  );
}
