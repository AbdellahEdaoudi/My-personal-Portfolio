import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/Admin'],
      },
    ],
    sitemap: 'https://abdellah-edaoudi.vercel.app/sitemap.xml',
    host: 'https://abdellah-edaoudi.vercel.app',
  };
}