import Link from "next/link";
import type { ArticleMeta } from "@/config/articles";

export default function FeaturedArticleCard({
  article,
}: {
  article: ArticleMeta;
}) {
  const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block rounded-2xl border border-surface-light bg-surface/40 p-8 md:p-10 transition-all duration-300 hover:border-muted-dark/30 hover:bg-surface/70"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-2 h-2 rounded-full bg-accent" />
        <p className="font-mono text-[10px] tracking-[0.2em] text-muted-dark uppercase">
          Latest
        </p>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] leading-tight group-hover:text-muted transition-colors">
        {article.title}
      </h2>

      <p className="mt-4 text-base text-muted leading-relaxed max-w-lg">
        {article.subtitle}
      </p>

      <div className="mt-6 flex items-center justify-between">
        <p className="font-mono text-[11px] text-muted-dark tracking-wide">
          {date} &middot; {article.readTime}
        </p>
        <span className="font-mono text-sm text-muted-dark group-hover:text-foreground transition-colors">
          Read &rarr;
        </span>
      </div>
    </Link>
  );
}
