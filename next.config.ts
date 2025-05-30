import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["res.cloudinary.com", "lh3.googleusercontent.com"],
    unoptimized: true,
  },
  webpack: (config) => {
    // Excluir módulos problemáticos
    config.externals = [
      ...(config.externals || []),
      { "@mapbox/node-pre-gyp": "commonjs @mapbox/node-pre-gyp" },
    ];

    // Ignorar advertencias de módulos opcionales
    config.ignoreWarnings = [{ module: /node_modules\/@mapbox\/node-pre-gyp/ }];

    return config;
  },
};

export default nextConfig;
