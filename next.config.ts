import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "platan.us",
      },
      {
        protocol: "https",
        hostname: "whatdesigncando.s3.eu-central-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "neopausia.com",
      },
      {
        protocol: "https",
        hostname: "bookface-images.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
      {
        protocol: "https",
        hostname: "sequoiacap.com",
      },
    ],
  },
};

export default nextConfig;
