"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AlignJustify, ChevronDown } from './Icons';

import "flag-icons/css/flag-icons.min.css"; // Import flag-icons CSS


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
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <div className='flex items-center py-4 justify-evenly bg-white text-gray-600 rounded-sm relative z-50'>
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
            {/* Mobile Menu */}
            <div className={`md:hidden absolute w-full bg-white shadow-lg grid transition-[grid-template-rows] duration-300 ease-in-out border-gray-100 ${menu ? 'grid-rows-[1fr] border-t' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                    <ul className="flex flex-col items-center py-4 space-y-2">
                        {LinksHeader.map((ln, i) => (
                            <li key={i} onClick={() => setMenu(false)} className="w-full px-4">
                                <Link
                                    href={getPath(ln.path)}
                                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-300 ${pathname === getPath(ln.path) ? "bg-green-50 text-green-600 font-bold shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-green-500"}`}
                                >
                                    <span className="font-medium">{ln.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    );
}
