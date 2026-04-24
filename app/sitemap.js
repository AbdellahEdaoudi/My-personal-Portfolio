const BASE_URL = 'https://abdellah-edaoudi.vercel.app';
const LANGUAGES = ['ar', 'es', 'fr', 'ru', 'ja', 'zh', 'de', 'nl', 'pt', 'it', 'hi', 'tr', 'ko', 'en', 'id', 'pl', 'sv', 'vi'];
const ROUTES = ['', 'About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'];

export default function sitemap() {
    const urls = [];

    const CV = {
        en: "/Abdellah_Edaoudi_CV/Abdellah_Edaoudi_CV_EN.pdf",
        fr: "/Abdellah_Edaoudi_CV/Abdellah_Edaoudi_CV_FR.pdf",
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

    // ✅ Add CV routes
    Object.entries(CV).forEach(([lang, path]) => {
        urls.push({
            url: `${BASE_URL}${path}`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.7,
        });
    });

    return urls;
}