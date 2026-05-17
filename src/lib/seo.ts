/**
 * SEO helpers — centralized metadata, JSON-LD, and URL constants.
 * Keep all SEO logic in one place so changes propagate everywhere.
 */
import type { Metadata } from 'next';

export const SITE_URL = 'https://d2infinite.com';
export const SITE_NAME = 'D2Infinite';
export const COMPANY_NAME = 'D2Infinite Co.,Ltd.';
export const DEFAULT_OG_IMAGE = '/og-image.png';

export const SUPPORTED_LOCALES = ['en', 'th'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

/** Map our locale code to OpenGraph locale codes. */
export const ogLocale = (locale: string): string =>
  locale === 'th' ? 'th_TH' : 'en_US';

/** Build a canonical URL for a given locale + path. */
export const localeUrl = (locale: string, path = ''): string => {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `${SITE_URL}/${locale}/${clean}` : `${SITE_URL}/${locale}`;
};

/** Build the hreflang alternates map for a given path (no locale prefix). */
export const hreflangAlternates = (path = '') => {
  const clean = path.replace(/^\/+|\/+$/g, '');
  const suffix = clean ? `/${clean}` : '';
  return {
    en: `${SITE_URL}/en${suffix}`,
    th: `${SITE_URL}/th${suffix}`,
    'x-default': `${SITE_URL}/en${suffix}`,
  };
};

interface PageMetaInput {
  locale: string;
  /** Path without locale prefix, e.g. 'solutions', '' for home. */
  path?: string;
  title: string;
  description: string;
  /** Optional override for OG image (absolute or root-relative). */
  image?: string;
  /** Optional keywords. */
  keywords?: string[];
  /** Disable indexing for this page. */
  noindex?: boolean;
}

/**
 * Build a full Metadata object for a page with proper OG, Twitter,
 * canonical, hreflang, and robots settings.
 */
export function buildPageMetadata(input: PageMetaInput): Metadata {
  const {
    locale,
    path = '',
    title,
    description,
    image = DEFAULT_OG_IMAGE,
    keywords,
    noindex = false,
  } = input;

  const canonical = localeUrl(locale, path);
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const ogImageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return {
    title,
    description,
    keywords,
    authors: [{ name: COMPANY_NAME, url: SITE_URL }],
    creator: COMPANY_NAME,
    publisher: COMPANY_NAME,
    alternates: {
      canonical,
      languages: hreflangAlternates(path),
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: ogLocale(locale),
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImageUrl],
    },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-snippet': -1,
            'max-image-preview': 'large',
            'max-video-preview': -1,
          },
        },
  };
}

/* ===========================================================================
   JSON-LD structured-data helpers
   =========================================================================== */

export const organizationSchema = (locale: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}#organization`,
  name: COMPANY_NAME,
  alternateName: SITE_NAME,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/d2infinite-logo.png`,
  },
  email: 'contact@d2infinite.com',
  telephone: '+66 870 783 663',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '422/147 Panya Indra Rd., Samwa-Tawantok',
    addressLocality: 'Khet Klong Samwa',
    addressRegion: 'Bangkok',
    postalCode: '10510',
    addressCountry: 'TH',
  },
  description:
    locale === 'th'
      ? 'แพลตฟอร์มข้อมูลเชิงตัดสินใจสำหรับผู้บริหาร — รายงานอินโฟกราฟิก แดชบอร์ดเรียลไทม์ และแพลตฟอร์มข้อมูลที่ออกแบบเฉพาะ'
      : 'Decision-intelligence platform for executives — bespoke data platforms, infographic intelligence, and realtime dashboards.',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+66-870-783-663',
    email: 'contact@d2infinite.com',
    contactType: 'sales',
    availableLanguage: ['en', 'th'],
    areaServed: ['TH', 'SG', 'MY', 'VN', 'ID', 'PH'],
  },
});

export const websiteSchema = (locale: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { '@id': `${SITE_URL}#organization` },
  inLanguage: locale === 'th' ? 'th-TH' : 'en-US',
});

interface BreadcrumbItem {
  name: string;
  url: string;
}

export const breadcrumbSchema = (items: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
});
