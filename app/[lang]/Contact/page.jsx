import Contact from "../../Components/Contact";
import Footer from "../../Components/Footer";
import { getDictionary } from "../../dictionaries/get-dictionary";
import Header from "../../Components/Header";


import meta from "../../dictionaries/metadata/contactmeta.json";

export async function generateMetadata({ params }) {
    const { lang } = await params;
    return {
        title: meta[lang]?.title || meta['en'].title,
        description: meta[lang]?.description || meta['en'].description,
        keywords: meta[lang]?.keywords || meta['en'].keywords,
        openGraph: {
            title: meta[lang]?.title || meta['en'].title,
            description: meta[lang]?.description || meta['en'].description,
            url: `https://abdellah-edaoudi.vercel.app/${lang}/Contact`,
            siteName: 'Abdellah Edaoudi Portfolio',
            locale: lang,
            type: 'website',
            images: [
                {
                    url: 'https://abdellah-edaoudi.vercel.app/profile-pic.png',
                    width: 1200,
                    height: 630,
                    alt: meta[lang]?.title || meta['en'].title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: meta[lang]?.title || meta['en'].title,
            description: meta[lang]?.description || meta['en'].description,
            creator: '@Edaoudi_abde',
            images: ['https://abdellah-edaoudi.vercel.app/profile-pic.png'],
        },
        alternates: {
            canonical: `/${lang}/Contact`,
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
    }
}

export default async function Page({ params }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);
    return (
        <div>
            <Header content={dictionary.header} />
            <Contact content={dictionary.contact} />
            <Footer content={dictionary.footer} />
        </div>
    );
}
