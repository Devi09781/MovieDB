import { useParams, Link } from "react-router-dom";
import { Star, Clock, Calendar, DollarSign, Globe, Trophy, Play, Youtube, Film, Users, Clapperboard, User } from "lucide-react";
import MovieBanner from "@/components/movie-banner";
import CastSection from "@/components/cast-section";
import RecommendationsSection from "@/components/recommendations-section";
import ReviewsSection from "@/components/reviews-section";
import WatchlistButton from "@/components/watchlist-button";
import { useMovie, useMovies } from "@/hooks/use-data";
import { formatRuntime, formatCurrency, formatDate, ratingColor } from "@/lib/utils";
import type { CrewMember } from "@/types";

export default function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading } = useMovie(id);
  const { data: allMovies } = useMovies();

  if (isLoading) return <div className="container-page space-y-6 py-12"><div className="h-64 animate-pulse rounded-2xl bg-ink-800" /><div className="h-8 w-1/2 animate-pulse rounded bg-ink-800" /><div className="h-32 animate-pulse rounded-2xl bg-ink-800" /></div>;
  if (!movie) return <div className="container-page py-24 text-center"><p className="text-ink-400">Movie not found.</p><Link to="/movies" className="btn-primary mt-4">Browse Movies</Link></div>;

  const recommended = (movie.recommendations ?? []).map((mid) => allMovies?.find((m) => m.id === mid)).filter(Boolean) as NonNullable<typeof allMovies>;
  const similar = (movie.similar_movies ?? []).map((mid) => allMovies?.find((m) => m.id === mid)).filter(Boolean) as NonNullable<typeof allMovies>;

  const directors = (movie.crew ?? []).filter((c: CrewMember) => c.role === "Director");
  const writers = (movie.crew ?? []).filter((c: CrewMember) => c.role === "Writer");
  const producers = (movie.crew ?? []).filter((c: CrewMember) => c.role === "Producer");
  const cinematographers = (movie.crew ?? []).filter((c: CrewMember) => c.role === "Cinematographer");
  const composers = (movie.crew ?? []).filter((c: CrewMember) => c.role === "Composer");
  const otherCrew = (movie.crew ?? []).filter((c: CrewMember) => !["Director", "Writer", "Producer", "Cinematographer", "Composer"].includes(c.role));

  return (
    <div className="pb-12">
      <MovieBanner movie={movie} />
      <div className="container-page space-y-10 pt-8">
        <div className="flex flex-wrap gap-3">
          <WatchlistButton movieId={movie.id} />
          {movie.trailer_url && (
            <a href={movie.trailer_url} target="_blank" rel="noopener noreferrer" className="btn-primary bg-error-500 hover:bg-error-600">
              <Youtube className="h-4 w-4" />Watch Trailer
            </a>
          )}
        </div>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <h2 className="section-title">Overview</h2>
              <p className="text-base leading-relaxed text-ink-200">{movie.overview}</p>
            </div>

            {directors.length > 0 && (
              <div className="card p-5">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-200"><Clapperboard className="h-4 w-4 text-brand-400" />Director{directors.length > 1 ? "s" : ""}</h3>
                <div className="flex flex-wrap gap-3">
                  {directors.map((d, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl border border-ink-700/60 bg-ink-800/60 px-3 py-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/15 text-brand-400"><User className="h-5 w-5" /></div>
                      <div><p className="text-sm font-semibold text-white">{d.name}</p><p className="text-xs text-ink-400">{d.department}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {writers.length > 0 && (
              <div className="card p-5">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-200"><Users className="h-4 w-4 text-brand-400" />Writer{writers.length > 1 ? "s" : ""}</h3>
                <div className="flex flex-wrap gap-3">
                  {writers.map((w, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl border border-ink-700/60 bg-ink-800/60 px-3 py-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-700 text-ink-200"><User className="h-5 w-5" /></div>
                      <div><p className="text-sm font-semibold text-white">{w.name}</p><p className="text-xs text-ink-400">{w.department}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {producers.length > 0 && (
              <div className="card p-5">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-200"><Film className="h-4 w-4 text-brand-400" />Producer{producers.length > 1 ? "s" : ""}</h3>
                <div className="flex flex-wrap gap-3">
                  {producers.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl border border-ink-700/60 bg-ink-800/60 px-3 py-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-700 text-ink-200"><User className="h-5 w-5" /></div>
                      <div><p className="text-sm font-semibold text-white">{p.name}</p><p className="text-xs text-ink-400">{p.department}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(cinematographers.length > 0 || composers.length > 0 || otherCrew.length > 0) && (
              <div className="card p-5">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-200"><Users className="h-4 w-4 text-brand-400" />Other Crew</h3>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {cinematographers.map((c, i) => <CrewRow key={`cin-${i}`} name={c.name} role="Cinematographer" />)}
                  {composers.map((c, i) => <CrewRow key={`mus-${i}`} name={c.name} role="Music Composer" />)}
                  {otherCrew.map((c, i) => <CrewRow key={`oth-${i}`} name={c.name} role={c.role} />)}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <h2 className="section-title">Details</h2>
            <dl className="card space-y-3 p-5 text-sm">
              <DetailRow icon={Star} label="Rating"><span className={`font-bold ${ratingColor(Number(movie.rating))}`}>{Number(movie.rating).toFixed(1)} ({movie.vote_count} votes)</span></DetailRow>
              <DetailRow icon={Calendar} label="Release Date">{formatDate(movie.release_date)}</DetailRow>
              <DetailRow icon={Clock} label="Runtime">{formatRuntime(movie.runtime)}</DetailRow>
              <DetailRow icon={Film} label="Industry">{movie.industry}</DetailRow>
              <DetailRow icon={Globe} label="Languages">{(movie.languages ?? []).join(", ") || "N/A"}</DetailRow>
              <DetailRow icon={Globe} label="Genres">{(movie.genres ?? []).join(", ") || "N/A"}</DetailRow>
              <DetailRow icon={DollarSign} label="Budget">{formatCurrency(movie.budget)}</DetailRow>
              <DetailRow icon={DollarSign} label="Revenue">{formatCurrency(movie.revenue)}</DetailRow>
              <DetailRow icon={Globe} label="Status">{movie.status}</DetailRow>
            </dl>

            {movie.streaming_providers && movie.streaming_providers.length > 0 && (
              <div className="card p-5">
                <h3 className="mb-3 text-sm font-semibold text-ink-200">Streaming On</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.streaming_providers.map((s, i) => <span key={i} className="chip">{s}</span>)}
                </div>
              </div>
            )}

            {movie.production_companies && movie.production_companies.length > 0 && (
              <div className="card p-5">
                <h3 className="mb-3 text-sm font-semibold text-ink-200">Production</h3>
                <div className="space-y-1.5">{movie.production_companies.map((p, i) => <p key={i} className="text-sm text-ink-300">{p.name}</p>)}</div>
              </div>
            )}

            {movie.awards && movie.awards.length > 0 && (
              <div className="card p-5">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-200"><Trophy className="h-4 w-4 text-warning-400" />Awards</h3>
                <div className="space-y-1.5">{movie.awards.map((a, i) => <p key={i} className="text-sm text-ink-300">{a.won ? "🏆 " : "🏅 "}{a.name} ({a.year}) — {a.category}</p>)}</div>
              </div>
            )}
          </aside>
        </section>

        <CastSection cast={movie.cast_members ?? []} />
        {recommended.length > 0 && <RecommendationsSection title="Recommended" movies={recommended} />}
        {similar.length > 0 && <RecommendationsSection title="Similar Movies" movies={similar} />}
        <ReviewsSection movieId={movie.id} />
      </div>
    </div>
  );
}

function CrewRow({ name, role }: { name: string; role: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-ink-300">
      <User className="h-4 w-4 text-ink-400" />
      <span className="font-semibold text-ink-200">{name}</span>
      <span className="text-ink-400">— {role}</span>
    </div>
  );
}

function DetailRow({ icon: Icon, label, children }: { icon: React.ComponentType<{ className?: string }>; label: string; children: React.ReactNode }) {
  return <div className="flex items-start justify-between gap-3"><dt className="flex items-center gap-2 text-ink-400"><Icon className="h-4 w-4" />{label}</dt><dd className="text-right text-ink-100">{children}</dd></div>;
}
