import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
      allowedOrigins: ['medihaven123.vercel.app', 'localhost:3000'],
    },
  },
};

export default nextConfig;

