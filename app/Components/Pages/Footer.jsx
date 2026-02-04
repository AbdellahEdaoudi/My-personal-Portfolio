import React from 'react';
import Link from 'next/link'
import { FaLinkedin, FaGithub, FaYoutube, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import BackToTop from '../BackToTop';

export default function Footer({ content, lang }) {

  if (!content) return null;

  // Static social data
  const socialLinks = [
    { href: 'https://x.com/Edaoudi_abde', icon: FaXTwitter, label: 'Twitter' },
    { href: 'https://www.linkedin.com/in/abdellah-edaoudi', icon: FaLinkedin, label: 'LinkedIn' },
    { href: 'https://github.com/AbdellahEdaoudi', icon: FaGithub, label: 'GitHub' },
    { href: 'https://www.instagram.com/edaoudi_abdellah/', icon: FaInstagram, label: 'Instagram' },
    { href: 'https://www.youtube.com/channel/UCv3WeHVuX07Wo6WxWf5QTZw', icon: FaYoutube, label: 'YouTube' },
  ];

  const quickConnect = [
    { label: content.emailLabel, value: 'abdellahedaoudi80@gmail.com', href: 'mailto:abdellahedaoudi80@gmail.com' },
    { label: content.whatsappLabel, value: '+212 607071966', href: 'https://wa.me/212607071966' },
    { label: content.locationLabel, value: content.locationValue, href: '#Cnt' },
  ];

  return (
    <footer className="w-full px-4 pb-4 md:px-10 md:pb-10 bg-slate-50">
      <div className="relative overflow-hidden bg-[#0f1d1b] rounded-[2.5rem] pt-16 pb-12 lg:pt-20 lg:pb-16 px-8 md:px-16 lg:px-24">
        {/* Background Decorative Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="0" y1="100" x2="100" y2="0" stroke="white" strokeWidth="0.1" />
            <line x1="30" y1="100" x2="100" y2="30" stroke="white" strokeWidth="0.1" />
            <line x1="0" y1="70" x2="70" y2="0" stroke="white" strokeWidth="0.1" />
          </svg>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-5 flex flex-col items-start gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#c5a059] flex items-center justify-center rounded-lg shadow-lg rotate-45 hover:rotate-0 transition-transform duration-500">
                <span className="text-[#0f1d1b] font-bold text-xl -rotate-45 group-hover:rotate-0 transition-transform duration-500">AE</span>
              </div>
              <h2 className="text-white text-2xl font-bold tracking-wider uppercase">{content.name}</h2>
            </div>

            <p className="text-gray-400 text-lg max-w-sm leading-relaxed">
              {content.tagline}
            </p>

            <div className="flex items-center gap-6">
              {socialLinks.map((social, idx) => (
                <Link
                  key={idx}
                  href={social.href}
                  target="_blank"
                  className="text-gray-400 hover:text-[#c5a059] transition-colors duration-300 transform hover:scale-110"
                  title={social.label}
                >
                  <social.icon size={22} />
                </Link>
              ))}
            </div>

            <BackToTop label={content.backToTop} />
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-8">
            {/* Site Map */}
            <div className="flex flex-col gap-6">
              <h3 className="text-white font-bold uppercase tracking-widest text-sm border-b border-gray-800 pb-2 inline-block w-fit">
                {content.siteMapLabel}
              </h3>
              <ul className="flex flex-col gap-4">
                {content.links?.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={`/${lang}${link.path}`}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Connect */}
            <div className="flex flex-col gap-6">
              <h3 className="text-white font-bold uppercase tracking-widest text-sm border-b border-gray-800 pb-2 inline-block w-fit">
                {content.connectLabel}
              </h3>
              <ul className="flex flex-col gap-4">
                {quickConnect.map((item, idx) => (
                  <li key={idx}>
                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter mb-1">{item.label}</p>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                    >
                      {item.value}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="w-full bg-[#c5a059] py-3 mt-[-2rem] relative z-0 rounded-b-[2rem]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#0f1d1b] text-[10px] md:text-xs font-bold uppercase tracking-widest">
            {content.copyright || 'Copyright'} © {new Date().getFullYear()} {content.name}. {content.rights}.
          </p>
        </div>
      </div>
    </footer>
  )
}
