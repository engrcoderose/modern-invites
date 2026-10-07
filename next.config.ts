import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Concurrent local previews must not overwrite each other's generated assets.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  async redirects() {
    return [
      {
        source: "/leslie-and-john/:path*",
        destination: "/leslie-and-serj/:path*",
        permanent: true,
      },
      {
        source: "/jasmin-and-anjo",
        destination: "/joshua-and-bea-wedding",
        permanent: true,
      },
      {
        source: "/jasmin-and-anjo-wedding",
        destination: "/joshua-and-bea-wedding",
        permanent: true,
      },
      {
        source: "/joshua-and-bea",
        destination: "/joshua-and-bea-wedding",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [
            {
              type: "host",
              value: "leslieandserjwedding\\.moderninvites\\.com",
            },
          ],
          destination: "/leslie-and-serj",
        },
        {
          source: "/",
          has: [
            {
              type: "host",
              value: "seatfinder\\.anjoandjasminwedding\\.moderninvites\\.com",
            },
          ],
          destination: "/seat-finder/anjo-and-jasmin",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [
      {
        source: "/api/rsvp/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "no-referrer",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.moderninvites.com',
        port: '',
        pathname: '/jaydee-and-bea/images/designs/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'assets.moderninvites.com',
        port: '',
        pathname: '/placeholder-images/prenups/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'assets.moderninvites.com',
        port: '',
        pathname: '/anjo-and-jasmin/images/designs/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'assets.moderninvites.com',
        port: '',
        pathname: '/anjo-and-jasmin/images/prenups/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'assets.moderninvites.com',
        port: '',
        pathname: '/leslie-and-serj/prenups/**',
        search: '?v=20260929',
      },
      {
        protocol: 'https',
        hostname: 'assets.moderninvites.com',
        port: '',
        pathname: '/leslie-and-serj/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

