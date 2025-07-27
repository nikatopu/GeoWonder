import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rbucnusnulj41l89.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
