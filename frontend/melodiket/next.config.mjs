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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd2zj12sxzh0609.cloudfront.net',
      },
      ...(process.env.NODE_ENV === 'development'
        ? [
            {
              protocol: 'https',
              hostname: '**',
            },
          ]
        : [
            {
              protocol: 'https',
              hostname: 'j11a310.p.ssafy.io',
            },
            {
              protocol: 'https',
              hostname: 'developers.kakao.com',
            },
          ]),
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
