"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export function Rail({ title, children, seeAllHref }: { title: string; children: ReactNode; seeAllHref?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current; if (!el) return;
    el.scrollBy({ left: dir === "left" ? -el.clientWidth * 0.8 : el.clientWidth * 0.8, behavior: "smooth" });
  };
  return (
    <section className="group/rail relative px-4 py-6 sm:px-8">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-display text-2xl tracking-wide text-white sm:text-3xl">{title}</h2>
        {seeAllHref && <a href={seeAllHref} className="text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors">See all</a>}
      </div>
      <div className="relative">
        <button onClick={() => scroll("left")} aria-label="Scroll left" className="absolute -left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-ink-800/80 p-2 text-white opacity-0 backdrop-blur transition-opacity group-hover/rail:opacity-100 hover:bg-ink-700"><ChevronLeft className="h-5 w-5" /></button>
        <div ref={scrollRef} className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth">{children}</div>
        <button onClick={() => scroll("right")} aria-label="Scroll right" className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-ink-800/80 p-2 text-white opacity-0 backdrop-blur transition-opacity group-hover/rail:opacity-100 hover:bg-ink-700"><ChevronRight className="h-5 w-5" /></button>
      </div>
    </section>
  );
}
