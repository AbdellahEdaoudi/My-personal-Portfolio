import Home from "./Components/Home";
import About from "./Components/About";
import Skills from "./Components/Skills";
import Projects from "./Components/Projects";
import Education from "./Components/Education";
import Experience from "./Components/Experience";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import { getDictionary } from "./dictionaries/get-dictionary";
import Header from "./Components/Header";

export default async function Page() {
  const dictionary = await getDictionary('en');

  return (
    <div>
      <Header content={dictionary.header} />
      <Home content={dictionary.home} />
      <About content={dictionary.about} />
      <Skills content={dictionary.skills} />
      <Projects content={dictionary.projects} />
      <Experience content={dictionary.experience} />
      <Education content={dictionary.education} />
      <Contact content={dictionary.contact} />
      <Footer content={dictionary.footer} />
    </div>
  );
}
