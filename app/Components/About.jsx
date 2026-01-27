import { Award, Briefcase, Headset, StickyNote } from './Icons';
import { getTranslation } from "../translations/portfolio/load-translations";
import Image from "next/image";
import Link from "next/link";


async function About({ lang = 'en' }) {
  const dictionary = await getTranslation(lang);
  const content = dictionary.about;

  if (!content) return null;

  return (
    <section id="about" className="py-4 md:min-h-screen">
      <div className="text-center">
        <p className="text-4xl font-bold">{content.title}</p>
        <p className="text-gray-400 text-sm">{content.subtitle}</p>
      </div>
      <div className="md:flex md:items-center md:justify-center space-y-4 md:space-x-28 pt-2 md:pt-7 px-4">
        <div className="flex flex-col-reverse  md:items-start items-center md:flex-row gap-6 md:gap-28">
          {/* Image Section - About Page Premium Version */}
          <div className="relative group md:block hidden">
            {/* الأقواس البرمجية للزينة - تم تصغيرها لتكون أكثر رقة */}
            <div className="absolute -top-6 -left-6 text-blue-600/10 text-[6rem] font-serif transition-all duration-700 group-hover:-translate-x-3 group-hover:-translate-y-3 select-none leading-none">
              &#123;
            </div>
            <div className="absolute -bottom-6 -right-6 text-purple-600/10 text-[6rem] font-serif transition-all duration-700 group-hover:translate-x-3 group-hover:translate-y-3 select-none leading-none">
              &#125;
            </div>

            {/* الهالة الخلفية */}
            <div className="absolute -inset-6 bg-gradient-to-br from-blue-100/30 via-purple-50/30 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            {/* الإطار الخلفي */}
            <div className="absolute top-4 right-4 w-full h-full border border-gray-100 rounded-[2.5rem] transition-transform duration-500 group-hover:-translate-x-2 group-hover:translate-y-2"></div>

            {/* حاوية الصورة الأساسية */}
            <div className="relative z-10 p-[1px] bg-gradient-to-bl from-gray-200 via-white to-gray-100 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.01]">
              <div className="relative bg-white p-2 rounded-[2.5rem] overflow-hidden">
                <div className="overflow-hidden rounded-[2rem]">
                  <Image
                    src="/profile/profileabout.png"
                    alt="Abdellah Edaoudi - About Me"
                    className="md:w-80 object-cover w-56 transform transition-transform duration-1000 group-hover:scale-105"
                    width={500}
                    height={500}
                    priority
                  />
                </div>
                {/* تأثير اللمعان */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              </div>
            </div>

            {/* عنصر زخرفي سفلي */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white/80 backdrop-blur-md rounded-full border border-gray-100 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:-translate-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">About Me</span>
            </div>
          </div>
          <div className="space-y-4">
            <ul className="flex gap-4 items-center justify-center pt-4">
              <li className="flex flex-col items-center text-center bg-white p-4 rounded-md border">
                <Award />
                <span className="text-[13px]">{content.experience}</span>
                <span className="text-[10px] text-gray-400">
                  {content.experienceDetail}
                </span>
              </li>
              <li className="flex flex-col items-center text-center bg-white py-4 md:px-4 px-2 rounded-md border">
                <Briefcase />
                <span className="text-[13px]">{content.completed}</span>
                <span className="text-[10px] text-gray-400">
                  {content.completedDetail}
                </span>
              </li>
              <li className="flex flex-col items-center text-center bg-white px-5 duration-300 md:px-6 py-4 rounded-md border">
                <Headset />
                <span className="text-[13px]">{content.support}</span>
                <span className="text-[10px] text-gray-400">
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
                className="flex p-3 rounded-lg bg-black text-white gap-2"
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
