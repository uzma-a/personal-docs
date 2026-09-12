import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DocPager({ prev, next }) {
  if (!prev && !next) return null;

  return (
    <div className="grid grid-cols-2 gap-3 mt-10 pt-6 border-t border-border">
      <div>
        {prev && (
          <Link
            href={`/docs/${prev.section}/${prev.slug}`}
            className="flex flex-col gap-1 px-4 py-3 rounded-lg border border-border hover:border-accent/50 transition-colors group"
          >
            <span className="flex items-center gap-1 text-[0.7rem] text-text-faint font-mono">
              <ChevronLeft size={12} /> Previous
            </span>
            <span className="text-sm font-medium group-hover:text-accent transition-colors line-clamp-1">
              {prev.title}
            </span>
          </Link>
        )}
      </div>
      <div>
        {next && (
          <Link
            href={`/docs/${next.section}/${next.slug}`}
            className="flex flex-col gap-1 px-4 py-3 rounded-lg border border-border hover:border-accent/50 transition-colors text-right group"
          >
            <span className="flex items-center justify-end gap-1 text-[0.7rem] text-text-faint font-mono">
              Next <ChevronRight size={12} />
            </span>
            <span className="text-sm font-medium group-hover:text-accent transition-colors line-clamp-1">
              {next.title}
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
