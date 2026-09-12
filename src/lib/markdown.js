import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import readingTime from "reading-time";
import { NAV, getSectionTopics } from "./nav-config";

const CONTENT_DIR = path.join(process.cwd(), "content", "docs");

// Default skeleton used when a topic's .md file doesn't exist yet (status: todo).
// Keeps every route resolvable even before the user has written notes for it.
function buildStub(title) {
  return `# ${title}

## Simple Definition
_Not written yet — explain this like a beginner would understand, in 2-3 sentences._

## Real World Example
_Add a practical, everyday analogy here._

## How It Works
_Break the concept down into steps or internals._

## Visual Explanation
\`\`\`mermaid
flowchart LR
  A[Start] --> B[Add your diagram here]
\`\`\`

## Code Example
\`\`\`javascript
// Add a syntax-highlighted example once you've learned this topic
\`\`\`

## Key Points
- _Add the must-remember facts here_

## Interview Answer
_Write the polished, professional answer you'd give in an interview._

## Common Interview Questions
**Q: Add a related question?**
A: Add the answer.

## My Notes
_Your personal notes, gotchas, and links go here._
`;
}

export function getTopicMeta(section, slug) {
  const sec = NAV.find((s) => s.section === section);
  if (!sec) return null;

  if (sec.modules) {
    for (const mod of sec.modules) {
      const topic = mod.topics.find((t) => t.slug === slug);
      if (topic) {
        return { ...topic, section, sectionTitle: sec.title, moduleTitle: mod.title };
      }
    }
    return null;
  }

  const topic = (sec.topics || []).find((t) => t.slug === slug);
  if (!topic) return null;
  return { ...topic, section, sectionTitle: sec.title };
}

export function getRawContent(section, slug) {
  const meta = getTopicMeta(section, slug);
  if (!meta) return null;

  const filePath = path.join(CONTENT_DIR, section, `${slug}.md`);
  let raw;
  let frontmatter = {};

  if (fs.existsSync(filePath)) {
    const file = fs.readFileSync(filePath, "utf8");
    const parsed = matter(file);
    raw = parsed.content;
    frontmatter = parsed.data;
  } else {
    raw = buildStub(meta.title);
  }

  return { raw, frontmatter, meta };
}

// Extracts H2 headings for the on-page table of contents.
export function extractHeadings(markdown) {
  const lines = markdown.split("\n");
  const headings = [];
  for (const line of lines) {
    const match = line.match(/^##\s+(.*)/);
    if (match) {
      const text = match[1].trim();
      const id = slugify(text);
      headings.push({ text, id });
    }
  }
  return headings;
}

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// Adds id="" anchors to ## headings so the TOC can deep-link to them.
// This runs as a proper rehype plugin (rehype-slug) on the already-parsed
// AST — never on raw markdown text — so it can't corrupt block parsing.

export async function renderMarkdownToHtml(markdown) {
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);
  return processed.toString();
}

export function getReadingTime(markdown) {
  return readingTime(markdown);
}

export function getAllSlugsForStaticParams() {
  const params = [];
  for (const sec of NAV) {
    for (const topic of getSectionTopics(sec)) {
      params.push({ slug: [sec.section, topic.slug] });
    }
  }
  return params;
}
