import React from "react";
import Footer from "../Components/Footer";
import Contact from "../Components/Contact";
import EducationSection from "../Components/Qualification/en_fr";
import ExperienceSection from "../Components/Experience/en_fr";

export const metadata = {
  title: "Abdellah Edaoudi - Education",
  description:
    "Discover Abdellah Edaoudi's personal journey including education and professional experience.",
  keywords:
    "Abdellah Edaoudi, Qualifications, Education, Experience, Web Development, Internship",
  ogTitle: "Abdellah Edaoudi - Education",
  ogDescription:
    "Discover Abdellah Edaoudi's personal journey including education and professional experience.",
  ogImage: "https://abdellah-edaoudi.vercel.app/profile-pic.png",
  ogUrl: "https://abdellah-edaoudi.vercel.app/Education",
  twitterTitle: "Abdellah Edaoudi - Education",
  twitterDescription:
    "Discover Abdellah Edaoudi's personal journey including education and professional experience.",
  twitterImage: "https://abdellah-edaoudi.vercel.app/profile-pic.png",
  twitterCard: "https://x.com/Edaoudi_abde/header_photo",
};
function page() {
  return (
    <div>
      <EducationSection />
      <ExperienceSection />
      <Contact />
      <Footer />
    </div>
  );
}

export default page;
