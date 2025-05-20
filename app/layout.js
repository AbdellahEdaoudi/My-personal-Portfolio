"use client";
import "./globals.css";
import { Inter, Prompt } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from "next/navigation";
import Header from "./Components/Header";
import { MyProvider } from "./Context/MyContext";
import { ThemeProvider } from "./Components/theme-provider"
import { useEffect, useState } from "react";
import axios from "axios";


const inter = Inter({ subsets: ["latin"] });
const prompt = Prompt({ subsets: ["latin"], weight: '500' });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  // maximumScale: 1,
  // userScalable: false, // منع التكبير/التصغير
};


export default function RootLayout({ children }) {
  const path = usePathname();

  const fetchIp = async () => {
    try {
       axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/opera`);
    } catch (err) {
      // console.error("Error fetching IP:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchIp();
  }, []);
  return (
    <html className="scroll-smooth" lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      </head>
      <body className={`${prompt.className} bg-gray-50`}>
        <MyProvider>
          <div className={`sticky z-50 top-0 bg-white`}>
            <Header nm={path} />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={path}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              <div className="">{children}</div>
            </motion.div>
          </AnimatePresence>
        </MyProvider>
        <Analytics />
      </body>
    </html>
  );
}
