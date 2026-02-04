"use client";
import React from 'react';
import { FaChevronUp } from 'react-icons/fa';

export default function BackToTop({ label }) {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className="mt-1 flex items-center gap-2 px-6 py-3 border border-gray-700 rounded-lg text-white text-sm font-medium hover:bg-white hover:text-[#0f1d1b] transition-all duration-300 uppercase tracking-widest"
        >
            <FaChevronUp className="group-hover:-translate-y-1 transition-transform" />
            {label || 'Back to Top'}
        </button>
    );
}
