import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.GITHUB_PAGES === 'true' ? '/d2infinite' : '',
  images: {
    unoptimized: true, // Required for static export
  },
};

export default withNextIntl(nextConfig);
