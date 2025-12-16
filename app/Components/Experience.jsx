
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

const Briefcase = ({ className, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
)

const Trophy = ({ className, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
)

export default function Experience({ content }) {
    if (!content) return null;

    return (
        <section className="py-5 bg-white min-h-screen">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">{content.title}</h2>
                    <p className="text-gray-500 text-sm mt-3">{content.subtitle}</p>
                </div>

                <div className="grid gap-6">
                    {content.items && content.items.map((item, index) => (
                        <div key={index} className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-300 overflow-hidden group">
                            {/* Card Top Border */}
                            <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                            <div className="p-5 md:p-6">
                                <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors cursor-default">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1 text-gray-600 font-medium text-sm">
                                            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs flex items-center gap-1">
                                                <Briefcase className="w-3 h-3" /> {item.company}
                                            </span>
                                            <span className="text-gray-300">|</span>
                                            <span className="text-gray-500">{item.type}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:items-end gap-1.5 text-sm">
                                        <div className="flex items-center text-gray-700 font-semibold bg-gray-50 border border-gray-100 px-2 py-1 rounded-md w-fit">
                                            <CalendarIcon className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
                                            {item.startDate} - {item.endDate}
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-gray-500">
                                            {item.duration && (
                                                <span>{item.duration}</span>
                                            )}
                                            <span className="flex items-center gap-1">
                                                <MapPinIcon className="w-3 h-3 text-red-400" /> {item.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Separator */}
                                <div className="border-t border-gray-50 my-4"></div>

                                <div className="space-y-3">
                                    {(item.responsibilities || item.description) && (
                                        <div>
                                            <h4 className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">
                                                <Trophy className="w-4 h-4 hidden text-amber-500" />
                                                {item.achievementsLabel}
                                            </h4>
                                            <ul className="grid grid-cols-1 gap-2">
                                                {(item.responsibilities || item.description).map((text, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed group/item">
                                                        <span className="mt-1.5 w-1.5 h-1.5 bg-gray-300 rounded-full group-hover/item:bg-blue-500 transition-colors flex-shrink-0"></span>
                                                        {text}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
