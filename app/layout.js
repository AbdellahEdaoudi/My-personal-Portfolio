"use client";
import "./globals.css";
import { Inter, Prompt } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from "next/navigation";
import Header from "./Components/Header";
import { MyProvider } from "./Context/MyContext";
import { ThemeProvider } from "./Components/theme-provider"


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
  return (
    <html className="scroll-smooth" lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-2614061557764113" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2614061557764113"
          crossOrigin="anonymous"></script>    
      </head>
      <body className={`${prompt.className} bg-gray-50`}>
        <MyProvider>
          <div className="sticky z-50 top-0 bg-white">
            <Header nm={path} />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={path}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              {children}
            </motion.div>
          </AnimatePresence>
        </MyProvider>
        <Analytics />
      </body>
    </html>
  );
}
