
import Home from "../Components/Home";
import About from "../Components/About";
import Header from "../Components/Header";
import Skills from "../Components/Skills";
import Projects from "../Components/Projects";
import Education from "../Components/Education";
import Experience from "../Components/Experience";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";
import { getTranslation } from "../translations/portfolio/load-translations";
import { getMetadata } from "../translations/metadata/load-metadata";

export async function generateStaticParams() {
    return [
        { lang: 'en' },
        { lang: 'es' },
        { lang: 'fr' },
        { lang: 'ar' },
        { lang: 'de' },
        { lang: 'ru' },
        { lang: 'ja' },
        { lang: 'zh' },
        { lang: 'nl' },
        { lang: 'pt' },
        { lang: 'it' },
        { lang: 'tr' },
        { lang: 'ko' },
        { lang: 'hi' },
        { lang: 'id' },
        { lang: 'pl' },
    ];
}

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const t = await getMetadata(lang);
    const meta = t.home;

    return {
        title: meta?.title,
        description: meta?.description,
        keywords: meta?.keywords,
        openGraph: {
            title: meta?.openGraph?.title,
            description: meta?.openGraph?.description,
            url: `https://abdellah-edaoudi.vercel.app/${lang}`,
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
            title: meta?.twitter?.title,
            description: meta?.twitter?.description,
            creator: '@Edaoudi_abde',
            images: ['https://abdellah-edaoudi.vercel.app/profile-pic.png'],
        },
        alternates: {
            canonical: `/${lang}`,
            languages: {
                'en': '/en',
                'fr': '/fr',
                'de': '/de',
                'zh': '/zh',
                'nl': '/nl',
                'es': '/es',
                'pt': '/pt',
                'ar': '/ar',
                'ru': '/ru',
                'ja': '/ja',
                'it': '/it',
                'hi': '/hi',
                'tr': '/tr',
                'ko': '/ko',
                'id': '/id',
                'pl': '/pl',
                'ar': '/ar',
            },
        },
    }
}

export default async function Page({ params }) {
    const { lang } = await params;
    const dictionary = await getTranslation(lang);
    return (
        <>
            <Header content={dictionary.header} />
            <Home lang={lang} />
            <About lang={lang} />
            <Skills lang={lang} />
            <Projects lang={lang} />
            <Experience lang={lang} />
            <Education lang={lang} />
            <Contact content={dictionary.contact} />
            <Footer lang={lang} />
        </>
    );
}

