import { JetBrains_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const jb = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jb" });
const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex" });

export const metadata = {
  title: "Abdulwakeel Kesington | Software Engineer",
  description: "Software engineer building reliable APIs, data systems and real-world platforms.",
};

const boot = `try{var c=JSON.parse(localStorage.getItem("pf-cfg"));if(c&&c.theme)document.documentElement.dataset.theme=c.theme}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" data-rgb="on" suppressHydrationWarning className={`${jb.variable} ${plex.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: boot }} /></head>
      <body>{children}</body>
    </html>
  );
}
