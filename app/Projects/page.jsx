import React from "react";
import Projects from "../Components/Projects";
import Footer from "../Components/Footer";
import Contact from "../Components/Contact";
import EducationSection from "../Components/Qualification/en_fr";
import ExperienceSection from "../Components/Experience/en_fr";

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
      <Projects />
      <EducationSection />
      <ExperienceSection />
      <Contact />
      <Footer />
    </div>
  );
}

export default page;
