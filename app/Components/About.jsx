import { Award, Briefcase, Headset, StickyNote } from './Icons';
import { getTranslation } from "../translations/portfolio/load-translations";
import Image from "next/image";
import Link from "next/link";


async function About({ lang = 'en' }) {
  const dictionary = await getTranslation(lang);
  const content = dictionary.about;

  if (!content) return null;

  return (
    <section id="about" className="py-4">
      <div className="text-center">
        <p className="text-4xl font-bold">{content.title}</p>
        <p className="text-gray-400 text-sm">{content.subtitle}</p>
      </div>
      <div className="md:flex md:items-center md:justify-center space-y-4 md:space-x-28 pt-2 md:pt-7 px-4 pb-4">
        <div className="flex flex-col-reverse  md:items-start items-center md:flex-row gap-6 md:gap-28">
          {/* Image Section - About Page Premium Version */}
          <div className="relative group md:block hidde">
            <div className="absolute -top-6 -left-6 text-blue-600/10 text-[6rem] font-serif transition-all duration-700 group-hover:-translate-x-3 group-hover:-translate-y-3 select-none leading-none">
              {lang === 'ar' ? '}' : '{'}
            </div>
            <div className="absolute -bottom-6 -right-6 text-purple-600/10 text-[6rem] font-serif transition-all duration-700 group-hover:translate-x-3 group-hover:translate-y-3 select-none leading-none">
              {lang === 'ar' ? '{' : '}'}
            </div>
            <div className="absolute -inset-6 bg-gradient-to-br from-blue-100/30 via-purple-50/30 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} w-full h-full border border-gray-100 rounded-[2.5rem] transition-transform duration-500 ${lang === 'ar' ? 'group-hover:translate-x-2' : 'group-hover:-translate-x-2'} group-hover:translate-y-2`}></div>

            <div className="relative z-10 p-[1px] bg-gradient-to-bl from-gray-200 via-white to-gray-100 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.01]">
              <div className="relative bg-white p-2 rounded-[2.5rem] overflow-hidden">
                <div className="overflow-hidden rounded-[2rem] relative">
                  <Image
                    src="/profile/profileabout.jpg"
                    alt="Abdellah Edaoudi - About Me"
                    className="md:w-80 object-cover w-72 sm:w-80 transform transition-transform duration-1000 group-hover:scale-105"
                    width={500}
                    height={500}
                    priority
                  />

                  <div className="absolute bottom-0 right-0 p-2 bg-gradient-to-tl from-white via-white/80 to-transparent z-20">
                    <div className="flex flex-col items-end opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="text-[8px] font-black uppercase tracking-tighter text-blue-900 leading-none">Abdellah Edaoudi</span>
                      <span className="text-[6px] font-bold uppercase tracking-widest text-gray-500 leading-none mt-1">Software Developer</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <ul className="flex gap-4 items-center justify-center pt-4">
              <li className="flex flex-col items-center text-center bg-white/30 backdrop-blur-xl p-4 rounded-2xl border border-white/40 shadow-lg transition-all hover:bg-white/50">
                <Award />
                <span className="text-[13px]">{content.experience}</span>
                <span className="text-[10px] text-gray-500">
                  {content.experienceDetail}
                </span>
              </li>
              <li className="flex flex-col items-center text-center bg-white/30 backdrop-blur-xl py-4 md:px-4 px-2 rounded-2xl border border-white/40 shadow-lg transition-all hover:bg-white/50">
                <Briefcase />
                <span className="text-[13px]">{content.completed}</span>
                <span className="text-[10px] text-gray-500">
                  {content.completedDetail}
                </span>
              </li>
              <li className="flex flex-col items-center text-center bg-white/30 backdrop-blur-xl px-5 duration-300 md:px-6 py-4 rounded-2xl border border-white/40 shadow-lg transition-all hover:bg-white/50">
                <Headset />
                <span className="text-[13px]">{content.support}</span>
                <span className="text-[10px] text-gray-500">
                  {content.supportDetail}
                </span>
              </li>
            </ul>
            <p className="text-justify md:w-[400px] text-gray-700 px-2">
              {content.description}
            </p>
            <div className="flex items-center justify-center">
              <Link
                href={content.Cv}
                target="_blank"
                // download={content.Cv}
                className="flex p-3 rounded-lg bg-black hover:scale-[1.03] duration-300 text-white gap-2"
              >
                {content.downloadCv} <StickyNote />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
