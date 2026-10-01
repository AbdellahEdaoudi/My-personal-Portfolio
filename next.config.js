/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.SERVER_URL}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;


