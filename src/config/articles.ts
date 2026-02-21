import type { ComponentType } from "react";

export interface ArticleMeta {
  slug: string;
  title: string;
  subtitle: string;
  publishedAt: string; // ISO date
  readTime: string;
  accentColor: string; // hex
  hasViewToggle: boolean;
  tags: string[];
}

export interface ArticleComponent {
  default: ComponentType<{ mode: "executive" | "technical" }>;
}

export const articles: ArticleMeta[] = [
  {
    slug: "ai-agents-vs-copilots",
    title: "AI Agents vs. Copilots vs. Chatbots",
    subtitle:
      "The visual breakdown consulting decks won\u2019t give you. What actually differentiates agents, copilots, and chatbots \u2014 and which one your enterprise needs.",
    publishedAt: "2026-02-10",
    readTime: "12 min",
    accentColor: "#8B3A2A",
    hasViewToggle: true,
    tags: ["architecture", "agents", "enterprise-ai"],
  },
];

export function getArticle(slug: string): ArticleMeta | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return articles.map((a) => a.slug);
}
