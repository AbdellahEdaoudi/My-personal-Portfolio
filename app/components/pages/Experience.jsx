import React from 'react';
import { CalendarIcon, MapPinIcon, Briefcase } from '../Icons';
import { 
    FaReact, FaNodeJs, FaGitAlt, FaPaypal, FaLock, FaPhp, FaHtml5, FaCss3Alt, FaDatabase, FaPython 
} from "react-icons/fa";
import { 
    SiNextdotjs, SiMongodb, SiTailwindcss, SiJavascript, SiTypescript, 
    SiPostman, SiJsonwebtokens, SiSocketdotio, SiVercel, SiNestjs, SiExpress, SiMysql, SiBootstrap
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import Image from "next/image";

const EXPERIENCE_SKILLS = {
    // 0: Founder & Full Stack Developer - DGT Portfolio
    0: [
        { name: 'Next.js', icon: <SiNextdotjs className="text-black dark:text-white" /> },
        { name: 'React.js', icon: <FaReact className="text-blue-500" /> },
        { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
        { name: 'Express.js', icon: <SiExpress className="text-gray-800 dark:text-gray-200" /> },
        { name: 'MongoDB', icon: <SiMongodb className="text-green-600" /> },
        { name: 'PayPal API', icon: <FaPaypal className="text-blue-700" /> },
        { name: 'JWT / NextAuth', icon: <SiJsonwebtokens className="text-pink-500" /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-teal-500" /> },
        { name: 'Vercel', icon: <SiVercel className="text-black dark:text-white" /> },
        { name: 'Git & GitHub', icon: <FaGitAlt className="text-orange-500" /> }
    ],
    // 1: Backend Development Training - NestJS Focus
    1: [
        { name: 'NestJS', icon: <SiNestjs className="text-red-600" /> },
        { name: 'TypeScript', icon: <SiTypescript className="text-blue-600" /> },
        { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
        { name: 'REST APIs', icon: <TbApi className="text-sky-500" /> },
        { name: 'Postman', icon: <SiPostman className="text-orange-500" /> },
        { name: 'Socket.io', icon: <SiSocketdotio className="text-black dark:text-white" /> },
        { name: 'MongoDB', icon: <SiMongodb className="text-green-600" /> },
        { name: 'OAuth & RBAC', icon: <FaLock className="text-amber-500" /> }
    ],
    // 2: Full Stack Web Developer Intern - CMC
    2: [
        { name: 'React.js', icon: <FaReact className="text-blue-500" /> },
        { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" /> },
        { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
        { name: 'Express.js', icon: <SiExpress className="text-gray-800 dark:text-gray-200" /> },
        { name: 'MongoDB', icon: <SiMongodb className="text-green-600" /> },
        { name: 'MySQL', icon: <SiMysql className="text-blue-600" /> },
        { name: 'PHP', icon: <FaPhp className="text-indigo-500" /> },
        { name: 'Git & GitHub', icon: <FaGitAlt className="text-orange-500" /> }
    ],
    // 3: Full Stack MERN Developer - Académie Régionale d'Éducation et de Formation
    3: [
        { name: 'React.js', icon: <FaReact className="text-blue-500" /> },
        { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
        { name: 'Express.js', icon: <SiExpress className="text-gray-800 dark:text-gray-200" /> },
        { name: 'MongoDB', icon: <SiMongodb className="text-green-600" /> },
        { name: 'REST APIs', icon: <TbApi className="text-sky-500" /> },
        { name: 'Postman', icon: <SiPostman className="text-orange-500" /> },
        { name: 'JWT', icon: <SiJsonwebtokens className="text-pink-500" /> },
        { name: 'Vercel', icon: <SiVercel className="text-black dark:text-white" /> }
    ],
    // 4: Digital Developer Intern - CMC (2022 - 2023)
    4: [
        { name: 'HTML5', icon: <FaHtml5 className="text-orange-600" /> },
        { name: 'CSS3', icon: <FaCss3Alt className="text-blue-600" /> },
        { name: 'Bootstrap', icon: <SiBootstrap className="text-purple-600" /> },
        { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" /> },
        { name: 'Python', icon: <FaPython className="text-blue-500" /> },
        { name: 'PHP', icon: <FaPhp className="text-indigo-500" /> },
        { name: 'SQL', icon: <FaDatabase className="text-blue-600 dark:text-blue-400" /> },
        { name: 'Git', icon: <FaGitAlt className="text-orange-500" /> }
    ]
};

export default function Experience({ content }) {
    if (!content) return null;

    return (
        <section className="py-5 min-h-screen relative">
            <div className="container mx-auto px-3 sm:px-4 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl sm:text-4xl font-bold dark:text-white">{content.title}</h2>
                    <p className="text-gray-400 text-xs sm:text-sm">{content.subtitle}</p>
                </div>

                {/* Timeline Container */}
                <div className="relative space-y-5 sm:space-y-7 my-4">
                    {/* The Vertical Timeline Line */}
                    <div className="absolute left-1.75 sm:left-2.75 top-4 bottom-4 w-0.5 bg-blue-200/60 dark:bg-blue-900/50 -translate-x-1/2"></div>

                    {content.items && content.items.map((item, index) => {
                        const skills = EXPERIENCE_SKILLS[index] || [];
                        const isCurrent = index === 0 || item.endDate?.toLowerCase() === 'present' || item.endDate?.includes('حالي') || item.endDate?.includes('actuel');

                        return (
                            <div key={index} className="relative pl-6 sm:pl-9 md:pl-10 group">
                                {/* Timeline Node / Indicator Perfectly Centered on the Line */}
                                <div className="absolute left-1.75 sm:left-2.75 top-4 sm:top-5 -translate-x-1/2 flex items-center justify-center">
                                    <span className="relative flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center">
                                        {isCurrent && (
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                        )}
                                        <span className={`relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 border-2 border-white dark:border-[#0b1b2b] shadow-xs ${
                                            isCurrent ? 'bg-cyan-500' : 'bg-blue-600 dark:bg-blue-500'
                                        }`}></span>
                                    </span>
                                </div>

                                {/* Experience Card */}
                                <div className="bg-white/85 dark:bg-[#0b1b2b]/85 backdrop-blur-md border border-gray-100/90 dark:border-[#162f49] rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-0.5">
                                    {/* Card Top Accent Gradient */}
                                    <div className={`h-1 sm:h-1.5 bg-linear-to-r ${
                                        isCurrent 
                                            ? 'from-cyan-400 via-blue-500 to-indigo-500' 
                                            : 'from-blue-600 via-cyan-600 to-teal-500'
                                    }`}></div>

                                    <div className="p-3.5 sm:p-5 md:p-6">
                                        {/* Card Header (Compact Mobile Responsive) */}
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-4 mb-3">
                                            <div className="space-y-1">
                                                <h3 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                                                    {item.title}
                                                </h3>

                                                <div className="flex items-center gap-1.5 flex-wrap text-xs">
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] sm:text-xs font-semibold bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/50">
                                                        <Briefcase className="w-3 h-3 text-blue-500 shrink-0" />
                                                        {item.company}
                                                    </span>
                                                    <span className="text-gray-300 dark:text-gray-700 leading-none">•</span>
                                                    <span className="inline-flex items-center text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 bg-gray-100/70 dark:bg-slate-800/70 px-1.5 py-0.5 rounded">
                                                        {item.type} {item.workType ? `(${item.workType})` : ''}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Date & Location */}
                                            <div className="flex flex-row sm:flex-col sm:items-end justify-between sm:justify-center gap-1.5 text-[11px] sm:text-xs text-gray-600 dark:text-gray-400 pt-1 sm:pt-0 border-t sm:border-t-0 border-gray-100/70 dark:border-slate-800/50 shrink-0">
                                                <div className="inline-flex items-center gap-1 text-gray-800 dark:text-gray-200 font-semibold bg-gray-50 dark:bg-slate-800/90 border border-gray-200/70 dark:border-slate-700 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md">
                                                    <CalendarIcon className="w-3 h-3 text-blue-500 dark:text-blue-400 shrink-0" />
                                                    <span>{item.startDate} — {item.endDate}</span>
                                                </div>

                                                <div className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 pr-0.5">
                                                    <MapPinIcon className="w-3 h-3 text-red-500/80 shrink-0" />
                                                    <span>{item.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="border-t border-gray-100 dark:border-[#162f49] my-2.5 sm:my-3.5"></div>

                                        {/* Responsibilities */}
                                        {(item.responsibilities || item.description) && (
                                            <div className="space-y-2">
                                                <h4 className="text-[11px] sm:text-xs font-bold text-gray-800 dark:text-slate-300 uppercase tracking-wider">
                                                    {item.achievementsLabel || 'Key Contributions:'}
                                                </h4>
                                                <ul className="space-y-1.5 sm:space-y-2">
                                                    {(item.responsibilities || item.description).map((text, i) => (
                                                        <li key={i} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed group/item">
                                                            <span className="mt-1.5 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full shrink-0"></span>
                                                            <span className="group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors">
                                                                {text}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Tech Stack Pills / Tags with React-Icons matching Skills.jsx */}
                                        {skills.length > 0 && (
                                            <div className="mt-3.5 sm:mt-4 pt-2.5 sm:pt-3 border-t border-dashed border-gray-200/80 dark:border-slate-800/80">
                                                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                                                    {skills.map((tech, techIdx) => (
                                                        <span 
                                                            key={techIdx} 
                                                            className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-50/90 hover:bg-blue-50/80 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 text-gray-700 dark:text-gray-200 border border-gray-200/80 dark:border-slate-700/80 transition-colors cursor-default shadow-2xs"
                                                        >
                                                            {tech.isImage ? (
                                                                <Image 
                                                                    src={tech.src} 
                                                                    alt={tech.name} 
                                                                    width={14} 
                                                                    height={14} 
                                                                    className="w-3.5 h-3.5 rounded-full object-cover shrink-0" 
                                                                />
                                                            ) : (
                                                                <span className="text-xs sm:text-sm shrink-0">
                                                                    {tech.icon}
                                                                </span>
                                                            )}
                                                            <span>{tech.name}</span>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
