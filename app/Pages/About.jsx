"use client"
import { Award, Briefcase, Headset, StickyNote } from "lucide-react";
import { useContext } from "react";
import { MyContext } from "../Context/MyContext";

function About() {
  const { EnOrFr } = useContext(MyContext);

  const aboutContentEn = {
    title: "About Me",
    subtitle: "My introduction",
    experience: "Experience",
    experienceDetail: "1 year Working",
    completed: "Completed",
    completedDetail: "+4 Projects",
    support: "Support",
    supportDetail: "Online 24/7",
    description:
      "MERN Stack Developer creating well-designed, high-performance code. I specialize in building responsive websites and apps with a mobile-first approach, ensuring seamless experiences across all devices.",
    downloadCv: "Résumé",
    Cv: "Cv_abdellah_Edaoudi_en.pdf"
  };

  const aboutContentFr = {
    title: "À propos",
    subtitle: "Mon introduction",
    experience: "Expérience",
    experienceDetail: "1 an de travail",
    completed: "Réalisé",
    completedDetail: "+4 Projets",
    support: "Support",
    supportDetail: "En ligne 24/7",
    description:
      "Développeur MERN Stack créant du code bien conçu et performant. Je me spécialise dans la création de sites web et d'applications réactifs avec une approche mobile-first, garantissant des expériences fluides sur tous les appareils.",
    downloadCv: "Résumé",
    Cv: "Cv_abdellah_Edaoudi_fr.pdf"
  };

  const content = EnOrFr === "en" ? aboutContentEn : aboutContentFr;

  return (
    <section id="about" className="bg-gray-50 pt-4">
      <div className="text-center">
        <p className="text-4xl font-bold">{content.title}</p>
        <p className="text-gray-400 text-sm">{content.subtitle}</p>
      </div>

      <div className="md:flex md:items-center md:justify-center space-y-4 md:space-x-28 pt-7 px-4">
        <div className="flex flex-col md:items-start items-center md:flex-row md:space-x-28">
          <img
            src="./profile-pic.png"
            className="rounded-lg pb-8 imganim2"
            width={330}
            height={300}
          />
          <div className="space-y-4">
            <ul className="flex gap-4 items-center justify-center pt-2">
              <li className="flex flex-col items-center text-center bg-white space-y-1 py-3 px-6 rounded-md border">
                <Award />
                <span className="text-[13px]">{content.experience}</span>
                <span className="text-[10px] text-gray-400">{content.experienceDetail}</span>
              </li>
              <li className="flex flex-col items-center text-center bg-white space-y-1 py-3 px-8 rounded-md border">
                <Briefcase />
                <span className="text-[13px]">{content.completed}</span>
                <span className="text-[10px] text-gray-400">{content.completedDetail}</span>
              </li>
              <li className="flex flex-col items-center text-center bg-white space-y-1 py-3 px-8 rounded-md border">
                <Headset />
                <span className="text-[13px]">{content.support}</span>
                <span className="text-[10px] text-gray-400">{content.supportDetail}</span>
              </li>
            </ul>
            <ul className="text-justify w-[400px] text-gray-700 px-2">
              {content.description}
            </ul>
            <div className="flex items-center justify-center">
              <a
                href={content.Cv}
                target="_blank"
                download={content.Cv}
                className="flex p-3 rounded-lg bg-black text-white gap-2"
              >
                {content.downloadCv} <StickyNote />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
