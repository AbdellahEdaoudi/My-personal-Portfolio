const BASE_URL = 'https://abdellah-edaoudi.vercel.app';
const LANGUAGES = ['ar', 'es', 'fr', 'ru', 'ja', 'zh', 'de', 'nl', 'pt', 'it', 'hi', 'tr', 'ko', 'en', 'id', 'pl', 'sv', 'vi'];
const ROUTES = ['', 'About', 'Services', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'];

export default function sitemap() {
    const urls = [];

    const DOCUMENTS = {
    cv: {
        en: "/cv/cv-abdellah-edaoudi-en.pdf",
        fr: "/cv/cv-abdellah-edaoudi-fr.pdf",
    },
    coverLetter: {
        en: "/cover-letter/abdellah-edaoudi-cover-letter-en.pdf",
        fr: "/cover-letter/abdellah-edaoudi-cover-letter-fr.pdf",
    }
};

    // Base routes
    ROUTES.forEach((route) => {
        const isHome = route === '';
        const url = isHome
            ? `${BASE_URL}`
            : `${BASE_URL}/${route}`;

        urls.push({
            url,
            lastModified: new Date(),
            changeFrequency: isHome ? 'weekly' : 'monthly',
            priority: isHome ? 1 : 0.8,
        });
    });

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