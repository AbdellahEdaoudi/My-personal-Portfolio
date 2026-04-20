'use client';

import React from 'react';

const CinematicBackground = () => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#f9fafb]">
            {/* Ambient Glows - Optimized Opacity and Count */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-20%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_70%)] animate-slow-drift"></div>
                <div className="absolute bottom-[-10%] right-[-20%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(167,139,250,0.06)_0%,transparent_70%)] animate-slow-drift-reverse"></div>
            </div>

            {/* High Performance Noise Texture (Static PNG pattern instead of dynamic SVG filter) */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")` }}></div>

            {/* Elegant Grid System - Increased size for fewer lines */}
            <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}
            ></div>

            {/* Light Leaks - Reduced to 1 animated streak */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/3 w-[1px] h-full bg-gradient-to-b from-transparent via-blue-400/5 to-transparent animate-scan-slow"></div>
            </div>

            {/* Fine Dust Particles - Reduced Count to 8 for maximum performance */}
            <div className="absolute inset-0">
                {mounted && [...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-blue-400/10 rounded-full blur-[1px] animate-dust"
                        style={{
                            width: `${Math.random() * 2 + 1}px`,
                            height: `${Math.random() * 2 + 1}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${Math.random() * 15 + 10}s`
                        }}
                    ></div>
                ))}
            </div>

            <style jsx>{`
                @keyframes slow-drift {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(15px, -10px); }
                }

                @keyframes slow-drift-reverse {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(-15px, 10px); }
                }

                @keyframes scan-slow {
                    0% { transform: translateX(-100%); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateX(100vw); opacity: 0; }
                }

                @keyframes dust {
                    0% { transform: translateY(0); opacity: 0; }
                    20%, 80% { opacity: 0.4; }
                    100% { transform: translateY(-20vh) translateX(15px); opacity: 0; }
                }

                .animate-slow-drift { animation: slow-drift 20s ease-in-out infinite; }
                .animate-slow-drift-reverse { animation: slow-drift-reverse 25s ease-in-out infinite; }
                .animate-scan-slow { animation: scan-slow 15s linear infinite; }
                .animate-dust { animation: dust linear infinite; }
            `}</style>
        </div>
    );
};

export default CinematicBackground;
