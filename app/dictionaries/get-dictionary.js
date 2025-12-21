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
    de: () => ({
        home: import('./home.json').then((module) => module.de),
        about: import('./about.json').then((module) => module.de),
        skills: import('./skills.json').then((module) => module.de),
        projects: import('./projects.json').then((module) => module.de),
        experience: import('./experience.json').then((module) => module.de),
        education: import('./education.json').then((module) => module.de),
        contact: import('./contact.json').then((module) => module.de),
        footer: import('./footer.json').then((module) => module.de),
        metadata: import('./metadata.json').then((module) => module.de),
        header: import('./header.json').then((module) => module.de),
    }),
    zh: () => ({
        home: import('./home.json').then((module) => module.zh),
        about: import('./about.json').then((module) => module.zh),
        skills: import('./skills.json').then((module) => module.zh),
        projects: import('./projects.json').then((module) => module.zh),
        experience: import('./experience.json').then((module) => module.zh),
        education: import('./education.json').then((module) => module.zh),
        contact: import('./contact.json').then((module) => module.zh),
        footer: import('./footer.json').then((module) => module.zh),
        metadata: import('./metadata.json').then((module) => module.zh),
        header: import('./header.json').then((module) => module.zh),
    }),
    nl: () => ({
        home: import('./home.json').then((module) => module.nl),
        about: import('./about.json').then((module) => module.nl),
        skills: import('./skills.json').then((module) => module.nl),
        projects: import('./projects.json').then((module) => module.nl),
        experience: import('./experience.json').then((module) => module.nl),
        education: import('./education.json').then((module) => module.nl),
        contact: import('./contact.json').then((module) => module.nl),
        footer: import('./footer.json').then((module) => module.nl),
        metadata: import('./metadata.json').then((module) => module.nl),
        header: import('./header.json').then((module) => module.nl),
    }),
    es: () => ({
        home: import('./home.json').then((module) => module.es),
        about: import('./about.json').then((module) => module.es),
        skills: import('./skills.json').then((module) => module.es),
        projects: import('./projects.json').then((module) => module.es),
        experience: import('./experience.json').then((module) => module.es),
        education: import('./education.json').then((module) => module.es),
        contact: import('./contact.json').then((module) => module.es),
        footer: import('./footer.json').then((module) => module.es),
        metadata: import('./metadata.json').then((module) => module.es),
        header: import('./header.json').then((module) => module.es),
    }),
    pt: () => ({
        home: import('./home.json').then((module) => module.pt),
        about: import('./about.json').then((module) => module.pt),
        skills: import('./skills.json').then((module) => module.pt),
        projects: import('./projects.json').then((module) => module.pt),
        experience: import('./experience.json').then((module) => module.pt),
        education: import('./education.json').then((module) => module.pt),
        contact: import('./contact.json').then((module) => module.pt),
        footer: import('./footer.json').then((module) => module.pt),
        metadata: import('./metadata.json').then((module) => module.pt),
        header: import('./header.json').then((module) => module.pt),
    }),
    ar: () => ({
        home: import('./home.json').then((module) => module.ar),
        about: import('./about.json').then((module) => module.ar),
        skills: import('./skills.json').then((module) => module.ar),
        projects: import('./projects.json').then((module) => module.ar),
        experience: import('./experience.json').then((module) => module.ar),
        education: import('./education.json').then((module) => module.ar),
        contact: import('./contact.json').then((module) => module.ar),
        footer: import('./footer.json').then((module) => module.ar),
        metadata: import('./metadata.json').then((module) => module.ar),
        header: import('./header.json').then((module) => module.ar),
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
