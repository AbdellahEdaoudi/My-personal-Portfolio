import About from "./Components/About";
import Contact from "./Components/Contact";
import ExperienceSection from "./Components/Experience/en_fr";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Projects from "./Components/Projects";
import Qualif from "./Components/Qualif";
import EducationSection from "./Components/Qualification/en_fr";
import Skills from './Components/Skills';

export const metadata = {
  title: "Abdellah Edaoudi",
  description: "Specialize in developing responsive websites and applications using the MERN stack, as well as advanced frameworks like Next.js and NestJS for optimal performance and scalability.",
  keywords: "MERN stack, Full Stack Developer, Next.js, NestJS, Web Development, Scalable Web Applications, JavaScript Developer, Front-End Development, Back-End Development, Responsive Design, Custom Web Solutions, Node.js, React Development, Express.js, MongoDB Development, SEO Optimization, Web App Performance, Cross-Platform Web Development,Abdellah, Edaoudi, Abdellah Edaoudi, Abdellah daoudi, Software Engineer, Web Applications,Digital Developer,API Integration",
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
  instagram: {
    site: '@edaoudi_abdellah'
  },
  robots: 'index, follow',
  google: {
    name: 'Abdellah Edaoudi - MERN Stack Developer | Portfolio',
    description: 'Welcome to the official portfolio of Abdellah Edaoudi, a Digital Developer specializing in MERN-Stack. Explore my projects, skills, and experiences in building responsive websites and applications using Next.js (React.js), Tailwind CSS, and Node.js.'
  },
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
      content: 'Abdellah Edaoudi, Abdellah, Edaoudi, MERN Stack Developer, Portfolio, Web Development, React, Node.js, MongoDB, Express.js, JavaScript, Frontend Developer, Backend Developer, Software Engineer, Web Applications, Tailwind CSS, Next.js, Digital Developer, UI/UX Design, API Integration, Responsive Design'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    }
  ]
};
export default function Page() {
  return (
    <div>
      <Home />
      <About />
      <Skills />
      <Projects />
      <EducationSection />
      <ExperienceSection />
      <Contact />
      <Footer />
    </div>
  );
}
