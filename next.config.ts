import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,  // yeh current folder ko root define karega
  },
};

export default nextConfig;
