"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Monitor, Bookmark, Home, Film, Users, Clapperboard } from "lucide-react";
import { SearchBar } from "@/components/search/search-bar";
import { useTheme } from "@/providers/theme-provider";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/movies", label: "Movies", icon: Film },
  { href: "/actors", label: "Actors", icon: Users },
  { href: "/watchlist", label: "Watchlist", icon: Bookmark },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cycleTheme = () => {
    const order = ["dark", "light", "auto"] as const;
    const i = order.indexOf(theme);
    setTheme(order[(i + 1) % order.length]);
  };
  const ThemeIcon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-card" : "bg-transparent"}`}>
      <nav className="flex items-center justify-between gap-4 px-4 py-3 sm:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2"><Clapperboard className="h-7 w-7 text-brand-500" /><span className="font-display text-2xl tracking-wider text-white">CINE<span className="text-brand-500">DB</span></span></Link>
          <ul className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (<li key={link.href}><Link href={link.href} className={`text-sm font-medium transition-colors ${active ? "text-brand-400" : "text-zinc-300 hover:text-white"}`}>{link.label}</Link></li>);
            })}
          </ul>
        </div>
        <div className="hidden flex-1 max-w-md md:block"><SearchBar /></div>
        <div className="flex items-center gap-2">
          <button onClick={cycleTheme} aria-label="Toggle theme" className="rounded-full p-2 text-zinc-300 transition-colors hover:bg-ink-700 hover:text-white"><ThemeIcon className="h-5 w-5" /></button>
          <button onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={mobileOpen} className="rounded-full p-2 text-zinc-300 transition-colors hover:bg-ink-700 hover:text-white md:hidden">{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </nav>
      {mobileOpen && (
        <div className="border-t border-ink-700 glass px-4 py-4 md:hidden">
          <div className="mb-4"><SearchBar /></div>
          <ul className="space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (<li key={link.href}><Link href={link.href} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${active ? "bg-brand-500/10 text-brand-400" : "text-zinc-300 hover:bg-ink-700"}`}><Icon className="h-4 w-4" />{link.label}</Link></li>);
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
