
export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/Admin','/Admin/','/Login','/Login/','/Register','/Register/'],
        },
        sitemap: 'https://abdellah-edaoudi.vercel.app/sitemap.xml',
    }
}
