import Home from "./Components/Home";
import About from "./Components/About";
import Skills from "./Components/Skills";
import Projects from "./Components/Projects";
import Education from "./Components/Education";
import Experience from "./Components/Experience";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import { getTranslation } from "./translations/portfolio/load-translations";
import Header from "./Components/Header";

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
      <Header content={dictionary.header} />
      <Home lang="en" />
      <About lang="en" />
      <Skills lang="en" />
      <Projects lang="en" />
      <Experience lang="en" />
      <Education lang="en" />
      <Contact content={dictionary.contact} />
      <Footer />
    </div>
  );
}
