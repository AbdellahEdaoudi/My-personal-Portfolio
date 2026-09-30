import Experience from "../../components/pages/Experience";
import Footer from "../../components/pages/Footer";
import { getTranslation } from "../../translations/portfolio/load-translations";
import Header from "../../components/pages/Header";


import { getMetadata } from "../../translations/metadata/load-metadata";

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const t = await getMetadata(lang);
    const meta = t.experience;

    return {
        title: meta?.title,
        description: meta?.description,
        keywords: meta?.keywords,
        openGraph: {
            title: meta?.title,
            description: meta?.description,
            url: `https://abdellah-edaoudi.vercel.app/${lang}/experience`,
            siteName: 'Abdellah Edaoudi Portfolio',
            locale: lang,
            type: 'website',
            images: [
                {
                    url: 'https://abdellah-edaoudi.vercel.app/profile/new-profile.jpg',
                    width: 1200,
                    height: 630,
                    alt: meta?.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: meta?.title,
            description: meta?.description,
            creator: '@Edaoudi_abde',
            images: ['https://abdellah-edaoudi.vercel.app/profile/new-profile.jpg'],
        },
        alternates: {
            canonical: `/${lang}/experience`,
            languages: {
                'en': '/en/experience',
                'ar': '/ar/experience',
                'es': '/es/experience',
                'fr': '/fr/experience',
                'de': '/de/experience',
                'nl': '/nl/experience',
                'pt': '/pt/experience',
                'it': '/it/experience',
            },
        },
    }
}

export default async function Page({ params }) {
    const { lang } = await params;
    const dictionary = await getTranslation(lang);
    return (
        <div>
            <Header content={dictionary.header} lang={lang} />
            <Experience content={dictionary.experience} lang={lang} />
            <Footer content={dictionary.footer} lang={lang} />
        </div>
    );
}
