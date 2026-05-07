import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack has issues with '#' in directory paths; use Webpack instead
  turbopack: undefined,
};

export default nextConfig;
