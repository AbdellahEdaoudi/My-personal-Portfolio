import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Footer from "./Pages/Footer";
import Header from "./Pages/Header";
import Home from "./Pages/Home";
import Portfolio from "./Pages/Portfolio";
import Qualif from "./Pages/Qualif";
import Skills from './Pages/Skills';

export default function Page() {
  return (
    <div>
      <div className="sticky top-0 bg-white"><Header nm="Home" /></div>
      <Home />
      <About />
      <Skills />
      <Portfolio />
      <Qualif />
      <Contact />
      <Footer />
    </div>
  );
}
