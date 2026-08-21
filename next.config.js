/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Add TypeScript extensions
    config.resolve.extensions.push('.ts', '.tsx');

    // Explicitly wire tsconfig paths for production
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components': require('path').resolve(__dirname, 'components'),
      '@/lib': require('path').resolve(__dirname, 'lib'),
      '@/data': require('path').resolve(__dirname, 'data'),
      '@/app': require('path').resolve(__dirname, 'app'),
    };

    return config;
  },

  experimental: {
    optimizeCss: false,
  },
};

module.exports = nextConfig;
