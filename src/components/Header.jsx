"use client";

import { Menu, Sun, Moon, GraduationCap } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import SearchPalette from "./SearchPalette";
import { useRevisionMode } from "./RevisionModeProvider";

export default function Header({ onMenuClick }) {
  const { theme, toggleTheme, mounted } = useTheme();
  const { revisionMode, toggleRevisionMode } = useRevisionMode();

  return (
    <header className="sticky top-0 z-30 h-14 border-b border-border bg-bg-elevated/90 backdrop-blur-sm flex items-center gap-3 px-4 lg:px-6">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-text-muted hover:text-text"
        aria-label="Toggle navigation"
      >
        <Menu size={20} />
      </button>

      <div className="flex-1 flex items-center justify-center sm:justify-start">
        <SearchPalette />
      </div>

      <button
        onClick={toggleRevisionMode}
        className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border transition-colors ${
          revisionMode
            ? "border-amber text-amber"
            : "border-border text-text-muted hover:text-text"
        }`}
        style={revisionMode ? { background: "var(--amber-soft)" } : undefined}
        title="Show only key points and interview answers"
      >
        <GraduationCap size={15} />
        Revision Mode
      </button>

      <button
        onClick={toggleRevisionMode}
        className={`sm:hidden text-text-muted ${revisionMode ? "text-amber" : ""}`}
        aria-label="Toggle revision mode"
      >
        <GraduationCap size={20} />
      </button>

      {mounted && (
        <button
          onClick={toggleTheme}
          className="text-text-muted hover:text-text transition-colors"
          aria-label="Toggle dark mode"
        >
          {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
        </button>
      )}
    </header>
  );
}
