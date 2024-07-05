import React from "react";
function Portfolio() {
  const projects = [
    {
      title: "E-commerce App",
      image: "Portfolio/Ecom App.png",
      websiteUrl: "https://edmarkeet.vercel.app",
      githubUrl: "https://github.com/AbdellahEdaoudi/Ecommerce-ReactApp.git",
      description:
        "ReactJS and TailwindCSS App designed to empower users with a streamlined shopping experience thanks to its intuitive interface and seamless navigation.",
        Rapport:" "
    },
    {
      title: "Hotel App",
      image: "Portfolio/HotelDash.png",
      websiteUrl: "https://edhotel.vercel.app/",
      githubUrl: "https://github.com/AbdellahEdaoudi/EdHotel.git",
      description:
        "Hotel management application using Next.js, Node.js, and Tailwind CSS. It seamlessly handles reservations, guest services, user authentication, and payments via Stripe.",
      Rapport:"./Rapport.pdf"
      },
    
  ];
  return (
    <section id="prtfl" className="bg-gray-50 pb-7 pt-2">
      <div className="text-center pb-5 ">
        <p className="text-4xl font-bold">Portfolio</p>
        <p className="text-gray-400 text-sm">Most recent work</p>
      </div>
      {/* PORTFOLIO */}
      <div className="grid grid-cols-1  md:grid-cols-3  mx-3   justify-items-center  ">
        {projects.map((p,i)=>{return(
          <div key={i} className="bg-white h-[330px] w-80 rounded-lg shadow-lg pb-2 mb-5">
          <img
            className="w-96 rounded-md border-b-4 cursor-pointer"
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
              <img src="Portfolio/WebSite.png" width={20} alt="WebSite" />
              <span className="ml-2 text-sm hover:text-blue-500">
                Visit Website
              </span>
            </a>
          </div>
          <h2 className="px-3 text-[12px] pb-2  text-gray-500">
          {p.description}
          </h2>
          <div className="mx-4 cursor-pointer">
          <a
            href={p.githubUrl}
            className="flex items-center pr-2 float-start mx-"
            target="_blank"
          >
            <img src="Portfolio/github.png" width={24} alt="GitHub" />
            <span className="ml-1 text-sm hover:text-blue-500">
              View on GitHub
            </span>
          </a>
            <a href={p.Rapport} className={`text-red-700 ${p.Rapport === " " && "hidden"}`} title="Download Rapport" download="Rapport.pdf">
            Rapport de Projet
            </a>
          </div>
        </div>
        )})}
      </div>
    </section>
  );
}

export default Portfolio;
