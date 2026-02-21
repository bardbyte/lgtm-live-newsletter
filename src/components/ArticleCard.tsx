import Link from "next/link";
import type { ArticleMeta } from "@/config/articles";

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block py-8 border-b border-surface-light last:border-b-0"
    >
      <div className="flex items-start gap-5">
        <div className="mt-2 w-1 h-12 rounded-full shrink-0 transition-all duration-300 group-hover:h-16 bg-accent" />
        <div className="min-w-0">
          <h3 className="text-xl font-bold tracking-[-0.01em] group-hover:text-muted transition-colors md:text-2xl">
            {article.title}
          </h3>
          <p className="mt-1.5 font-mono text-[11px] text-muted-dark tracking-wide">
            {date} &middot; {article.readTime}
          </p>
          <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-2">
            {article.subtitle}
          </p>
        </div>
      </div>
    </Link>
  );
}
