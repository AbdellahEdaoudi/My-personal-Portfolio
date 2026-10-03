"use client";
import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within ToastProvider');
    return context;
};

const DURATION = 4000;

const TYPES = {
    success: {
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
        ),
        iconBg: 'bg-emerald-500/15 text-emerald-400',
        bar:    'bg-emerald-500',
        border: 'border-emerald-500/20',
        glow:   'shadow-emerald-500/10',
    },
    error: {
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        ),
        iconBg: 'bg-rose-500/15 text-rose-400',
        bar:    'bg-rose-500',
        border: 'border-rose-500/20',
        glow:   'shadow-rose-500/10',
    },
    warning: {
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        iconBg: 'bg-amber-500/15 text-amber-400',
        bar:    'bg-amber-500',
        border: 'border-amber-500/20',
        glow:   'shadow-amber-500/10',
    },
    info: {
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        iconBg: 'bg-blue-500/15 text-blue-400',
        bar:    'bg-blue-500',
        border: 'border-blue-500/20',
        glow:   'shadow-blue-500/10',
    },
};

function ToastItem({ t, onRemove, onMouseEnter, onMouseLeave }) {
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(100);
    const cfg = TYPES[t.type] || TYPES.info;

    // Slide-in on mount
    useEffect(() => {
        const raf = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(raf);
    }, []);

    // Progress bar countdown
    useEffect(() => {
        const start = Date.now();
        const tick = () => {
            const elapsed = Date.now() - start;
            const pct = Math.max(0, 100 - (elapsed / DURATION) * 100);
            setProgress(pct);
            if (pct > 0) frame = requestAnimationFrame(tick);
        };
        let frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, []);

    const handleClose = () => {
        setVisible(false);
        setTimeout(() => onRemove(t.id), 350);
    };

    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{
                transform: visible ? 'translateX(0) scale(1)' : 'translateX(110%) scale(0.95)',
                opacity: visible ? 1 : 0,
                transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease',
            }}
            className={`relative group w-[360px] overflow-hidden rounded-2xl border backdrop-blur-xl bg-white/90 dark:bg-zinc-900/90 shadow-xl ${cfg.border} ${cfg.glow}`}
        >
            {/* Content */}
            <div className="flex items-center gap-3 px-4 py-3.5">
                {/* Icon */}
                <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${cfg.iconBg}`}>
                    {cfg.icon}
                </div>

                {/* Message */}
                <p className="flex-1 text-[13px] font-medium text-zinc-800 dark:text-zinc-100 leading-snug select-text">
                    {t.message}
                </p>

                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="shrink-0 ml-1 w-6 h-6 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
                    aria-label="Close"
                >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-zinc-100 dark:bg-zinc-800">
                <div
                    className={`h-full ${cfg.bar} transition-none rounded-full`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const timerRef = useRef(null);
    const isPausedRef = useRef(false);
    const remainingRef = useRef(DURATION);
    const startTimeRef = useRef(null);
    const activeIdRef = useRef(null);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const startTimer = useCallback((id, duration) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        startTimeRef.current = Date.now();
        timerRef.current = setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
    }, []);

    const addToast = useCallback((message, type = 'success') => {
        const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        activeIdRef.current = id;
        remainingRef.current = DURATION;
        isPausedRef.current = false;
        setToasts([{ id, message, type }]);
        startTimer(id, DURATION);
    }, [startTimer]);

    const handleMouseEnter = useCallback(() => {
        if (!isPausedRef.current && timerRef.current) {
            isPausedRef.current = true;
            clearTimeout(timerRef.current);
            timerRef.current = null;
            const elapsed = Date.now() - (startTimeRef.current || Date.now());
            remainingRef.current = Math.max(0, remainingRef.current - elapsed);
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (isPausedRef.current && activeIdRef.current) {
            isPausedRef.current = false;
            startTimer(activeIdRef.current, remainingRef.current);
        }
    }, [startTimer]);

    const toast = {
        success: (m) => addToast(m, 'success'),
        error:   (m) => addToast(m, 'error'),
        info:    (m) => addToast(m, 'info'),
        warning: (m) => addToast(m, 'warning'),
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <div className="fixed top-5 right-5 z-[999] flex flex-col items-end gap-2.5 pointer-events-none">
                {toasts.map((t) => (
                    <div key={t.id} className="pointer-events-auto">
                        <ToastItem
                            t={t}
                            onRemove={removeToast}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
