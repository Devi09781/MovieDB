import { Link } from "react-router-dom";
import { Film, Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-ink-700/50 bg-ink-950">
      <div className="container-page py-10">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500"><Film className="h-4 w-4 text-ink-950" /></span>
            <span className="font-display text-lg font-bold text-white">MovieDB</span>
          </Link>
          <p className="text-sm text-ink-400">Your movie discovery platform.</p>
          <div className="flex gap-3">
            <a href="#" className="text-ink-400 hover:text-brand-400 transition"><Twitter className="h-5 w-5" /></a>
            <a href="#" className="text-ink-400 hover:text-brand-400 transition"><Github className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
