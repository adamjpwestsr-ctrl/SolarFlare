/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },

  experimental: {
    optimizeCss: false
  }
};

export default nextConfig;
