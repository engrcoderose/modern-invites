import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/leslie-and-john/:path*",
        destination: "/leslie-and-serj/:path*",
        permanent: true,
      },
      {
        source: "/jasmin-and-anjo",
        destination: "/jasmin-and-anjo-wedding",
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

