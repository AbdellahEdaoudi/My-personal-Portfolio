import About from "../../Components/About";
import Footer from "../../Components/Footer";
import { getTranslation } from "../../translations/portfolio/load-translations";
import Header from "../../Components/Header";
import { getMetadata } from "../../translations/metadata/load-metadata";

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const t = await getMetadata(lang);
    const meta = t.about;

    return {
        title: meta?.title,
        description: meta?.description,
        keywords: meta?.keywords,
        openGraph: {
            title: meta?.title,
            description: meta?.description,
            url: `https://abdellah-edaoudi.vercel.app/${lang}/About`,
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
            canonical: `/${lang}/About`,
            languages: {
                'en': '/en/About',
                'fr': '/fr/About',
                'de': '/de/About',
                'zh': '/zh/About',
                'nl': '/nl/About',
                'es': '/es/About',
                'pt': '/pt/About',
                'ar': '/ar/About',
                'ru': '/ru/About',
                'ja': '/ja/About',
                'it': '/it/About',
                'hi': '/hi/About',
                'tr': '/tr/About',
                'ko': '/ko/About',
                'id': '/id/About',
                'pl': '/pl/About',
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
            <About lang={lang} />
            <Footer lang={lang} />
        </div>
    );
}
