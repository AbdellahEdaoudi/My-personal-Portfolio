"use client"
import { useState, useContext } from 'react';
import Image from 'next/image';
import { MyContext } from '../Context/MyContext';
import { projectsEn, projectsFr } from './data/DataProject';
import { useRouter } from 'next/navigation';
import { Github, Globe } from 'lucide-react';

function Projects() {
  const { EnOrFr } = useContext(MyContext);
  const projects = EnOrFr === 'en' ? projectsEn : projectsFr;
  // Read more
  const [readMoreStates, setReadMoreStates] = useState(projects.map(() => false));
  const toggleReadMore = (index) => {
    setReadMoreStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <section id="prtfl" className="bg-gray-50 pb-7 pt-4">
      <div className="text-center pb-5 ">
        <p className="text-4xl font-bold">{EnOrFr === "en" ? "Projects" : "Projets"}</p>
        <p className="text-gray-400 text-sm">{EnOrFr === "en" ? "Most recent work" : "Travaux les plus récents"}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 justify-items-center">
        {projects.map((p, i) => (
          <div key={i} className="bg-white flex flex-col w-80 hover:scale-105 border duration-300 rounded-lg shadow-lg pb-4 mb-5">
            <Image width={1000} height={200}
              className="w-96 rounded-md border-b-2 cursor-pointer"
              src={p.image}
              alt="E-commerce App"
              onClick={() => window.open(p.websiteUrl, '_blank')}
            />
            <div>
              <div className="flex justify-around items-center px-1 text-[16px] p-3">
                <h1 className=" underline ">{p.title}</h1>
                <a href={p.websiteUrl} className="flex items-center pr-1 hover:scale-105 duration-300 hover:text-sky-500 hover:bg-sky-50 border p-1 rounded-md bg-gray-100" target="_blank">
                  <Image src="/Projects/WebSite.png" width={17} height={17} alt="WebSite" />
                  <span className="ml-1 text-sm">Live Demo</span>
                </a>
              </div>
              {/* Description */}
              <h2 onClick={() => toggleReadMore(i)} className="px-3 py-2 text-[12px] border  text-gray-500">
                {readMoreStates[i] || p.description.length <= 200 ? (
                  p.description
                ) : (
                  <>
                    {p.description.substring(0, 200)}...
                    <button  className="text-blue-500 ml-2">
                      Read more
                    </button>
                  </>
                )}
              </h2>
              {/* technologies */}
               <div className="flex flex-wrap gap-2 justify-around py-2 px-1 border">
                 {p.technologies.map((tech, i) => (
                   <div key={i} className="flex items-center gap-1 bg-gray-100 rounded-full px-1 py-0.5 shadow-sm hover:shadow-md transition-shadow duration-300 text-xs">
                     <Image src={tech.logo} alt={tech.name} width={18} height={18} className="rounded-full" />
                     <p className="text-xs text-gray-700">{tech.name}</p>
                   </div>
                 ))}
               </div>
              {/* githubUrl */}
               <div className="flex justify-around items-center mt-3 space-x-4">
                 {p.githubUrl && (
                 <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-300 p-2 rounded-md border border-gray-300 hover:border-blue-500 shadow-sm hover:shadow-md">
                   <Image src={"/Icons/github.svg"} alt={"Github Logo"} width={25} height={25} className="mr-2 rounded-full" />
                   <span className="text-sm">
                   {p.type === "backend" ? "View on GitHub" : "Frontend"}
                   </span>
                 </a>
                 )}
                 {p.githubUrls && (
                   <a href={p.githubUrls} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-300 p-2 rounded-md border border-gray-300 hover:border-blue-500 shadow-sm hover:shadow-md">
                     <Image src={"/Icons/github.svg"} alt={"Github Logo"} width={25} height={25} className="mr-2 rounded-full" />
                     <span className="text-sm">Backend</span>
                   </a>
                 )}
               </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;

