/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: true,
  },
  images: { unoptimized: true },
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

module.exports = nextConfig;
