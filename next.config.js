const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'abdellah-edaoudi.vercel.app',
        pathname: '/**',
      },
    ],
  },
  env: {
    metadataBase: 'https://abdellah-edaoudi.vercel.app',
  },
};

module.exports = nextConfig;
