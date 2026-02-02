import { getTranslation } from "../translations/portfolio/load-translations";
import Image from "next/image";
import Link from "next/link";

async function Home({ lang = 'en' }) {
  const dictionary = await getTranslation(lang);
  const content = dictionary.home;

  if (!content) return null;

  return (
    <section className="mx-4 md:mt-0 mt-5">
      <div className="flex md:flex-row flex-col-reverse items-center justify-center gap-2 md:gap-12 lg:gap-28 md:py-10 pb-6 duration-300">
        {/* Profile */}
        <div className="space-y-4 flex flex-col items-center justify-center">
          <h1 className="text-[2.4rem] md:w-[458px] text-center">
            {content.greeting}
          </h1>
          <h2 className="text-2xl">
            {content.role}
          </h2>
          <p className="border border-white/40 rounded-2xl md:w-[420px] text-justify p-4 bg-white/30 backdrop-blur-xl shadow-2xl text-gray-800 leading-relaxed transition-all duration-500 hover:bg-white/40">
            {content.description}
          </p>
          {/* Social Links - Refactored with map */}
          <div className="flex gap-4 justify-center py-2">
            {[
              { id: 'linkedin', href: 'https://www.linkedin.com/in/abdellah-edaoudi', icon: '/icons/linkedin.svg', alt: 'LinkedIn' },
              { id: 'github', href: 'https://github.com/AbdellahEdaoudi', icon: '/icons/github.svg', alt: 'GitHub' },
              { id: 'youtube', href: 'https://www.youtube.com/channel/UCv3WeHVuX07Wo6WxWf5QTZw', icon: '/icons/youtube.svg', alt: 'YouTube' },
              { id: 'twitter', href: 'https://x.com/Edaoudi_abde', icon: '/icons/twitter.svg', alt: 'X (Twitter)' },
              { id: 'instagram', href: 'https://www.instagram.com/edaoudi_abdellah/', icon: '/icons/instagram.svg', alt: 'Instagram' }
            ].map((social) => (
              <Link
                key={social.id}
                href={social.href}
                target="_blank"
                className="hover:scale-110 transition-transform duration-300 active:scale-95"
                title={`${social.alt} - Abdellah Edaoudi`}
              >
                <Image
                  src={social.icon}
                  alt={`Abdellah Edaoudi ${social.alt}`}
                  width={32}
                  height={32}
                  className="w-[32px] h-[32px] drop-shadow-sm"
                />
              </Link>
            ))}
          </div>
        </div>
        {/* Image Section - Premium Tech Glow Design */}
        <div className="relative group">
          {/* Decorative Brackets - Reverted to TL/BR but symbols flipped for AR */}
          <div className="absolute -top-6 -left-6 text-blue-600/10 text-[7rem] font-serif transition-all duration-700 group-hover:-translate-x-3 group-hover:-translate-y-3 select-none leading-none">
            {lang === 'ar' ? '}' : '{'}
          </div>
          <div className="absolute -bottom-6 -right-6 text-purple-600/10 text-[7rem] font-serif transition-all duration-700 group-hover:translate-x-3 group-hover:translate-y-3 select-none leading-none">
            {lang === 'ar' ? '{' : '}'}
          </div>

          <div className="absolute -inset-6 bg-gradient-to-br from-blue-100/30 via-purple-50/30 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          {/* Border Outline - Reverted to Left */}
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

          {/* Vertical Text - Left side for Arabic, rotated to look right */}
          <div className={`absolute ${lang === 'ar' ? '-left-6' : '-right-6'} top-10 flex flex-col items-center gap-4 z-20`}>
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-blue-500"></div>
            <span className={`[writing-mode:vertical-lr] ${lang === 'ar' ? 'rotate-180' : ''} text-[10px] uppercase tracking-[0.4em] font-bold text-blue-600 bg-white/80 backdrop-blur-sm p-2 rounded-full border border-blue-100 shadow-sm transition-transform duration-500 group-hover:-translate-y-2`}>
              {content.portfolio || "Portfolio"} {new Date().getFullYear()}
            </span>
          </div>

          {/* Corner Decoration - Reverted to Left */}
          <div className="absolute -bottom-2 -left-2 w-10 h-10 border-b-2 border-l-2 border-purple-500/20 rounded-bl-xl transition-all duration-500 group-hover:-translate-x-2 group-hover:translate-y-2"></div>
        </div>
      </div>
    </section>
  )
}

export default Home