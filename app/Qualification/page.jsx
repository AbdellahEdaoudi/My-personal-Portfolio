import React from 'react'
import Qualif from '../Pages/Qualif'
import Footer from '../Pages/Footer'
import Contact from '../Pages/Contact'
import Header from '../Pages/Header'

function page() {
  return (
    <div>
      <div className="sticky top-0 bg-white"><Header  nm='Qualification' /></div>
      <Qualif />
      <Contact />
      <Footer />
    </div>
  )
}

export default page