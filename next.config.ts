import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rbucnusnulj41l89.public.blob.vercel-storage.com",
      },
      {
        protocol: "http",
        hostname: "26.209.18.191",
      },
      {
        protocol: "https",
        hostname: "www.geowonder.tours",
      },
    ],
  },
};

export default nextConfig;
