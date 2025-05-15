import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL('https://cdn.dummyjson.com/product-images/**')],
  },
};

export default nextConfig;
