import { articles } from "@/config/articles";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = articles
    .map(
      (a) => `
    <item>
      <title>${escapeXml(a.title)}</title>
      <link>https://lgtm.live/articles/${a.slug}</link>
      <description>${escapeXml(a.subtitle)}</description>
      <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>
      <guid isPermaLink="true">https://lgtm.live/articles/${a.slug}</guid>
    </item>`
    )
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/1999/Atom">
  <channel>
    <title>LGTM</title>
    <link>https://lgtm.live</link>
    <description>Biweekly deep dives on AI architecture decisions for technical leaders who ship. By Saheb Singh.</description>
    <language>en-us</language>
    <managingEditor>saheb@lgtm.live (Saheb Singh)</managingEditor>
    <atom:link href="https://lgtm.live/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
