import Skills from "../../components/pages/Skills";
import Footer from "../../components/pages/Footer";
import { getTranslation } from "../../translations/portfolio/load-translations";
import Header from "../../components/pages/Header";


import { getMetadata } from "../../translations/metadata/load-metadata";

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const t = await getMetadata(lang);
    const meta = t.skills;

    return {
        title: meta?.title,
        description: meta?.description,
        keywords: meta?.keywords,
        openGraph: {
            title: meta?.title,
            description: meta?.description,
            url: `https://abdellah-edaoudi.vercel.app/${lang}/skills`,
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
            canonical: `/${lang}/skills`,
            languages: {
                'en': '/en/skills',
                'ar': '/ar/skills',
                'es': '/es/skills',
                'fr': '/fr/skills',
                'de': '/de/skills',
                'nl': '/nl/skills',
                'pt': '/pt/skills',
                'it': '/it/skills',
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
            <Skills content={dictionary.skills} lang={lang} />
            <Footer content={dictionary.footer} lang={lang} />
        </div>
    );
}
