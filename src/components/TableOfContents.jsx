"use client";

import { useEffect, useState } from "react";

export default function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState(headings[0]?.id || "");

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav className="sticky top-20 text-sm">
      <div className="text-[0.7rem] font-mono uppercase tracking-wider text-text-faint mb-3">
        On this page
      </div>
      <ul className="space-y-2 border-l border-border pl-3">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block transition-colors leading-snug ${
                activeId === h.id
                  ? "text-accent font-medium"
                  : "text-text-faint hover:text-text"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
