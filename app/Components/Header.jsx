"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AlignJustify, ChevronDown } from './Icons';

import "flag-icons/css/flag-icons.min.css"; // Import flag-icons CSS
import Image from 'next/image';


const languages = [
    { code: 'en', name: 'English', countryCode: 'gb' },
    { code: 'de', name: 'Deutsch', countryCode: 'de' },
    { code: 'fr', name: 'Français', countryCode: 'fr' },
    { code: 'es', name: 'Español', countryCode: 'es' },
    { code: 'pt', name: 'Português', countryCode: 'pt' },
    { code: 'it', name: 'Italiano', countryCode: 'it' },
    { code: 'nl', name: 'Nederlands', countryCode: 'nl' },
    { code: 'ar', name: 'العربية', countryCode: 'sa' },
    { code: 'ru', name: 'Русский', countryCode: 'ru' },
    { code: 'zh', name: '中文', countryCode: 'cn' },
    { code: 'ja', name: '日本語', countryCode: 'jp' },
    { code: 'hi', name: 'हिन्दी', countryCode: 'in' },
    { code: 'tr', name: 'Türkçe', countryCode: 'tr' },
    { code: 'ko', name: '한국어', countryCode: 'kr' },
    { code: 'id', name: 'Indonesia', countryCode: 'id' },
    { code: 'pl', name: 'Polski', countryCode: 'pl' },
];

