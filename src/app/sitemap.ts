import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const siteUrl = 'https://donedoner.web.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/` },
    { url: `${siteUrl}/app/` },
    { url: `${siteUrl}/about/` },
    { url: `${siteUrl}/guides/` },
    { url: `${siteUrl}/guides/keeping-an-accomplishment-log/` },
    { url: `${siteUrl}/guides/using-the-scratchpad/` },
    { url: `${siteUrl}/guides/understanding-your-exports/` },
  ];
}
