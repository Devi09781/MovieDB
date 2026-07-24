import { Link } from "react-router-dom";
import { TrendingUp, Star, Clock, Flame, Award, Film } from "lucide-react";
import HeroCarousel from "@/components/hero-carousel";
import Rail from "@/components/rail";
import { useTrending, usePopular, useTopRated, useLatest, useBollywood, useTollywood, useHollywood, useGenres } from "@/hooks/use-data";

export default function Home() {
  const { data: trending, isLoading: tLoading } = useTrending();
  const { data: popular, isLoading: pLoading } = usePopular();
  const { data: topRated, isLoading: trLoading } = useTopRated();
  const { data: latest, isLoading: lLoading } = useLatest();
  const { data: bollywood, isLoading: bLoading } = useBollywood();
  const { data: tollywood, isLoading: tlLoading } = useTollywood();
  const { data: hollywood, isLoading: hLoading } = useHollywood();
  const { data: genres } = useGenres();

  return (
    <div>
      <HeroCarousel movies={trending ?? []} />
      <div className="container-page space-y-12 py-12">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="section-title flex items-center gap-2"><TrendingUp className="h-5 w-5 text-brand-400" />Trending Now</h2>
            <Link to="/movies?category=trending" className="text-sm font-medium text-brand-400 hover:text-brand-300">View All →</Link>
          </div>
          <Rail title="" movies={trending ?? []} loading={tLoading} />
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="section-title flex items-center gap-2"><Flame className="h-5 w-5 text-brand-400" />Popular</h2>
            <Link to="/movies?category=popular" className="text-sm font-medium text-brand-400 hover:text-brand-300">View All →</Link>
          </div>
          <Rail title="" movies={popular ?? []} loading={pLoading} />
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="section-title flex items-center gap-2"><Award className="h-5 w-5 text-brand-400" />Top Rated</h2>
            <Link to="/movies?category=top-rated" className="text-sm font-medium text-brand-400 hover:text-brand-300">View All →</Link>
          </div>
          <Rail title="" movies={topRated ?? []} loading={trLoading} />
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="section-title flex items-center gap-2"><Clock className="h-5 w-5 text-brand-400" />Latest Releases</h2>
            <Link to="/movies?category=latest" className="text-sm font-medium text-brand-400 hover:text-brand-300">View All →</Link>
          </div>
          <Rail title="" movies={latest ?? []} loading={lLoading} />
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="section-title flex items-center gap-2"><Flame className="h-5 w-5 text-brand-400" />Bollywood</h2>
            <Link to="/movies?category=bollywood" className="text-sm font-medium text-brand-400 hover:text-brand-300">View All →</Link>
          </div>
          <Rail title="" movies={bollywood ?? []} loading={bLoading} />
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="section-title flex items-center gap-2"><Film className="h-5 w-5 text-brand-400" />Tollywood</h2>
            <Link to="/movies?category=tollywood" className="text-sm font-medium text-brand-400 hover:text-brand-300">View All →</Link>
          </div>
          <Rail title="" movies={tollywood ?? []} loading={tlLoading} />
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="section-title flex items-center gap-2"><Star className="h-5 w-5 text-brand-400" />Hollywood</h2>
            <Link to="/movies?category=hollywood" className="text-sm font-medium text-brand-400 hover:text-brand-300">View All →</Link>
          </div>
          <Rail title="" movies={hollywood ?? []} loading={hLoading} />
        </div>

        {genres && genres.length > 0 && (
          <section className="space-y-4">
            <h2 className="section-title">Browse by Genre</h2>
            <div className="flex flex-wrap gap-3">
              {genres.map((g) => (
                <Link key={g.id} to={`/movies?genre=${encodeURIComponent(g.name)}`} className="group flex items-center gap-2 rounded-xl border border-ink-700/60 bg-ink-850/80 px-4 py-3 transition hover:border-brand-500 hover:bg-ink-800">
                  <span className="text-sm font-semibold text-ink-100 group-hover:text-brand-400">{g.name}</span>
                  <span className="text-xs text-ink-400">{g.movie_count}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { icon: TrendingUp, title: "Trending", desc: "See what's popular right now", link: "/movies?category=trending" },
            { icon: Award, title: "Top Rated", desc: "The highest-rated films", link: "/movies?category=top-rated" },
            { icon: Clock, title: "Latest", desc: "New releases and recent films", link: "/movies?category=latest" },
          ].map((card) => (
            <Link key={card.title} to={card.link} className="card group flex items-start gap-3 p-5 transition hover:border-brand-500/60">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400"><card.icon className="h-5 w-5" /></span>
              <div><h3 className="font-semibold text-white group-hover:text-brand-400">{card.title}</h3><p className="text-sm text-ink-400">{card.desc}</p></div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
