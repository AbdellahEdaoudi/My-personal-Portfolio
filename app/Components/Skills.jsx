"use client"
import React, { useContext } from "react";
import { BadgeCheck } from "lucide-react";
import { FaReact, FaNodeJs, FaGitAlt, FaDocker } from "react-icons/fa";
import { SiNextdotjs, SiMongodb, SiTailwindcss, SiBootstrap, SiPostman } from "react-icons/si";
import { MyContext } from "../Context/MyContext";
import Image from "next/image";

function Skills() {
  const { EnOrFr } = useContext(MyContext);

  const FrontEnd = [
    { name: "NextJS", logo: <SiNextdotjs className="text-black" /> },
    { name: "ReactJS", logo: <FaReact className="text-blue-500" /> },
    { name: "TailwindCss", logo: <SiTailwindcss className="text-teal-500" /> },
    { name: "BootStrap", logo: <SiBootstrap className="text-purple-600" /> },
    { name: "Shadcn/ui", logo: <Image height={20} width={20} src={'/Skills/shadcn.png'} alt="Shadcn UI" className="rounded-full" /> },
  ];

  const BackEnd = [
    { name: "NestJS", logo: <Image height={20} width={20} src={'/Skills/Nestjs.png'} alt="NestJS" className="rounded-full" /> },
    { name: "NodeJS", logo: <FaNodeJs className="text-green-500" /> },
    { name: "ExpressJs", logo: <Image height={20} width={20} src={'/Skills/ExpressJs.png'} alt="ExpressJS" className="rounded-full" /> },
    { name: "MongoDB", logo: <SiMongodb className="text-green-700" /> },
    { name: "Socket.io", logo: <Image height={20} width={20} src={'/Skills/Socket.io.png'} alt="Socket.io" className="rounded-full" /> },
  ];

  const Tools = [
    { name: "Git/Github", logo: <FaGitAlt className="text-orange-500" /> },
    { name: "Docker", logo: <FaDocker className="text-blue-400" /> },
    { name: "Postman", logo: <SiPostman className="text-orange-400" /> },
    { name: "Studio3T", logo: <Image height={20} width={20} src={'/Skills/Studio3T.png'} alt="Studio3T" className="rounded-full" /> },
    { name: "VSCode", logo: <Image height={20} width={20} src={'/Skills/VSCode.png'} alt="VSCode" className="rounded-full" /> },
    { name: "Vercel", logo: <Image height={20} width={20} src={'/Skills/Vercel.png'} alt="Vercel" className="rounded-full" /> },
  ];

  const SoftSkillsEn = [
    { name: "Problem Solving", logo: <Image height={30} width={30} src={'/Skills/Problem Solving.png'} alt="Problem Solving" className="rounded-full" /> },
    { name: "Teamwork", logo: <Image height={40} width={40} src={'/Skills/Teamwork.jpg'} alt="Teamwork" className="rounded-full" /> },
    { name: "Communication", logo: <Image height={40} width={40} src={'/Skills/Communication.png'} alt="Communication" className="rounded-full" /> },
    { name: "Adaptability", logo: <Image height={23} width={23} src={'/Skills/Adaptability.png'} alt="Adaptability" /> },
  ];

  const SoftSkillsFr = [
    { name: "Résolution de problèmes", logo: <Image height={30} width={30} src={'/Skills/Problem Solving.png'} alt="Résolution de problèmes" className="rounded-full" /> },
    { name: "Travail en équipe", logo: <Image height={40} width={40} src={'/Skills/Teamwork.jpg'} alt="Travail en équipe" className="rounded-full" /> },
    { name: "Communication", logo: <Image height={40} width={40} src={'/Skills/Communication.png'} alt="Communication" className="rounded-full" /> },
    { name: "Adaptabilité", logo: <Image height={23} width={23} src={'/Skills/Adaptability.png'} alt="Adaptabilité" /> },
  ];

  const contentEn = {
    title: "Skills",
    subtitle: "My technical level",
    frontendTitle: "Frontend Developer",
    backendTitle: "Backend Developer",
  };

  const contentFr = {
    title: "Compétences",
    subtitle: "Mon niveau technique",
    frontendTitle: "Développeur Frontend",
    backendTitle: "Développeur Backend",
  };

  const content = EnOrFr === "en" ? contentEn : contentFr;
  const SoftSkills = EnOrFr === "en" ? SoftSkillsEn : SoftSkillsFr;

  return (
    <section id='skill' className='bg-gray-50 pt-4 pb-16 md:mt-0 mt-5 flex flex-col items-center md:px-10 px-5'>
      <div className='text-center pb-10'>
        <p className='text-4xl font-bold'>{content.title}</p>
        <p className='text-gray-400 text-sm'>{content.subtitle}</p>
      </div>
      <div className='grid md:grid-cols-2 grid-cols-1 gap-6 md:mx-32'>
        {/* Frontend developer */}
        <div className='hover:scale-105 transition duration-300 text-center bg-white border-2 md:px-10 px-5 flex flex-col items-center pt-7 pb-10 rounded-lg shadow-lg'>
          <h1 className='pb-5'>{content.frontendTitle}</h1>
          <div className='grid grid-cols-2 gap-5'>
            {FrontEnd.map((fr, i) => (
              <div key={i} className="flex items-center justify-center border rounded-lg p-1 gap-2 bg-gray-100 hover:bg-gray-200">
                <span>{fr.logo}</span>
                <span className='text-gray-700'>{fr.name}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Backend developer */}
        <div className='hover:scale-105 transition duration-300 text-center bg-white border-2 md:px-10 px-5 flex flex-col items-center pt-7 pb-10 rounded-lg shadow-lg'>
          <h1 className='pb-5'>{content.backendTitle}</h1>
          <div className='grid grid-cols-2 gap-5'>
            {BackEnd.map((fr, i) => (
              <div key={i} className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-lg p-1">
                <span>{fr.logo}</span>
                <span className='text-gray-700'>{fr.name}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Tools */}
        <div className='hover:scale-105 transition duration-300 text-center bg-white border-2 md:px-10 px-5 flex flex-col items-center pt-7 pb-10 rounded-lg shadow-lg'>
          <h1 className='pb-5'>{EnOrFr === "en" ? "Development Tools" : "Outils de Développement"}</h1>
          <div className='grid grid-cols-2 gap-5'>
            {Tools.map((tl, i) => (
              <div key={i} className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-lg p-1">
                <span>{tl.logo}</span>
                <span className='text-gray-700'>{tl.name}</span>
              </div>
            ))}
          </div>
        </div>
        {/* SoftSkills */}
        <div className='hover:scale-105 transition duration-300 text-center bg-white border-2 md:px-10 px-5 flex flex-col items-center pt-7 pb-10 rounded-lg shadow-lg'>
          <h1 className='pb-5'>{EnOrFr === "en" ? "Soft Skills" : "Soft Skills"}</h1>
          <div className='flex flex-wrap items-center justify-center gap-5'>
            {SoftSkills.map((tl, i) => (
              <div key={i} className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-lg p-1">
                <span className="flex-shrink-0">{tl.logo}</span>
                <span className='text-gray-700'>{tl.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
