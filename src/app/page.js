import { Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="max-w-[700px] mx-auto px-4 lg:px-8 py-20">
      <div
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono mb-5"
        style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
      >
        <Sparkles size={12} />
        IBM Full Stack Software Developer
      </div>

      <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
        Welcome to my developer learning journey
      </h1>

      <p className="text-text-muted leading-relaxed">
        This is my personal knowledge base — every concept I learn, revise, and
        turn into interview-ready answers, organized like documentation and
        searchable like a second brain.
      </p>

      <p className="text-text-faint text-sm mt-6">
        Pick a topic from the sidebar to get started, or press{" "}
        <kbd className="font-mono text-xs px-1.5 py-0.5 rounded border border-border bg-bg-panel">
          ⌘K
        </kbd>{" "}
        to search.
      </p>
    </div>
  );
}
