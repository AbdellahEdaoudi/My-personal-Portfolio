// Helper to dynamically load metadata for a given locale

const metadataMap = {
    en: () => import('./en.json').then((module) => module.default),
    ar: () => import('./ar.json').then((module) => module.default),
    es: () => import('./es.json').then((module) => module.default),
    fr: () => import('./fr.json').then((module) => module.default),
    de: () => import('./de.json').then((module) => module.default),
    nl: () => import('./nl.json').then((module) => module.default),
    pt: () => import('./pt.json').then((module) => module.default),
    it: () => import('./it.json').then((module) => module.default),
};

export const getMetadata = async (locale) => {
    try {
        if (metadataMap[locale]) {
            return await metadataMap[locale]();
        }
        return await metadataMap['en']();
    } catch (error) {
        console.warn(`[i18n] Failed to load metadata for locale "${locale}":`, error);
        return await metadataMap['en']();
    }
};
