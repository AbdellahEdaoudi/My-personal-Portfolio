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
import Image from "next/image";
import { QualifEn, QualifFr } from "../Components/data/Data.Qualif";

function Qualif() {
  const [Qlf, setQlf] = useState(false);
  const { EnOrFr } = useContext(MyContext);
  const Qualif = EnOrFr === "en" ? QualifEn : QualifFr;
  return (
    <div className={` md:flex  justify-center md:space-x-10 md:space-y-0 space-y-5`}>
          {/* CMC */}
          <div className=" hover:scale-105 duration-300 bg-white border md:w-[380px] px-0.5 flex flex-col items-center pt-4 pb-5 shadow-lg rounded-lg">
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
          <div className="hover:scale-105 duration-300 text-center bg-white border md:w-[380px] px-0.5 flex flex-col items-center pt-4  shadow-lg rounded-lg">
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
  )
}

export default Qualif