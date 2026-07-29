'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';

const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [mounted, setMounted] = useState(false);
    const audioCtxRef = useRef(null);

    const cursorRef = useRef(null);
    const trailRef = useRef(null);
    
    const mouseX = useRef(-100);
    const mouseY = useRef(-100);
    const cursorX = useRef(-100);
    const cursorY = useRef(-100);
    const trailX = useRef(-100);
    const trailY = useRef(-100);
    const requestRef = useRef();

    const updatePosition = useCallback(() => {
        // Simple lerp for smooth trailing
        cursorX.current += (mouseX.current - cursorX.current) * 0.5;
        cursorY.current += (mouseY.current - cursorY.current) * 0.5;
        
        trailX.current += (mouseX.current - trailX.current) * 0.15;
        trailY.current += (mouseY.current - trailY.current) * 0.15;

        if (cursorRef.current) {
            cursorRef.current.style.transform = `translate3d(${cursorX.current}px, ${cursorY.current}px, 0) translate(-4px, -4px) scale(${isActive ? 0.8 : (isHovered ? 1.2 : 1)})`;
        }
        if (trailRef.current) {
            trailRef.current.style.transform = `translate3d(${trailX.current}px, ${trailY.current}px, 0) translate(-50%, -50%)`;
        }

        requestRef.current = requestAnimationFrame(updatePosition);
    }, [isActive, isHovered]);

    const handleMouseMove = useCallback((e) => {
        mouseX.current = e.clientX;
        mouseY.current = e.clientY;
    }, []);

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
        const checkDevice = () => {
            setMounted(window.innerWidth >= 768);
        };
        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        window.addEventListener('mousemove', handleMouseMove);
        requestRef.current = requestAnimationFrame(updatePosition);

        const handleMouseOver = (e) => {
            const target = e.target;
            setIsHovered(!!(target && target.closest('a, button, [role="button"], input, select, textarea, .project-card, .clickable')));
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
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [mounted, handleMouseMove, updatePosition, playClickSound]);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999999]">
            {/* 1. The Trailing Professional Glow & Ring combined */}
            <div
                ref={trailRef}
                className="fixed transition-all duration-300"
                style={{
                    width: isHovered ? '20px' : '48px',
                    height: isHovered ? '20px' : '48px',
                    borderRadius: '50%',
                    background: isHovered
                        ? 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0) 70%)'
                        : 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0) 70%)',
                    border: isHovered ? '2px dashed rgba(16, 185, 129, 0.4)' : 'none',
                    opacity: isHovered ? 1 : 0.3,
                    animation: isHovered ? 'spin 2s linear infinite' : 'none',
                }}
            />

            {/* 2. The Natural Elite Pointer (Arrow) */}
            <div
                ref={cursorRef}
                className="fixed z-[1000] transition-transform duration-100"
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
            </div>
        </div>
    );
};

export default CustomCursor;