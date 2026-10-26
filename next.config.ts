import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: false,
  partialPrefetching: false,
  reactCompiler: true,
  logging: {
    incomingRequests: false,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/events',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
