import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Le site est en français par défaut ; l'italien est sur /it.
    return [{ source: "/", destination: "/fr", permanent: false }];
  },
};

export default nextConfig;
