import t from "../translations/metadata/en.json";
import React from "react";

const meta = t.education;

export const metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: 'https://abdellah-edaoudi.vercel.app/Education',
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
    canonical: '/en/Education',
    languages: {
      'en': '/en/Education',
      'fr': '/fr/Education',
      'de': '/de/Education',
      'zh': '/zh/Education',
      'nl': '/nl/Education',
      'es': '/es/Education',
      'pt': '/pt/Education',
      'ar': '/ar/Education',
      'ru': '/ru/Education',
      'ja': '/ja/Education',
      'it': '/it/Education',
      'hi': '/hi/Education',
      'tr': '/tr/Education',
      'ko': '/ko/Education',
      'id': '/id/Education',
      'pl': '/pl/Education',
    },
  },
};

import Footer from "../Components/Footer";
import Education from "../Components/Education";
import Header from "../Components/Header";
import { getTranslation } from "../translations/portfolio/load-translations";


async function page() {
  const dictionary = await getTranslation('en');

  return (
    <div>
      <Header content={dictionary.header} />
      <Education content={dictionary.education} />
      <Footer />
    </div>
  );
}

export default page;
