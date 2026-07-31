/*import type { Movie, Actor, Genre, Collection, Director, Review, WatchlistItem } from "@/types";
import { movies as mockMovies, actors as mockActors, genres as mockGenres, collections as mockCollections, directors as mockDirectors, trendingSearches } from "@/lib/mock-data";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export interface MovieRepository {
  getMovies(): Promise<Movie[]>; getMovie(id: string): Promise<Movie | null>;
  getTrending(): Promise<Movie[]>; getTopRated(): Promise<Movie[]>;
  getLatest(): Promise<Movie[]>; getByGenre(slug: string): Promise<Movie[]>;
  getRecommendations(id: string): Promise<Movie[]>; getSimilar(id: string): Promise<Movie[]>;
  search(query: string): Promise<Movie[]>;
}
export interface ActorRepository {
  getActors(): Promise<Actor[]>; getActor(id: string): Promise<Actor | null>;
  getActorsTrending(): Promise<Actor[]>;
}
export interface ReviewRepository {
  getByMovie(movieId: string): Promise<Review[]>;
  add(review: Omit<Review, "id" | "createdAt" | "updatedAt" | "helpfulCount" | "edited">): Promise<Review>;
  update(id: string, updates: Partial<Review>): Promise<Review>;
  remove(id: string): Promise<void>;
  voteHelpful(id: string, userId: string): Promise<Review>;
}
export interface WatchlistRepository {
  getByUser(userId: string): Promise<WatchlistItem[]>;
  add(item: Omit<WatchlistItem, "id" | "addedAt">): Promise<WatchlistItem>;
  update(id: string, updates: Partial<WatchlistItem>): Promise<WatchlistItem>;
  remove(id: string): Promise<void>;
}

export class MockMovieRepository implements MovieRepository {
  async getMovies() { await delay(200); return mockMovies; }
  async getMovie(id: string) { await delay(150); return mockMovies.find((m) => m.id === id) ?? null; }
  async getTrending() { await delay(200); return [...mockMovies].sort((a, b) => b.voteCount - a.voteCount).slice(0, 10); }
  async getTopRated() { await delay(200); return [...mockMovies].sort((a, b) => b.rating - a.rating).slice(0, 10); }
  async getLatest() { await delay(200); return [...mockMovies].sort((a, b) => b.year - a.year).slice(0, 10); }
  async getByGenre(slug: string) { await delay(200); const g = mockGenres.find((g) => g.slug === slug); if (!g) return []; return mockMovies.filter((m) => m.genres.some((mg) => mg.toLowerCase() === g.name.toLowerCase())); }
  async getRecommendations(id: string) { await delay(200); const m = mockMovies.find((m) => m.id === id); if (!m) return []; return m.recommendations.map((rid) => mockMovies.find((m) => m.id === rid)).filter(Boolean) as Movie[]; }
  async getSimilar(id: string) { await delay(200); const m = mockMovies.find((m) => m.id === id); if (!m) return []; return m.similar.map((rid) => mockMovies.find((m) => m.id === rid)).filter(Boolean) as Movie[]; }
  async search(q: string) { await delay(120); const query = q.toLowerCase(); return mockMovies.filter((m) => m.title.toLowerCase().includes(query) || m.overview.toLowerCase().includes(query) || m.genres.some((g) => g.toLowerCase().includes(query))); }
}

export class MockActorRepository implements ActorRepository {
  async getActors() { await delay(200); return mockActors; }
  async getActor(id: string) { await delay(150); return mockActors.find((a) => a.id === id) ?? null; }
  async getActorsTrending() { await delay(200); return mockActors.slice(0, 6); }
}

export class MockReviewRepository implements ReviewRepository {
  private reviews: Review[] = [];
  async getByMovie(movieId: string) { await delay(150); return this.reviews.filter((r) => r.movieId === movieId); }
  async add(review: Omit<Review, "id" | "createdAt" | "updatedAt" | "helpfulCount" | "edited">) { await delay(150); const now = Date.now(); const r: Review = { ...review, id: `r${now}`, createdAt: now, updatedAt: now, helpfulCount: 0, edited: false }; this.reviews.unshift(r); return r; }
  async update(id: string, updates: Partial<Review>) { await delay(150); const idx = this.reviews.findIndex((r) => r.id === id); if (idx === -1) throw new Error("Review not found"); this.reviews[idx] = { ...this.reviews[idx], ...updates, updatedAt: Date.now(), edited: true }; return this.reviews[idx]; }
  async remove(id: string) { await delay(100); this.reviews = this.reviews.filter((r) => r.id !== id); }
  async voteHelpful(id: string, _userId: string) { await delay(100); const r = this.reviews.find((r) => r.id === id); if (!r) throw new Error("Review not found"); r.helpfulCount += 1; return r; }
}

export class MockWatchlistRepository implements WatchlistRepository {
  private items: WatchlistItem[] = [];
  async getByUser(userId: string) { await delay(150); return this.items.filter((i) => i.userId === userId && !i.deleted); }
  async add(item: Omit<WatchlistItem, "id" | "addedAt">) { await delay(150); const now = Date.now(); const i: WatchlistItem = { ...item, id: `w${now}`, addedAt: now }; this.items.unshift(i); return i; }
  async update(id: string, updates: Partial<WatchlistItem>) { await delay(150); const idx = this.items.findIndex((i) => i.id === id); if (idx === -1) throw new Error("Item not found"); this.items[idx] = { ...this.items[idx], ...updates }; return this.items[idx]; }
  async remove(id: string) { await delay(100); const item = this.items.find((i) => i.id === id); if (item) item.deleted = true; }
}

export const movieRepository = new MockMovieRepository();
export const actorRepository = new MockActorRepository();
export const reviewRepository = new MockReviewRepository();
export const watchlistRepository = new MockWatchlistRepository();

export const dataRepository = {
  getGenres: async () => { await delay(100); return mockGenres; },
  getCollections: async () => { await delay(100); return mockCollections; },
  getDirectors: async () => { await delay(100); return mockDirectors; },
  getTrendingSearches: () => trendingSearches,
};
