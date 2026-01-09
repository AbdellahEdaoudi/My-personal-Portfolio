import t from "../translations/metadata/en.json";
import React from "react";

const meta = t.skills;

export const metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: 'https://abdellah-edaoudi.vercel.app/Skills',
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
    canonical: '/en/Skills',
    languages: {
      'en': '/en/Skills',
      'fr': '/fr/Skills',
      'de': '/de/Skills',
      'zh': '/zh/Skills',
      'nl': '/nl/Skills',
      'es': '/es/Skills',
      'pt': '/pt/Skills',
      'ar': '/ar/Skills',
      'ru': '/ru/Skills',
      'ja': '/ja/Skills',
      'it': '/it/Skills',
      'hi': '/hi/Skills',
      'tr': '/tr/Skills',
      'ko': '/ko/Skills',
      'id': '/id/Skills',
      'pl': '/pl/Skills',
    },
  },
};

import Skills from "../Components/Skills";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { getTranslation } from "../translations/portfolio/load-translations";


async function page() {
  const dictionary = await getTranslation('en');

  return (
    <div>
      <Header content={dictionary.header} />
      <Skills lang="en" />
      <Footer />
    </div>
  );
}

export default page;
