import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export",
  async headers() {
    return [
      {
        // Semua file di /public/images
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "no-cache, must-revalidate" }],
      },
    ];
  },
};

export default nextConfig;
