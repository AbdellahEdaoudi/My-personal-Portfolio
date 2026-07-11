"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "../Components/Toast";
import Messages from "./components/messages";
import { LogOut, LayoutDashboard } from "../Components/Icons";

function Admin() {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [isForbidden, setIsForbidden] = useState(false);
  

  const Logout = async () => {
    setLoading(true);
    try {
      await axios.post("/api/auth/logout",
        {},
        { withCredentials: true }
      );
      toast.success("Logged out successfully");
      router.push("/Admin/Login");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed. Please try again.");
      setLoading(false);
    }
  };

  if (isForbidden) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-80 h-80 rounded-full bg-indigo-500/10 animate-pulse blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/6 w-72 h-72 rounded-full bg-purple-500/10 animate-pulse blur-3xl pointer-events-none [animation-delay:2s]" />
        <div className="relative z-10 flex flex-col items-center text-center px-10 py-12 rounded-3xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-2xl max-w-sm w-full mx-4 animate-[fadeInUp_0.6s_ease_both]">
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-indigo-500 border-r-indigo-500/30 animate-spin" />
            <div className="absolute inset-[10px] rounded-full border-2 border-transparent border-t-violet-400 border-l-violet-400/30 animate-[spin_1.8s_linear_infinite_reverse]" />
            <div className="absolute inset-5 rounded-full bg-indigo-500/15 flex items-center justify-center animate-pulse">
              <svg
                width="22" height="22" viewBox="0 0 24 24"
                fill="none" stroke="#a78bfa"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0ms]" />
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:150ms]" />
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-indigo-500/20 selection:text-indigo-700">

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo / Brand */}
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 text-white p-2 rounded-lg shadow-sm shadow-indigo-200">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 tracking-tight leading-none">
                  Admin Dashboard
                </h1>
                <p className="text-[11px] text-gray-500 font-medium tracking-wide uppercase mt-0.5">
                  Message Center
                </p>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold border border-indigo-200">
                  AE
                </div>
                <span className="text-xs font-medium text-gray-600 pr-1">
                  Abdellah Edaoudi
                </span>
              </div>

              <button
                onClick={Logout}
                disabled={loading}
                className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="hidden sm:inline group-hover:underline decoration-red-200 underline-offset-4">
                  {loading ? "Exiting..." : "Exit"}
                </span>
                <div className="p-2 bg-gray-100 group-hover:bg-red-50 rounded-lg transition-colors">
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-red-200 border-t-red-600 rounded-full animate-spin" />
                  ) : (
                    <LogOut className="w-4 h-4" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Messages isForbidden={isForbidden} setIsForbidden={setIsForbidden} />
      </main>
    </div>
  );
}

export default Admin;
