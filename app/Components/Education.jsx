import Image from "next/image";
import { getTranslation } from "../translations/portfolio/load-translations";
import { CalendarIcon, MapPinIcon, School } from './Icons';


export default async function Education({ lang = "en" }) {
  const dictionary = await getTranslation(lang);
  const content = dictionary.education;

  if (!content) return null;

  return (
    <section className="py-3 mx-auto sm:mx-16 md:mx-28 lg:mx-52 min-h-screen">
      <div className="text-center mb-6">
        <p className="text-4xl font-bold">{content.title}</p>
        <p className="text-gray-400 text-sm">{content.subtitle}</p>
      </div>
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          {content.items && content.items.map((item, index) => (
            <div key={index} className="overflow-hidden transition-all hover:shadow-xl group ring-1 ring-gray-200 rounded-lg bg-white">
              <div className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 border-r-2 rounded-lg border-r-gray-50 ">
                    <Image
                      src={item.imageUrl}
                      alt={item.institution}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <h3 className="text-xl font-bold mb-2">{item.degree}</h3>
                    <div className="flex gap-2">
                      <span className="text-sky-950"><School width={18} /></span>
                      <span dangerouslySetInnerHTML={{ __html: item.institution }} className="text-sm text-primary mb-4"></span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      {item.startDate && item.endDate && (
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarIcon className="mr-2 h-4 w-4 text-green-500" />
                          {item.startDate} - {item.endDate}
                        </div>
                      )}
                      {item.location && (
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPinIcon className="mr-2 h-4 w-4 text-red-500" />
                          {item.location}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
