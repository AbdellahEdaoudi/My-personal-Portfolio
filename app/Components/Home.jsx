"use client";
import React, { useContext, useState } from "react";
import { MyContext } from "../Context/MyContext";
import Image from "next/image";

function Home() {
    const {EnOrFr,setEnOrFr}=useContext(MyContext)
  return (
    <section className="mx-4 ">
        <div className="bg-gray-50 py-5 md:py-12 flex md:flex-row flex-col-reverse items-center justify-center gap-6 md:gap-32 ">
            {/* Profile */}
        <div className="  space-y-4  flex flex-col items-center justify-center">
            <p className="text-5xl">Abdellah Edaoudi</p>
            <p className="text-[22px] sm:text-2xl md:text-2xl">🔷 MERN Stack Developer 🔷</p>
            <p className="md:w-96 sm:w-96 ">
             {EnOrFr === "en" ? `
             Digital Developer, Mern-Stack Option, adept at creating responsive websites and applications
             using Nextjs , Reactjs , Tailwind CSS , Shadcn/ui and Node.js.
             `:`Développeur Digital, Mern-Stack Option, adepte de la création de sites Web 
             et d'applications réactifs en utilisant Nextjs , Reactjs , Tailwind CSS et Node.js.`}
            </p>
            <div className="flex space-x-4 justify-center">
              <a
                href="https://www.linkedin.com/in/abdellah-edaoudi-0bbba02a5/"
                target="_blank" className="hover:scale-105 duration-300"
              >
                {/* <Linkedin /> */}
                <Image src={"/Icons/link.svg"} width={30} height={10} /> 
              </a>
              <a 
              href="https://github.com/AbdellahEdaoudi" 
              target="_blank" className="hover:scale-105 duration-300"
              >
                {/* <Github /> */}
                <Image src={"/Icons/github.svg"} width={30} height={10} /> 
              </a>
              <a
                href="https://www.youtube.com/channel/UCv3WeHVuX07Wo6WxWf5QTZw"
                target="_blank" className="hover:scale-105 duration-300"
              >
                {/* <Youtube /> */}
                <Image src={"/Icons/yt.svg"} width={30} height={10} /> 

              </a>
              <a
                href="https://www.instagram.com/edaoudi_abdellah/"
                target="_blank" className="hover:scale-105 duration-300"
              >
                {/* <Instagram /> */}
                <Image src={"/Icons/ins.svg"} width={30} height={10} /> 

              </a>
            </div>
        </div>
            {/* Image */}
          <div className='flex-shrink-0  flex items-center justify-center'>
          <Image src="/profile-pic.png" className="imganim" width={325} height={340} /> 
          </div>
    </div>
    </section>
  )
}

export default Home