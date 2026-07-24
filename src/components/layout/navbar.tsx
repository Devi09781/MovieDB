import { Link, NavLink, useNavigate } from "react-router-dom";
import { Film, Menu, X, Search } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/movies", label: "Movies" },
  { to: "/actors", label: "Actors" },
  { to: "/watchlist", label: "Watchlist" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/movies?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setOpen(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-ink-700/50 bg-ink-950/80 backdrop-blur-xl">
      <nav className="container-page flex h-16 items-center gap-4">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500"><Film className="h-5 w-5 text-ink-950" /></span>
          <span className="font-display text-xl font-bold text-white">MovieDB</span>
        </Link>

        <div className="hidden flex-1 items-center gap-1 sm:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={({ isActive }) => `rounded-lg px-4 py-2 text-sm font-medium transition ${isActive ? "bg-brand-500/15 text-brand-400" : "text-ink-300 hover:text-white"}`}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <form onSubmit={handleSearch} className="relative hidden max-w-xs flex-1 sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="w-full rounded-lg border border-ink-600 bg-ink-900/70 py-2 pl-9 pr-3 text-sm text-ink-100 placeholder-ink-400 focus:border-brand-500 focus:outline-none"
          />
        </form>

        <button onClick={() => setOpen((v) => !v)} className="rounded-lg p-2 text-ink-200 sm:hidden">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </nav>

      {open && (
        <div className="border-t border-ink-700/50 sm:hidden">
          <div className="container-page flex flex-col gap-2 py-3">
            <form onSubmit={handleSearch} className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies..."
                className="w-full rounded-lg border border-ink-600 bg-ink-900/70 py-2.5 pl-9 pr-3 text-sm text-ink-100 placeholder-ink-400 focus:border-brand-500 focus:outline-none"
              />
            </form>
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"} onClick={() => setOpen(false)} className={({ isActive }) => `rounded-lg px-4 py-2.5 text-sm font-medium transition ${isActive ? "bg-brand-500/15 text-brand-400" : "text-ink-300 hover:text-white"}`}>
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
