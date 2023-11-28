/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  webpack(nextConfig) {
    nextConfig.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return nextConfig;
  },
};
