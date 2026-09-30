
import Hero from "../components/pages/Hero";
import About from "../components/pages/About";
import Services from "../components/pages/Services";
import Header from "../components/pages/Header";
import Skills from "../components/pages/Skills";
import Projects from "../components/pages/Projects";
import Education from "../components/pages/Education";
import Experience from "../components/pages/Experience";
import Contact from "../components/pages/Contact";
import Footer from "../components/pages/Footer";
import { getTranslation } from "../translations/portfolio/load-translations";
import { getMetadata } from "../translations/metadata/load-metadata";

export async function generateStaticParams() {
    return [
        { lang: 'en' },
        { lang: 'ar' },
        { lang: 'es' },
        { lang: 'fr' },
        { lang: 'de' },
        { lang: 'nl' },
        { lang: 'pt' },
        { lang: 'it' },
    ];
}

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const t = await getMetadata(lang);
    const meta = t?.hero || {};

    const title = meta.title || "Abdellah Edaoudi | Full Stack Developer";
    const description = meta.description || "Official portfolio of Abdellah Edaoudi";
    const keywords = meta.keywords || "";

    return {
        title,
        description,
        keywords,
        openGraph: {
            title: meta?.openGraph?.title || title,
            description: meta?.openGraph?.description || description,
            url: `https://abdellah-edaoudi.vercel.app/${lang}`,
            siteName: 'Abdellah Edaoudi Portfolio',
            locale: lang,
            type: 'website',
            images: [
                {
                    url: 'https://abdellah-edaoudi.vercel.app/profile/new-profile.jpg',
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: meta?.twitter?.title || title,
            description: meta?.twitter?.description || description,
            creator: '@Edaoudi_abde',
            images: ['https://abdellah-edaoudi.vercel.app/profile/new-profile.jpg'],
        },
        alternates: {
            canonical: `https://abdellah-edaoudi.vercel.app/${lang}`,
            languages: {
                'x-default': 'https://abdellah-edaoudi.vercel.app/en',
                'en': 'https://abdellah-edaoudi.vercel.app/en',
                'ar': 'https://abdellah-edaoudi.vercel.app/ar',
                'es': 'https://abdellah-edaoudi.vercel.app/es',
                'fr': 'https://abdellah-edaoudi.vercel.app/fr',
                'de': 'https://abdellah-edaoudi.vercel.app/de',
                'nl': 'https://abdellah-edaoudi.vercel.app/nl',
                'pt': 'https://abdellah-edaoudi.vercel.app/pt',
                'it': 'https://abdellah-edaoudi.vercel.app/it',
            },
        },
    }
}

export default async function Page({ params }) {
    const { lang } = await params;
    const dictionary = await getTranslation(lang);
    return (
        <>
            <Header content={dictionary.header} lang={lang} />
            <Hero content={dictionary.hero} lang={lang} />
            <About content={dictionary.about} lang={lang} />
            <Services content={dictionary.services} lang={lang} />
            <Skills content={dictionary.skills} lang={lang} />
            <Projects content={dictionary.projects} lang={lang} />
            <Experience content={dictionary.experience} lang={lang} />
            <Education content={dictionary.education} lang={lang} />
            <Contact content={dictionary.contact} lang={lang} />
            <Footer content={dictionary.footer} lang={lang} />
        </>
    );
}

