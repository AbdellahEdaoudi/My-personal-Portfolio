import React from 'react'
import Portfolio from '../Pages/Portfolio'
import Qualif from '../Pages/Qualif'
import Footer from '../Pages/Footer'
import Contact from '../Pages/Contact'
import Header from '../Pages/Header'

export const metadata = {
  title: 'Abdellah Edaoudi - Portfolio',
  description: 'Explore the portfolio of Abdellah Edaoudi, a MERN Stack Developer. View projects including E-commerce App and Hotel App.',
  keywords: 'Abdellah Edaoudi, Portfolio, MERN Stack Developer, Web Development, E-commerce, Hotel Management',
  ogTitle: 'Abdellah Edaoudi - Portfolio',
  ogDescription: 'Explore the portfolio of Abdellah Edaoudi, a MERN Stack Developer. View projects including E-commerce App and Hotel App.',
  ogImage: 'https://ed-portfolioo.vercel.app/profile-pic.png',
  ogUrl: 'https://ed-portfolioo.vercel.app/Portfolio',
  twitterTitle: 'Abdellah Edaoudi - Portfolio',
  twitterDescription: 'Explore the portfolio of Abdellah Edaoudi, a MERN Stack Developer. View projects including E-commerce App and Hotel App.',
  twitterImage: 'https://ed-portfolioo.vercel.app/profile-pic.png',
  twitterCard: 'summary_large_image'
};
function page() {
  return (
    <div>
      <div className="sticky top-0 bg-white"><Header  nm='Portfolio' /></div>
      <Portfolio />
      <Qualif />
      <Contact />
      <Footer />
    </div>
  )
}

export default page