"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Home, BookmarkCheck } from "lucide-react";
import { NAV } from "@/lib/nav-config";
import StatusBadge from "./StatusBadge";

function TopicLink({ section, topic, pathname, onClose }) {
  const href = `/docs/${section}/${topic.slug}`;
  const isActive = pathname === href;
  return (
    <li>
      <Link
        href={href}
        onClick={onClose}
        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[0.83rem] transition-colors ${
          isActive
            ? "text-accent font-medium"
            : "text-text-muted hover:text-text hover:bg-bg-panel"
        }`}
        style={isActive ? { background: "var(--accent-soft)" } : undefined}
      >
        <StatusBadge status={topic.status} />
        <span className="leading-snug">{topic.title}</span>
      </Link>
    </li>
  );
}

export default function Sidebar({ open, onClose }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState({});

  function toggleKey(key) {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 lg:z-0
          h-screen lg:h-[calc(100vh)]
          w-[280px] shrink-0
          bg-bg-elevated border-r border-border
          flex flex-col
          transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="px-5 py-4 border-b border-border flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center font-mono text-sm font-bold shrink-0"
            style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
          >
            $_
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold text-sm">Uzma Dev Notes</div>
            <div className="text-[0.7rem] text-text-faint">IBM Full Stack Journey</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <Link
            href="/"
            onClick={onClose}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === "/"
                ? "bg-accent-soft text-accent"
                : "text-text-muted hover:bg-bg-panel hover:text-text"
            }`}
            style={pathname === "/" ? { background: "var(--accent-soft)", color: "var(--accent)" } : undefined}
          >
            <Home size={15} strokeWidth={2} />
            Home
          </Link>

          <Link
            href="/bookmarks"
            onClick={onClose}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === "/bookmarks"
                ? "text-accent"
                : "text-text-muted hover:bg-bg-panel hover:text-text"
            }`}
            style={pathname === "/bookmarks" ? { background: "var(--accent-soft)", color: "var(--accent)" } : undefined}
          >
            <BookmarkCheck size={15} strokeWidth={2} />
            Bookmarks
          </Link>

          <div className="pt-3 pb-1 px-3 text-[0.7rem] font-mono uppercase tracking-wider text-text-faint">
            IBM Full Stack Developer
          </div>

          {NAV.map((section) => {
            const isCollapsed = collapsed[section.section];
            return (
              <div key={section.section} className="mb-0.5">
                <button
                  onClick={() => toggleKey(section.section)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold text-text hover:bg-bg-panel transition-colors group"
                >
                  <span className="font-mono text-[0.7rem] text-accent w-5 shrink-0">
                    {section.number}
                  </span>
                  <span className="flex-1 text-left">{section.title}</span>
                  <ChevronDown
                    size={14}
                    className={`shrink-0 text-text-faint transition-transform ${
                      isCollapsed ? "-rotate-90" : ""
                    }`}
                  />
                </button>

                {!isCollapsed && (
                  <div className="ml-[1.65rem] border-l border-border pl-3 mt-0.5 mb-2">
                    {section.modules
                      ? // Two-level sections (e.g. Cloud Computing): module groups,
                        // each independently collapsible, each with its own topics.
                        section.modules.map((mod) => {
                          const modKey = `${section.section}/${mod.slug}`;
                          const modCollapsed = collapsed[modKey];
                          return (
                            <div key={mod.slug} className="mb-1.5">
                              <button
                                onClick={() => toggleKey(modKey)}
                                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[0.78rem] font-semibold text-text-muted hover:text-text hover:bg-bg-panel transition-colors"
                              >
                                <span className="flex-1 text-left leading-snug">{mod.title}</span>
                                <ChevronDown
                                  size={12}
                                  className={`shrink-0 transition-transform ${
                                    modCollapsed ? "-rotate-90" : ""
                                  }`}
                                />
                              </button>
                              {!modCollapsed && (
                                <ul className="border-l border-border pl-3 ml-2 mt-0.5 space-y-0.5">
                                  {mod.topics.map((topic) => (
                                    <TopicLink
                                      key={topic.slug}
                                      section={section.section}
                                      topic={topic}
                                      pathname={pathname}
                                      onClose={onClose}
                                    />
                                  ))}
                                </ul>
                              )}
                            </div>
                          );
                        })
                      : // Flat sections (e.g. Software Engineering Fundamentals):
                        // topics listed directly, no module grouping.
                        (
                          <ul className="space-y-0.5">
                            {section.topics.map((topic) => (
                              <TopicLink
                                key={topic.slug}
                                section={section.section}
                                topic={topic}
                                pathname={pathname}
                                onClose={onClose}
                              />
                            ))}
                          </ul>
                        )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="px-5 py-3 border-t border-border text-[0.7rem] text-text-faint font-mono">
          built with Next.js + Tailwind
        </div>
      </aside>
    </>
  );
}
