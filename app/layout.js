import "./globals.css";
import { Inter, Prompt } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { MyProvider } from "./Context/MyContext";
import { ThemeProvider } from "./Components/theme-provider"
import ClientHeader from "./Components/Header/ClientHeader";
import ClientIpFetcher from "./Components/ClientIpFetcher/ClientIpFetcher";


const inter = Inter({ subsets: ["latin"] });
const prompt = Prompt({ subsets: ["latin"], weight: '500' });

// export const viewport = {
//   width: 'device-width',
//   initialScale: 1,
//   // maximumScale: 1,
//   // userScalable: false, // منع التكبير/التصغير
// };


export default function RootLayout({ children }) {

  return (
    <html className="scroll-smooth" lang="en">
      <head>
        <link rel="stylesheet" 
         href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      </head>
      <body className={`${prompt.className} bg-gray-50`}>
        <MyProvider>
          <div className={`sticky z-50 top-0 bg-white`}>
            <ClientHeader />
          </div>
          <div className="">
            <ClientIpFetcher />
            {children}
          </div>
        </MyProvider>
        <Analytics />
      </body>
    </html>
  );
}
