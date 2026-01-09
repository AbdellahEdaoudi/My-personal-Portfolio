import t from "../translations/metadata/en.json";
import React from "react";

const meta = t.about;

export const metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: 'https://abdellah-edaoudi.vercel.app/About',
    siteName: 'Abdellah Edaoudi Portfolio',
    locale: 'en',
    type: 'website',
    images: [
      {
        url: 'https://abdellah-edaoudi.vercel.app/profile-pic.png',
        width: 1200,
        height: 630,
        alt: meta.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
    creator: '@Edaoudi_abde',
    images: ['https://abdellah-edaoudi.vercel.app/profile-pic.png'],
  },
  alternates: {
    canonical: '/en/About',
    languages: {
      'en': '/en/About',
      'fr': '/fr/About',
      'de': '/de/About',
      'zh': '/zh/About',
      'nl': '/nl/About',
      'es': '/es/About',
      'pt': '/pt/About',
      'ar': '/ar/About',
      'ru': '/ru/About',
      'ja': '/ja/About',
      'it': '/it/About',
      'hi': '/hi/About',
      'tr': '/tr/About',
      'ko': '/ko/About',
      'id': '/id/About',
      'pl': '/pl/About',
    },
  },
};

import About from "../Components/About";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { getTranslation } from "../translations/portfolio/load-translations";


async function page() {
  const dictionary = await getTranslation('en');
  return (
    <div>
      <Header content={dictionary.header} />
      <About lang="en" />
      <Footer />
    </div>
  );
}

export default page;
