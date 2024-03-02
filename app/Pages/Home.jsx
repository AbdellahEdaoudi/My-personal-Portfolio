"use client";
import { Github, Linkedin, Instagram, Youtube } from "lucide-react";
import React, { useState } from "react";

export default function Home() {
  const [imageLoaded, setImageLoaded] = useState(true);

  return (
    <nav>
      <div className="md:flex md:items-center md:justify-center space-y-4 md:space-x-28 py-20 px-4 bg-gray-50">
        <div className="flex flex-col-reverse items-center md:flex-row md:space-x-36 ">
          <ul className="space-y-4">
            <li className=" text-5xl">Abdellah Edaoudi</li>
            <li className="text-2xl">~~~~~~~~ FullStack Developer</li>
            <li className="w-96">
              Digital development intern Full-Stack option, specializes in
              creating websites and responsive applications.
            </li>
            <li className="flex space-x-4 justify-center">
              <a
                href="https://www.linkedin.com/in/abdellah-edaoudi-0bbba02a5/"
                target="_blank"
              >
                <Linkedin />
              </a>
              <a href="https://github.com/AbdellahEdaoudi" target="_blank">
                <Github />
              </a>
              <a
                href="https://www.instagram.com/edaoudi_abdellah/"
                target="_blank"
              >
                <Instagram />
              </a>
              <a
                href="https://www.youtube.com/channel/UCv3WeHVuX07Wo6WxWf5QTZw"
                target="_blank"
              >
                <Youtube />
              </a>
            </li>
          </ul>
          {imageLoaded ? (
            <img
              src="./profile-pic.png"
              className="rounded-md pb-5 imganim"
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
