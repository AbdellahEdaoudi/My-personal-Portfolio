import React from "react";
import About from "../Components/About";
import Skills from "../Components/Skills";
import Projects from "../Components/Projects";
import Footer from "../Components/Footer";
import Contact from "../Components/Contact";
import EducationSection from "../Components/Qualification/en_fr";
import ExperienceSection from "../Components/Experience/en_fr";

export const metadata = {
  title: "Abdellah Edaoudi - About",
  description:
    "Learn more about Abdellah Edaoudi, a MERN Stack Developer with 1 year of experience and 3 completed projects.",
  keywords:
    "Abdellah Edaoudi, About, MERN Stack Developer, Web Development, React, Node.js",
  openGraph: {
    title: "Abdellah Edaoudi - About Me",
    description:
      "Learn more about Abdellah Edaoudi, a MERN Stack Developer with 1 year of experience and 3 completed projects.",
    url: "https://abdellah-edaoudi.vercel.app/About",
    images: [
      {
        url: "https://abdellah-edaoudi.vercel.app/profile-pic.png",
        width: 800,
        height: 600,
        alt: "Abdellah Edaoudi Profile Picture",
      },
    ],
  },
  twitter: {
    card: "https://x.com/Edaoudi_abde/header_photo",
    title: "Abdellah Edaoudi - About Me",
    description:
      "Learn more about Abdellah Edaoudi, a MERN Stack Developer with 1 year of experience and 3 completed projects.",
    image: "https://abdellah-edaoudi.vercel.app/profile-pic.png",
  },
};
function page() {
  return (
    <div>
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

export default page;
