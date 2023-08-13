/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: { unoptimized: true },
  basePath: "",
};

module.exports = nextConfig;
