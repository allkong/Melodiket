/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: process.env.NODE_ENV === 'development' ? ['*'] : ['example.com'],
    remotePatterns:
      process.env.NODE_ENV === 'development'
        ? [
            {
              protocol: 'https',
              hostname: '**',
            },
          ]
        : [],
  },
};

export default nextConfig;
