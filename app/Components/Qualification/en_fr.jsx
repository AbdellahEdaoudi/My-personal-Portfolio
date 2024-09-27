"use client"
import { useContext } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import { MyContext } from "@/app/Context/MyContext";

export default function EducationSection() {
  const { EnOrFr } = useContext(MyContext);

  return (
    <section className="py-3 mx-auto sm:mx-16 md:mx-28 lg:mx-52">
      <div className="text-center mb-6">
        <p className="text-4xl font-bold">{EnOrFr === "fr" ? "Éducation" : "Education"}</p>
        <p className="text-gray-400 text-sm">{EnOrFr === "fr" ? "Mon parcours personnel" : "My personal journey"}</p>
      </div>
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          <EducationCard
            institution={`<a href="https://cmc.ac.ma/fr">Cités des Métiers et des Compétences</a>`}
            degree={EnOrFr === "fr" ? "Diplôme, Développement Web Full Stack" : "Diploma, Digital Development Web Full Stack"}
            startDate="Nov 2022"
            endDate="Jun 2024"
            location="Laayoune, Morocco"
            imageUrl="/cmc-maroc.png"
          />
          <EducationCard
            institution="Baba Ahmed bin Muhammad yahdih"
            degree={EnOrFr === "fr" ? "Baccalauréat, Sciences Physiques" : "Bachelor's degree, Physical Sciences"}
            startDate="Sep 2021"
            endDate="Jun 2022"
            location="Laayoune, Morocco"
            imageUrl="/BabAhmedImage.jpg"
          />
        </div>
      </div>
    </section>
  );
}

function EducationCard({ institution, degree, startDate, endDate, location, imageUrl }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-xl group ring-1">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 border-r-2 rounded-lg border-r-gray-500 ">
            <Image
              src={imageUrl}
              alt={institution}
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-2/3 p-6 bg-card">
            <h3 className="text-xl font-bold mb-2">{degree}</h3>
            <p dangerouslySetInnerHTML={{ __html: institution }} className="text-sm text-primary mb-4"></p>
            <div  className="flex flex-wrap items-center gap-4 mb-4">
              {startDate && endDate && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarIcon className="mr-2 h-4 w-4 text-green-500" />
                  {startDate} - {endDate}
                </div>
              )}
              {location && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPinIcon className="mr-2 h-4 w-4 text-red-500" />
                  {location}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
