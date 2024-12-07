"use client"
import Image from "next/image";
import React, { useContext } from "react";
import { MyContext } from "../Context/MyContext";
import {projectsEn,projectsFr} from './data/DataProject'
import { useRouter } from "next/navigation";
import { Github, Globe } from "lucide-react";

function Projects() {
  const { EnOrFr } = useContext(MyContext);
  const projects = EnOrFr === "en" ? projectsEn : projectsFr;
  return (
    <section id="prtfl" className="bg-gray-50 pb-7 pt-4">
      <div className="text-center pb-5 ">
        <p className="text-4xl font-bold">{EnOrFr === "en" ? "Projects" : "Projets"}</p>
        <p className="text-gray-400 text-sm">{EnOrFr === "en" ? "Most recent work" : "Travaux les plus récents"}</p>
      </div>
      {/* Projects */}
      <div className="flex flex-wrap justify-around  mx-3   ">
        {projects.map((p, i) => {
          return (
            <div
              key={i}
              className="bg-white flex  flex-col  w-80 hover:scale-105 duration-300  rounded-lg shadow-lg pb-4 mb-5"
            >
              <Image width={1000} height={200}
                className="w-96 rounded-md border-b-2 cursor-pointer"
                src={p.image}
                alt="E-commerce App"
                onClick={() => window.open(p.websiteUrl, '_blank')} 
              />
              <div>
                <div className="flex justify-around items-center">
                <h1 className="p-3 underline">{p.title}</h1>
                <a
                  href={p.websiteUrl}
                  className="flex items-center  pr-2"
                  target="_blank"
                >
                  <Image src="/Projects/WebSite.png" width={20} height={20} alt="WebSite" />
                  <span className="ml-2 text-sm hover:text-blue-500">
                  Live Demo
                  </span>
                </a>
              </div>
              <h2 className="px-3 text-[12px] pb-2    text-gray-500">
                {p.description}
              </h2>
              <div className="flex justify-around items-center">
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-300 border p-2 rounded-md"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    <span className="text-sm">Frontend</span>
                  </a>
                  {p.githubUrls && (
                    <a
                      href={p.githubUrls}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-300 border p-2 rounded-md"
                    >
                      <Github className="w-5 h-5 mr-2" />
                      <span className="text-sm">Backend</span>
                    </a>
                  )}
              </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Projects;
