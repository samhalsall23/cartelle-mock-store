import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    qualities: [60, 75, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vludeavqkwqf5kk4.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
