import Skills from "../../Components/Skills";
import Footer from "../../Components/Footer";
import { getDictionary } from "../../translations/get-dictionary";
import Header from "../../Components/Header";


import meta from "../../translations/metadata/skillsmeta.json";

export async function generateMetadata({ params }) {
    const { lang } = await params;
    return {
        title: meta[lang]?.title || meta['en'].title,
        description: meta[lang]?.description || meta['en'].description,
        keywords: meta[lang]?.keywords || meta['en'].keywords,
        openGraph: {
            title: meta[lang]?.title || meta['en'].title,
            description: meta[lang]?.description || meta['en'].description,
            url: `https://abdellah-edaoudi.vercel.app/${lang}/Skills`,
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
            canonical: `/${lang}/Skills`,
            languages: {
                'en': '/en/Skills',
                'fr': '/fr/Skills',
                'de': '/de/Skills',
                'zh': '/zh/Skills',
                'nl': '/nl/Skills',
                'es': '/es/Skills',
                'pt': '/pt/Skills',
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
            <Skills content={dictionary.skills} />
            <Footer content={dictionary.footer} />
        </div>
    );
}
