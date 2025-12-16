import meta from "../dictionaries/metadata/contactmeta.json";
import React from "react";

export const metadata = {
  title: meta.en.title,
  description: meta.en.description,
  keywords: meta.en.keywords,
  openGraph: {
    title: meta.en.title,
    description: meta.en.description,
    url: 'https://abdellah-edaoudi.vercel.app/Contact',
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
    canonical: '/en/Contact',
    languages: {
      'en': '/en/Contact',
      'fr': '/fr/Contact',
      'de': '/de/Contact',
      'zh': '/zh/Contact',
      'nl': '/nl/Contact',
      'es': '/es/Contact',
      'pt': '/pt/Contact',
    },
  },
};

import Footer from "../Components/Footer";
import Contact from "../Components/Contact";
import Header from "../Components/Header";
import { getDictionary } from "../dictionaries/get-dictionary";


async function page() {
  const dictionary = await getDictionary('en');

  return (
    <div>
      <Header content={dictionary.header} />
      <Contact content={dictionary.contact} />
      <Footer content={dictionary.footer} />
    </div>
  );
}

export default page;
