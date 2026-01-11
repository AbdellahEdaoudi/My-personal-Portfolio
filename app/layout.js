import { Analytics } from "@vercel/analytics/react"
import './globals.css'
import { Prompt } from 'next/font/google'
import ScrollToTop from './Components/ScrollToTop'
import { ToastProvider } from './Components/Toast'

export const metadata = {
  metadataBase: new URL('https://abdellah-edaoudi.vercel.app'),
  title: {
    default: 'Abdellah Edaoudi',
    template: '%s | Abdellah Edaoudi'
  },
  description: 'Portfolio of Abdellah Edaoudi, a passionate Full Stack Developer specializing in MERN stack, Next.js, and modern web technologies. Explore my projects and skills.',
  keywords: [
    'Abdellah Edaoudi',
    'Full Stack Developer',
    'Web Developer',
    'MERN Stack',
    'Next.js',
    'React',
    'Node.js',
    'MongoDB',
    'Tailwind CSS',
    'JavaScript',
    'Software Engineer',
    'Morocco'
  ],
  authors: [{ name: 'Abdellah Edaoudi' }],
  creator: 'Abdellah Edaoudi',
  publisher: 'Abdellah Edaoudi',
  openGraph: {
    title: 'Abdellah Edaoudi',
    description: 'Explore the portfolio of Abdellah Edaoudi, featuring innovative web projects and professional experience in Full Stack development.',
    url: 'https://abdellah-edaoudi.vercel.app',
    siteName: 'Abdellah Edaoudi Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/profile-pic.png',
        alt: 'Abdellah Edaoudi - Full Stack Developer',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdellah Edaoudi | Full Stack Developer',
    description: 'Passionate Full Stack Developer building modern, scalable web applications.',
    creator: '@Edaoudi_abde',
    images: ['/profile-pic.png'],
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
    icon: '/profile-pic.png',
    shortcut: '/profile-pic.png',
    apple: '/profile-pic.png',
  },
}
const prompt = Prompt({ subsets: ["latin"], weight: '500' });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${prompt.className} bg-gray-50`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Abdellah Edaoudi",
              "url": "https://abdellah-edaoudi.vercel.app",
              "sameAs": [
                "https://linkedin.com/in/abdellah-edaoudi/",
                "https://github.com/AbdellahEdaoudi",
                "https://x.com/Edaoudi_abde",
                "https://instagram.com/edaoudi_abdellah/",
                "https://youtube.com/channel/UCv3WeHVuX07Wo6WxWf5QTZw"
              ],
              "jobTitle": "Full Stack Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              },
              "description": "Full Stack Developer specializing in MERN stack, Next.js, and modern web technologies. Explore my projects and skills.",
              "disambiguatingDescription": "Software Engineer and Full Stack Developer specialized in React and Node.js. distinct from the artist/singer Abdellah Daoudi.",
              "knowsAbout": ["Web Development", "MERN Stack", "React", "Next.js", "JavaScript", "Software Engineering"]
            })
          }}
        />
        <ToastProvider>
          {children}
        </ToastProvider>
        <Analytics />
        <ScrollToTop />
      </body>
    </html>
  )
}