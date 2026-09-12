"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useBookmarks } from "./BookmarksProvider";

export default function BookmarkButton({ topic }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const active = isBookmarked(topic.section, topic.slug);

  return (
    <button
      onClick={() => toggleBookmark(topic)}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border transition-colors ${
        active ? "border-accent text-accent" : "border-border text-text-muted hover:text-text"
      }`}
      style={active ? { background: "var(--accent-soft)" } : undefined}
    >
      {active ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
      {active ? "Bookmarked" : "Bookmark"}
    </button>
  );
}
