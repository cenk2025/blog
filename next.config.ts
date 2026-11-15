import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  // Removed posts that search engines still request: send readers to the post list instead of a 404.
  async redirects() {
    return [
      { source: "/:lang(en|fi)/blog/Stanford-2026-AI-Report", destination: "/:lang/blog", permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**"
      }
    ]
  }
};

export default nextConfig;
