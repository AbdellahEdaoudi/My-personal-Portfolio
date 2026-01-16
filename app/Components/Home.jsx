import { getTranslation } from "../translations/portfolio/load-translations";
import Image from "next/image";
import Link from "next/link";

async function Home({ lang = 'en' }) {
  const dictionary = await getTranslation(lang);
  const content = dictionary.home;

  if (!content) return null;

  return (
    <section className="mx-4">
      <div className="flex md:flex-row flex-col-reverse items-center justify-center gap-2 md:gap-12 lg:gap-28 pt-4 pb-5 md:py-7 duration-300">
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
        {/* Image */}
        <div className="relative">
          <Image src="/profile-pic.png"
            className="md:absolute imganim md:w-80  w-56 "
            alt="Abdellah Edaoudi - Full Stack Developer and Software Engineer"
            width={500} height={500}
          />
          <div className=" imganim md:w-80  w-56 md:h-[360px] bg-gray-300 animate-puls" ></div>
        </div>
      </div>
    </section>
  )
}

export default Home