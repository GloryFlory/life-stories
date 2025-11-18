/**
 * Scrapbook Layout
 * Loads special Google Fonts (Cormorant Garamond, Patrick Hand, Inter) only for scrapbook pages
 * Keep main app fonts (Italiana, Lora) separate
 */

import { Cormorant_Garamond, Patrick_Hand, Inter } from "next/font/google";

// Scrapbook-specific fonts
const cormorantGaramond = Cormorant_Garamond({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-scrapbook-serif",
  display: "swap",
});

const patrickHand = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-scrapbook-handwriting",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-scrapbook-sans",
  display: "swap",
});

export default function ScrapbookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div 
      className={`${cormorantGaramond.variable} ${patrickHand.variable} ${inter.variable}`}
      style={{
        // Override font variables for scrapbook
        ['--font-serif' as string]: 'var(--font-scrapbook-serif)',
        ['--font-handwriting' as string]: 'var(--font-scrapbook-handwriting)',
        ['--font-sans' as string]: 'var(--font-scrapbook-sans)',
      }}
    >
      {children}
    </div>
  );
}
