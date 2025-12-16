"use client"
const CalendarIcon = ({ className, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </svg>
)

const MapPinIcon = ({ className, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const School = ({ className, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M14 22v-4a2 2 0 1 0-4 0v4" />
    <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
    <path d="M18 5v17" />
    <path d="m4 6 8-4 8 4" />
    <path d="M6 5v17" />
    <circle cx="12" cy="9" r="2" />
  </svg>
)
import Image from "next/image";

export default function Education({ content }) {
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
