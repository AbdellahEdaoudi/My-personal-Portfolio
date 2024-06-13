import { Inter, Prompt } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const prompt = Prompt({ subsets: ["latin"], weight: '500' });


export const metadata = {
  icons: {
    src: "/profile-pic.png",
    className: "rounded-md"
  },
  title: "Abdellah Edaoudi",
  description: "Portfolio of Abdellah Edaoudi, a FullStack MERN Developer with expertise in building dynamic and responsive web applications.",
  keywords: "Abdellah Edaoudi, FullStack Developer, MERN Stack, Portfolio, Web Development, React, Node.js, MongoDB, Express.js, JavaScript, Frontend Developer, Backend Developer, Software Engineer, Web Applications",

};

export default function RootLayout({ children }) {
  return (
    <html className="scroll-smooth" lang="en">
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </head>
      <body className={prompt.className}>
        {children}
      </body>
    </html>
  );
}
