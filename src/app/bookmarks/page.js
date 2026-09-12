"use client";

import Link from "next/link";
import { Bookmark, ArrowRight } from "lucide-react";
import { useBookmarks } from "@/components/BookmarksProvider";

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();

  return (
    <div className="max-w-[800px] mx-auto px-4 lg:px-8 py-10">
      <h1 className="font-display text-2xl font-bold mb-2 flex items-center gap-2">
        <Bookmark size={20} style={{ color: "var(--accent)" }} />
        Bookmarks
      </h1>
      <p className="text-text-muted mb-8">
        Topics you&rsquo;ve flagged for quick access. Saved on this device.
      </p>

      {bookmarks.length === 0 ? (
        <div className="border border-dashed border-border rounded-xl p-8 text-center text-text-faint text-sm">
          No bookmarks yet. Open any topic and click &ldquo;Bookmark&rdquo; to save it here.
        </div>
      ) : (
        <ul className="space-y-2">
          {bookmarks.map((b) => (
            <li key={`${b.section}-${b.slug}`}>
              <Link
                href={`/docs/${b.section}/${b.slug}`}
                className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-border hover:border-accent/50 transition-colors group"
              >
                <span className="text-sm font-medium group-hover:text-accent transition-colors">
                  {b.title}
                </span>
                <ArrowRight size={14} className="text-text-faint shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
