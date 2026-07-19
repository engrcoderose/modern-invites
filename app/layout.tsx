import type { Metadata } from "next";
import { Inter, Playfair_Display, Imperial_Script, Libre_Baskerville, Instrument_Serif, Mea_Culpa, Petit_Formal_Script } from "next/font/google";
import "./globals.css";


const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
});

const imperial = Imperial_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-imperial",
});

const libreBaskerville = Libre_Baskerville({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

const meaCulpa = Mea_Culpa({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mea-culpa",
});

const petitFormalScript = Petit_Formal_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-petit-formal-script",
});

export const metadata: Metadata = {
  title: "Modern Invites | Personalized Invitation Websites",
  description:
    "Personalized invitation websites for weddings, debuts, birthdays, and meaningful celebrations. Custom-designed, mobile-ready, and easy to share.",
  icons: {
    icon: "/icon.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${playfair.variable} ${imperial.variable} ${libreBaskerville.variable} ${instrumentSerif.variable} ${meaCulpa.variable} ${petitFormalScript.variable} font-sans antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}

