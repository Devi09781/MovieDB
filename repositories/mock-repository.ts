/*import type {
  Movie,
  Actor,
  Genre,
  Collection,
  Director,
  Studio,
  Review,
  WatchlistItem,
} from "@/types";
import {
  movies as mockMovies,
  actors as mockActors,
  genres as mockGenres,
  collections as mockCollections,
  directors as mockDirectors,
  studios as mockStudios,
  trendingSearches,
} from "@/lib/mock-data";
import type {
  DataRepository,
  MovieRepository,
  ActorRepository,
  ReviewRepository,
  WatchlistRepository,
} from "@/repositories/types";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export class MockMovieRepository implements MovieRepository {
  async getMovies(): Promise<Movie[]> {
    await delay(200);
    return mockMovies;
  }
  async getMovie(id: string): Promise<Movie | null> {
    await delay(150);
    return mockMovies.find((m) => m.id === id) ?? null;
  }
  async getTrending(): Promise<Movie[]> {
    await delay(200);
    return [...mockMovies].sort((a, b) => b.voteCount - a.voteCount).slice(0, 10);
  }
  async getTopRated(): Promise<Movie[]> {
    await delay(200);
    return [...mockMovies].sort((a, b) => b.rating - a.rating).slice(0, 10);
  }
  async getLatest(): Promise<Movie[]> {
    await delay(200);
    return [...mockMovies].sort((a, b) => b.year - a.year).slice(0, 10);
  }
  async getComingSoon(): Promise<Movie[]> {
    await delay(200);
    return mockMovies.filter((m) => m.status !== "Released").concat(
      [...mockMovies].sort((a, b) => b.year - a.year).slice(0, 3)
    );
  }
  async getByGenre(slug: string): Promise<Movie[]> {
    await delay(200);
    const genre = mockGenres.find((g) => g.slug === slug);
    if (!genre) return [];
    return mockMovies.filter((m) =>
      m.genres.some((g) => g.toLowerCase() === genre.name.toLowerCase())
    );
  }
  async getByIndustry(industry: string): Promise<Movie[]> {
    await delay(200);
    return mockMovies.filter((m) => m.industry === industry);
  }
  async getRecommendations(id: string): Promise<Movie[]> {
    await delay(200);
    const movie = mockMovies.find((m) => m.id === id);
    if (!movie) return [];
    return movie.recommendations
      .map((rid) => mockMovies.find((m) => m.id === rid))
      .filter(Boolean) as Movie[];
  }
  async getSimilar(id: string): Promise<Movie[]> {
    await delay(200);
    const movie = mockMovies.find((m) => m.id === id);
    if (!movie) return [];
    return movie.similar
      .map((rid) => mockMovies.find((m) => m.id === rid))
      .filter(Boolean) as Movie[];
  }
  async search(query: string): Promise<Movie[]> {
    await delay(120);
    const q = query.toLowerCase();
    return mockMovies.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.overview.toLowerCase().includes(q) ||
        m.genres.some((g) => g.toLowerCase().includes(q))
    );
  }
}

export class MockActorRepository implements ActorRepository {
  async getActors(): Promise<Actor[]> {
    await delay(200);
    return mockActors;
  }
  async getActor(id: string): Promise<Actor | null> {
    await delay(150);
    return mockActors.find((a) => a.id === id) ?? null;
  }
  async getActorsTrending(): Promise<Actor[]> {
    await delay(200);
    return mockActors.slice(0, 6);
  }
  async searchActors(query: string): Promise<Actor[]> {
    await delay(120);
    const q = query.toLowerCase();
    return mockActors.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.alsoKnownAs.some((n) => n.toLowerCase().includes(q))
    );
  }
}

export class MockReviewRepository implements ReviewRepository {
  private reviews: Review[] = [];

  async getByMovie(movieId: string): Promise<Review[]> {
    await delay(150);
    return this.reviews.filter((r) => r.movieId === movieId);
  }
  async add(review: Omit<Review, "id" | "createdAt" | "updatedAt" | "helpfulCount" | "helpfulBy" | "edited">): Promise<Review> {
    await delay(150);
    const now = Date.now();
    const newReview: Review = {
      ...review,
      id: `r${now}`,
      createdAt: now,
      updatedAt: now,
      helpfulCount: 0,
      helpfulBy: [],
      edited: false,
    };
    this.reviews.unshift(newReview);
    return newReview;
  }
  async update(id: string, updates: Partial<Review>): Promise<Review> {
    await delay(150);
    const idx = this.reviews.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error("Review not found");
    const prev = this.reviews[idx];
    const updated: Review = {
      ...prev,
      ...updates,
      updatedAt: Date.now(),
      edited: true,
      revisionHistory: [
        ...(prev.revisionHistory ?? []),
        { content: prev.content, rating: prev.rating, timestamp: prev.updatedAt },
      ],
    };
    this.reviews[idx] = updated;
    return updated;
  }
  async remove(id: string): Promise<void> {
    await delay(100);
    this.reviews = this.reviews.filter((r) => r.id !== id);
  }
  async voteHelpful(id: string, userId: string): Promise<Review> {
    await delay(100);
    const review = this.reviews.find((r) => r.id === id);
    if (!review) throw new Error("Review not found");
    if (review.helpfulBy.includes(userId)) {
      review.helpfulBy = review.helpfulBy.filter((u) => u !== userId);
      review.helpfulCount = Math.max(0, review.helpfulCount - 1);
    } else {
      review.helpfulBy.push(userId);
      review.helpfulCount += 1;
    }
    return review;
  }
}

export class MockWatchlistRepository implements WatchlistRepository {
  private items: WatchlistItem[] = [];

  async getByUser(userId: string): Promise<WatchlistItem[]> {
    await delay(150);
    return this.items.filter((i) => i.userId === userId && !i.deleted);
  }
  async add(item: Omit<WatchlistItem, "id" | "addedAt" | "vectorClock">): Promise<WatchlistItem> {
    await delay(150);
    const now = Date.now();
    const newItem: WatchlistItem = {
      ...item,
      id: `w${now}`,
      addedAt: now,
      vectorClock: { [item.userId]: 1 },
    };
    this.items.unshift(newItem);
    return newItem;
  }
  async update(id: string, updates: Partial<WatchlistItem>): Promise<WatchlistItem> {
    await delay(150);
    const idx = this.items.findIndex((i) => i.id === id);
    if (idx === -1) throw new Error("Watchlist item not found");
    this.items[idx] = { ...this.items[idx], ...updates };
    return this.items[idx];
  }
  async remove(id: string): Promise<void> {
    await delay(100);
    const item = this.items.find((i) => i.id === id);
    if (item) item.deleted = true;
  }
}

export class MockDataRepository implements DataRepository {
  private movies = new MockMovieRepository();
  private actors = new MockActorRepository();

  getMovies = () => this.movies.getMovies();
  getMovie = (id: string) => this.movies.getMovie(id);
  getTrending = () => this.movies.getTrending();
  getTopRated = () => this.movies.getTopRated();
  getLatest = () => this.movies.getLatest();
  getComingSoon = () => this.movies.getComingSoon();
  getByGenre = (slug: string) => this.movies.getByGenre(slug);
  getByIndustry = (industry: string) => this.movies.getByIndustry(industry);
  getRecommendations = (id: string) => this.movies.getRecommendations(id);
  getSimilar = (id: string) => this.movies.getSimilar(id);
  search = (q: string) => this.movies.search(q);

  getActors = () => this.actors.getActors();
  getActor = (id: string) => this.actors.getActor(id);
  getActorsTrending = () => this.actors.getActorsTrending();
  searchActors = (q: string) => this.actors.searchActors(q);

  async getGenres(): Promise<Genre[]> {
    await delay(100);
    return mockGenres;
  }
  async getCollections(): Promise<Collection[]> {
    await delay(100);
    return mockCollections;
  }
  async getDirectors(): Promise<Director[]> {
    await delay(100);
    return mockDirectors;
  }
  async getStudios(): Promise<Studio[]> {
    await delay(100);
    return mockStudios;
  }
  getTrendingSearches(): string[] {
    return trendingSearches;
  }
}
