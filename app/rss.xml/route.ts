import { getPublishedEntries } from "@/lib/changelog";
import { siteConfig } from "@/lib/site-content";

export function GET() {
  const entries = getPublishedEntries();

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${siteConfig.url}/changelog</link>
    <description>${siteConfig.description}</description>
    ${entries
      .map(
        (entry) => `
    <item>
      <title>${entry.title}</title>
      <link>${siteConfig.url}/changelog/${entry.slug}</link>
      <guid>${siteConfig.url}/changelog/${entry.slug}</guid>
      <pubDate>${new Date(entry.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${entry.summary}]]></description>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
