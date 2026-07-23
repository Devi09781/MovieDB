import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "./fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "CineDB — Discover Movies, Actors & More",
  description: "A premium movie database experience. Discover trending movies, actors, reviews, and build your watchlist.",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body>
        <a href="#main" className="skip-link">Skip to main content</a>
        <Providers>
          <Navbar />
          <main id="main" className="min-h-screen pt-0">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
