"use client";
import { Github, Linkedin, Instagram, Youtube } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../Context/MyContext";
import Image from "next/image";

export default function Home() {
  const [imageLoaded, setImageLoaded] = useState("./profile-pic.png");
  const {EnOrFr,setEnOrFr}=useContext(MyContext)
  

  return (
    <nav>
      <div className="md:flex md:items-center md:justify-center space-y-4 md:space-x-28 py-12 px-4 bg-gray-50">
        <div className="flex flex-col-reverse items-center md:flex-row md:space-x-36 ">
          <ul className="space-y-4">
            <li className=" text-5xl">Abdellah Edaoudi</li>
            <li className="text-2xl">~~~~~~~~ MERN Stack Developer</li>
            <li className="w-96">
             {EnOrFr === "en" ? `
             Digital Developer, Mern-Stack Option, adept at creating responsive websites and applications
             using Nextjs(Reactjs),Tailwind CSS and Node.js.
             `:`Développeur Digital, Mern-Stack Option, adepte de la création de sites Web 
             et d'applications réactifs en utilisant Nextjs (Reactjs), Tailwind CSS et Node.js.`}
            </li>
            <li className="flex space-x-4 justify-center">
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
            </li>
          </ul>
          {imageLoaded ? (
            <img
              src={imageLoaded}
              className="rounded-md  pb-5 imganim"
              alt="Profile Picture"
              width={325}
              height={300}
            />
          ) : (
            <div
              className="rounded-md pb-5 imganim animate-pulse bg-gray-500"
              style={{ width: 325, height: 300 }}
            ></div>
          )}
        </div>
      </div>
    </nav>
  );
}
