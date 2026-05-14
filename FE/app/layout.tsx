import type { Metadata } from "next";
import { Manrope, Sora, Playfair_Display } from "next/font/google";

import SmoothScroll from "@/app/components/common/SmoothScroll";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "HAT Studio",
  description: "Creative Digital Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${sora.variable} ${playfair.variable} antialiased`}>
        {/* <Scene /> */}
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
