"use client";

import { useEffect, useRef } from "react";
import { useRevisionMode } from "./RevisionModeProvider";

const REVISION_VISIBLE_SECTIONS = ["key points", "interview answer"];

export default function DocContentEnhancer({ html }) {
  const containerRef = useRef(null);
  const { revisionMode } = useRevisionMode();

  // Revision mode: walk top-level nodes and hide every section whose H2
  // heading isn't "Key Points" or "Interview Answer". The H1 title always
  // stays visible so the page still reads naturally.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const nodes = Array.from(container.children);
    let currentlyVisible = true;

    nodes.forEach((node) => {
      if (node.tagName === "H1") {
        node.style.display = "";
        currentlyVisible = true;
        return;
      }
      if (node.tagName === "H2") {
        const heading = node.textContent.trim().toLowerCase();
        currentlyVisible =
          !revisionMode || REVISION_VISIBLE_SECTIONS.includes(heading);
      }
      node.style.display = currentlyVisible ? "" : "none";
    });
  }, [revisionMode, html]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Copy buttons on every code block ---
    const pres = container.querySelectorAll("pre");
    const cleanupFns = [];

    pres.forEach((pre) => {
      if (pre.dataset.enhanced) return;
      pre.dataset.enhanced = "true";

      const codeEl = pre.querySelector("code");
      const lang = codeEl?.className?.match(/language-(\w+)/)?.[1];

      // Mermaid blocks get rendered as diagrams, not code+copy-button
      if (lang === "mermaid") {
        renderMermaidBlock(pre, codeEl.textContent);
        return;
      }

      pre.classList.add("code-block-wrap");
      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.textContent = "Copy";
      btn.type = "button";

      function handleClick() {
        const text = codeEl ? codeEl.textContent : pre.textContent;
        navigator.clipboard.writeText(text || "").then(() => {
          btn.textContent = "Copied!";
          setTimeout(() => (btn.textContent = "Copy"), 1500);
        });
      }

      btn.addEventListener("click", handleClick);
      pre.appendChild(btn);
      cleanupFns.push(() => btn.removeEventListener("click", handleClick));
    });

    return () => cleanupFns.forEach((fn) => fn());
  }, [html]);

  async function renderMermaidBlock(pre, code) {
    try {
      const mermaid = (await import("mermaid")).default;
      const isDark = document.documentElement.classList.contains("dark");

      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? "dark" : "default",
        themeVariables: isDark
          ? {
              primaryColor: "#141821",
              primaryTextColor: "#e8eaed",
              primaryBorderColor: "#5eead4",
              lineColor: "#5eead4",
              secondaryColor: "#11151d",
              tertiaryColor: "#0b0e14",
              fontFamily: "JetBrains Mono, monospace",
            }
          : {
              primaryColor: "#f0f0ee",
              primaryTextColor: "#15171c",
              primaryBorderColor: "#0f9c8c",
              lineColor: "#0f9c8c",
              fontFamily: "JetBrains Mono, monospace",
            },
      });

      const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
      const { svg } = await mermaid.render(id, code);

      const wrapper = document.createElement("div");
      wrapper.className = "mermaid-block";
      wrapper.innerHTML = svg;
      pre.replaceWith(wrapper);
    } catch (err) {
      // If mermaid syntax is invalid (e.g. in a stub placeholder), leave the
      // raw code visible rather than crashing the page.
      pre.querySelector(".copy-btn")?.remove();
      console.warn("Mermaid render failed:", err);
    }
  }

  return (
    <div
      ref={containerRef}
      className="docs-prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
