import React from 'react'
import Footer from '../Pages/Footer'
import Contact from '../Pages/Contact'
import Header from '../Pages/Header'

export const metadata = {
  title: "Abdellah Edaoudi - Contact Me",
  description: "Get in touch with Abdellah Edaoudi. Contact me via email, WhatsApp, or Messenger.",
  keywords: "Abdellah Edaoudi, Contact, MERN Stack Developer, Web Development, React, Node.js",
  openGraph: {
    title: "Abdellah Edaoudi - Contact Me",
    description: "Get in touch with Abdellah Edaoudi. Contact me via email, WhatsApp, or Messenger.",
    url: "https://ed-portfolioo.vercel.app/contact",
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
    title: "Abdellah Edaoudi - Contact Me",
    description: "Get in touch with Abdellah Edaoudi. Contact me via email, WhatsApp, or Messenger.",
    image: "https://ed-portfolioo.vercel.app/profile-pic.png",
  },
};
function page() {
  return (
    <div>
      <div className="sticky top-0 bg-white  z-50"><Header  nm='Contact' /></div>
      <Contact />
      <Footer />
    </div>
  )
}

export default page