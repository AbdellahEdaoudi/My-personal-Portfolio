"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'

function Footer({ content }) {
  const params = useParams();
  const currentLang = params.lang || 'en';

  if (!content) return null;

  return (
    <section className='border-t flex  justify-center items-center text-center h-60'>
      <div>
        <h1 className='pb-3 text-4xl '>Abdellah Edaoudi</h1>
        <div className='pb-4 flex items-center gap-3 justify-center text-gray-500'>
          {content.links && content.links.map((l, i) => {
            return (
              <Link key={i} href={`/${currentLang}${l.path}`} >{l.name}</Link>
            )
          })}
        </div>
        <div className='flex items-center gap-4 justify-center '>
          <Link href='https://www.linkedin.com/in/abdellah-edaoudi' target='_blank'>
            <Image src={"/icons/linkedin.svg"} width={30} height={30} className='w-8 h-8 hover:scale-105 duration-200' alt="LinkedIn" />
          </Link>
          <Link href='https://github.com/AbdellahEdaoudi' target='_blank'>
            <Image src={"/icons/github.svg"} width={30} height={30} className='w-8 h-8 hover:scale-105 duration-200' alt="GitHub" />
          </Link>
          <Link href='https://www.youtube.com/channel/UCv3WeHVuX07Wo6WxWf5QTZw' target='_blank'>
            <Image src={"/icons/youtube.svg"} width={30} height={30} className='w-8 h-8 hover:scale-105 duration-200' alt="YouTube" />
          </Link>
          <Link href="https://x.com/Edaoudi_abde" target="_blank">
            <Image src={"/icons/twitter.svg"} width={30} height={30} className='w-8 h-8 hover:scale-105 duration-200' alt="Twitter" />
          </Link>
          <Link href='https://www.instagram.com/edaoudi_abdellah/' target='_blank'>
            <Image src={"/icons/instagram.svg"} width={30} height={30} className='w-8 h-8 hover:scale-105 duration-200' alt="Instagram" />
          </Link>
        </div>
        <div>
          <h6 className='text-[10px] text-gray-500 pt-5'>{content.rights}</h6>
        </div>
      </div>
    </section>
  )
}

export default Footer
