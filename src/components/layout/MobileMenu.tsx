import { useRef, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { navItems } from "../../data/navigation";
import { profile } from "../../data/profile";
import { useDialog } from "../../hooks/useDialog";
import { cx } from "../../lib/cx";
import { ease, fadeUp, stagger } from "../../lib/motion";
import { Logo } from "../ui/Logo";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  activeId: string | null;
};

export function MobileMenu({ open, onClose, activeId }: MobileMenuProps) {
  return <AnimatePresence>{open && <MenuPanel onClose={onClose} activeId={activeId} />}</AnimatePresence>;
}

function MenuPanel({ onClose, activeId }: Omit<MobileMenuProps, "open">) {
  const ref = useRef<HTMLDivElement>(null);
  useDialog(ref, onClose);

  // Close first, then scroll, so the scroll lock never swallows the jump.
  const go = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    onClose();
    requestAnimationFrame(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      history.replaceState(null, "", `#${id}`);
    });
  };

  return (
    <motion.div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-[60] flex flex-col bg-ink md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3, ease }}
    >
      <div className="px-3 pt-3">
        <div className="flex h-12 items-center justify-between rounded-lg border border-line pr-1.5 pl-2.5">
          <a href="#top" onClick={(e) => go(e, "top")} className="flex items-center gap-2.5 rounded-md py-1 pr-2">
            <Logo className="h-7 w-7" />
            <span className="font-mono text-[13px] text-fg">
              diwakar<span className="text-fg-faint">.kaushik</span>
            </span>
          </a>
          <button
            type="button"
            data-autofocus
            onClick={onClose}
            className="inline-flex h-9 items-center gap-2 rounded-md px-3 text-[13px] text-fg-muted transition-colors hover:bg-ink-3 hover:text-fg"
          >
            <span className="font-mono">close</span>
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>

      <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 pt-8">
        <motion.ul initial="hidden" animate="show" variants={stagger(0.05, 0.05)}>
          {navItems.map((item, i) => {
            const active = item.id === activeId;
            return (
              <motion.li key={item.id} variants={fadeUp} className="border-b border-line">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => go(e, item.id)}
                  aria-current={active ? "location" : undefined}
                  className="group flex items-baseline gap-4 py-4"
                >
                  <span className={cx("font-mono text-xs", active ? "text-accent" : "text-fg-faint")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cx(
                      "text-[1.75rem] leading-none font-medium tracking-tight transition-colors",
                      active ? "text-fg" : "text-fg-muted group-hover:text-fg",
                    )}
                  >
                    {item.label}
                  </span>
                </a>
              </motion.li>
            );
          })}
        </motion.ul>
      </nav>

      <motion.div
        className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line px-6 pt-5 pb-8 font-mono text-[13px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.4 } }}
      >
        <a href={`mailto:${profile.email}`} className="col-span-2 truncate text-fg hover:text-accent">
          {profile.email}
        </a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-fg-muted hover:text-fg">
          GitHub ↗
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-fg-muted hover:text-fg">
          LinkedIn ↗
        </a>
        <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="text-fg-muted hover:text-fg">
          Resume ↗
        </a>
      </motion.div>
    </motion.div>
  );
}
