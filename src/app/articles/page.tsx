import Link from "next/link";
import type { Metadata } from "next";
import { articles } from "@/config/articles";
import { breadcrumbJsonLd, JsonLdScript } from "@/lib/jsonld";
import ArticleCard from "@/components/ArticleCard";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Visual explainers on AI architecture, agents, and enterprise strategy. By Saheb Singh.",
  alternates: {
    canonical: "https://lgtm.live/articles",
  },
};

export default function ArticlesPage() {
  return (
    <main className="min-h-screen">
      <JsonLdScript
        data={breadcrumbJsonLd([
          { name: "LGTM", url: "https://lgtm.live" },
          { name: "Articles", url: "https://lgtm.live/articles" },
        ])}
      />
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 font-mono text-xs tracking-[0.25em] text-accent hover:text-foreground transition-colors uppercase"
      >
        LGTM
      </Link>
      <ThemeToggle />

      <section className="mx-auto max-w-2xl px-6 pt-32 pb-24">
        <p className="font-mono text-[11px] tracking-[0.25em] text-accent uppercase mb-4">
          Archive
        </p>
        <h1 className="text-4xl font-bold tracking-[-0.02em] md:text-5xl">
          Articles
        </h1>

        <div className="mt-12">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </main>
  );
}
