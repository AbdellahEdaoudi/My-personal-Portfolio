import "./globals.css";
import { Inter, Prompt } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { MyProvider } from "./Context/MyContext";
import { ThemeProvider } from "./Components/theme-provider"
import ClientHeader from "./Components/Header/ClientHeader";
import ClientIpFetcher from "./Components/ClientIpFetcher/ClientIpFetcher";
import Script from "next/script";


// const inter = Inter({ subsets: ["latin"] });
const prompt = Prompt({ subsets: ["latin"], weight: '500' });

// export const viewport = {
//   width: 'device-width',
//   initialScale: 1,
//   // maximumScale: 1,
//   // userScalable: false, // منع التكبير/التصغير
// };

export const metadata = {
  title: "Abdellah Edaoudi",
  description: "I'm Abdellah Edaoudi, a full stack developer specialize in developing responsive websites and applications using the MERN stack, as well as advanced frameworks like Next.js and NestJS for optimal performance and scalability.",
  keywords: "Abdellah Edaoudi, عبدالله الداودي, MERN stack, Full Stack Developer, Next.js, NestJS, Web Development, Scalable Web Applications, JavaScript Developer, Front-End Development, Back-End Development, Responsive Design, Custom Web Solutions, Node.js, React Development, Express.js, MongoDB Development, SEO Optimization, Web App Performance, Cross-Platform Web Development, Abdellah, Edaoudi, Abdellah daoudi, Software Engineer, Web Applications, Digital Developer, API Integration",
  openGraph: {
    title: "Abdellah Edaoudi",
    description: "Welcome to the official portfolio of Abdellah Edaoudi, a Digital Developer specializing in MERN-Stack. Explore my projects, skills, and experiences in building responsive websites and applications using Next.js (React.js), Tailwind CSS, and Node.js.",
    type: 'website',
    url: 'https://abdellah-edaoudi.vercel.app',
    images: [
      {
        url: 'https://abdellah-edaoudi.vercel.app/profile-pic.png',
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
    image: 'https://abdellah-edaoudi.vercel.app/profile-pic.png',
  },
  robots: 'index, follow',
  author: 'Abdellah Edaoudi',
  canonical: 'https://abdellah-edaoudi.vercel.app',
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
      content: 'https://abdellah-edaoudi.vercel.app/profile-pic.png'
    },
    {
      name: 'theme-color',
      content: '#ffffff'
    },
    {
      name: 'keywords',
      content: 'Abdellah Edaoudi, عبدالله الداودي, MERN Stack Developer, Portfolio, Web Development, React, Node.js, MongoDB, Express.js, JavaScript, Frontend Developer, Backend Developer, Software Engineer, Web Applications, Tailwind CSS, Next.js, Digital Developer, UI/UX Design, API Integration, Responsive Design'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    }
  ]
};

export default function RootLayout({ children }) {

  const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Abdellah Edaoudi (عبدالله الداودي)",
  "url": "https://abdellah-edaoudi.vercel.app",
  "sameAs": [
    "https://twitter.com/Edaoudi_abde",
    "https://instagram.com/edaoudi_abdellah",
    "https://linkedin.com/in/abdellah-edaoudi"
  ],
  "additionalName": ["عبد الله الداودي", "عبدالله الدودي", "الداودي عبدالله", "الدودي عبدالله"],
};


  return (
    <html className="scroll-smooth" lang="en">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          strategy="afterInteractive"
        />
        <link rel="stylesheet" 
         href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      </head>
      <body className={`${prompt.className} bg-gray-50`}>
        <MyProvider>
          <div className={`sticky z-50 top-0 bg-white`}>
            <ClientHeader />
          </div>
          <div className="">
            <ClientIpFetcher />
            {children}
          </div>
        </MyProvider>
        <Analytics />
      </body>
    </html>
  );
}
