import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/scroll', 
  images: {
    unoptimized: true, 
  },
  trailingSlash: true, 
};

export default nextConfig;
