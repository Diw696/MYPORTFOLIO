import { cx } from "../../lib/cx";

type TagListProps = {
  items: readonly string[];
  label: string;
  className?: string;
};

export function TagList({ items, label, className }: TagListProps) {
  return (
    <ul aria-label={label} className={cx("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-[5px] border border-line bg-ink-2 px-2 py-1 font-mono text-[11.5px] leading-4 text-fg-muted transition-[color,border-color,translate] duration-200 hover:-translate-y-px hover:border-line-strong hover:text-fg"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
