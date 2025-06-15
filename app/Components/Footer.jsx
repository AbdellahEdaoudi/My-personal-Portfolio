"use client"
import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MyContext } from '../Context/MyContext'
function Footer() {
  const {EnOrFr}=useContext(MyContext)
  const LinksHeaderEn = [
    { name: "About", path: "/About" },
    { name: "Skills", path: "/Skills" },
    { name: "Projects", path: "/Projects" },
];

const LinksHeaderFr = [
    { name: "À propos", path: "/About" },
    { name: "Compétences", path: "/Skills" },
    { name: "Projets", path: "/Projects" },
];
const LinksFooter = EnOrFr === "en" ? LinksHeaderEn : LinksHeaderFr;

  return (
    <section className='border-t flex  justify-center items-center text-center h-60'>
        <div>
            <h1 className='pb-3 text-4xl '>Abdellah Edaoudi</h1>
            <div className='pb-3 space-x-3 text-gray-500'>
            {LinksFooter.map((l,i)=>{
              return(
                <Link key={i} href={l.path} >{l.name}</Link>
              )
            })}
            </div>
            <div className=''>
            <li className='flex space-x-4 justify-center '>
              <a href='https://www.linkedin.com/in/abdellah-edaoudi-0bbba02a5/' target='_blank'>
                <Image src={"/Icons/link.svg"} width={30} height={10} alt="LinkedIn" /> 
              </a>
              <a href='https://github.com/AbdellahEdaoudi' target='_blank'>
                <Image src={"/Icons/github.svg"} width={30} height={10} alt="GitHub" /> 
              </a>
              <a href='https://www.youtube.com/channel/UCv3WeHVuX07Wo6WxWf5QTZw' target='_blank'>
                <Image src={"/Icons/yt.svg"} width={30} height={10} alt="YouTube" /> 
              </a>
              <a
                href="https://x.com/Edaoudi_abde"
                target="_blank" className="hover:scale-105 duration-300"
              >
                <Image src={"/Icons/twit.svg"} width={30} height={10} alt="Twitter" /> 
              </a>
              <a href='https://www.instagram.com/edaoudi_abdellah/' target='_blank'>
                <Image src={"/Icons/ins.svg"} width={30} height={10} alt="Instagram" /> 
              </a>
            </li>
            </div>
            <div>
                <h6 className='text-[10px] text-gray-500 pt-5'>&copy; EdAbdellah All rigths reserved</h6>
            </div>
        </div>
    </section>
  )
}

export default Footer
