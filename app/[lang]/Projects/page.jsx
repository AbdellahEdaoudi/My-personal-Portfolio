import Projects from "../../Components/Projects";
import Footer from "../../Components/Footer";
import { getDictionary } from "../../translations/get-dictionary";
import Header from "../../Components/Header";


import meta from "../../translations/metadata/projectsmeta.json";

export async function generateMetadata({ params }) {
    const { lang } = await params;
    return {
        title: meta[lang]?.title || meta['en'].title,
        description: meta[lang]?.description || meta['en'].description,
        keywords: meta[lang]?.keywords || meta['en'].keywords,
        openGraph: {
            title: meta[lang]?.title || meta['en'].title,
            description: meta[lang]?.description || meta['en'].description,
            url: `https://abdellah-edaoudi.vercel.app/${lang}/Projects`,
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
            canonical: `/${lang}/Projects`,
            languages: {
                'en': '/en/Projects',
                'fr': '/fr/Projects',
                'de': '/de/Projects',
                'zh': '/zh/Projects',
                'nl': '/nl/Projects',
                'es': '/es/Projects',
                'pt': '/pt/Projects',
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
            <Projects content={dictionary.projects} />
            <Footer content={dictionary.footer} />
        </div>
    );
}
