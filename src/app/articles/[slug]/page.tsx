import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle, getAllSlugs } from "@/config/articles";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  JsonLdScript,
} from "@/lib/jsonld";
import ArticlePageClient from "./ArticlePageClient";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.subtitle,
    alternates: {
      canonical: `https://lgtm.live/articles/${slug}`,
    },
    authors: [{ name: "Saheb Singh", url: "https://www.linkedin.com/in/ssg" }],
    openGraph: {
      title: article.title,
      description: article.subtitle,
      type: "article",
      publishedTime: article.publishedAt,
      tags: article.tags,
      authors: ["Saheb Singh"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.subtitle,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <JsonLdScript data={articleJsonLd(article)} />
      <JsonLdScript
        data={breadcrumbJsonLd([
          { name: "LGTM", url: "https://lgtm.live" },
          { name: "Articles", url: "https://lgtm.live/articles" },
          {
            name: article.title,
            url: `https://lgtm.live/articles/${slug}`,
          },
        ])}
      />
      <ArticlePageClient slug={slug} />
    </>
  );
}
