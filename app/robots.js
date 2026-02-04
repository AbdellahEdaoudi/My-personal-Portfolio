
export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/Admin', '/Admin/', '/Admin/Login', '/Admin/Login/', '/Admin/Register', '/Admin/Register/'],
        },
        sitemap: 'https://abdellah-edaoudi.vercel.app/sitemap.xml',
    }
}
