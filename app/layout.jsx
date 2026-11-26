import { JetBrains_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const jb = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jb", display: "swap" });
const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex", display: "swap" });

// On Vercel this is your real domain, so share previews get absolute image URLs.
const site = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000";
const title = "Abdulwakeel Kesington | Software Engineer";
const description = "Software engineer and 400-level Computer Science student at the University of Lagos, building backend systems with FastAPI and PostgreSQL.";

export const metadata = {
  metadataBase: new URL(site),
  title,
  description,
  openGraph: { title, description, type: "website", siteName: "Abdulwakeel Kesington" },
  twitter: { card: "summary_large_image", title, description },
};
export const viewport = { themeColor: "#212429" };

const boot = `try{var c=JSON.parse(localStorage.getItem("pf-cfg"));if(c&&c.theme)document.documentElement.dataset.theme=c.theme}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" data-rgb="on" suppressHydrationWarning className={`${jb.variable} ${plex.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: boot }} /></head>
      <body>{children}</body>
    </html>
  );
}
