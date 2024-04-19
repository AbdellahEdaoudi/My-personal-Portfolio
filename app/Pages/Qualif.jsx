"use client";
import React, { useState } from "react";
import { GraduationCap, Briefcase } from "lucide-react";
function Qualif() {
  const [Qlf, setQlf] = useState(false);
  return (
    <section
      id="Qlf"
      className="bg-gray-50 flex  flex-col items-center  px-10 pb-10"
    >
      <div className="text-center pb-10 ">
        <p className="text-4xl font-bold">Qualification</p>
        <p className="text-gray-400 text-sm">My personal journey</p>
        <div className="flex gap-5 pt-5">
          <h1
            onClick={() => {
              Qlf ? setQlf(!Qlf) : setQlf(Qlf);
            }}
            className="flex  gap-3 cursor-grabbing hover:drop-shadow-lg"
          >
            <GraduationCap /> Education
          </h1>
          <h1
            onClick={() => {
              Qlf ? setQlf(Qlf) : setQlf(!Qlf);
            }}
            className="flex  gap-3 cursor-grabbing hover:drop-shadow-lg"
          >
            <Briefcase /> Experience
          </h1>
        </div>
      </div>
      {/* Qlf Education */}
      <div className={`${Qlf ? "hidden" : "block"}`}>
        <div
          className={` md:flex  justify-center md:space-x-10 md:space-y-0 space-y-5`}
        >
          {/* CMC */}
          <div className="text-center bg-white border w-[380px] px-0.5 flex flex-col items-center pt-7 pb-10 shadow-lg rounded-lg">
            <h1 className="pb-5">
              <p>2024</p> Trainee at the second year level in digital
              development full stack option in the cities of trades and skills{" "}
              <a
                className="text-blue-500"
                target="_blank"
                href="https://www.cmc.ac.ma/fr"
              >
                (Cmc)
              </a>
              .
            </h1>
            <div className=" ">
              <div className="space-y-4 border-2">
                <img
                  alt="the cities of trades and skills"
                  src="https://orientation-chabab.com/images/cmc-maroc.png"
                ></img>
              </div>
            </div>
          </div>
          {/* BAB AHMED */}
          <div className="text-center bg-white border w-[380px] px-0.5 flex flex-col items-center pt-7 pb-10 shadow-lg rounded-lg">
            <h1 className="pb-5">
              <p>2022</p> Bachelor of Physical Sciences at Babe Ahmed High
              School
            </h1>
            <div className=" ">
              <div className="space-y-4 pt-6 ">
                <img src="./BabAhmedImage.jpg" alt=" Babe Ahmed High School" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Qlf Experience */}
      <div className={`${Qlf ? "block" : "hidden"}`}>
      <div className={`md:flex  justify-center md:space-x-10 md:space-y-0 space-y-5`}>
          {/* STAGE */}
          <div className=" bg-white border  px-10 md:flex  items-cente pt-7 pb-10 shadow-lg rounded-lg">
              <div className=" flex items-center justify-center ">
                <img src="./acad.jpg" alt="acadImg"  />
              </div>
              <div className="pt-5 ">
                <h1 className="text-center text-red-500 pb-4">Stage en Développement Web</h1>
                <ul>
                  <li className="pl-5"><b>Lieu :</b> Académie Régionale d'Éducation et de Formation</li>
                  <li className="pl-5"> Du 2024/3/1 au 2024/3/31</li>
                  <li className="pl-5"><b>Description : <br /> </b> 
                  <p className="">
                  Durant ce stage, j'ai eu l'opportunité de travailler sur un projet de développement web pour la gestion des tâches. Mon rôle principal était de concevoir et développer une application web fonctionnelle utilisant la technologie React JS,Node JS. J'ai également intégré la bibliothèque de styles Tailwind CSS. J'ai travaillé en étroite collaboration avec l'équipe pour comprendre
                   les exigences du projet et livrer une solution efficace et conviviale.
                  </p>
                  </li>
                </ul>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Qualif;
