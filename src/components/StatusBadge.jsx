const CONFIG = {
  done: { glyph: "✓", label: "Done", color: "var(--accent)", bg: "var(--accent-soft)" },
  learning: { glyph: "→", label: "Learning", color: "var(--amber)", bg: "var(--amber-soft)" },
  todo: { glyph: "○", label: "To do", color: "var(--text-faint)", bg: "transparent" },
};

export default function StatusBadge({ status, size = "sm" }) {
  const cfg = CONFIG[status] || CONFIG.todo;
  const sizeClasses = size === "sm" ? "text-[0.7rem] w-4 h-4" : "text-xs w-5 h-5";

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-mono shrink-0 ${sizeClasses}`}
      style={{ color: cfg.color, background: cfg.bg }}
      title={cfg.label}
      aria-label={cfg.label}
    >
      {cfg.glyph}
    </span>
  );
}
