import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Optional: Add a base path for GitHub Pages routing (e.g., if your repo is 'my-username/my-repo')
  // basePath: '/<YOUR_REPOSITORY_NAME>',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
    ],
  },
};

export default nextConfig;
