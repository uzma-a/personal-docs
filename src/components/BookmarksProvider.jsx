"use client";

import { createContext, useContext, useState, useEffect } from "react";

const BookmarksContext = createContext({
  bookmarks: [],
  isBookmarked: () => false,
  toggleBookmark: () => {},
});

const STORAGE_KEY = "uzma-bookmarks";

export function BookmarksProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setBookmarks(JSON.parse(stored));
    } catch {
      // ignore malformed storage
    }
  }, []);

  function isBookmarked(section, slug) {
    return bookmarks.some((b) => b.section === section && b.slug === slug);
  }

  function toggleBookmark(topic) {
    setBookmarks((prev) => {
      const exists = prev.some(
        (b) => b.section === topic.section && b.slug === topic.slug
      );
      const next = exists
        ? prev.filter((b) => !(b.section === topic.section && b.slug === topic.slug))
        : [...prev, topic];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  return (
    <BookmarksContext.Provider value={{ bookmarks, isBookmarked, toggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(BookmarksContext);
}
