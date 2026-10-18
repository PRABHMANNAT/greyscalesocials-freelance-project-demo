import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { MotionObserver } from "@/components/motion";
import "./globals.css";
import "./enhancements.css";

const manrope = localFont({src:"../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",display:"swap",variable:"--font-sans",weight:"200 800"});
const editorial = localFont({src:[{path:"../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2",weight:"400",style:"normal"},{path:"../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2",weight:"400",style:"italic"}],display:"swap",variable:"--font-editorial"});

export const metadata: Metadata = {
  title: {default: "Greyscale Socials — A different perspective.", template: "%s — Greyscale Socials"},
  description: "An independent creative perspective. Brand collaterals, digital marketing and consultation. Punjab, Chandigarh and Delhi. Private portfolio concept.",
  robots: {index:false,follow:false},
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en" data-scroll-behavior="smooth" className={`${manrope.variable} ${editorial.variable}`}><body><a className="skip-link" href="#main">Skip to content</a><Navigation />{children}<Footer /><MotionObserver /></body></html>;
}
