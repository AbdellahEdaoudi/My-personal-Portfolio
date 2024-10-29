"use client"
import { useContext } from 'react';
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { CalendarIcon, MapPinIcon, BriefcaseIcon, School } from "lucide-react";
import { MyContext } from '../../../app/Context/MyContext';

export default function ExperienceSection() {
  const { EnOrFr } = useContext(MyContext);

  return (
    <section className="py-4 ">
      <div className="text-center mb-6">
        <p className="text-4xl font-bold">{EnOrFr === "en" ? "Experience" : "Expérience"}</p>
        <p className="text-gray-400 text-sm">{EnOrFr === "en" ? "My professional experience" : "Mon expérience professionnelle"}</p>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 md:mx-10">
    <ExperienceCard
      title={EnOrFr === "en" ? "Full Stack Developer - LinkerFolio Project" : "Développeur Full Stack - LinkerFolio"}
      company="LinkerFolio"
      location={EnOrFr === "en" ? "El-Aaiun , Morocco" : "Laayoune , Maroc"}
      startDate="Aug 2024"
      endDate="Oct 2024"
      duration={EnOrFr === "en" ? "3 mos" : "3 mois"}
      type={EnOrFr === "en" ? "Self-employed" : "Self-employed"}
      workType={EnOrFr === "en" ? "" : ""}
      responsibilities={[
        EnOrFr === "en" ? "Designed an elegant user interface that showcases resumes professionally." : "Conçu une interface utilisateur élégante qui présente les CV de manière professionnelle.",
        EnOrFr === "en" ? "Developed a system for managing social media links in one place." : "Développé un système de gestion des liens des réseaux sociaux au même endroit.",
        EnOrFr === "en" ? "Created a QR code generation feature for easy sharing." : "Créé une fonction de génération de code QR pour un partage facile.",
        EnOrFr === "en" ? "Implemented automatic translation for resumes to reach a broader audience." : "Implémenté la traduction automatique pour les CV afin d'atteindre un public plus large.",
        EnOrFr === "en" ? "Integrated an in-app chat system for user communication." : "Intégré un système de chat dans l'application pour la communication entre utilisateurs.",
        EnOrFr === "en" ? "Added a customizable background feature for personal style." : "Ajouté une fonctionnalité de personnalisation de l'arrière-plan pour le style personnel."
      ]}/>
 <ExperienceCard
            title={EnOrFr === "en" ? "Full Stack Web Developer" : "Développeur Web Full Stack"}
            company="Cités des Métiers et des Compétences"
            location={EnOrFr === "en" ? "El-Aaiun , Morocco" : "Laayoune , Maroc"}
            startDate="Sep 2023"
            endDate="Jun 2024"
            duration={EnOrFr === "en" ? "10 mos" : "10 mois"}
            type={EnOrFr === "en" ? "Internship" : "Stagiaire"}
            workType={EnOrFr === "en" ? "On-site" : "Sur site"}
            description={[
              EnOrFr === "en" ? "Gained comprehensive skills in full-stack web development through a carefully designed internship program." : "Acquis des compétences complètes en développement web full-stack grâce à un programme de stage soigneusement conçu.",
              EnOrFr === "en" ? "Learned to build intuitive and attractive user interfaces through front-end development." : "Appris à créer des interfaces utilisateur intuitives et attrayantes grâce au développement frontend.",
              EnOrFr === "en" ? "Gained experience in back-end programming and database management." : "Acquis de l'expérience en programmation backend et en gestion de bases de données.",
              EnOrFr === "en" ? "Mastered the creation and maintenance of dynamic web applications." : "Maîtrisé la création et la maintenance d'applications web dynamiques.",
              EnOrFr === "en" ? "Applied Agile methodology in project development to enhance efficiency and teamwork." : "Appliqué la méthodologie Agile dans le développement de projets pour améliorer l'efficacité et le travail d'équipe.",
              EnOrFr === "en" ? "Improved behavioral skills such as communication and teamwork." : "Amélioré les compétences comportementales telles que la communication et le travail d'équipe."
            ]}
          />
          <ExperienceCard
            title={EnOrFr === "en" ? "Full Stack MERN Developer" : "Développeur Full Stack MERN"}
            company="Académie Régionale d'Éducation et de Formation"
            location={EnOrFr === "en" ? "El-Aaiun , Morocco" : "Laayoune , Maroc"}
            startDate="Mar 2024"
            endDate="Apr 2024"
            duration={EnOrFr === "en" ? "2 mos" : "2 mois"}
            type={EnOrFr === "en" ? "Internship" : "Stage"}
            workType={EnOrFr === "en" ? "Hybrid" : "Hybride"}
            responsibilities={[
              EnOrFr === "en" ? "Developed an interactive user interface with React.js and Tailwind CSS." : "Développé une interface utilisateur interactive avec React.js et Tailwind CSS.",
              EnOrFr === "en" ? "Built a robust backend with Node.js and MongoDB for task management." : "Construit un backend robuste avec Node.js et MongoDB pour la gestion des tâches.",
              EnOrFr === "en" ? "Tested APIs with Postman and ensured system integration." : "Testé les API avec Postman et assuré l'intégration du système.",
              EnOrFr === "en" ? "Managed the project on GitHub and deployed it on Vercel." : "Géré le projet sur GitHub et déployé sur Vercel."
            ]}  />
         
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ title, company, location, startDate, endDate, duration,type, description, responsibilities }) {
  return (
    <Card className="overflow-hidden shadow-md   duration-300 ring-1 bg-white rounded-lg">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <div className="flex items-center text-gray-400 text-xs mt-2">
          <School className="h-4 w-4 mr-2 text-blue-500" />
          <p className="text-sm text-gray-500">{company} - {type}</p>
        </div>
        <div className="flex items-center text-gray-400 text-xs mt-2">
          <CalendarIcon className="h-4 w-4 mr-2 text-green-500" />
          <span>{startDate} - {endDate} • {duration}</span>
        </div>
        <div className="flex items-center text-gray-400 text-xs mt-1">
          <MapPinIcon className="h-4 w-4 mr-2 text-red-500" />
          <span>{location}</span>
        </div>
        {responsibilities && (
          <div className="mt-4">
          <h4 className="text-sm font-semibold  mb-1">Key Responsibilities :</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {responsibilities.map((item, index) => (
              <li key={index} className="text-xs">{item}</li>
            ))}
          </ul>
        </div>
        )}
        {description && (
         <div className="mt-4">
          <h4 className="text-sm font-semibold  mb-1">Description :</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {description?.map((item, index) => (
              <li key={index} className="text-xs">{item}</li>
            ))}
          </ul>
        </div> 
        )}
        
      </CardContent>
    </Card>
  );
}
