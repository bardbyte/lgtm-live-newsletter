import type { ArticleMeta } from "@/config/articles";

const ORG_ID = "https://lgtm.live/#organization";
const AUTHOR_ID = "https://lgtm.live/#author";
const SITE_URL = "https://lgtm.live";

function sanitize(obj: Record<string, unknown>): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "LGTM",
    url: SITE_URL,
    logo: `${SITE_URL}/opengraph-image`,
    description:
      "Biweekly deep dives on AI architecture decisions for technical leaders who ship.",
    sameAs: ["https://www.linkedin.com/in/ssg"],
    founder: { "@id": AUTHOR_ID },
  };
}

export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": AUTHOR_ID,
    name: "Saheb Singh",
    url: "https://www.linkedin.com/in/ssg",
    jobTitle: "Enterprise AI Architect",
    worksFor: {
      "@type": "Organization",
      name: "American Express",
    },
    alumniOf: [
      { "@type": "Organization", name: "Google" },
      {
        "@type": "CollegeOrUniversity",
        name: "Carnegie Mellon University",
      },
    ],
    sameAs: ["https://www.linkedin.com/in/ssg"],
    knowsAbout: [
      "AI Architecture",
      "Agentic AI",
      "Enterprise AI Strategy",
      "Data Architecture",
      "Copilots",
      "LLM Systems",
    ],
  };
}

export function webSiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "LGTM",
    url: SITE_URL,
    description:
      "Biweekly deep dives on AI architecture decisions for technical leaders who ship.",
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export function siteGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationJsonLd(), personJsonLd(), webSiteJsonLd()],
  };
}

export function articleJsonLd(article: ArticleMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.subtitle,
    image: `${SITE_URL}/articles/${article.slug}/opengraph-image`,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: { "@id": AUTHOR_ID },
    publisher: { "@id": ORG_ID },
    url: `${SITE_URL}/articles/${article.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/articles/${article.slug}`,
    },
    keywords: article.tags.join(", "),
    timeRequired: `PT${article.readTime.replace(" min", "M")}`,
    isAccessibleForFree: true,
    inLanguage: "en-US",
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: sanitize(data) }}
    />
  );
}
