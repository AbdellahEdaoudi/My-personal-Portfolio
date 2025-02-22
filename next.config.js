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
        hostname: 'ed-portfolioo.vercel.app',
        pathname: '/**',
      },
    ],
  },
  env: {
    metadataBase: 'https://ed-portfolioo.vercel.app',
  },
};

module.exports = nextConfig;
