import { getTranslation } from "../translations/portfolio/load-translations";
import Image from "next/image";
import Link from "next/link";

async function Home({ lang = 'en' }) {
  const dictionary = await getTranslation(lang);
  const content = dictionary.home;

  if (!content) return null;

  return (
    <section className="mx-4">
      <div className="flex md:flex-row flex-col-reverse items-center justify-center gap-2 md:gap-12 lg:gap-28 md:py-10 pb-6 duration-300">
        {/* Profile */}
        <div className="space-y-2 lg:space-y-3 flex flex-col items-center justify-center">
          <h1 className="text-[2.4rem] md:w-[458px] text-center">
            {content.greeting}
          </h1>
          <h2 className="text-[1.2rem] lg:text-[1.4rem]">
            {content.role}
          </h2>
          <p className="border-2 rounded-lg md:w-[400px] text-justify p-2 bg-white shadow-md">
            {content.description}
          </p>
          {/* Social Link */}
          <div className="flex space-x-4 justify-center py-2">
            <Link
              href="https://www.linkedin.com/in/abdellah-edaoudi"
              target="_blank" className="hover:scale-105 duration-300 ml-4"
              title="LinkedIn - Abdellah Edaoudi"
            >
              {/* <Linkedin /> */}
              <Image src={"/icons/linkedin.svg"} alt="Abdellah Edaoudi LinkedIn" width={30} height={10} />
            </Link>
            <Link
              href="https://github.com/AbdellahEdaoudi"
              target="_blank" className="hover:scale-105 duration-300"
              title="GitHub - Abdellah Edaoudi"
            >
              {/* <Github /> */}
              <Image src={"/icons/github.svg"} alt="Abdellah Edaoudi GitHub" width={30} height={10} />
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCv3WeHVuX07Wo6WxWf5QTZw"
              target="_blank" className="hover:scale-105 duration-300"
              title="YouTube - Abdellah Edaoudi"
            >
              {/* <Youtube /> */}
              <Image src={"/icons/youtube.svg"} alt="Abdellah Edaoudi YouTube" width={30} height={10} />

            </Link>
            <Link
              href="https://x.com/Edaoudi_abde"
              target="_blank" className="hover:scale-105 duration-300"
              title="X (Twitter) - Abdellah Edaoudi"
            >
              {/* <Instagram /> */}
              <Image src={"/icons/twitter.svg"} alt="Abdellah Edaoudi X Twitter" width={30} height={10} />

            </Link>
            <Link
              href="https://www.instagram.com/edaoudi_abdellah/"
              target="_blank" className="hover:scale-105 duration-300"
              title="Instagram - Abdellah Edaoudi"
            >
              {/* <Instagram /> */}
              <Image src={"/icons/instagram.svg"} alt="Abdellah Edaoudi Instagram" width={30} height={10} />

            </Link>
          </div>
        </div>
        {/* Image Section - Premium Tech Glow Design */}
        <div className="relative group">
          <div className="absolute -top-6 -left-6 text-blue-600/10 text-[7rem] font-serif transition-all duration-700 group-hover:-translate-x-3 group-hover:-translate-y-3 select-none leading-none">
            &#123;
          </div>
          <div className="absolute -bottom-6 -right-6 text-purple-600/10 text-[7rem] font-serif transition-all duration-700 group-hover:translate-x-3 group-hover:translate-y-3 select-none leading-none">
            &#125;
          </div>

          <div className="absolute -inset-6 bg-gradient-to-br from-blue-100/30 via-purple-50/30 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          <div className="absolute top-4 left-4 w-full h-full border border-gray-100 rounded-[2.5rem] transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>

          <div className="relative z-10 p-[1px] bg-gradient-to-br from-gray-200 via-white to-gray-100 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.01]">
            <div className="relative bg-white p-2 rounded-[2.5rem] overflow-hidden">
              <div className="overflow-hidden rounded-[2rem]">
                <Image
                  src="/profile/profile.jpg"
                  className="md:w-80 md:h-[360px] object-cover h-64 w-56 transform transition-transform duration-1000 group-hover:scale-105"
                  alt="Abdellah Edaoudi - Full Stack Developer and Software Engineer"
                  width={500}
                  height={500}
                  priority
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
            </div>
          </div>

          <div className="absolute -right-6 top-10 flex flex-col items-center gap-4 z-20">
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-blue-500"></div>
            <span className="[writing-mode:vertical-lr] text-[10px] uppercase tracking-[0.4em] font-bold text-blue-600 bg-white/80 backdrop-blur-sm p-2 rounded-full border border-blue-100 shadow-sm transition-transform duration-500 group-hover:-translate-y-2">
              Portfolio {new Date().getFullYear()}
            </span>
          </div>

          <div className="absolute -bottom-2 -left-2 w-10 h-10 border-b-2 border-l-2 border-purple-500/20 rounded-bl-xl transition-all duration-500 group-hover:-translate-x-2 group-hover:translate-y-2"></div>
        </div>
      </div>
    </section>
  )
}

export default Home