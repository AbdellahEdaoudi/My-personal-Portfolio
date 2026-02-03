import Link from 'next/link'
import Image from 'next/image'
import { getTranslation } from '../translations/portfolio/load-translations';

async function Footer({ lang = 'en' }) {
  const dictionary = await getTranslation(lang);
  const content = dictionary.footer;

  if (!content) return null;

  return (
    <section className='border-t flex  justify-center items-center text-center h-60'>
      <div>
        <h1 className='pb-3 text-4xl '>Abdellah Edaoudi</h1>
        <div className='pb-4 flex items-center gap-3 justify-center text-gray-500'>
          {content.links && content.links.map((l, i) => {
            return (
              <Link
                key={i}
                href={`/${lang}${l.path}`}
                className="hover:text-green-800 transition-colors duration-300"
              >
                {l.name}
              </Link>
            )
          })}
        </div>
        <div className='flex items-center gap-4 justify-center '>
          {[
            { href: 'https://www.linkedin.com/in/abdellah-edaoudi', icon: '/icons/linkedin.svg', alt: 'LinkedIn' },
            { href: 'https://github.com/AbdellahEdaoudi', icon: '/icons/github.svg', alt: 'GitHub' },
            { href: 'https://www.youtube.com/channel/UCv3WeHVuX07Wo6WxWf5QTZw', icon: '/icons/youtube.svg', alt: 'YouTube' },
            { href: 'https://x.com/Edaoudi_abde', icon: '/icons/twitter.svg', alt: 'Twitter' },
            { href: 'https://www.instagram.com/edaoudi_abdellah/', icon: '/icons/instagram.svg', alt: 'Instagram' }
          ].map((social, index) => (
            <Link key={index} href={social.href} target='_blank'
              title={`${social.alt} - Abdellah Edaoudi`}
            >
              <Image
                src={social.icon}
                width={32}
                height={32}
                className='w-8 h-8 hover:scale-105 duration-200'
                alt={`Abdellah Edaoudi ${social.alt}`}
              />
            </Link>
          ))}
        </div>
        <div>
          <h6 className='text-[10px] text-gray-500 pt-5'>{content.rights}</h6>
        </div>
      </div>
    </section>
  )
}

export default Footer

