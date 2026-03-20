import { Imperial_Script, Libre_Baskerville } from "next/font/google";

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
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`${imperial.variable} ${libreBaskerville.variable} font-sans antialiased`}>
            {children}
        </div>
    );
}