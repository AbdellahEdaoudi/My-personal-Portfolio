import Projects from "../../Components/Projects";
import Footer from "../../Components/Footer";
import { getTranslation } from "../../translations/portfolio/load-translations";
import Header from "../../Components/Header";


import { getMetadata } from "../../translations/metadata/load-metadata";

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const t = await getMetadata(lang);
    const meta = t.projects;

    return {
        title: meta?.title,
        description: meta?.description,
        keywords: meta?.keywords,
        openGraph: {
            title: meta?.title,
            description: meta?.description,
            url: `https://abdellah-edaoudi.vercel.app/${lang}/Projects`,
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
            canonical: `/${lang}/Projects`,
            languages: {
                'en': '/en/Projects',
                'fr': '/fr/Projects',
                'de': '/de/Projects',
                'zh': '/zh/Projects',
                'nl': '/nl/Projects',
                'es': '/es/Projects',
                'pt': '/pt/Projects',
                'ar': '/ar/Projects',
                'ru': '/ru/Projects',
                'ja': '/ja/Projects',
                'it': '/it/Projects',
                'hi': '/hi/Projects',
                'tr': '/tr/Projects',
                'ko': '/ko/Projects',
                'id': '/id/Projects',
                'pl': '/pl/Projects',
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
            <Projects lang={lang} />
            <Footer lang={lang} />
        </div>
    );
}
