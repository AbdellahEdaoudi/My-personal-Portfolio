import React from "react";
import ExperienceSection from "../Components/Experience/en_fr";
import Footer from "../Components/Footer";
import Contact from "../Components/Contact";

export const metadata = {
    title: "Abdellah Edaoudi - Experience",
    description:
      "Explore Abdellah Edaoudi's professional experience in web development and projects.",
    keywords:
      "Abdellah Edaoudi, Professional Experience, Web Development, Projects, Internships, Skills",
    ogTitle: "Abdellah Edaoudi - Professional Experience",
    ogDescription:
      "Explore Abdellah Edaoudi's professional experience in web development and projects.",
    ogImage: "https://ed-portfolioo.vercel.app/profile-pic.png",
    ogUrl: "https://ed-portfolioo.vercel.app/Experience",
    twitterTitle: "Abdellah Edaoudi - Professional Experience",
    twitterDescription:
      "Explore Abdellah Edaoudi's professional experience in web development and projects.",
    twitterImage: "https://ed-portfolioo.vercel.app/profile-pic.png",
    twitterCard: "summary_large_image",
  };
  
function page() {

  return (
    <div>
      <ExperienceSection />
      <Contact />
      <Footer />
    </div>
  );
}

export default page;