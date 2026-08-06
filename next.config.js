/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  allowedDevOrigins: ['10.236.76.112', '10.236.76.112:3000', 'localhost:3000', '127.0.0.1:3000'],
  turbopack: {},

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
    minimumCacheTTL: 31536000,
  },

  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap', 'lenis'],
    optimizeCss: true,
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ];
  },

  async rewrites() {
    return [];
  },
};

export default nextConfig;
