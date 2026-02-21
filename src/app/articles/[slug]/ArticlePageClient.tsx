"use client";

import { notFound } from "next/navigation";
import { getArticle } from "@/config/articles";
import ArticleLayout from "@/components/ArticleLayout";
import AIAgentsVsCopilots from "@/articles/ai-agents-vs-copilots";
import type { ComponentType } from "react";

const articleComponents: Record<
  string,
  ComponentType<{ mode: "executive" | "technical" }>
> = {
  "ai-agents-vs-copilots": AIAgentsVsCopilots,
};

export default function ArticlePageClient({ slug }: { slug: string }) {
  const meta = getArticle(slug);
  const Component = articleComponents[slug];

  if (!meta || !Component) {
    notFound();
  }

  return <ArticleLayout meta={meta} Component={Component} />;
}
