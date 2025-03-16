(() => {
  if (process.env.NODE_ENV === 'development') {
    require('@cloudflare/next-on-pages/next-dev').setupDevPlatform();
  }
})();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: ['localhost'],
    unoptimized: true, // For Cloudflare Pages deployment
  },
};

module.exports = nextConfig;