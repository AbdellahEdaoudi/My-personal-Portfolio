import { Analytics } from "@vercel/analytics/react"
import './globals.css'
import { Prompt } from 'next/font/google'
import ScrollToTop from './Components/ScrollToTop'
import { ToastProvider } from './Components/Toast'
import CinematicBackground from './Components/CinematicBackground'
import CustomCursor from './Components/CustomCursor'

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
        url: '/profile/profile.jpg',
        alt: 'Abdellah Edaoudi Portfolio',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdellah Edaoudi | Full Stack Developer',
    description: 'Official portfolio of Abdellah Edaoudi, a Full Stack Developer specialized in MERN stack, Next.js, Nest.js, and building secure and scalable web applications.',
    creator: '@Edaoudi_abde',
    images: ['/profile/profile.jpg'],
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
    icon: '/profile/profile.jpg',
    shortcut: '/profile/profile.jpg',
    apple: '/profile/profile.jpg',
  },
  alternates: {
    canonical: 'https://abdellah-edaoudi.vercel.app',
  }
}
const prompt = Prompt({ subsets: ["latin"], weight: '500' });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${prompt.className} relative`}>
        <CinematicBackground />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Abdellah Edaoudi",
              "url": "https://abdellah-edaoudi.vercel.app",
              "image": "https://abdellah-edaoudi.vercel.app/profile/profile.jpg",
              "sameAs": [
                "https://linkedin.com/in/abdellah-edaoudi/",
                "https://github.com/AbdellahEdaoudi",
                "https://x.com/Edaoudi_abde",
                "https://instagram.com/edaoudi_abdellah/",
                "https://youtube.com/channel/UCv3WeHVuX07Wo6WxWf5QTZw"
              ],
              "jobTitle": "Full Stack Developer",
              "nationality": {
                "@type": "Country",
                "name": "Morocco"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Laayoune",
                "addressCountry": "MA"
              },
              "description": "Official portfolio of Abdellah Edaoudi, a Full Stack Developer specialized in MERN stack, Next.js, Nest.js, and building secure and scalable web applications.",
              "disambiguatingDescription": "Full Stack Developer based in Morocco. Not to be confused with the Moroccan singer Abdellah Daoudi.",
              "brand": {
                "@type": "Brand",
                "name": "Abdellah Edaoudi"
              }
            })
          }}
        />
        <ToastProvider>
          {children}
        </ToastProvider>
        <Analytics />
        <ScrollToTop />
        <CustomCursor />
      </body>
    </html>
  )
}