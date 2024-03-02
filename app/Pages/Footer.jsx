import React from 'react'
import {Linkedin,Github,Instagram,Youtube} from 'lucide-react'
import Link from 'next/link'
function Footer() {
  return (
    <section className='border-t flex  justify-center items-center text-center h-60'>
        <div>
            <h1 className='pb-3 text-4xl '>Abdellah Edaoudi</h1>
            <div className='pb-3 space-x-3 text-gray-500'>
                <Link to={'/'} href="">About</Link>
                <Link to={'/'} href="">Project</Link>
                <Link to={'/'} href="">Portfolio</Link>
            </div>
            <div className='pb-3'>
            <li className='flex space-x-4 justify-center '>
              <a href='https://www.linkedin.com/in/abdellah-edaoudi-0bbba02a5/' target='_blank'><Linkedin /></a>
              <a href='https://github.com/AbdellahEdaoudi' target='_blank'><Github /></a>
              <a href='https://www.instagram.com/edaoudi_abdellah/' target='_blank'><Instagram /></a>
              <a href='https://www.youtube.com/channel/UCv3WeHVuX07Wo6WxWf5QTZw' target='_blank'><Youtube /></a>
            </li>
            </div>
            <div>
                <h6 className='text-[10px] text-gray-500 pt-10'>&copy; EdAbdellah All rigths reserved</h6>
            </div>
        </div>
    </section>
  )
}

export default Footer