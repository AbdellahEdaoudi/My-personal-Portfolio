import meta from "../translations/metadata/experiencemeta.json";
import React from "react";

export const metadata = {
  title: meta.en.title,
  description: meta.en.description,
  keywords: meta.en.keywords,
  openGraph: {
    title: meta.en.title,
    description: meta.en.description,
    url: 'https://abdellah-edaoudi.vercel.app/Experience',
    siteName: 'Abdellah Edaoudi Portfolio',
    locale: 'en',
    type: 'website',
    images: [
      {
        url: 'https://abdellah-edaoudi.vercel.app/profile-pic.png',
        width: 1200,
        height: 630,
        alt: meta.en.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.en.title,
    description: meta.en.description,
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
    },
  },
};

import Experience from "../Components/Experience";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { getDictionary } from "../translations/get-dictionary";


async function page() {
  const dictionary = await getDictionary('en');

  return (
    <div>
      <Header content={dictionary.header} />
      <Experience content={dictionary.experience} />
      <Footer content={dictionary.footer} />
    </div>
  );
}

export default page;
