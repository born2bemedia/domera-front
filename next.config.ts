import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'domeraglobal-cms.vercel.app',
      },
    ],
  },
  watchOptions: {
    pollIntervalMs: 1000,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
