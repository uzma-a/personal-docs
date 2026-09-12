"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import Fuse from "fuse.js";
import { getAllTopicsFlat } from "@/lib/nav-config";
import StatusBadge from "./StatusBadge";

export default function SearchPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef(null);
  const router = useRouter();

  const topics = useMemo(() => getAllTopicsFlat(), []);
  const fuse = useMemo(
    () =>
      new Fuse(topics, {
        keys: ["title", "sectionTitle"],
        threshold: 0.35,
      }),
    [topics]
  );

  const results = useMemo(() => {
    if (!query.trim()) return topics.slice(0, 8);
    return fuse.search(query).map((r) => r.item).slice(0, 8);
  }, [query, fuse, topics]);

  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setActiveIdx(0);
    }
  }, [open]);

  function goTo(topic) {
    router.push(`/docs/${topic.section}/${topic.slug}`);
    setOpen(false);
  }

  function handleInputKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIdx]) {
      goTo(results[activeIdx]);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-md border border-border bg-bg-panel text-text-faint text-sm hover:border-accent/50 transition-colors w-full max-w-xs"
      >
        <Search size={14} />
        <span className="flex-1 text-left">Search notes...</span>
        <kbd className="font-mono text-[0.65rem] px-1.5 py-0.5 rounded border border-border bg-bg-elevated">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 flex items-start justify-center pt-[12vh] px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-bg-elevated border border-border rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search size={16} className="text-text-faint shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIdx(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Search topics, e.g. 'OOP' or 'cloud'"
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-text-faint"
              />
              <button onClick={() => setOpen(false)} className="text-text-faint hover:text-text">
                <X size={16} />
              </button>
            </div>

            <ul className="max-h-[50vh] overflow-y-auto py-2">
              {results.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-text-faint">
                  No notes match &ldquo;{query}&rdquo;
                </li>
              )}
              {results.map((topic, idx) => (
                <li key={`${topic.section}-${topic.slug}`}>
                  <button
                    onClick={() => goTo(topic)}
                    onMouseEnter={() => setActiveIdx(idx)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      idx === activeIdx ? "bg-bg-panel" : ""
                    }`}
                  >
                    <StatusBadge status={topic.status} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{topic.title}</div>
                      <div className="text-[0.7rem] text-text-faint font-mono truncate">
                        {topic.sectionTitle}
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-text-faint shrink-0" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
