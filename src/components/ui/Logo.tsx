/** Brand mark: two nodes and an edge — the smallest possible pipeline. Matches favicon.svg. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect x="0.5" y="0.5" width="31" height="31" rx="7" className="fill-ink-2 stroke-line-strong" />
      <path
        d="M9.5 11H15l5 10h2.5"
        fill="none"
        className="stroke-fg-faint"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="11" r="2.75" className="fill-fg" />
      <circle cx="22.5" cy="21" r="2.75" className="fill-accent" />
    </svg>
  );
}
