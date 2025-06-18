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
