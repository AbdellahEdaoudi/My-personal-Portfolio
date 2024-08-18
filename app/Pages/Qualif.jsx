"use client";
import React, { useContext, useState } from "react";
import { GraduationCap, Briefcase, Download } from "lucide-react";
import { MyContext } from "../Context/MyContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {QualifEn,QualifFr} from "./Data.Qualif"
import Image from "next/image";

function Qualif() {
  const [Qlf, setQlf] = useState(false);
  const { EnOrFr } = useContext(MyContext);
  const Qualif = EnOrFr === "en" ? QualifEn : QualifFr;

  return (
    <section
      id="Qlf"
      className="bg-gray-50 flex  flex-col items-center pt-4  px-10 pb-10"
    >
      <div className="text-center pb-10 ">
        <p className="text-4xl font-bold">{Qualif.title}</p>
        <p className="text-gray-400 text-sm">{Qualif.subtitle}</p>
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
          <div className=" hover:scale-105 duration-300 bg-white border w-[380px] px-0.5 flex flex-col items-center pt-4 pb-5 shadow-lg rounded-lg">
            <div className="pb-1">
              <p className="mx-5 "><span className="underline text-gray-700">2024</span> : {Qualif.dip}{" "}
              <a
                className="text-blue-500"
                target="_blank"
                href="https://www.cmc.ac.ma/fr"
              >
                (Cmc).
              </a>
              </p>
              {/* Alert Dialog */}
              <div className="hover:text-sky-500  flex justify-end mr-10">
              <AlertDialog >
                <AlertDialogTrigger>
                  <div className="underline hover:scale-105 duration-300" >{EnOrFr === "en" ? "Show My Experience" : "Montrer mon expérience"}</div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    {/* <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle> */}
                    <AlertDialogDescription>
                    <div
                      dangerouslySetInnerHTML={{ __html: Qualif.expCmc }}
                      className=" text-start text-black overflow-y-auto max-h-96">
                      
                    </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              </div>
            </div>
              <div className="space-y-7">
                <img
                  alt="the cities of trades and skills"
                  src="/cmc-maroc.png"
                ></img>
              </div>
          </div>
          {/* BAB AHMED */}
          <div className="hover:scale-105 duration-300 text-center bg-white border w-[380px] px-0.5 flex flex-col items-center pt-4  shadow-lg rounded-lg">
            <h1 className="pb-2">
              <p className="mx-1"><span className="underline text-gray-700">2022</span> : {Qualif.bac}</p>
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
    <Image  src="/acad.jpg" width={1000} height={500} alt="acadImg" />
  </div>
  <div className="pt-3 ml-10">
    <h1 className="text-center text-red-500 pb-4">{EnOrFr === "en" ? "Internship" :"Stage"}</h1>
        <b>Location: </b><span className="text-gray-950">{Qualif.exL}</span> <br />
        <b>Description: </b><span className="text-gray-800">{Qualif.dc}</span>
      {/* <a href="/AttestaiondeStage.pdf" download className="float-right bg-green-500 p-2 rounded-md">
        Attestation De Stage
      </a> */}
  </div>
</div>

        </div>
      </div>
    </section>
  );
}
export default Qualif;
