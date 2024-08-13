import React from "react";
import Projects from "../Pages/Projects";
import Qualif from "../Pages/Qualif";
import Footer from "../Pages/Footer";
import Contact from "../Pages/Contact";
import Header from "../Pages/Header";

export const metadata = {
  title: "Abdellah Edaoudi - Projects",
  description:
    "Explore the Projects of Abdellah Edaoudi, a MERN Stack Developer. View projects including E-commerce App and Hotel App.",
  keywords:
    "Abdellah Edaoudi, Projects, MERN Stack Developer, Web Development, E-commerce, Hotel Management",
  ogTitle: "Abdellah Edaoudi - Projects",
  ogDescription:
    "Explore the Projects of Abdellah Edaoudi, a MERN Stack Developer. View projects including E-commerce App and Hotel App.",
  ogImage: "https://ed-portfolioo.vercel.app/profile-pic.png",
  ogUrl: "https://ed-portfolioo.vercel.app/Portfolio",
  twitterTitle: "Abdellah Edaoudi - Projects",
  twitterDescription:
    "Explore the Projects of Abdellah Edaoudi, a MERN Stack Developer. View projects including E-commerce App and Hotel App.",
  twitterImage: "https://ed-portfolioo.vercel.app/profile-pic.png",
  twitterCard: "summary_large_image",
};
function page() {
  return (
    <div>
      <div className="sticky top-0 bg-white">
        <Header nm="Projects" />
      </div>
      <Projects />
      <Qualif />
      <Contact />
      <Footer />
    </div>
  );
}

export default page;