export default function Header({ content }) {
    const [menu, setMenu] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);
    const params = useParams();
    const router = useRouter();
    const pathname = usePathname();
    const currentLang = params.lang || 'en';
    const langDropdownRef = useRef(null);
    const mobileLangDropdownRef = useRef(null);

    // Helper to get path without current language
    const getPathWithoutLang = (path) => {
        return path.replace(/^\/(en|fr|de|zh|nl|es|pt|ar|ru|ja|it|hi|tr|ko|id|pl)/, '');
    }

    const LinksHeader = [
        { name: content?.home || "Home", path: "/" },
        { name: content?.about || "About", path: "/About" },
        { name: content?.skills || "Skills", path: "/Skills" },
        { name: content?.projects || "Projects", path: "/Projects" },
        { name: content?.experience || "Experience", path: "/Experience" },
        { name: content?.education || "Education", path: "/Education" },
        { name: content?.contact || "Contact", path: "/Contact" }
    ];

    const handleLanguageChange = (langCode) => {
        const newLang = langCode;
        let newPath = getPathWithoutLang(pathname);
        if (newPath === '' || newPath === '/') newPath = '';

        router.push(`/${newLang}${newPath}`);
        setIsLangOpen(false);
        setIsMobileLangOpen(false);
    };

    const getPath = (path) => {
        const cleanPath = path === '/' ? '' : path;
        return `/${currentLang}${cleanPath}`;
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
                setIsLangOpen(false);
            }
            if (mobileLangDropdownRef.current && !mobileLangDropdownRef.current.contains(event.target)) {
                setIsMobileLangOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const selectedLang = languages.find(l => l.code === currentLang) || languages[0];

    return (
        <header className="sticky top-0 z-50 bg-white/40 backdrop-blur-xl border-b border-white/20 shadow-sm transition-all duration-300">
            <div className='flex items-center py-4 justify-evenly text-gray-800 rounded-sm relative z-50'>
                <div className='hover:scale-105 duration-300'>
                    <Link href={`/`}>
                        <div className="flex items-center gap-1 cursor-pointer hover:bg-slate-50 px-3 py-1 rounded-lg transition-all duration-300">
                            <span className="text-emerald-700 font-semibold text-xl group-hover:text-emerald-600 transition-colors duration-300">&lt;</span>
                            <span className="text-2xl font-bold text-slate-900 tracking-tight">
                                A<span className="text-emerald-600">.</span>Ed<span className="font-medium text-slate-600">Portfolio</span>
                            </span>
                            <span className="text-emerald-700 font-semibold text-xl group-hover:text-emerald-600 transition-colors duration-300">/&gt;</span>
                        </div>
                    </Link>
                </div>
                <div className='hidden md:flex gap-6 items-center'>
                    {LinksHeader.map((ln, i) => (
                        <Link key={i} href={getPath(ln.path)} className={`${pathname === getPath(ln.path) ? "text-green-500 scale-110" : ""} cursor-pointer hover:text-green-500 hover:scale-110 duration-200`}>
                            <span className="flex items-center font-medium text-sm lg:text-base">{ln.name}</span>
                        </Link>
                    ))}

                    {/* Desktop Language Switcher */}
                    <div className="relative" ref={langDropdownRef}>
                        <button
                            onClick={() => setIsLangOpen(!isLangOpen)}
                            className="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1.5 hover:border-green-500 transition-colors focus:outline-none bg-gray-50 hover:bg-white"
                        >
                            <span className={`fi fi-${selectedLang.countryCode}`}></span>
                            <span className="text-sm font-medium uppercase">{selectedLang.code}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isLangOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden max-h-80 overflow-y-auto"
                                >
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => handleLanguageChange(lang.code)}
                                            className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-green-50 transition-colors text-left ${currentLang === lang.code ? 'bg-green-50 text-green-600' : 'text-gray-700'}`}
                                        >
                                            <span className={`fi fi-${lang.countryCode}`}></span>
                                            <span className="text-sm font-medium">{lang.name}</span>
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className='flex flex-row-reverse gap-4 items-center'>
                    <div onClick={() => setMenu(!menu)} className='md:hidden cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors'>
                        <AlignJustify />
                    </div>

                    {/* Mobile Language Switcher */}
                    <div className="md:hidden relative" ref={mobileLangDropdownRef}>
                        <button
                            onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
                            className="flex items-center gap-2 border border-gray-200 rounded-lg px-2 py-1.5 hover:border-green-500 transition-colors focus:outline-none bg-gray-50 hover:bg-white"
                        >
                            <span className={`fi fi-${selectedLang.countryCode}`}></span>
                            <span className="text-sm font-medium uppercase">{selectedLang.code}</span>
                            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isMobileLangOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isMobileLangOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden max-h-60 overflow-y-auto z-[60]"
                                >
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => handleLanguageChange(lang.code)}
                                            className={`w-full flex items-center gap-2 px-3 py-2 hover:bg-green-50 transition-colors text-left text-sm ${currentLang === lang.code ? 'bg-green-50 text-green-600' : 'text-gray-700'}`}
                                        >
                                            <span className={`fi fi-${lang.countryCode}`}></span>
                                            <span className="font-medium">{lang.name}</span>
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            {/* Luxury Studio Navigation - Mobile Dashboard */}
            <div className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${menu ? 'opacity-100 translate-y-0 visible pointer-events-auto' : 'opacity-0 -translate-y-8 invisible pointer-events-none'}`}>
                <div className="mx-4 my-4 bg-white/95 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/20 overflow-hidden">
                    <div className="p-8">
                        {/* Section 1: Main Links with Sub-labels */}
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-6 flex items-center gap-2">
                                <span className="w-8 h-[1px] bg-emerald-100"></span> {content?.mobileMenu?.navigation || "Navigation"}
                            </p>
                            <nav className="space-y-4">
                                {LinksHeader.slice(0, 4).map((ln, i) => (
                                    <Link
                                        key={i}
                                        href={getPath(ln.path)}
                                        onClick={() => setMenu(false)}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex flex-col">
                                            <span className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${pathname === getPath(ln.path) ? 'text-emerald-600' : 'text-slate-900 group-hover:text-emerald-500'}`}>
                                                {ln.name}
                                            </span>
                                            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">{content?.mobileMenu?.explore || "Explore this section"}</span>
                                        </div>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${pathname === getPath(ln.path) ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600'}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                                        </div>
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Section 2: Quick Career Info */}
                        <div className="grid grid-cols-2 gap-3">
                            <Link href={getPath('/Experience')} onClick={() => setMenu(false)} className={`p-5 rounded-3xl transition-all duration-300 ${pathname === getPath('/Experience') ? 'bg-slate-900 text-white shadow-xl' : 'bg-slate-50 text-slate-900 hover:bg-white border border-slate-100 shadow-sm'}`}>
                                <div className="text-[10px] font-bold opacity-60 uppercase mb-2">{content?.mobileMenu?.history || "History"}</div>
                                <div className="text-sm font-black italic">{content?.experience || "Experience"}</div>
                            </Link>
                            <Link href={getPath('/Education')} onClick={() => setMenu(false)} className={`p-5 rounded-3xl transition-all duration-300 ${pathname === getPath('/Education') ? 'bg-slate-900 text-white shadow-xl' : 'bg-slate-50 text-slate-900 hover:bg-white border border-slate-100 shadow-sm'}`}>
                                <div className="text-[10px] font-bold opacity-60 uppercase mb-2">{content?.mobileMenu?.learning || "Learning"}</div>
                                <div className="text-sm font-black italic">{content?.education || "Education"}</div>
                            </Link>
                        </div>

                        {/* Section 3: Call to Action & Footer */}
                        <div className="pt-6 border-t border-slate-100 flex flex-col gap-6">
                            <Link
                                href={getPath('/Contact')}
                                onClick={() => setMenu(false)}
                                className="w-full bg-emerald-600 text-white h-16 rounded-2xl flex items-center justify-center gap-3 font-bold text-lg hover:bg-emerald-700 active:scale-95 transition-all shadow-[0_10px_30px_rgba(16,185,129,0.3)]"
                            >
                                <span>{content?.contact || "Let's Talk"}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.31-2.31a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            </Link>

                            <div className="flex items-center justify-between">
                                <div className="flex gap-4">
                                    <Link href="https://github.com/AbdellahEdaoudi" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> */}
                                        <Image priority src={"/icons/github.svg"} alt="Abdellah Edaoudi GitHub" width={30} height={30} />
                                    </Link>
                                    <Link href="https://linkedin.com/in/abdellah-edaoudi" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> */}
                                        <Image priority src={"/icons/linkedin.svg"} alt="Abdellah Edaoudi LinkedIn" width={30} height={30} />
                                    </Link>
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">© AE Portfolio ©</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
