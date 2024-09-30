/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.module.rules.push({
      test: /\.stories\.tsx?$/,
      use: 'ignore-loader',
    });

    return config;
  },
  images: {
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
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
