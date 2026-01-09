import Footer from "../../Components/Footer";
import { getTranslation } from "../../translations/portfolio/load-translations";
import Header from "../../Components/Header";
import Education from "../../Components/Education";

import { getMetadata } from "../../translations/metadata/load-metadata";

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const t = await getMetadata(lang);
    const meta = t.education;

    return {
        title: meta?.title,
        description: meta?.description,
        keywords: meta?.keywords,
        openGraph: {
            title: meta?.title,
            description: meta?.description,
            url: `https://abdellah-edaoudi.vercel.app/${lang}/Education`,
            siteName: 'Abdellah Edaoudi Portfolio',
            locale: lang,
            type: 'website',
            images: [
                {
                    url: 'https://abdellah-edaoudi.vercel.app/profile-pic.png',
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
            images: ['https://abdellah-edaoudi.vercel.app/profile-pic.png'],
        },
        alternates: {
            canonical: `/${lang}/Education`,
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
    }
}

export default async function Page({ params }) {
    const { lang } = await params;
    const dictionary = await getTranslation(lang);
    return (
        <div>
            <Header content={dictionary.header} />
            <Education lang={lang} />
            <Footer lang={lang} />
        </div>
    );
}
