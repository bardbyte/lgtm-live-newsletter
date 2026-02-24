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
    slug: "agentic-quality-crisis",
    title: "The Agentic AI Quality Crisis",
    subtitle:
      "57% of teams have agents in production. Only 37% evaluate if outputs are correct. The quality gap between \u2018works in demos\u2019 and \u2018works reliably\u2019 is where enterprises are bleeding money.",
    publishedAt: "2026-04-07",
    readTime: "13 min",
    accentColor: "#DC2626",
    hasViewToggle: true,
    tags: ["agents", "quality", "governance", "enterprise-ai"],
  },
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
