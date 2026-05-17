import type { MetadataRoute } from 'next';
import { SITE_URL, SUPPORTED_LOCALES, hreflangAlternates } from '@/lib/seo';

const ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { path: '', changeFrequency: 'weekly', priority: 1.0 },
  { path: 'solutions', changeFrequency: 'monthly', priority: 0.9 },
  { path: 'case-studies', changeFrequency: 'monthly', priority: 0.9 },
  { path: 'sample-report', changeFrequency: 'monthly', priority: 0.8 },
  { path: 'about', changeFrequency: 'monthly', priority: 0.7 },
  { path: 'contact', changeFrequency: 'yearly', priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const route of ROUTES) {
    for (const locale of SUPPORTED_LOCALES) {
      const clean = route.path.replace(/^\/+|\/+$/g, '');
      const url = clean ? `${SITE_URL}/${locale}/${clean}` : `${SITE_URL}/${locale}`;
      entries.push({
        url,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages: hreflangAlternates(route.path) },
      });
    }
  }

  return entries;
}
