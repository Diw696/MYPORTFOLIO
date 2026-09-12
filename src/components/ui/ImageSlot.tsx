import { ImageIcon } from "lucide-react";
import { cx } from "../../lib/cx";

type ImageSlotProps = {
  /** Public path, e.g. /images/projects/pipeone/cover.webp. Omit to render the placeholder. */
  src?: string;
  alt: string;
  label: string;
  /** Where the real file should go — kept in a data attribute for whoever edits the site. */
  expectedPath: string;
  className?: string;
};

const corners = [
  "left-3 top-3 border-l border-t",
  "right-3 top-3 border-r border-t",
  "left-3 bottom-3 border-l border-b",
  "right-3 bottom-3 border-r border-b",
];

export function ImageSlot({ src, alt, label, expectedPath, className }: ImageSlotProps) {
  if (src) {
    return (
      <div className={cx("group overflow-hidden rounded-lg border border-line bg-ink-2", className)}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${label}: not added yet`}
      data-expected-path={expectedPath}
      className={cx(
        "hatch relative flex flex-col items-center justify-center gap-2.5 overflow-hidden rounded-lg border border-dashed border-line-strong bg-ink-2 p-6 text-center",
        "transition-colors duration-300 hover:border-fg-faint/60",
        className,
      )}
    >
      {corners.map((corner) => (
        <span key={corner} aria-hidden="true" className={cx("absolute h-3 w-3 border-fg-faint/50", corner)} />
      ))}
      <ImageIcon aria-hidden="true" className="h-5 w-5 text-fg-faint" strokeWidth={1.5} />
      <p className="font-mono text-xs text-fg-muted">{label}</p>
      <p className="font-mono text-[11px] text-fg-faint">to be added</p>
    </div>
  );
}
