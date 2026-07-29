import Image from "next/image";
import Link from "next/link";

function Home({ content, lang }) {

  if (!content) return null;

  return (
    <section className="mx-4 md:mt-0 mt-5">
      <div className="flex md:flex-row flex-col-reverse items-center justify-center gap-2 md:gap-12 lg:gap-28 md:py-10 pb-6 duration-300">
        {/* Profile */}
        <div className="space-y-4 flex flex-col items-center justify-center">
          <h1 className="text-[2.4rem] md:w-[458px] text-center dark:text-white">
            {content.greeting}
          </h1>
          <h2 className="text-2xl dark:text-blue-400">
            {content.role}
          </h2>
          <p className="border border-white/40 dark:border-slate-800 rounded-2xl md:w-[420px] text-justify p-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm shadow-2xl text-gray-800 dark:text-gray-200 leading-relaxed transition-all duration-500 hover:bg-white/80 dark:hover:bg-slate-900/90">
            {content.description}
          </p>
          {/* Social Links */}
          <div className="flex gap-3 justify-center py-2">
            {[
              { id: 'linkedin', href: 'https://www.linkedin.com/in/abdellah-edaoudi', icon: '/icons/linkedin.svg', alt: 'LinkedIn' },
              { id: 'github', href: 'https://github.com/AbdellahEdaoudi', icon: '/icons/github.svg', alt: 'GitHub' },
              { id: 'youtube', href: 'https://www.youtube.com/@edaoudi.abdellah', icon: '/icons/youtube.svg', alt: 'YouTube' },
              { id: 'twitter', href: 'https://x.com/Edaoudi_abde', icon: '/icons/twitter.svg', alt: 'X (Twitter)' },
              { id: 'instagram', href: 'https://www.instagram.com/edaoudi_abdellah/', icon: '/icons/instagram.svg', alt: 'Instagram' }
            ].map((social) => (
              <Link
                key={social.id}
                href={social.href}
                target="_blank"
                className="hover:scale-110 transition-all duration-300 active:scale-95 bg-white/60 dark:bg-slate-800/60 p-2.5 rounded-xl border border-gray-200/60 dark:border-slate-700/50 shadow-sm hover:shadow-md dark:hover:shadow-blue-900/20 hover:-translate-y-0.5 backdrop-blur-sm"
                title={`${social.alt} - Abdellah Edaoudi`}
              >
                <Image
                  src={social.icon}
                  alt={`Abdellah Edaoudi ${social.alt}`}
                  width={28}
                  height={28}
                  className="w-[28px] h-[28px] drop-shadow-sm dark:brightness-110"
                />
              </Link>
            ))}
          </div>
        </div>
        {/* Image Section - Premium Tech Glow Design */}
        <div className="relative group animate-float">
          {/* Decorative Brackets - Reverted to TL/BR but symbols flipped for AR */}
          <div className="absolute -top-6 -left-6 text-blue-600/10 dark:text-blue-400/20 text-[7rem] font-serif transition-all duration-700 group-hover:-translate-x-3 group-hover:-translate-y-3 select-none leading-none">
            {lang === 'ar' || lang === 'fa' ? '}' : '{'}
          </div>
          <div className="absolute -bottom-6 -right-6 text-purple-600/10 dark:text-blue-400/20 text-[7rem] font-serif transition-all duration-700 group-hover:translate-x-3 group-hover:translate-y-3 select-none leading-none">
            {lang === 'ar' || lang === 'fa' ? '{' : '}'}
          </div>

          <div className="absolute -inset-6 bg-gradient-to-br from-blue-100/30 via-purple-50/30 to-transparent dark:from-blue-500/20 dark:via-blue-600/10 dark:to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          {/* Border Outline - Reverted to Left */}
          <div className="absolute top-4 left-4 w-full h-full border border-gray-100 dark:border-slate-800 rounded-[2.5rem] transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>

          <div className="relative z-10 p-[1px] bg-gradient-to-br from-gray-200 via-white to-gray-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.01]">
            <div className="relative bg-white dark:bg-slate-900 p-2 rounded-[2.5rem] overflow-hidden">
              <div className="overflow-hidden rounded-[2rem] bg-gray-100 dark:bg-slate-800 relative md:w-80 md:h-[360px] w-56 h-64">
                {/* Loader / Placeholder Background - Reserves space */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-pulse"></div>

                <Image
                  src="/profile/profile.jpg"
                  className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105 relative z-10"
                  alt="Abdellah Edaoudi - Full Stack Developer"
                  width={500}
                  height={500}
                  priority
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 dark:via-blue-500/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
            </div>
          </div>

          {/* Vertical Text - Left side for Arabic, rotated to look right */}
          <div className={`absolute ${lang === 'ar' || lang === 'fa' ? '-left-6' : '-right-6'} top-10 flex flex-col items-center gap-4 z-20`}>
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-blue-500"></div>
            <span className={`[writing-mode:vertical-lr] ${lang === 'ar' || lang === 'fa' ? 'rotate-180' : ''} text-[10px] uppercase tracking-[0.4em] font-bold text-blue-600 dark:text-blue-400 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-2 rounded-full border border-blue-100 dark:border-blue-900/50 shadow-sm transition-transform duration-500 group-hover:-translate-y-2`}>
              {content.portfolio || "Portfolio"} {new Date().getFullYear()}
            </span>
          </div>

          {/* Corner Decoration - Reverted to Left */}
          <div className="absolute -bottom-2 -left-2 w-10 h-10 border-b-2 border-l-2 border-purple-500/20 dark:border-blue-400/30 rounded-bl-xl transition-all duration-500 group-hover:-translate-x-2 group-hover:translate-y-2"></div>
        </div>
      </div>
    </section>
  )
}

export default Home