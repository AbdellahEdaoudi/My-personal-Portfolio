const BASE_URL = 'https://abdellah-edaoudi.vercel.app';
const LANGUAGES = ['en', 'ar', 'es', 'fr', 'de', 'nl', 'pt', 'it'];
const ROUTES = ['', 'About', 'Services', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'];

export default function sitemap() {
    const urls = [];

    const DOCUMENTS = {
        cv: {
            en: "/cv/cv-abdellah-edaoudi-en.pdf",
            fr: "/cv/cv-abdellah-edaoudi-fr.pdf",
            es: "/cv/cv-abdellah-edaoudi-es.pdf",
            de: "/cv/cv-abdellah-edaoudi-de.pdf",
            nl: "/cv/cv-abdellah-edaoudi-nl.pdf",
            pt: "/cv/cv-abdellah-edaoudi-pt.pdf",
            it: "/cv/cv-abdellah-edaoudi-it.pdf",
            ar: "/cv/cv-abdellah-edaoudi-ar.pdf",
        },
        coverLetter: {
            ar: "/cover-letters/cl-abdellah-edaoudi-ar.pdf",
            de: "/cover-letters/cl-abdellah-edaoudi-de.pdf",
            en: "/cover-letters/cl-abdellah-edaoudi-en.pdf",
            es: "/cover-letters/cl-abdellah-edaoudi-es.pdf",
            fr: "/cover-letters/cl-abdellah-edaoudi-fr.pdf",
            it: "/cover-letters/cl-abdellah-edaoudi-it.pdf",
            nl: "/cover-letters/cl-abdellah-edaoudi-nl.pdf",
            pt: "/cover-letters/cl-abdellah-edaoudi-pt.pdf",
        }
    };



    // Language routes
    LANGUAGES.forEach((lang) => {
        ROUTES.forEach((route) => {
            const isHome = route === '';
            const url = isHome
                ? `${BASE_URL}/${lang}`
                : `${BASE_URL}/${lang}/${route}`;

            urls.push({
                url,
                lastModified: new Date(),
                changeFrequency: isHome ? 'weekly' : 'monthly',
                priority: isHome ? 1 : 0.8,
            });
        });
    });

    // CV and cover letter routes
    Object.values(DOCUMENTS).forEach((group) => {
        Object.values(group).forEach((path) => {
            urls.push({
                url: `${BASE_URL}${path}`,
                lastModified: new Date(),
                changeFrequency: 'yearly',
                priority: 0.6,
            });
        });
    });

    return urls;
}