import React from 'react'
import About from '../Pages/About'
import Skills from '../Pages/Skills'
import Portfolio from '../Pages/Portfolio'
import Qualif from '../Pages/Qualif'
import Footer from '../Pages/Footer'
import Contact from '../Pages/Contact'
import Header from '../Pages/Header'

function page() {
  return (
    <div>
      <div className="sticky top-0 bg-white"><Header nm='About' /></div>
      <About />
      <Skills/>
      <Portfolio />
      <Qualif />
      <Contact />
      <Footer />
    </div>
  )
}

export default page