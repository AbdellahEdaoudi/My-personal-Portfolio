"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { AlignJustify } from 'lucide-react';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';

export default function Header({ content }) {
    const [menu, setMenu] = useState(false);
    const params = useParams();
    const router = useRouter();
    const pathname = usePathname();
    const currentLang = params.lang || 'en';

    const LinksHeader = [
        { name: content?.home || "Home", path: "/" },
        { name: content?.about || "About", path: "/About" },
        { name: content?.skills || "Skills", path: "/Skills" },
        { name: content?.projects || "Projects", path: "/Projects" },
        { name: content?.experience || "Experience", path: "/Experience" },
        { name: content?.education || "Education", path: "/Education" },
        { name: content?.contact || "Contact", path: "/Contact" }
    ];

    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        let newPath = pathname;

        if (currentLang !== 'en') {
            newPath = newPath.replace(`/${currentLang}`, '');
        }

        if (newLang === 'en') {
            if (newPath === '') newPath = '/';
            router.push(newPath);
        } else {
            router.push(`/${newLang}${newPath === '/' ? '' : newPath}`);
        }
    };

    const getPath = (path) => {
        if (currentLang === 'en') return path;
        return `/${currentLang}${path === '/' ? '' : path}`;
    };

    return (
        <header className="sticky top-0 z-50 bg-white">
            <div className='flex items-center py-4 justify-evenly bg-white text-gray-600 shadow-md border-b-2 rounded-sm'>
                <div className='hover:scale-105 duration-300'>
                    <Link href={`/${currentLang === 'en' ? '' : currentLang}`}>
                        <Image src={"/image.png"} alt='Logo' width={150} height={50} style={{ width: "auto", height: "auto" }} priority />
                    </Link>
                </div>
                <div className='hidden md:flex gap-6 items-center'>
                    {LinksHeader.map((ln, i) => (
                        <Link key={i} href={getPath(ln.path)} className={`${pathname === getPath(ln.path) ? "text-green-500 scale-110" : ""} cursor-pointer hover:text-green-500 hover:scale-110 duration-200`}>
                            <span className="flex items-center font-medium">{ln.name}</span>
                        </Link>
                    ))}
                    <select value={currentLang}
                        onChange={handleLanguageChange}
                        className='rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-green-500 bg-transparent'>
                        <option value={"en"}>en</option>
                        <option value={"fr"}>fr</option>
                    </select>

                    {/* <Link href={`/${currentLang}/Admin`} className="text-gray-600 hover:text-green-500 flex items-center">
                        {content?.admin || "Admin"}
                    </Link> */}
                </div>
                <div className='flex flex-row-reverse gap-4 items-center'>
                    <div onClick={() => setMenu(!menu)} className='md:hidden cursor-pointer'>
                        <AlignJustify />
                    </div>
                    <select value={currentLang}
                        onChange={handleLanguageChange}
                        className='md:hidden rounded-md border border-gray-300 px-2 py-1 bg-transparent'>
                        <option value={"en"}>en</option>
                        <option value={"fr"}>fr</option>
                    </select>
                </div>
            </div>
            {/* Mobile Menu */}
            <div className={`md:hidden absolute w-full bg-white shadow-lg grid transition-[grid-template-rows] duration-300 ease-in-out border-gray-100 ${menu ? 'grid-rows-[1fr] border-t' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                    <ul className="flex flex-col items-center py-2 space-y-1">
                        {LinksHeader.map((ln, i) => (
                            <li key={i} onClick={() => setMenu(false)} className="w-full flex justify-center">
                                <Link
                                    href={getPath(ln.path)}
                                    className={`flex items-center justify-center gap-2 py-1.5 px-4 rounded-lg transition-all duration-300 ${pathname === getPath(ln.path) ? "bg-green-50 text-green-600 font-bold" : "text-gray-600 hover:bg-gray-50 hover:text-green-500"}`}
                                >
                                    <span className="font-medium text-sm">{ln.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    );
}
