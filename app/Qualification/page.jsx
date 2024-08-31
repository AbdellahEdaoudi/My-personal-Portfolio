import React from "react";
import Qualif from "../Components/Qualif";
import Footer from "../Components/Footer";
import Contact from "../Components/Contact";
import Header from "../Components/Header";

export const metadata = {
  title: "Abdellah Edaoudi - Qualifications",
  description:
    "Discover Abdellah Edaoudi's personal journey including education and professional experience.",
  keywords:
    "Abdellah Edaoudi, Qualifications, Education, Experience, Web Development, Internship",
  ogTitle: "Abdellah Edaoudi - Qualifications",
  ogDescription:
    "Discover Abdellah Edaoudi's personal journey including education and professional experience.",
  ogImage: "https://ed-portfolioo.vercel.app/profile-pic.png",
  ogUrl: "https://ed-portfolioo.vercel.app/Qualification",
  twitterTitle: "Abdellah Edaoudi - Qualifications",
  twitterDescription:
    "Discover Abdellah Edaoudi's personal journey including education and professional experience.",
  twitterImage: "https://ed-portfolioo.vercel.app/profile-pic.png",
  twitterCard: "summary_large_image",
};
function page() {
  return (
    <div>
      <Qualif />
      <Contact />
      <Footer />
    </div>
  );
}

export default page;
