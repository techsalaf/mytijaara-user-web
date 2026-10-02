const nextConfig = {
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://dashboard.mytijaara.com',
    NEXT_CLIENT_HOST_URL: process.env.NEXT_CLIENT_HOST_URL || 'https://app.mytijaara.com',
    NEXT_PUBLIC_SITE_VERSION: process.env.NEXT_PUBLIC_SITE_VERSION || '4.0',
    NEXT_PUBLIC_GOOGLE_MAP_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
  },
  reactStrictMode: true,
  // Hide Next.js dev-mode indicator (bottom-left "N" badge)
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
  },
  experimental: {
    swcPlugins: [],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'], // Keep error and warn, remove log, info, debug, etc.
    } : false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**', // allows all https domains
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**', // allows all https domains
        pathname: '/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;



// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: [
//       "bjorn66.com",
//       "6ammart-test.6amdev.xyz",
//       "192.168.50.168",
//       "6ammart-dev.6amdev.xyz",
//     ], // Add the domain here
//   },
// };
//
// module.exports = nextConfig;
