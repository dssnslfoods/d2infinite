import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  ...(isGithubPages ? { output: 'export' as const } : {}),
  basePath: isGithubPages ? '/d2infinite' : '',
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
