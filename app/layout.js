import { Inter, Prompt } from "next/font/google";
import "./globals.css";
import Header from "./Pages/Header";

const inter = Inter({ subsets: ["latin"] });
const prompt = Prompt({ subsets: ["latin"], weight: '500' });


export const metadata = {
  title: "Abdellah Edaoudi",
  description: "Welcome to the official portfolio of Abdellah Edaoudi, a Digital Developer specializing in MERN-Stack. Explore my projects, skills, and experiences in building responsive websites and applications using Next.js (React.js), Tailwind CSS, and Node.js.",
  keywords: "Abdellah Edaoudi, MERN Stack Developer, Portfolio, Web Development, React, Node.js, MongoDB, Express.js, JavaScript, Frontend Developer, Backend Developer, Software Engineer, Web Applications, Tailwind CSS, Next.js, Digital Developer, Responsive Design, Full-Stack Development, API Integration, UI/UX Design, SEO Optimization, Abdellah, Edaoudi",
  openGraph: {
    title: "Abdellah Edaoudi",
    description: "Welcome to the official portfolio of Abdellah Edaoudi, a Digital Developer specializing in MERN-Stack. Explore my projects, skills, and experiences in building responsive websites and applications using Next.js (React.js), Tailwind CSS, and Node.js.",
    type: 'website',
    url: 'https://ed-portfolioo.vercel.app',
    images: [
      {
        url: 'https://ed-portfolioo.vercel.app/profile-pic.png',
        width: 800,
        height: 600,
        alt: 'Abdellah Edaoudi Profile Picture',
      }
    ],
    locale: 'en_US',
    site_name: 'Abdellah Edaoudi Portfolio'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Edaoudi_abde',
    creator: '@Edaoudi_abde',
    title: "Abdellah Edaoudi - MERN Stack Developer | Portfolio",
    description: "Welcome to the official portfolio of Abdellah Edaoudi, a Digital Developer specializing in MERN-Stack. Explore my projects, skills, and experiences in building responsive websites and applications using Next.js (React.js), Tailwind CSS, and Node.js.",
    image: 'https://ed-portfolioo.vercel.app/profile-pic.png',
  },
  instagram: {
    site: '@edaoudi_abdellah'
  },
  robots: 'index, follow',
  google: {
    name: 'Abdellah Edaoudi - MERN Stack Developer | Portfolio',
    description: 'Welcome to the official portfolio of Abdellah Edaoudi, a Digital Developer specializing in MERN-Stack. Explore my projects, skills, and experiences in building responsive websites and applications using Next.js (React.js), Tailwind CSS, and Node.js.'
  },
  author: 'Abdellah Edaoudi',
  canonical: 'https://ed-portfolioo.vercel.app',
  additionalMetaTags: [
    {
      name: 'application-name',
      content: 'Abdellah Edaoudi Portfolio'
    },
    {
      name: 'msapplication-TileColor',
      content: '#ffffff'
    },
    {
      name: 'msapplication-TileImage',
      content: 'https://ed-portfolioo.vercel.app/profile-pic.png'
    },
    {
      name: 'theme-color',
      content: '#ffffff'
    },
    {
      name: 'keywords',
      content: 'Abdellah Edaoudi, Abdellah, Edaoudi, MERN Stack Developer, Portfolio, Web Development, React, Node.js, MongoDB, Express.js, JavaScript, Frontend Developer, Backend Developer, Software Engineer, Web Applications, Tailwind CSS, Next.js, Digital Developer, UI/UX Design, API Integration, Responsive Design'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    }
  ]
};


export default function RootLayout({ children }) {
  return (
    <html className="scroll-smooth" lang="en">
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </head>
      <body className={prompt.className}>
        {children}
      </body>
    </html>
  );
}
