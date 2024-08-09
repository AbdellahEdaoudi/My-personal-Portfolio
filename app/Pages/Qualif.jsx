"use client";
import React, { useState } from "react";
import { GraduationCap, Briefcase, Download } from "lucide-react";
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
        <div className={` md:flex  justify-center md:space-x-10 md:space-y-0 space-y-5`}>
          {/* CMC */}
          <div className="text-center bg-white border w-[380px] px-0.5 flex flex-col items-center pt-4 pb-5 shadow-lg rounded-lg">
            <h1 className="pb-1">
              <p className="mx-5">2024 <br /> Diploma in digital development Full Stack option in
              Cities of Professions and Skills.{" "}</p>
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
          <div className="text-center bg-white border w-[380px] px-0.5 flex flex-col items-center pt-4  shadow-lg rounded-lg">
            <h1 className="pb-2">
              <p className="mx-1">2022 <br /> Bachelor of Physical Sciences at Babe Ahmed High
              School</p>
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
        <div
          className={`md:flex  justify-center md:space-x-10 md:space-y-0 space-y-5`}
        >
          {/* STAGE */}
<div className="bg-white border px-10 md:flex items-start pt-7 pb-10 shadow-lg rounded-lg">
  <div className="flex items-center justify-center">
    <img src="./acad.jpg" alt="acadImg" />
  </div>
  <div className="pt-5">
    <h1 className="text-center text-red-500 pb-4">Internship</h1>
    <ul>
      <li className="pl-5">
        <b>Location:</b> Regional Academy of Education and Training
      </li>
      <li className="pl-5">
        <b>Description:</b> <br />
        <p className="">
          During this internship, I had the opportunity to work on a web development project for task management. My main role was to design and develop a functional web application using React JS, Node JS technology. I also integrated the Tailwind CSS style library. I worked closely with the team to understand project requirements and deliver an efficient and user-friendly solution.
        </p>
      </li>
      {/* <a href="/AttestaiondeStage.pdf" download className="float-right bg-green-500 p-2 rounded-md">
        Attestation De Stage
      </a> */}
    </ul>
  </div>
</div>

        </div>
      </div>
    </section>
  );
}
export default Qualif;
