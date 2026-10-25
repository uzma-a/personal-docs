import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { RevisionModeProvider } from "@/components/RevisionModeProvider";
import { BookmarksProvider } from "@/components/BookmarksProvider";
import AppShell from "@/components/AppShell";

// Note: Google Fonts are loaded via <link> in the <head> below (see
// layout markup) rather than next/font, so the project still builds in
// network-restricted environments. On a normal connection this gives you
// Inter + JetBrains Mono; offline, CSS fallbacks (system-ui, ui-monospace)
// take over automatically — see globals.css.

export const metadata = {
  title: "Dev Notes",
  description:
    "A personal developer knowledge base — notes, revision, and interview prep.",
};

// Inline script prevents a flash of the wrong theme on first paint —
// it runs before React hydrates, reading the same key ThemeProvider uses.
const noFlashScript = `
(function() {
  try {
    var stored = localStorage.getItem('uzma-theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text">
        <ThemeProvider>
          <RevisionModeProvider>
            <BookmarksProvider>
              <AppShell>{children}</AppShell>
            </BookmarksProvider>
          </RevisionModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
