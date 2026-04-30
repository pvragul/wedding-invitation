import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Great_Vibes } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-montserrat",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

const bamini51 = localFont({
  src: "../fonts/Bamini_Tamil_51.ttf",
  variable: "--font-bamini-51",
});

const bamini34 = localFont({
  src: "../fonts/Bamini_Tamil_09.ttf",
  variable: "--font-bamini-34",
});

export const metadata: Metadata = {
  title: "Ragul & Yamuna | Wedding Invitation",
  description: "Join us in celebrating our wedding day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable} ${greatVibes.variable} ${bamini51.variable} ${bamini34.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased text-stone-800 bg-stone-50 min-h-screen flex flex-col">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
