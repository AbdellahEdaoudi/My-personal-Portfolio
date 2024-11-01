"use client"
import React, { useContext } from 'react';
import { BadgeCheck } from 'lucide-react';
import { MyContext } from '../Context/MyContext';


function Skills() {
  const { EnOrFr } = useContext(MyContext);

  const FrontEnd = [
    { name: "ReactJS", ds: "Intermediate" },
    { name: "NextJS", ds: "Intermediate" },
    { name: "TailwindCss", ds: "Intermediate" },
    { name: "BootStrap", ds: "Intermediate" },
    { name: "Shadcn/ui", ds: "Intermediate" },
    { name: "Git/Github", ds: "Intermediate" },
  ];

  const BackEnd = [
    { name: "NodeJS", ds: "Intermediate" },
    { name: "ExpressJs", ds: "Intermediate" },
    { name: "MongoDB", ds: "Intermediate" },
    { name: "Socket.io", ds: "Intermediate" },
  ];
  const Tools = [
    { name: "Docker", ds: "Intermediate" },
    { name: "Postman", ds: "Intermediate" },
    { name: "Studio3T", ds: "Intermediate" },
    { name: "Vercel", ds: "Intermediate" },
    { name: "VSCode", ds: "Intermediate" },
  ];
  const SoftSkillsEn = [
    { name: "Problem Solving", ds: "Intermediate" },
    { name: "Teamwork", ds: "Intermediate" },
    { name: "Communication", ds: "Intermediate" },
    { name: "Adaptability", ds: "Intermediate" },
  ];
  const SoftSkillsFr = [
    { name: "Résolution de problèmes", ds: "Intermédiaire" },
    { name: "Travail en équipe", ds: "Intermédiaire" },
    { name: "Communication", ds: "Intermédiaire" },
    { name: "Adaptabilité", ds: "Intermédiaire" },
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
      {/* Skills */}
      <div className='flex flex-wrap justify-around gap-6'>
        {/* Frontend developer */}
        <div className='text-center bg-white border md:px-10 px-5 flex flex-col items-center pt-7 pb-10 rounded-lg'>
          <h1 className='pb-5'>{content.frontendTitle}</h1>
          <div className='grid grid-cols-2 gap-5'>
            {FrontEnd.map((fr, i) => (
              <div key={i}>
                <span className='flex gap-2'><BadgeCheck /> <span>{fr.name}</span></span>
              </div>
            ))}
          </div>
        </div>
        {/* Backend developer */}
        <div className='text-center bg-white border md:px-10 px-5 flex flex-col items-center pt-7 pb-10 rounded-lg'>
          <h1 className='pb-5'>{content.backendTitle}</h1>
          <div className='grid grid-cols-2 gap-5'>
            {BackEnd.map((fr, i) => (
              <div key={i}>
                <span className='flex gap-2'><BadgeCheck /> <span>{fr.name}</span></span>
              </div>
            ))}
          </div>
        </div>
        {/* Tools  */}
        <div className='text-center bg-white border md:px-10 px-5 flex flex-col items-center pt-7 pb-10 rounded-lg'>
          <h1 className='pb-5'>{EnOrFr === "en" ? "Development Tools" : "Outils de Développement"}</h1>
          <div className='grid grid-cols-2 gap-5'>
            {Tools.map((tl, i) => (
              <div key={i}>
                <span className='flex gap-2'><BadgeCheck /> <span>{tl.name}</span></span>
              </div>
            ))}
          </div>
        </div>
        {/* SoftSkills  */}
        <div className='text-center bg-white border md:px-10 px-5 flex flex-col items-center pt-7 pb-10 rounded-lg'>
          <h1 className='pb-5'>{EnOrFr === "en" ? "Soft Skills" : "Soft Skills"}</h1>
          <div className='grid grid-cols-2 gap-5 '>
            {SoftSkills.map((tl, i) => (
              <div key={i} className='flex gap-1'>
                 <p><BadgeCheck /></p>
                 <p>{tl.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
