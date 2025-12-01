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
          title={EnOrFr === "en" ? "Full Stack MERN Developer" : "Développeur Full Stack MERN"}
          company="Académie Régionale d'Éducation et de Formation"
          location={EnOrFr === "en" ? "El-Aaiun , Morocco" : "Laayoune , Maroc"}
          startDate="Mar 2024"
          endDate="Apr 2024"
          duration={EnOrFr === "en" ? "2 mos" : "2 mois"}
          type={EnOrFr === "en" ? "Internship" : "Stage"}
          workType={EnOrFr === "en" ? "Hybrid" : "Hybride"}
          responsibilities={[
            EnOrFr === "en" 
              ? "Designed and developed a task management application allowing users to add, edit, and delete tasks."
              : "Conçu et développé une application de gestion des tâches permettant aux utilisateurs d'ajouter, modifier et supprimer des tâches.",
            
            EnOrFr === "en" 
              ? "Implemented authentication and authorization using JWT to ensure the security of the application."
              : "Mis en œuvre l'authentification et l'autorisation à l'aide de JWT pour garantir la sécurité de l'application.",
            
            EnOrFr === "en" 
              ? "Tested API endpoints using Postman to ensure proper functionality."
              : "Testé les points de terminaison de l'API à l'aide de Postman pour garantir leur bon fonctionnement.",
            
            EnOrFr === "en" 
              ? "Improved user experience by designing a simple and user-friendly interface."
              : "Amélioré l'expérience utilisateur en concevant une interface simple et conviviale.",
            
            EnOrFr === "en" 
              ? "Deployed the application on Vercel and managed the codebase using Git/GitHub."
              : "Déployé l'application sur Vercel et géré le code à l'aide de Git/GitHub."
          ]}
          
        />
        
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
            EnOrFr === "en" 
              ? "Gained essential web development skills by combining theory with practical application in a professional environment." 
              : "Acquis des compétences essentielles en développement web en combinant la théorie avec l'application pratique dans un environnement professionnel.",
          
            EnOrFr === "en" 
              ? "Designed interactive and attractive user interfaces in front-end development." 
              : "Conçu des interfaces utilisateur interactives et attrayantes dans le développement frontend.",
          
            EnOrFr === "en" 
              ? "Acquired experience in back-end development and database management." 
              : "Acquis de l'expérience en développement backend et en gestion de bases de données.",
          
            EnOrFr === "en" 
              ? "Developed skills in creating and maintaining dynamic web applications." 
              : "Développé des compétences dans la création et la maintenance d'applications web dynamiques.",
          
            EnOrFr === "en" 
              ? "Applied Agile methodology to improve efficiency and strengthen teamwork." 
              : "Appliqué la méthodologie Agile pour améliorer l'efficacité et renforcer le travail d'équipe.",
          
            EnOrFr === "en" 
              ? "Gained experience using Git and GitHub for effective code and project management." 
              : "Acquis de l'expérience avec Git et GitHub pour une gestion efficace du code et des projets.",
          
            EnOrFr === "en" 
              ? "Used SonarQube to analyze code quality and ensure continuous improvement." 
              : "Utilisé SonarQube pour analyser la qualité du code et garantir une amélioration continue.",
          
            EnOrFr === "en" 
              ? "Used Docker to streamline environment management and application development." 
              : "Utilisé Docker pour rationaliser la gestion de l'environnement et le développement des applications.",
          
            EnOrFr === "en" 
              ? "Enhanced interpersonal skills, including communication and teamwork, for better preparedness in diverse work environments." 
              : "Amélioré les compétences interpersonnelles, telles que la communication et le travail d'équipe, pour une meilleure préparation dans des environnements de travail divers."
          ]}
        />
        
        <ExperienceCard
          title={EnOrFr === "en" ? "Digital Developer Intern" : "Stagiaire Développeur Digital"}
          company="Cités des Métiers et des Compétences"
          location={EnOrFr === "en" ? "El-Aaiun , Morocco" : "Laayoune , Maroc"}
          startDate="Nov 2022"
          endDate="Jun 2023"
          duration={EnOrFr === "en" ? "8 mos" : "8 mois"}
          type={EnOrFr === "en" ? "Internship" : "Stagiaire"}
          workType={EnOrFr === "en" ? "On-site" : "Sur site"}
          description={[
            EnOrFr === "en" ? "Culture and advanced techniques of the digital field" : "Culture et techniques avancées du domaine numérique",
            EnOrFr === "en" ? "Understanding the dimensions of the profession and the learning path" : "Compréhension des dimensions de la profession et du parcours d'apprentissage",
            EnOrFr === "en" ? "Acquiring the basics of algorithmic" : "Acquisition des bases de l'algorithmique",
            EnOrFr === "en" ? "Behavioral and social skills" : "Compétences comportementales et sociales",
            EnOrFr === "en" ? "Developing skills in object-oriented programming" : "Développement des compétences en programmation orientée objet",
            EnOrFr === "en" ? "Designing and building static websites" : "Conception et création de sites web statiques",
            EnOrFr === "en" ? "Using JavaScript for application development" : "Utilisation de JavaScript pour le développement d'applications",
            EnOrFr === "en" ? "Working with databases and executing basic operations" : "Travailler avec des bases de données et exécuter des opérations de base",
            EnOrFr === "en" ? "Building dynamic websites that interact with users" : "Création de sites web dynamiques qui interagissent avec les utilisateurs",
            EnOrFr === "en" ? "Familiarizing with information system security principles" : "Familiarisation avec les principes de la sécurité des systèmes d'information"
          ]}
        />
        
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
          <ul className="pl-5 list-disc marker:text-sm list-outside text-gray-700 space-y-1">
            {responsibilities.map((item, index) => (
              <li key={index} className="text-xs">{item}</li>
            ))}
          </ul>
        </div>
        )}
        {description && (
         <div className="mt-4">
          <h4 className="text-sm font-semibold  mb-1">Description :</h4>
          <ul className="pl-5 list-disc marker:text-sm  list-outside  text-gray-700 space-y-1">
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
