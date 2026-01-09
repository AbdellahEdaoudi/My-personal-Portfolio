import Contact from "../../Components/Contact";
import Footer from "../../Components/Footer";
import { getTranslation } from "../../translations/portfolio/load-translations";
import Header from "../../Components/Header";
import { getMetadata } from "../../translations/metadata/load-metadata";

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const t = await getMetadata(lang);
    const meta = t.contact;

    return {
        title: meta?.title,
        description: meta?.description,
        keywords: meta?.keywords,
        openGraph: {
            title: meta?.title,
            description: meta?.description,
            url: `https://abdellah-edaoudi.vercel.app/${lang}/Contact`,
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
            canonical: `/${lang}/Contact`,
            languages: {
                'en': '/en/Contact',
                'fr': '/fr/Contact',
                'de': '/de/Contact',
                'zh': '/zh/Contact',
                'nl': '/nl/Contact',
                'es': '/es/Contact',
                'pt': '/pt/Contact',
                'ar': '/ar/Contact',
                'ru': '/ru/Contact',
                'ja': '/ja/Contact',
                'it': '/it/Contact',
                'hi': '/hi/Contact',
                'tr': '/tr/Contact',
                'ko': '/ko/Contact',
                'id': '/id/Contact',
                'pl': '/pl/Contact',
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
            <Contact content={dictionary.contact} />
            <Footer lang={lang} />
        </div>
    );
}
