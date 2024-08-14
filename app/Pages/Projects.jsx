import Image from "next/image";
import React from "react";

function Projects() {
  const projects = [
    {
      title: "E-commerce App",
      image: "/Projects/EcomApp.png",
      websiteUrl: "https://edmarkeet.vercel.app",
      githubUrl: "https://github.com/AbdellahEdaoudi/Ecommerce-ReactApp.git",
      description:
        "ReactJS and TailwindCSS App designed to empower users with a streamlined shopping experience thanks to its intuitive interface and seamless navigation.",
      Rapport: " ",
    },
    {
      title: "Hotel App",
      image: "/Projects/HotelDash.png",
      websiteUrl: "https://edhotel.vercel.app/",
      githubUrl: "https://github.com/AbdellahEdaoudi/EdHotel.git",
      description:
        "Hotel management application built using Next.js, Node.js, and Tailwind CSS. It seamlessly handles reservations, user authentication, and payments via Stripe, and includes a comprehensive dashboard for managing hotel operations.",
      Rapport: "./Rapport.pdf",
    },
    {
      title: "Chat App",
      image: "/Projects/ChatApp.png",
      websiteUrl: "https://edchatflow.vercel.app",
      githubUrl: "https://github.com/AbdellahEdaoudi/ChatApp.git",
      description:
        "Chat application built with Next.js, Tailwind CSS, Node.js,MongoDB and Socket.io. Features include user authentication with Clerk, real-time messaging, and intuitive user interface.",
      Rapport: " ",
    },
    {
      title: "Qrcode App",
      image: "/Projects/EdQrcode.png",
      websiteUrl: "https://edqrcode.vercel.app",
      githubUrl: "https://github.com/AbdellahEdaoudi/EdQrcode.git",
      description: `A QR Code management app that allows you to create QR codes
       with custom logos, read QR codes from images, and scan QR codes directly
        via the camera to display data instantly. It features an attractive and
         user-friendly interface with gradient colors and a design that adapts to various devices.`,
      Rapport: " ",
    },
  ];
  return (
    <section id="prtfl" className="bg-gray-50 pb-7 pt-2">
      <div className="text-center pb-5 ">
        <p className="text-4xl font-bold">Projects</p>
        <p className="text-gray-400 text-sm">Most recent work</p>
      </div>
      {/* Projects */}
      <div className="grid grid-cols-1   md:grid-cols-3  mx-3   justify-items-center  ">
        {projects.map((p, i) => {
          return (
            <div
              key={i}
              className="bg-white flex  flex-col justify-between w-80 hover:scale-105 duration-300  rounded-lg shadow-lg pb-4 mb-5"
            >
              <Image width={200} height={200}
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
              <div className="mx-4 cursor-pointer">
                <a
                  href={p.githubUrl}
                  className="flex items-center pr-2 float-start mx-"
                  target="_blank"
                >
                  <img src="Projects/github.png" width={24} alt="GitHub" />
                  <span className="ml-1 text-sm hover:text-blue-500">
                    View on GitHub
                  </span>
                </a>
                <a
                  href={p.Rapport}
                  className={`text-red-700 ${p.Rapport === " " && "hidden"}`}
                  title="Download Rapport"
                  download="Rapport.pdf"
                >
                  Rapport de Projet
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Projects;
