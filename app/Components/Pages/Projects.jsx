import Image from 'next/image';
import Link from 'next/link';

function Projects({ content }) {
  if (!content) return null;
  const { items: projects, title, subtitle, liveDemo, readMore, showLess } = content;

  return (
    <section id="prtfl" className="pb-7 pt-4">
      <div className="text-center mb-6">
        <p className="text-4xl font-bold">{title}</p>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 justify-items-center px-4">
        {projects?.map((p, i) => (
          <div key={i} className="bg-white/40 backdrop-blur-xl flex flex-col w-80 hover:scale-[1.03] border border-white/40 duration-300 rounded-lg shadow-2xl pb-4 mb-5 overflow-hidden transition-all hover:bg-white/50">
            <Link href={p.websiteUrl} target="_blank" rel="noopener noreferrer">
              <Image width={1000} height={200}
                className="w-96 rounded-md border-b-2 cursor-pointer"
                src={p.image}
                alt="E-commerce App"
              />
            </Link>
            <div>
              <div className="flex justify-between items-start gap-2 px-3 py-3">
                <h1 className="text-[16px] underline flex-1 leading-snug">{p.title}</h1>
                <Link href={p.websiteUrl} className="flex-shrink-0 flex items-center gap-1 hover:scale-105 duration-300 hover:text-sky-500 hover:bg-sky-50 border p-1 rounded-md bg-gray-100" target="_blank">
                  <Image src="/Projects/WebSite.png" width={17} height={17} alt="WebSite" />
                  <span className="ml-1 text-xs sm:text-sm font-medium whitespace-nowrap">{liveDemo}</span>
                </Link>
              </div>
              {/* Description */}
              <div className="relative px-3 py-2 text-[12px] border text-gray-500">
                <input type="checkbox" id={`expand-${i}`} className="peer hidden" />
                <h2 className="line-clamp-5 peer-checked:line-clamp-none peer-checked:h-auto overflow-hidden transition-all duration-300">
                  {p.description}
                </h2>
                {p.description.length > 200 && (
                  <>
                    <label htmlFor={`expand-${i}`} className="text-blue-500 cursor-pointer block mt-1 hover:underline peer-checked:hidden text-right">
                      {readMore}
                    </label>
                    <label htmlFor={`expand-${i}`} className="text-blue-500 cursor-pointer hidden mt-1 hover:underline peer-checked:block text-right">
                      {showLess}
                    </label>
                  </>
                )}
              </div>
              {/* technologies */}
              <div className="flex flex-wrap gap-2 justify-around py-2 px-1 border">
                {p.technologies.map((tech, i) => (
                  <div key={i} className="flex items-center gap-1 bg-gray-100 rounded-full px-1 py-0.5 shadow-sm hover:shadow-md transition-shadow duration-300 text-xs">
                    <Image src={tech.logo} alt={tech.name} width={18} height={18} className="rounded-full" />
                    <p className="text-xs text-gray-700">{tech.name}</p>
                  </div>
                ))}
              </div>
              {/* githubUrl */}
              <div className="flex justify-around items-center mt-3 space-x-4">
                {p.githubUrl && (
                  <Link href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-300 p-2 rounded-md border border-gray-300 hover:border-blue-500 shadow-sm hover:shadow-md">
                    <Image src={"/icons/github.svg"} alt={"Github Logo"} width={25} height={25} className="mr-2 rounded-full" />
                    <span className="text-sm">
                      {p.type === "backend" ? "View on GitHub" : "Frontend"}
                    </span>
                  </Link>
                )}
                {p.githubUrls && (
                  <Link href={p.githubUrls} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-300 p-2 rounded-md border border-gray-300 hover:border-blue-500 shadow-sm hover:shadow-md">
                    <Image src={"/icons/github.svg"} alt={"Github Logo"} width={25} height={25} className="mr-2 rounded-full" />
                    <span className="text-sm">Backend</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;

