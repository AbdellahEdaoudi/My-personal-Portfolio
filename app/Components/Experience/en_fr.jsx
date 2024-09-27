"use client"
import { useContext } from 'react';
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { CalendarIcon, MapPinIcon, BriefcaseIcon } from "lucide-react";
import { MyContext } from '@/app/Context/MyContext';

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
            location="Laayoune, Maroc"
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
            ]}
            skills={[
              EnOrFr === "en" ? "Full-stack web development" : "Développement web full-stack",
              EnOrFr === "en" ? "Teamwork" : "Travail d'équipe",
              EnOrFr === "en" ? "Communication" : "Communication",
              EnOrFr === "en" ? "Frontend-backend integration" : "Intégration frontend-backend",
              EnOrFr === "en" ? "Project management" : "Gestion de projet",
              EnOrFr === "en" ? "Deployment techniques" : "Techniques de déploiement",
              EnOrFr === "en" ? "Version control" : "Contrôle de version"
            ]}
            techStack={["React.js", "Tailwind CSS", "Node.js", "MongoDB", "GitHub", "Vercel", "Postman"]}
          />
          <ExperienceCard
            title={EnOrFr === "en" ? "Full Stack Developer" : "Développeur Full Stack"}
            company="Cités des Métiers et des Compétences"
            location="Laayoune, Maroc"
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
            skills={[EnOrFr === "en" ? "React" : "React", "Node.js", "MongoDB", "Agile"]}
          />
          <ExperienceCard
            title={EnOrFr === "en" ? "Frontend Developer" : "Développeur Frontend"}
            company="Cités des Métiers et des Compétences"
            location="Laayoune, Maroc"
            startDate="Sep 2023"
            endDate="Jan 2024"
            duration={EnOrFr === "en" ? "5 mos" : "5 mois"}
            type={EnOrFr === "en" ? "Internship" : "Stagiaire"}
            workType={EnOrFr === "en" ? "On-site" : "Sur site"}
            description={[
              EnOrFr === "en" ? "Enhanced skills in application development using React.js." : "Amélioré les compétences en développement d'applications en utilisant React.js.",
              EnOrFr === "en" ? "Mastered user interface design with Tailwind CSS." : "Maîtrisé la conception d'interface utilisateur avec Tailwind CSS.",
              EnOrFr === "en" ? "Delivered effective design solutions focusing on user experience." : "Fournit des solutions de conception efficaces axées sur l'expérience utilisateur."
            ]}
            skills={["React.js", "Tailwind CSS"]}
          />
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ 
  title, 
  company, 
  location, 
  startDate, 
  endDate, 
  duration, 
  type,
  workType,
  description, 
  responsibilities, 
  skills,
  techStack
}) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg ring-1">
      <CardContent className="p-2">
        <div className="flex flex-col md:flex-row justify-between mb-1">
          <div>
            <h3 className="text-lg font-semibold text-sky-950 underline">{title}</h3>
            <p className="text-sm text-muted-foreground">{company}</p>
            <p className="text-xs text-muted-foreground">{type} · {workType}</p>
          </div>
          <div className="flex flex-col items-start md:items-end mt-1 md:mt-0">
            <div className="flex items-center text-xs text-muted-foreground">
              <CalendarIcon className="mr-1 h-3 w-3 text-green-600" />
              {startDate} - {endDate} · {duration}
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <MapPinIcon className="mr-1 h-3 w-3 text-red-600" />
              {location}
            </div>
          </div>
        </div>
        {description && (
          <div className="mb-1">
            <h4 className="font-semibold text-xs mb-1">Description:</h4>
            <ul className="list-disc list-inside space-y-0.5">
              {description.map((item, index) => (
                <li key={index} className="text-muted-foreground text-xs">{item}</li>
              ))}
            </ul>
          </div>
        )}
        {responsibilities && (
          <div className="mb-1">
            <h4 className="font-semibold text-xs mb-1">Key Responsibilities:</h4>
            <ul className="list-disc list-inside space-y-0.5">
              {responsibilities.map((item, index) => (
                <li key={index} className="text-muted-foreground text-xs">{item}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="mb-1">
          <h4 className="font-semibold text-xs mb-1">Skills:</h4>
          <div className="flex flex-wrap gap-1">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                <BriefcaseIcon className="mr-1 h-3 w-3" />
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        {techStack && (
          <div className="mb-1">
            <h4 className="font-semibold text-xs mb-1">Tech Stack:</h4>
            <div className="flex flex-wrap gap-1">
              {techStack.map((tech, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
