import { notFound } from "next/navigation";
import {
  getRawContent,
  renderMarkdownToHtml,
  extractHeadings,
  getReadingTime,
  getAllSlugsForStaticParams,
} from "@/lib/markdown";
import { findAdjacentTopics } from "@/lib/nav-config";
import DocContentEnhancer from "@/components/DocContentEnhancer";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgress from "@/components/ReadingProgress";
import BookmarkButton from "@/components/BookmarkButton";
import DocPager from "@/components/DocPager";
import StatusBadge from "@/components/StatusBadge";

export async function generateStaticParams() {
  return getAllSlugsForStaticParams();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [section, topicSlug] = slug;
  const data = getRawContent(section, topicSlug);
  if (!data) return { title: "Not found · Uzma Dev Notes" };
  return {
    title: `${data.meta.title} · Uzma Dev Notes`,
    description: `Notes on ${data.meta.title} from the IBM Full Stack Software Developer learning journey.`,
  };
}

export default async function DocPage({ params }) {
  const { slug } = await params;
  if (!slug || slug.length !== 2) notFound();

  const [section, topicSlug] = slug;
  const data = getRawContent(section, topicSlug);
  if (!data) notFound();

  const { raw, meta } = data;
  const html = await renderMarkdownToHtml(raw);
  const headings = extractHeadings(raw);
  const stats = getReadingTime(raw);
  const { prev, next } = findAdjacentTopics(section, topicSlug);

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
      <ReadingProgress />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-10 py-8">
        <article className="min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <span className="text-[0.7rem] font-mono uppercase tracking-wider text-text-faint">
              {meta.sectionTitle}
            </span>
            <span className="text-text-faint">·</span>
            <span className="flex items-center gap-1.5 text-[0.7rem] text-text-faint">
              <StatusBadge status={meta.status} />
              {meta.status === "done"
                ? "Completed"
                : meta.status === "learning"
                ? "Currently learning"
                : "Not started"}
            </span>
            <span className="text-text-faint">·</span>
            <span className="text-[0.7rem] text-text-faint font-mono">
              {Math.ceil(stats.minutes)} min read
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 mb-6">
            <div />
            <BookmarkButton topic={{ section, slug: topicSlug, title: meta.title }} />
          </div>

          <DocContentEnhancer html={html} />

          <DocPager prev={prev} next={next} />
        </article>

        <aside className="hidden lg:block">
          <TableOfContents headings={headings} />
        </aside>
      </div>
    </div>
  );
}
