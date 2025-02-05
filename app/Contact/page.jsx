import React from "react";
import Footer from "../Components/Footer";
import Contact from "../Components/Contact";
import Header from "../Components/Header";

export const metadata = {
  title: "Abdellah Edaoudi - Contact",
  description:
    "Get in touch with Abdellah Edaoudi. Contact me via email, WhatsApp, or Messenger.",
  keywords:
    "Abdellah Edaoudi, Contact, MERN Stack Developer, Web Development",
  openGraph: {
    title: "Abdellah Edaoudi - Contact",
    description:
      "Get in touch with Abdellah Edaoudi. Contact me via email, WhatsApp, or Messenger.",
    url: "https://abdellah-edaoudi.vercel.app/Contact",
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
    title: "Abdellah Edaoudi - Contact Me",
    description:
      "Get in touch with Abdellah Edaoudi. Contact me via email, WhatsApp, or Messenger.",
    image: "https://abdellah-edaoudi.vercel.app/profile-pic.png",
  },
};
function page() {
  return (
    <div>
      <Contact />
      <Footer />
    </div>
  );
}

export default page;
