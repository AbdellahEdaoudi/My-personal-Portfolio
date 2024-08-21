"use client"
import Image from "next/image";
import React, { useContext } from "react";
import { MyContext } from "../Context/MyContext";
import {projectsEn,projectsFr} from './DataProject'

function Projects() {
  const { EnOrFr } = useContext(MyContext);
  const projects = EnOrFr === "en" ? projectsEn : projectsFr;
  return (
    <section id="prtfl" className="bg-gray-50 pb-7 pt-4">
      <div className="text-center pb-5 ">
        <p className="text-4xl font-bold">Projects</p>
        <p className="text-gray-400 text-sm">Most recent work</p>
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
              />
              <div className="flex justify-center items-center">
                <h1 className="p-3 underline">{p.title}</h1>
                <a
                  href={p.websiteUrl}
                  className="flex items-center  pr-2"
                  target="_blank"
                >
                  <img src="Projects/WebSite.png" width={20} alt="WebSite" />
                  <span className="ml-2 text-sm hover:text-blue-500">
                    Visit Website
                  </span>
                </a>
              </div>
              <h2 className="px-3 text-[12px] pb-2   text-gray-500">
                {p.description}
              </h2>
              <div className="mx-4 cursor-pointer flex justify-between items-center">
                <a
                  href={p.githubUrl}
                  className="flex items-center pr-2 float-start mx-"
                  target="_blank"
                >
                  <img src="Projects/github.png" width={24} alt="GitHub" />
                  <span className=" ml-2 text-sm  hover:text-blue-500">
                    View on GitHub
                  </span>
                </a>
                {p.githubUrls && (
                  <a
                  href={p.githubUrls}
                  className="flex items-center pr-2 float-start mx-"
                  target="_blank"
                >
                  <img src="Projects/github.png" width={24} alt="GitHub" />
                  <span className=" ml-2 text-sm  hover:text-blue-500">
                    Server
                  </span>
                </a>
                )}
                
                
                {/* <a
                  href={p.Rapport}
                  className={`text-red-700 ${p.Rapport === " " && "hidden"}`}
                  title="Download Rapport"
                  download="Rapport.pdf"
                >
                  Rapport de Projet
                </a> */}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Projects;
