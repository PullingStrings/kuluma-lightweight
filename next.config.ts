import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 output: 'standalone',
  images: {
    domains: ['localhost']
  },
  async rewrites() {
    return [
      // REST & downloads
      { source: '/api/:path*', destination: 'http://localhost:3000/api/:path*' },

      // base polling path (no segment after slash)  ⬅️ NEW exact match
      {
        source: '/socket.io/',
        destination: 'http://localhost:3000/socket.io/',   // same trailing slash
      },

      // any sub‑routes (xhr‑send, websocket upgrade, etc.)
      {
        source: '/socket.io/:path*',
        destination: 'http://localhost:3000/socket.io/:path*',
      },

    ];
  },
};

export default nextConfig;
