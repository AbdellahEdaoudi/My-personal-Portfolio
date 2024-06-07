import { Inter, Prompt } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const prompt = Prompt({ subsets: ["latin"], weight: '500' });


export const metadata = {
  title: "Abdellah Edaoudi",
  description: "Portfolio of Abdellah Edaoudi, a FullStack MERN Developer with expertise in building dynamic and responsive web applications.",
  keywords: "Abdellah Edaoudi, FullStack Developer, MERN Stack, Portfolio, Web Development, React, Node.js, MongoDB, Express.js, JavaScript, Frontend Developer, Backend Developer, Software Engineer, Web Applications",

};

export default function RootLayout({ children }) {
  return (
    <html className="scroll-smooth" lang="en">
      <head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2614061557764113"
     crossorigin="anonymous"></script>
      </head>
      <body className={prompt.className}>
        {children}
      </body>
    </html>
  );
}
