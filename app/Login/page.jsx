"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../Components/Toast";
import { Mail, Lock, Eye, EyeOff, User, ArrowBigRight } from "../Components/Icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const LoginAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/login`, {
        email,
        pass,
      }, { withCredentials: true });

      Cookies.set("token", response.data.accessToken, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });

      toast.success("Welcome back! Login successful.");
      router.push("/Admin");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Invalid credentials. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-slate-50">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px]"
      >
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 border border-slate-100 overflow-hidden relative">
          {/* Header Image/Pattern */}
          <div className="h-32 bg-gradient-to-br from-indigo-600 to-blue-700 p-8 flex flex-col justify-end">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-black text-white tracking-tight">Login</h2>
              <p className="text-white/70 text-sm font-medium">Access your admin dashboard</p>
            </motion.div>
          </div>

          <div className="p-8 md:p-10">
            <form onSubmit={LoginAdmin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-700 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                    Password
                  </label>
                  <Link href="/ResetPassword">
                    <span className="text-[11px] font-bold text-indigo-500 hover:text-indigo-600 transition-colors cursor-pointer">
                      Forgot?
                    </span>
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-12 text-sm text-slate-700 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all placeholder:text-slate-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 group-hover:from-indigo-700 group-hover:to-blue-700 transition-all rounded-2xl" />
                <div className="relative py-4 flex items-center justify-center gap-2 text-white font-bold text-sm tracking-wide">
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Sign In
                      <ArrowBigRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Footer */}
            <div className="mt-10 pt-8 border-t border-slate-50 text-center">
              <p className="text-slate-500 text-xs font-medium">
                Don't have an account?{" "}
                <Link href="/Register">
                  <span className="text-indigo-600 font-black hover:text-indigo-700 transition-colors cursor-pointer ml-1">
                    Create Account
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Optional Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-col items-center gap-1"
        >
          <div className="flex items-center gap-1.5 grayscale opacity-30">
            <div className="w-6 h-6 bg-slate-900 rounded-lg" />
            <span className="font-black text-slate-900 tracking-tighter text-lg">DGT PORTFOLIO</span>
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Premium Admin Experience</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
