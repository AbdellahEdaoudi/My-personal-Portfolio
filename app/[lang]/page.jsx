
import Home from "../Components/Home";
import About from "../Components/About";
import Header from "../Components/Header";
import Skills from "../Components/Skills";
import Projects from "../Components/Projects";
import Education from "../Components/Education";
import Experience from "../Components/Experience";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";
import { getDictionary } from "../dictionaries/get-dictionary";
import meta from "../dictionaries/metadata.json";

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const currentMeta = meta[lang] || meta.en;

    return {
        title: currentMeta.title,
        description: currentMeta.description,
        keywords: currentMeta.keywords,
        openGraph: {
            title: currentMeta.openGraph?.title || currentMeta.title,
            description: currentMeta.openGraph?.description || currentMeta.description,
            url: `https://abdellah-edaoudi.vercel.app/${lang}`,
            siteName: 'Abdellah Edaoudi Portfolio',
            locale: lang,
            type: 'website',
            images: [
                {
                    url: 'https://abdellah-edaoudi.vercel.app/profile-pic.png',
                    width: 1200,
                    height: 630,
                    alt: currentMeta.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: currentMeta.twitter?.title || currentMeta.title,
            description: currentMeta.twitter?.description || currentMeta.description,
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
            },
        },
    }
}

export default async function Page({ params }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    return (
        <>
            <Header content={dictionary.header} />
            <Home content={dictionary.home} />
            <About content={dictionary.about} />
            <Skills content={dictionary.skills} />
            <Projects content={dictionary.projects} />
            <Experience content={dictionary.experience} />
            <Education content={dictionary.education} />
            <Contact content={dictionary.contact} />
            <Footer content={dictionary.footer} />
        </>
    );
}

