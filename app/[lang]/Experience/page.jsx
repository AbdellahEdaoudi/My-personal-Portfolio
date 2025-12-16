import Experience from "../../Components/Experience";
import Footer from "../../Components/Footer";
import { getDictionary } from "../../dictionaries/get-dictionary";
import Header from "../../Components/Header";


import meta from "../../dictionaries/metadata/experiencemeta.json";

export async function generateMetadata({ params }) {
    const { lang } = await params;
    return {
        title: meta[lang]?.title || meta['en'].title,
        description: meta[lang]?.description || meta['en'].description,
        keywords: meta[lang]?.keywords || meta['en'].keywords,
        openGraph: {
            title: meta[lang]?.title || meta['en'].title,
            description: meta[lang]?.description || meta['en'].description,
            url: `https://abdellah-edaoudi.vercel.app/${lang}/Experience`,
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
            canonical: `/${lang}/Experience`,
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
    }
}

export default async function Page({ params }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);
    return (
        <div>
            <Header content={dictionary.header} />
            <Experience content={dictionary.experience} />
            <Footer content={dictionary.footer} />
        </div>
    );
}
