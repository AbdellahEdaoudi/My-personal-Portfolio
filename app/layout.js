import { Analytics } from "@vercel/analytics/react"
import './globals.css'
import { Prompt } from 'next/font/google'
import Script from 'next/script'
import ScrollToTop from './components/ScrollToTop'
import { ToastProvider } from './components/Toast'
import CinematicBackground from './components/CinematicBackground'
import { ThemeProvider } from './components/ThemeProvider'



export const metadata = {
  metadataBase: new URL('https://abdellah-edaoudi.vercel.app'),
  title: {
    default: 'Abdellah Edaoudi',
    template: '%s | Abdellah Edaoudi - Full Stack Developer'
  },
  description: 'Official portfolio of Abdellah Edaoudi, a Full Stack Developer specialized in MERN stack, Next.js, Nest.js, and building secure and scalable web applications.',
  keywords: [
    'Abdellah Edaoudi',
    'Abdellah Edaoudi Developer',
    'Abdellah Edaoudi Morocco',
    'Full Stack Developer Morocco',
    'Software Engineer Morocco',
    'Software Developer Morocco',
    'Web Developer',
    'MERN Stack',
    'Next.js Specialist',
    'React Developer',
    'Abdellah E',
    'Edaoudi Abdellah'
  ],
  applicationName: 'Abdellah Edaoudi',
  authors: [{ name: 'Abdellah Edaoudi', url: 'https://abdellah-edaoudi.vercel.app' }],
  creator: 'Abdellah Edaoudi',
  publisher: 'Abdellah Edaoudi',
  openGraph: {
    title: 'Abdellah Edaoudi - Official Portfolio',
    description: 'Official portfolio of Abdellah Edaoudi, a Full Stack Developer specialized in MERN stack, Next.js, Nest.js, and building secure and scalable web applications.',
    url: 'https://abdellah-edaoudi.vercel.app',
    siteName: 'Abdellah Edaoudi Portfolio',
    locale: 'en_US',
    type: 'profile',
    images: [
      {
        url: '/profile/new-profile.jpg',
        alt: 'Abdellah Edaoudi Portfolio',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdellah Edaoudi | Full Stack Developer',
    description: 'Official portfolio of Abdellah Edaoudi, a Full Stack Developer specialized in MERN stack, Next.js, Nest.js, and building secure and scalable web applications.',
    creator: '@Edaoudi_abde',
    images: ['/profile/new-profile.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/profile/new-profile.jpg',
    shortcut: '/profile/new-profile.jpg',
    apple: '/profile/new-profile.jpg',
  },
  alternates: {
    canonical: 'https://abdellah-edaoudi.vercel.app',
  }
}
const prompt = Prompt({ subsets: ["latin"], weight: '500' });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme init: external file avoids React 19 inline-script warning */}
        <Script
          id="theme-init"
          src="/theme-init.js"
          strategy="beforeInteractive"
        />
        {/* JSON-LD structured data — rendered server-side, per Next.js docs */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Abdellah Edaoudi",
              "givenName": "Abdellah",
              "familyName": "Edaoudi",
              "alternateName": [
                "عبد الله الدودي",
                "Abdellah Edaoudi Developer",
                "Abdellah Edaoudi Full Stack"
              ],
              "url": "https://abdellah-edaoudi.vercel.app",
              "image": "https://abdellah-edaoudi.vercel.app/profile/new-profile.jpg",
              "sameAs": [
                "https://linkedin.com/in/abdellah-edaoudi/",
                "https://github.com/AbdellahEdaoudi",
                "https://x.com/Edaoudi_abde",
                "https://instagram.com/edaoudi_abdellah/",
                "https://www.youtube.com/@edaoudi.abdellah"
              ],
              "jobTitle": "Full Stack Developer & Software Engineer",
              "knowsAbout": [
                "Software Engineering",
                "Full Stack Web Development",
                "MERN Stack",
                "React.js",
                "Next.js",
                "NestJS",
                "Node.js",
                "TypeScript",
                "JavaScript"
              ],
              "nationality": { "@type": "Country", "name": "Morocco" },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Laayoune",
                "addressCountry": "MA"
              },
              "description": "Official portfolio of Abdellah Edaoudi, a Full Stack Developer specialized in MERN stack, Next.js, Nest.js, and building secure and scalable web applications.",
              "disambiguatingDescription": "Abdellah Edaoudi is a Full Stack Software Engineer and Web Developer based in Morocco. He is a distinct entity from the Moroccan singer Abdellah Daoudi.",
              "brand": { "@type": "Brand", "name": "Abdellah Edaoudi" }
            })
          }}
        />
      </head>
      <body className={`${prompt.className} relative bg-gray-50 dark:bg-[#07131e] text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <ThemeProvider>
          <CinematicBackground />
          <ToastProvider>
            {children}
          </ToastProvider>
          <Analytics />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}