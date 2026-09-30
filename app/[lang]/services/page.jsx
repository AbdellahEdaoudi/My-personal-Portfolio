import { getTranslation } from "../../translations/portfolio/load-translations";
import { getMetadata } from "../../translations/metadata/load-metadata";
import Services from "../../components/pages/Services";
import Footer from "../../components/pages/Footer";
import Header from "../../components/pages/Header";

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const t = await getMetadata(lang);
    const meta = t.services;

    return {
        title: meta?.title,
        description: meta?.description,
        keywords: meta?.keywords,
        openGraph: {
            title: meta?.title,
            description: meta?.description,
            url: `https://abdellah-edaoudi.vercel.app/${lang}/services`,
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
            canonical: `/${lang}/services`,
            languages: {
                'en': '/en/services',
                'ar': '/ar/services',
                'es': '/es/services',
                'fr': '/fr/services',
                'de': '/de/services',
                'nl': '/nl/services',
                'pt': '/pt/services',
                'it': '/it/services',
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
            <Services content={dictionary.services} lang={lang} />
            <Footer content={dictionary.footer} lang={lang} />
        </div>
    );
}
