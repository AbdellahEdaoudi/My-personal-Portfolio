import 'server-only'

const dictionaries = {
    en: () => ({
        home: import('./home.json').then((module) => module.default),
        about: import('./about.json').then((module) => module.default),
        skills: import('./skills.json').then((module) => module.default),
        projects: import('./projects.json').then((module) => module.default),
        experience: import('./experience.json').then((module) => module.default),
        education: import('./education.json').then((module) => module.default),
        contact: import('./contact.json').then((module) => module.default),
        footer: import('./footer.json').then((module) => module.default),
        metadata: import('./metadata.json').then((module) => module.default),
        header: import('./header.json').then((module) => module.default),
    }),
    fr: () => ({
        home: import('./home.json').then((module) => module.fr),
        about: import('./about.json').then((module) => module.fr),
        skills: import('./skills.json').then((module) => module.fr),
        projects: import('./projects.json').then((module) => module.fr),
        experience: import('./experience.json').then((module) => module.fr),
        education: import('./education.json').then((module) => module.fr),
        contact: import('./contact.json').then((module) => module.fr),
        footer: import('./footer.json').then((module) => module.fr),
        metadata: import('./metadata.json').then((module) => module.fr),
        header: import('./header.json').then((module) => module.fr),
    }),
}
// Note: The structure of JSON files was: { "en": { ... }, "fr": { ... } } for each file.
// So for 'en', we want module.default.en? No, let's check the JSON files I wrote.
// I wrote: { "en": { ... }, "fr": { ... } } inside about.json.
// So `import('./about.json')` returns the whole object.
// So dictionaries.en should return `module.default.en`. 

const loadDictionary = async (locale) => {
    const dict = {
        home: (await import('./home.json')).default[locale],
        about: (await import('./about.json')).default[locale],
        skills: (await import('./skills.json')).default[locale],
        projects: (await import('./projects.json')).default[locale],
        experience: (await import('./experience.json')).default[locale],
        education: (await import('./education.json')).default[locale],
        contact: (await import('./contact.json')).default[locale],
        footer: (await import('./footer.json')).default[locale],
        metadata: (await import('./metadata.json')).default[locale],
        header: (await import('./header.json')).default[locale],
    }
    return dict;
}

export const getDictionary = async (locale) => loadDictionary(locale);
