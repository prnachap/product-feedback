/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  experimental: {
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"],
  },
  webpack(nextConfig) {
    nextConfig.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return nextConfig;
  },
};
