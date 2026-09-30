import Contact from "../../components/pages/Contact";
import Footer from "../../components/pages/Footer";
import { getTranslation } from "../../translations/portfolio/load-translations";
import Header from "../../components/pages/Header";
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
            url: `https://abdellah-edaoudi.vercel.app/${lang}/contact`,
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
            canonical: `/${lang}/contact`,
            languages: {
                'en': '/en/contact',
                'ar': '/ar/contact',
                'es': '/es/contact',
                'fr': '/fr/contact',
                'de': '/de/contact',
                'nl': '/nl/contact',
                'pt': '/pt/contact',
                'it': '/it/contact',
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
            <Contact content={dictionary.contact} lang={lang} />
            <Footer content={dictionary.footer} lang={lang} />
        </div>
    );
}
