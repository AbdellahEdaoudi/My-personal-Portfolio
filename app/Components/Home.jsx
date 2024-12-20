"use client";
import React, { useContext, useState } from "react";
import { MyContext } from "../Context/MyContext";
import Image from "next/image";

function Home() {
    const {EnOrFr,setEnOrFr}=useContext(MyContext)
    // const [EnOrFr, setEnOrFr] = useState("en")
  return (
    <section className="mx-4">
        <div className="flex md:flex-row flex-col-reverse items-center justify-center gap-2 md:gap-12 lg:gap-28 pt-4 md:py-7 duration-300">
            {/* Profile */}
        <div className="space-y-2 lg:space-y-3 flex flex-col items-center justify-center">
            <p className="text-[2.4rem]">
            {EnOrFr === "en" ? "Hi,I'm Abdellah Edaoudi" : "Hi,I'm Abdellah Edaoudi"}
            </p>
            <p className="text-[1.2rem text-[1.4rem]">
              {EnOrFr === "en" ? "🔷 Full Stack Developer 🔷" : "🔷 Développeur Full Stack 🔷"}
            </p>
            <p className="border-2 rounded-lg  md:w-[400px] text-justify p-2 bg-white shadow-md">
             {EnOrFr === "en" ? `
             I Specialize  in developing responsive websites and applications using the MERN stack,
              as well as advanced frameworks like Next.js and NestJS for optimal performance and scalability.
             `:`Je me spécialise dans le développement de sites web et d'applications réactives en utilisant la stack MERN,
              ainsi que des frameworks avancés tels que Next.js et NestJS pour des performances et une scalabilité optimales.`}
            </p>
            {/* Social Link */}
            <div className="flex space-x-4 justify-center py-2">
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
                href="https://x.com/Edaoudi_abde"
                target="_blank" className="hover:scale-105 duration-300"
              >
                {/* <Instagram /> */}
                <Image src={"/Icons/twit.svg"} width={30} height={10} /> 

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
          <Image src="/profile-pic.png" 
          className="imganim md:w-80  w-56 " 
          width={500} height={500} 
          /> 
          
    </div>
    </section>
  )
}

export default Home