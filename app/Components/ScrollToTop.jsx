"use client"
import React, { useState, useEffect } from 'react';
const ArrowUp = ({ className, size = 24, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <path d="m5 12 7-7 7 7" />
        <path d="M12 19V5" />
    </svg>
)

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className={`fixed bottom-5 right-5 z-50 transition-all duration-500 ease-in-out transform ${isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
            <button
                onClick={scrollToTop}
                className="p-3 rounded-full bg-gray-500/60 backdrop-blur-md text-white shadow-lg hover:bg-gray-500/80 transition-all duration-300 transform hover:scale-110 focus:outline-none"
                aria-label="Scroll to top"
            >
                <ArrowUp size={24} />
            </button>
        </div>
    );
}
