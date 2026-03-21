import type { Metadata } from "next";
import { Inter, Playfair_Display, Imperial_Script, Libre_Baskerville, Instrument_Serif, Mea_Culpa } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Modern Invites - Elegant E-Invites for Every Occasion",
  description: "Create beautiful, personalized digital invitations that leave a lasting impression. Perfect for weddings, birthdays, corporate events, and more.",
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
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${imperial.variable} ${libreBaskerville.variable} ${instrumentSerif.variable} ${meaCulpa.variable} font-sans antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}

