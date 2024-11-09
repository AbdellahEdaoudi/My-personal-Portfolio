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
            EnOrFr === "en" 
              ? "Designed an elegant user interface that showcases resumes professionally." 
              : "Conçu une interface utilisateur élégante qui présente les CV de manière professionnelle.",
          
            EnOrFr === "en" 
              ? "Developed a system for managing social media links in one place." 
              : "Développé un système de gestion des liens des réseaux sociaux au même endroit.",
          
            EnOrFr === "en" 
              ? "Created a QR code generation feature for easy sharing." 
              : "Créé une fonction de génération de code QR pour un partage facile.",
          
            EnOrFr === "en" 
              ? "Implemented automatic translation for resumes to reach a broader audience." 
              : "Implémenté la traduction automatique pour les CV afin d'atteindre un public plus large.",
          
            EnOrFr === "en" 
              ? "Integrated an in-app chat system for user communication." 
              : "Intégré un système de chat dans l'application pour la communication entre utilisateurs.",
          
            EnOrFr === "en" 
              ? "Added a customizable background feature for personal style." 
              : "Ajouté une fonctionnalité de personnalisation de l'arrière-plan pour le style personnel."
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
            EnOrFr === "en" 
              ? "Analyzed and defined system requirements through use case diagrams and class diagrams." 
              : "Analyse et définition des exigences du système à travers des diagrammes de cas d'utilisation et des diagrammes de classes.",
          
            EnOrFr === "en" 
              ? "Developed an interactive user interface using React.js and Tailwind CSS." 
              : "Développé une interface utilisateur interactive avec React.js et Tailwind CSS.",
          
            EnOrFr === "en" 
              ? "Built a robust backend with Node.js and MongoDB." 
              : "Construit un backend robuste avec Node.js et MongoDB.",
          
            EnOrFr === "en" 
              ? "Implemented authentication and authorization to ensure user security and define permissions." 
              : "Mise en œuvre de l'authentification et de l'autorisation pour garantir la sécurité des utilisateurs et définir les permissions.",
          
            EnOrFr === "en" 
              ? "Tested APIs with Postman and ensured system integration." 
              : "Testé les API avec Postman et assuré l'intégration du système.",
          
            EnOrFr === "en" 
              ? "Used Git and GitHub for source code management and team collaboration." 
              : "Utilisation de Git et GitHub pour la gestion du code source et la collaboration en équipe."
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
