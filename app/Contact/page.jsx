import t from "../translations/metadata/en.json";
import React from "react";

const meta = t.contact;

export const metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: 'https://abdellah-edaoudi.vercel.app/Contact',
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
    canonical: '/en/Contact',
    languages: {
      'en': '/en/Contact',
      'fr': '/fr/Contact',
      'de': '/de/Contact',
      'zh': '/zh/Contact',
      'nl': '/nl/Contact',
      'es': '/es/Contact',
      'pt': '/pt/Contact',
      'ar': '/ar/Contact',
      'ru': '/ru/Contact',
      'ja': '/ja/Contact',
      'it': '/it/Contact',
      'hi': '/hi/Contact',
      'tr': '/tr/Contact',
      'ko': '/ko/Contact',
      'id': '/id/Contact',
      'pl': '/pl/Contact',
    },
  },
};

import Footer from "../Components/Footer";
import Contact from "../Components/Contact";
import Header from "../Components/Header";
import { getTranslation } from "../translations/portfolio/load-translations";


async function page() {
  const dictionary = await getTranslation('en');

  return (
    <div>
      <Header content={dictionary.header} />
      <Contact content={dictionary.contact} />
      <Footer />
    </div>
  );
}

export default page;
