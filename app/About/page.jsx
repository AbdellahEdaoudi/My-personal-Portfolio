import React from "react";
import About from "../Pages/About";
import Skills from "../Pages/Skills";
import Projects from "../Pages/Projects";
import Qualif from "../Pages/Qualif";
import Footer from "../Pages/Footer";
import Contact from "../Pages/Contact";
import Header from "../Pages/Header";

export const metadata = {
  title: "Abdellah Edaoudi - About Me",
  description:
    "Learn more about Abdellah Edaoudi, a MERN Stack Developer with 1 year of experience and 3 completed projects.",
  keywords:
    "Abdellah Edaoudi, About, MERN Stack Developer, Web Development, React, Node.js",
  openGraph: {
    title: "Abdellah Edaoudi - About Me",
    description:
      "Learn more about Abdellah Edaoudi, a MERN Stack Developer with 1 year of experience and 3 completed projects.",
    url: "https://ed-portfolioo.vercel.app/about",
    images: [
      {
        url: "https://ed-portfolioo.vercel.app/profile-pic.png",
        width: 800,
        height: 600,
        alt: "Abdellah Edaoudi Profile Picture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdellah Edaoudi - About Me",
    description:
      "Learn more about Abdellah Edaoudi, a MERN Stack Developer with 1 year of experience and 3 completed projects.",
    image: "https://ed-portfolioo.vercel.app/profile-pic.png",
  },
};
function page() {
  return (
    <div>
      <About />
      <Skills />
      <Projects />
      <Qualif />
      <Contact />
      <Footer />
    </div>
  );
}

export default page;
