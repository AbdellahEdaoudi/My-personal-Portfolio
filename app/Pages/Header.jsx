"use client"
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { AlignJustify } from 'lucide-react';
import Image from 'next/image';
import { MyContext } from '../Context/MyContext';

export default function Header({ nm }) {
    const [menu, setMenu] = useState(false);
    const {EnOrFr,setEnOrFr}=useContext(MyContext)
    const style1 = "hover:shadow-md hover:text-green-600 cursor-pointer pb-1";
    const style2 = "cursor-pointer hover:text-green-500 hover:scale-110 duration-200";
    const LinksHeaderEn = [
        { name: "Home", path: "/" },
        { name: "About", path: "/About" },
        { name: "Skills", path: "/Skills" },
        { name: "Projects", path: "/Projects" },
        { name: "Qualification", path: "/Qualification" },
        { name: "Contact", path: "/Contact" },
    ];
    
    const LinksHeaderFr = [
        { name: "Accueil", path: "/" },
        { name: "À propos", path: "/About" },
        { name: "Compétences", path: "/Skills" },
        { name: "Projets", path: "/Projects" },
        { name: "Qualification", path: "/Qualification" },
        { name: "Contact", path: "/Contact" },
    ];
    const LinksHeader = EnOrFr === "en" ? LinksHeaderEn : LinksHeaderFr;

    return (
        <div>
            <header className='flex items-center py-4 justify-evenly  text-gray-600 shadow-md  border-2 rounded-sm'>
                <div>
                    <Link href={"/"}>
                    <Image src={"/image.png"} width={150} height={50} />
                    </Link>
                </div>
                <div className='hidden md:flex gap-6'>
                    {LinksHeader.map((ln, i) => (
                        <Link key={i} href={ln.path} className={`${style2} ${nm === ln.path ? "text-green-500 scale-110" : ""}`}>
                            <span className="flex items-center">{ln.name}</span>
                        </Link>
                    ))}
                    <select value={EnOrFr}
                        onChange={(e)=>{setEnOrFr(e.target.value)}}
                        className='rounded-md border border-black'>
                        <option value={"en"}>en</option>
                        <option value={"fr"}>fr</option>
                    </select>
                    
                    <Link href="/msg" className="text-white flex items-center">
                        Admin
                    </Link>
                </div>
                <div className='flex flex-row-reverse gap-4 items-center '>
                <div onClick={() => setMenu(!menu)} className='md:hidden cursor-pointer'>
                    <AlignJustify />
                </div>
                <select value={EnOrFr}
                        onChange={(e)=>{setEnOrFr(e.target.value)}}
                        className='md:hidden  rounded-md border border-black'>
                        <option value={"en"}>en</option>
                        <option value={"fr"}>fr</option>
                    </select>
                </div>
            </header>
            {/* Mobile Menu */}
            <div onClick={() => setMenu(!menu)} className={`overflow-hidden ${menu ? 'max-h-44' : 'max-h-0'} ${menu ? 'min-h-36' : 'min-h-0'} md:hidden duration-500 shadow-lg`}>
                <ul className={`text-center pt-1 pb-5`}>
                    {LinksHeader.map((ln, i) => (
                        <li key={i} onClick={() => setMenu(false)} className={`${style2}`}>
                            <Link href={ln.path}>
                                <span className={`${style1} ${nm === ln.name ? "text-green-500" : ""}`}>{ln.name}</span>
                            </Link>
                        </li>
                    ))} 
                </ul>
            </div>
        </div>
    );
}
