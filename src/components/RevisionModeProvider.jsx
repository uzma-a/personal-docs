"use client";

import { createContext, useContext, useState, useEffect } from "react";

const RevisionModeContext = createContext({
  revisionMode: false,
  toggleRevisionMode: () => {},
});

export function RevisionModeProvider({ children }) {
  const [revisionMode, setRevisionMode] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("uzma-revision-mode");
    if (stored === "true") setRevisionMode(true);
  }, []);

  function toggleRevisionMode() {
    setRevisionMode((prev) => {
      const next = !prev;
      window.localStorage.setItem("uzma-revision-mode", String(next));
      return next;
    });
  }

  return (
    <RevisionModeContext.Provider value={{ revisionMode, toggleRevisionMode }}>
      {children}
    </RevisionModeContext.Provider>
  );
}

export function useRevisionMode() {
  return useContext(RevisionModeContext);
}
