export const siteConfig = {
  name: "ShipLog",
  title: "ShipLog | Product changelogs for software teams",
  description:
    "ShipLog is a changelog and release notes product for software teams. Publish updates, organize releases, and keep users current from one feed.",
  url: "https://shiplog.app"
} as const;

export const navItems = [
  { href: "/", label: "Overview" },
  { href: "/changelog", label: "Changelog" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/admin", label: "Admin" }
] as const;

export const heroMetrics = [
  { label: "Published releases", value: "126" },
  { label: "Median write time", value: "11 min" },
  { label: "Teams onboarded", value: "42" }
] as const;

export const featureCards = [
  {
    title: "Write once, publish everywhere",
    description:
      "Draft release notes in markdown, organize them by version and category, and keep the public feed in sync."
  },
  {
    title: "Give support and product one timeline",
    description:
      "Break changes into feature, fix, improvement, and breaking buckets so teams can answer customer questions fast."
  },
  {
    title: "Ship an embed that looks native",
    description:
      "Reuse the changelog feed as a widget, docs module, or launch post without rebuilding it for every channel."
  }
] as const;

export const integrations = [
  "GitHub",
  "Linear",
  "Slack",
  "Notion",
  "Vercel",
  "Intercom"
] as const;

type PricingTier = {
  name: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$19",
    description: "For small product teams shipping a single public changelog.",
    features: [
      "Unlimited published entries",
      "1 editor workspace",
      "Hosted changelog page",
      "RSS feed and embeddable widget"
    ]
  },
  {
    name: "Growth",
    price: "$79",
    description: "For teams coordinating launches across support, PM, and engineering.",
    features: [
      "5 editor seats",
      "Scheduled releases",
      "Category filtering and search",
      "Priority support"
    ],
    featured: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For larger teams with multiple products, compliance, and internal approval flows.",
    features: [
      "Unlimited workspaces",
      "SSO and audit log hooks",
      "Custom embed styling",
      "Dedicated onboarding"
    ]
  }
];

export const docSections = [
  {
    title: "Embed the widget",
    body:
      "Drop the ShipLog widget onto any marketing site or docs page. The feed inherits your accent colors and keeps the latest three releases visible."
  },
  {
    title: "Subscribe with RSS",
    body:
      "Expose an RSS feed for teams that prefer Slack digests, feed readers, or internal automation."
  },
  {
    title: "Model releases in markdown",
    body:
      "Write updates in markdown with headings, bullets, and checklists. Version tags and category pills stay structured."
  }
] as const;
