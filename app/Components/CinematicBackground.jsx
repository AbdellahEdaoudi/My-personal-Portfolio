'use client';

import React from 'react';

const CinematicBackground = () => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#f9fafb]">
            {/* Soft Ambient Glows - Fantasy Vibe */}
            <div className="absolute inset-0">
                <div className="absolute top-[-10%] left-[-20%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_70%)] animate-slow-drift"></div>
                <div className="absolute bottom-[-10%] right-[-20%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(167,139,250,0.08)_0%,transparent_70%)] animate-slow-drift-reverse"></div>
                <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(34,211,238,0.05)_0%,transparent_60%)] animate-pulse-soft"></div>
            </div>

            {/* Cinematic Noise & Texture */}
            <div className="absolute inset-0 opacity-[0.4] mix-blend-soft-light" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

            {/* Elegant Grid System */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}
            ></div>

            {/* Light Leaks / Streaks */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/3 w-[1px] h-full bg-gradient-to-b from-transparent via-blue-400/10 to-transparent animate-scan-slow"></div>
                <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-purple-400/10 to-transparent animate-scan-slow-delayed"></div>
            </div>

            {/* Fine Dust Particles - Client Side Only */}
            <div className="absolute inset-0">
                {mounted && [...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-blue-400/20 rounded-full blur-[1px] animate-dust"
                        style={{
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 10}s`,
                            animationDuration: `${Math.random() * 20 + 15}s`
                        }}
                    ></div>
                ))}
            </div>

            <style jsx>{`
                @keyframes slow-drift {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(30px, -20px) scale(1.05); }
                }

                @keyframes slow-drift-reverse {
                    0%, 100% { transform: translate(0, 0) scale(1.05); }
                    50% { transform: translate(-30px, 20px) scale(1); }
                }

                @keyframes pulse-soft {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.8; }
                }

                @keyframes scan-slow {
                    0% { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
                    20%, 80% { opacity: 1; }
                    100% { transform: translateX(100vw) skewX(-15deg); opacity: 0; }
                }

                @keyframes dust {
                    0% { transform: translateY(0) translateX(0); opacity: 0; }
                    10%, 90% { opacity: 1; }
                    100% { transform: translateY(-30vh) translateX(30px); opacity: 0; }
                }

                .animate-slow-drift { animation: slow-drift 15s ease-in-out infinite; }
                .animate-slow-drift-reverse { animation: slow-drift-reverse 18s ease-in-out infinite; }
                .animate-pulse-soft { animation: pulse-soft 8s ease-in-out infinite; }
                .animate-scan-slow { animation: scan-slow 12s linear infinite; }
                .animate-scan-slow-delayed { animation: scan-slow 12s linear infinite 6s; }
                .animate-dust { animation: dust linear infinite; }
            `}</style>
        </div>
    );
};

export default CinematicBackground;
