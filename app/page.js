import Home from "./Components/Pages/Home";
import About from "./Components/Pages/About";
import Skills from "./Components/Pages/Skills";
import Projects from "./Components/Pages/Projects";
import Education from "./Components/Pages/Education";
import Experience from "./Components/Pages/Experience";
import Contact from "./Components/Pages/Contact";
import Footer from "./Components/Pages/Footer";
import { getTranslation } from "./translations/portfolio/load-translations";
import Header from "./Components/Pages/Header";

export const metadata = {
  alternates: {
    canonical: '/en',
    languages: {
      'en': '/en',
      'fr': '/fr',
      'de': '/de',
      'zh': '/zh',
      'nl': '/nl',
      'es': '/es',
      'pt': '/pt',
      'ar': '/ar',
      'ru': '/ru',
      'ja': '/ja',
      'it': '/it',
      'hi': '/hi',
      'tr': '/tr',
      'ko': '/ko',
      'id': '/id',
      'pl': '/pl',
    },
  },
}


export default async function Page() {
  const dictionary = await getTranslation('en');

  return (
    <div>
      <Header content={dictionary.header} lang="en" />
      <Home content={dictionary.home} lang="en" />
      <About content={dictionary.about} lang="en" />
      <Skills content={dictionary.skills} lang="en" />
      <Projects content={dictionary.projects} lang="en" />
      <Experience content={dictionary.experience} lang="en" />
      <Education content={dictionary.education} lang="en" />
      <Contact content={dictionary.contact} lang="en" />
      <Footer content={dictionary.footer} lang="en" />
    </div>
  );
}
