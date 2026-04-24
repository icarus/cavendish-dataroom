import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  reactCompiler: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
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
        hostname: "blog.platan.us",
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
      {
        protocol: "https",
        hostname: "cdn.platan.us",
      },
      {
        protocol: "https",
        hostname: "www.truora.com",
      },
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
      {
        protocol: "https",
        hostname: "endeavor.cl",
      },
      {
        protocol: "https",
        hostname: "cdn.theorg.com",
      },
    ],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
