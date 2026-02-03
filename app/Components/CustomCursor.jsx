'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [mounted, setMounted] = useState(false);
    const audioCtxRef = useRef(null);

    // Position of the mouse
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // 1. Natural Precision Spring (For the Arrow - High response)
    const cursorX = useSpring(mouseX, { damping: 45, stiffness: 1000 });
    const cursorY = useSpring(mouseY, { damping: 45, stiffness: 1000 });

    // 2. Professional Fluid Spring (For the Shadow/Glow - Soft trailing)
    const trailX = useSpring(mouseX, { damping: 30, stiffness: 150 });
    const trailY = useSpring(mouseY, { damping: 30, stiffness: 150 });

    const handleMouseMove = useCallback((e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    }, [mouseX, mouseY]);

    // Elegant UI Sound Synthesizer
    const playClickSound = useCallback(() => {
        try {
            if (!audioCtxRef.current) {
                audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }
            const ctx = audioCtxRef.current;
            if (ctx.state === 'suspended') ctx.resume();

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);

            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        } catch (e) {
            console.warn('Audio playback failed', e);
        }
    }, []);

    useEffect(() => {
        setMounted(true);
        window.addEventListener('mousemove', handleMouseMove);

        const handleMouseOver = (e) => {
            const target = e.target;
            if (target && target.closest('a, button, [role="button"], input, select, textarea, .project-card, .clickable')) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        const handleMouseDown = () => {
            setIsActive(true);
            playClickSound();
        };

        const handleMouseUp = () => setIsActive(false);

        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, playClickSound]);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999999] hidden md:block">
            {/* 1. The Trailing Professional Glow */}
            <motion.div
                className="fixed w-12 h-12 rounded-full"
                style={{
                    x: trailX,
                    y: trailY,
                    translateX: '-50%',
                    translateY: '-50%',
                    background: isHovered
                        ? 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0) 70%)'
                        : 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0) 70%)',
                }}
                animate={{
                    scale: isHovered ? 2 : 1,
                    opacity: isHovered ? 0.8 : 0.3,
                }}
            />

            {/* 2. The Interactive Magnet Ring (Large Rotating Dashed) */}
            <motion.div
                className="fixed rounded-full border-2 border-dashed border-emerald-500/40"
                style={{
                    x: trailX,
                    y: trailY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    width: isHovered ? 20 : 0,
                    height: isHovered ? 20 : 0,
                    opacity: isHovered ? 1 : 0,
                    rotate: isHovered ? 180 : 0,
                }}
                transition={{
                    type: 'spring',
                    damping: 25,
                    stiffness: 150,
                    rotate: { duration: 0.5, ease: "easeOut" }
                }}
            />

            {/* 3. The Natural Elite Pointer (Arrow) */}
            <motion.div
                className="fixed z-[1000]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-4px',
                    translateY: '-4px',
                }}
                animate={{
                    scale: isActive ? 0.8 : (isHovered ? 1.2 : 1),
                }}
            >
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                >
                    <path
                        d="M6 4L22 14L14 16L6 26V4Z"
                        fill="rgba(0,0,0,0.1)"
                        transform="translate(2, 2)"
                    />
                    <path
                        d="M6 4L22 14L14 16L6 26V4Z"
                        fill="white"
                    />
                    <path
                        d="M6 4L22 14L14 16L6 26V4Z"
                        stroke={isHovered ? "#10b981" : "#3b82f6"}
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8 7L18 13.5L13.5 15L8 22V7Z"
                        fill={isHovered ? "rgba(16, 185, 129, 0.1)" : "rgba(59, 130, 246, 0.1)"}
                    />
                </svg>
            </motion.div>

            {/* 4. Refined Click Feedback */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0.8 }}
                        animate={{ scale: 4, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        className="fixed rounded-full ring-1 ring-emerald-400/50"
                        style={{
                            left: mouseX.get(),
                            top: mouseY.get(),
                            width: 10,
                            height: 10,
                            translateX: '-50%',
                            translateY: '-50%',
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomCursor;