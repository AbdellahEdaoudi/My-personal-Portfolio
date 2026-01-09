import t from "../translations/metadata/en.json";
import React from "react";

const meta = t.experience;

export const metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: 'https://abdellah-edaoudi.vercel.app/Experience',
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
    canonical: '/en/Experience',
    languages: {
      'en': '/en/Experience',
      'fr': '/fr/Experience',
      'de': '/de/Experience',
      'zh': '/zh/Experience',
      'nl': '/nl/Experience',
      'es': '/es/Experience',
      'pt': '/pt/Experience',
      'ar': '/ar/Experience',
      'ru': '/ru/Experience',
      'ja': '/ja/Experience',
      'it': '/it/Experience',
      'hi': '/hi/Experience',
      'tr': '/tr/Experience',
      'ko': '/ko/Experience',
      'id': '/id/Experience',
      'pl': '/pl/Experience',
    },
  },
};

import Experience from "../Components/Experience";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { getTranslation } from "../translations/portfolio/load-translations";


async function page() {
  const dictionary = await getTranslation('en');

  return (
    <div>
      <Header content={dictionary.header} />
      <Experience lang="en" />
      <Footer />
    </div>
  );
}

export default page;
