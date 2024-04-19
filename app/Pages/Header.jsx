'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { AlignJustify } from 'lucide-react';

export default function Header() {
    const [menu, setMenu] = useState(false);
    const a = "hover:shadow-md hover:text-green-600 cursor-grabbing pb-1";
    const b = "cursor-grabbing hover:text-green-500";
    const [activeLink, setActiveLink] = useState("");

    const handleSetActiveLink = (Color) => {
        setActiveLink(Color);
    };

    return (
        <div className=''>
            <header className='flex justify-around py-6 text-gray-600 border-b-2'>
                <div className='flex justify-around'>
                    <Link href={"/"}>Portfolio</Link>
                </div>
                <div className='md:block hidden'>
                    <ul className='flex gap-6'>
                        <span className={`${b}`}>
                            <li onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); handleSetActiveLink("Home") }} className={`${activeLink === "Home" ? "text-green-500" : ""}`}>Home</li>
                        </span>
                        <span className={`${b}`}>
                            <li onClick={() => { window.scrollTo({ top: 489, behavior: 'smooth' }); handleSetActiveLink("About") }} className={`${activeLink === "About" ? "text-green-500" : ""}`}>About</li>
                        </span>
                        <span className={`${b}`}>
                            <li onClick={() => { window.scrollTo({ top: 1020, behavior: 'smooth' }); handleSetActiveLink("Skills") }} className={`${activeLink === "Skills" ? "text-green-500" : ""}`}>Skills</li>
                        </span>
                        <span className={`${b}`}>
                            <li onClick={() => { window.scrollTo({ top: 1540, behavior: 'smooth' }); handleSetActiveLink("Portfolio") }} className={`${activeLink === "Portfolio" ? "text-green-500" : ""}`}>Portfolio</li>
                        </span>
                        <span className={`${b}`}>
                            <li onClick={() => { window.scrollTo({ top: 2340, behavior: 'smooth' }); handleSetActiveLink("Qualification") }} className={`${activeLink === "Qualification" ? "text-green-500" : ""}`}>Qualification</li>
                        </span>
                        <span className={`${b}`}>
                            <li onClick={() => { window.scrollTo({ top: 2880, behavior: 'smooth' }); handleSetActiveLink("Contact") }} className={`${activeLink === "Contact" ? "text-green-500" : ""}`}>Contact</li>
                        </span>
                    </ul>
                </div>
                <div onClick={() => { menu ? setMenu(!menu) : setMenu(!menu) }} className='md:hidden cursor-grabbing'>
                    <AlignJustify />
                </div>
            </header>
            {/* mobile */}
            <div onClick={() => { menu ? setMenu(!menu) : setMenu(menu) }} className={`overflow-hidden ${menu ? 'max-h-44' : 'max-h-0'} ${menu ? 'min-h-36' : 'min-h-0'} md:hidden duration-500 shadow-lg`}>
                <ul className={`${menu ? 'block' : 'hidden'} text-center pt-1 pb-5`}>
                    <span className={`${b}`} >
                        <li onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); handleSetActiveLink("Home") }} className={`${a} ${activeLink === "Home" ? "text-green-500" : ""}`}>Home</li>
                    </span>
                    <span className={`${b}`} >
                        <li onClick={() => { window.scrollTo({ top: 816, behavior: 'smooth' }); handleSetActiveLink("About") }} className={`${a} ${activeLink === "About" ? "text-green-500" : ""}`}>About</li>
                    </span>
                    <span className={`${b}`} >
                        <li onClick={() => { window.scrollTo({ top: 1600, behavior: 'smooth' }); handleSetActiveLink("Skills") }} className={`${a} ${activeLink === "Skills" ? "text-green-500" : ""}`}>Skills</li>
                    </span>
                    <span className={`${b}`} >
                        <li onClick={() => { window.scrollTo({ top: 2450, behavior: 'smooth' }); handleSetActiveLink("Portfolio") }} className={`${a} ${activeLink === "Portfolio" ? "text-green-500" : ""}`}>Portfolio</li>
                    </span>
                    <span className={`${b}`} >
                        <li onClick={() => { window.scrollTo({ top: 4650, behavior: 'smooth' }); handleSetActiveLink("Qualification") }} className={`${a} ${activeLink === "Qualification" ? "text-green-500" : ""}`}>Qualification</li>
                    </span>
                    <span className={`${b}`} >
                        <li onClick={() => { window.scrollTo({ top: 5600, behavior: 'smooth' }); handleSetActiveLink("Contact") }} className={`${a} ${activeLink === "Contact" ? "text-green-500" : ""}`}>Contact</li>
                    </span>
                </ul>
            </div>
        </div>
    );
}
