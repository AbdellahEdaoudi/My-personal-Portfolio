"use client";
import { Award, Briefcase, Headset, StickyNote } from "lucide-react";
import { useContext } from "react";
import { MyContext } from "../Context/MyContext";
import Image from "next/image";
import { aboutContentEn, aboutContentFr } from "./data/DataAbout";
function About() {
  const { EnOrFr } = useContext(MyContext);
  const content = EnOrFr === "en" ? aboutContentEn : aboutContentFr;

  return (
    <section id="about" className="bg-gray-50 pt-4">
      <div className="text-center">
        <p className="text-4xl font-bold">{content.title}</p>
        <p className="text-gray-400 text-sm">{content.subtitle}</p>
      </div>
      <div className="md:flex md:items-center md:justify-center space-y-4 md:space-x-28 pt-2 md:pt-7 px-4">
        <div className="flex flex-col-reverse  md:items-start items-center md:flex-row gap-6 md:gap-28">
         <Image src="/profile-pic.png" 
                   className="imganim md:w-80  w-56 " 
                   width={500} height={500} 
                   /> 
          <div className="space-y-4">
            <ul className="flex gap-4 items-center justify-center pt-4">
              <li className="flex flex-col items-center text-center bg-white p-4 rounded-md border">
                <Award />
                <span className="text-[13px]">{content.experience}</span>
                <span className="text-[10px] text-gray-400">
                  {content.experienceDetail}
                </span>
              </li>
              <li className="flex flex-col items-center text-center bg-white py-4 md:px-4 px-2 rounded-md border">
                <Briefcase />
                <span className="text-[13px]">{content.completed}</span>
                <span className="text-[10px] text-gray-400">
                  {content.completedDetail}
                </span>
              </li>
              <li className="flex flex-col items-center text-center bg-white px-5 duration-300 md:px-6 py-4 rounded-md border">
                <Headset />
                <span className="text-[13px]">{content.support}</span>
                <span className="text-[10px] text-gray-400">
                  {content.supportDetail}
                </span>
              </li>
            </ul>
            <p className="text-justify md:w-[400px] text-gray-700 px-2">
              {content.description}
            </p>
            <div className="flex items-center justify-center">
              <a
                href={content.Cv}
                target="_blank"
                // download={content.Cv}
                className="flex p-3 rounded-lg bg-black text-white gap-2"
              >
                {content.downloadCv} <StickyNote />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
