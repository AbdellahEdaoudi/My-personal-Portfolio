"use client";
import { createContext, useContext, useState, useCallback, useRef } from 'react';


const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within ToastProvider');
    return context;
};

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const timerRef = useRef(null);
    const isPausedRef = useRef(false);
    const remainingRef = useRef(4000);
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
        remainingRef.current = 4000;
        isPausedRef.current = false;

        // Show only 1 active toast at a time, replacing previous ones
        setToasts([{ id, message, type }]);
        startTimer(id, 4000);
    }, [startTimer]);

    const handleMouseEnter = useCallback(() => {
        if (!isPausedRef.current && timerRef.current) {
            isPausedRef.current = true;
            clearTimeout(timerRef.current);
            timerRef.current = null;
            // Calculate how much time was remaining
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
        error: (m) => addToast(m, 'error'),
        info: (m) => addToast(m, 'info'),
        warning: (m) => addToast(m, 'warning'),
    };

    const icons = {
        success: (
            <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
        ),
        error: (
            <svg className="w-4 h-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
        ),
        warning: (
            <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        info: (
            <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <div className="fixed top-6 right-6 z-[100] flex flex-col items-end gap-3 pointer-events-none">
                    {toasts.map((t) => (
                        <div
                            key={t.id}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className="pointer-events-auto touch-none select-none transition-all duration-300"
                        >
                            <div className="relative group">
                                {/* Thin, elegant border container */}
                                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-xl py-3 pl-4 pr-5 flex items-center gap-4 min-w-[320px] max-w-md overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">

                                    {/* Status Indicator */}
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${t.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-500/10' :
                                        t.type === 'error' ? 'bg-rose-50 dark:bg-rose-500/10' :
                                            t.type === 'warning' ? 'bg-amber-50 dark:bg-amber-500/10' :
                                                'bg-blue-50 dark:bg-blue-500/10'
                                        }`}>
                                        {icons[t.type]}
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100 leading-tight">
                                            {t.message}
                                        </p>
                                    </div>

                                    {/* Close Icon (Visible on Hover) */}
                                    <button
                                        onClick={() => removeToast(t.id)}
                                        className="shrink-0 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 opacity-0 group-hover:opacity-100 transition-all p-1"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>

                                    {/* Subtle Accent Line */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-[2px] ${t.type === 'success' ? 'bg-emerald-500' :
                                        t.type === 'error' ? 'bg-rose-500' :
                                            t.type === 'warning' ? 'bg-amber-500' :
                                                'bg-blue-500'
                                        }`} />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </ToastContext.Provider>
    );
}
