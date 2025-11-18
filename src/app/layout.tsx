import type { Metadata } from "next";
import { Italiana, Lora } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const italiana = Italiana({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-handwriting",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Life Stories",
  description: "A digital life stories book to share memories and wisdom with those you love",
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${italiana.variable} ${lora.variable} font-serif antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
