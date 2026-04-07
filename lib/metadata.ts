import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-content";

export function buildMetadata(
  title: string,
  description: string,
  path = "/"
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.name,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}
