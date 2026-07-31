/*import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "@/lib/firebase";
import type { Movie, Actor, Review, WatchlistItem } from "@/types";
import {
  movies as mockMovies,
  actors as mockActors,
} from "@/lib/mock-data";
import type {
  MovieRepository,
  ActorRepository,
  ReviewRepository,
  WatchlistRepository,
} from "@/repositories/types";

export class FirestoreMovieRepository implements MovieRepository {
  async getMovies(): Promise<Movie[]> {
    if (!isFirebaseConfigured()) return mockMovies;
    const db = getDb()!;
    const snap = await getDocs(collection(db, "movies"));
    return snap.docs.map((d) => d.data() as Movie);
  }
  async getMovie(id: string): Promise<Movie | null> {
    if (!isFirebaseConfigured()) return mockMovies.find((m) => m.id === id) ?? null;
    const db = getDb()!;
    const snap = await getDoc(doc(db, "movies", id));
    return snap.exists() ? (snap.data() as Movie) : null;
  }
  async getTrending(): Promise<Movie[]> {
    return [...mockMovies].sort((a, b) => b.voteCount - a.voteCount).slice(0, 10);
  }
  async getTopRated(): Promise<Movie[]> {
    return [...mockMovies].sort((a, b) => b.rating - a.rating).slice(0, 10);
  }
  async getLatest(): Promise<Movie[]> {
    return [...mockMovies].sort((a, b) => b.year - a.year).slice(0, 10);
  }
  async getComingSoon(): Promise<Movie[]> {
    return [...mockMovies].sort((a, b) => b.year - a.year).slice(0, 5);
  }
  async getByGenre(slug: string): Promise<Movie[]> {
    return mockMovies.filter((m) =>
      m.genres.some((g) => g.toLowerCase() === slug)
    );
  }
  async getByIndustry(industry: string): Promise<Movie[]> {
    return mockMovies.filter((m) => m.industry === industry);
  }
  async getRecommendations(id: string): Promise<Movie[]> {
    const movie = mockMovies.find((m) => m.id === id);
    if (!movie) return [];
    return movie.recommendations
      .map((rid) => mockMovies.find((m) => m.id === rid))
      .filter(Boolean) as Movie[];
  }
  async getSimilar(id: string): Promise<Movie[]> {
    const movie = mockMovies.find((m) => m.id === id);
    if (!movie) return [];
    return movie.similar
      .map((rid) => mockMovies.find((m) => m.id === rid))
      .filter(Boolean) as Movie[];
  }
  async search(q: string): Promise<Movie[]> {
    const query = q.toLowerCase();
    return mockMovies.filter(
      (m) =>
        m.title.toLowerCase().includes(query) ||
        m.overview.toLowerCase().includes(query)
    );
  }
}

export class FirestoreActorRepository implements ActorRepository {
  async getActors(): Promise<Actor[]> {
    return mockActors;
  }
  async getActor(id: string): Promise<Actor | null> {
    return mockActors.find((a) => a.id === id) ?? null;
  }
  async getActorsTrending(): Promise<Actor[]> {
    return mockActors.slice(0, 6);
  }
  async searchActors(q: string): Promise<Actor[]> {
    const query = q.toLowerCase();
    return mockActors.filter((a) => a.name.toLowerCase().includes(query));
  }
}

export class FirestoreReviewRepository implements ReviewRepository {
  private local: Review[] = [];

  async getByMovie(movieId: string): Promise<Review[]> {
    if (!isFirebaseConfigured()) return this.local.filter((r) => r.movieId === movieId);
    const db = getDb()!;
    const q = query(collection(db, "reviews"), where("movieId", "==", movieId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ ...(d.data() as Review), id: d.id }));
  }
  async add(review: Omit<Review, "id" | "createdAt" | "updatedAt" | "helpfulCount" | "helpfulBy" | "edited">): Promise<Review> {
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
    if (!isFirebaseConfigured()) {
      this.local.unshift(newReview);
      return newReview;
    }
    const db = getDb()!;
    const ref = await addDoc(collection(db, "reviews"), {
      ...newReview,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { ...newReview, id: ref.id };
  }
  async update(id: string, updates: Partial<Review>): Promise<Review> {
    if (!isFirebaseConfigured()) {
      const idx = this.local.findIndex((r) => r.id === id);
      if (idx === -1) throw new Error("Review not found");
      this.local[idx] = { ...this.local[idx], ...updates, updatedAt: Date.now(), edited: true };
      return this.local[idx];
    }
    const db = getDb()!;
    await updateDoc(doc(db, "reviews", id), {
      ...updates,
      updatedAt: serverTimestamp(),
      edited: true,
    });
    return { ...(updates as Review), id };
  }
  async remove(id: string): Promise<void> {
    if (!isFirebaseConfigured()) {
      this.local = this.local.filter((r) => r.id !== id);
      return;
    }
    const db = getDb()!;
    await deleteDoc(doc(db, "reviews", id));
  }
  async voteHelpful(id: string, _userId: string): Promise<Review> {
    const review = this.local.find((r) => r.id === id);
    if (!review) throw new Error("Review not found");
    review.helpfulCount += 1;
    return review;
  }
}

export class FirestoreWatchlistRepository implements WatchlistRepository {
  private local: WatchlistItem[] = [];

  async getByUser(userId: string): Promise<WatchlistItem[]> {
    if (!isFirebaseConfigured()) return this.local.filter((i) => i.userId === userId && !i.deleted);
    const db = getDb()!;
    const q = query(collection(db, "watchlists"), where("userId", "==", userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ ...(d.data() as WatchlistItem), id: d.id }));
  }
  async add(item: Omit<WatchlistItem, "id" | "addedAt" | "vectorClock">): Promise<WatchlistItem> {
    const now = Date.now();
    const newItem: WatchlistItem = {
      ...item,
      id: `w${now}`,
      addedAt: now,
      vectorClock: { [item.userId]: 1 },
    };
    if (!isFirebaseConfigured()) {
      this.local.unshift(newItem);
      return newItem;
    }
    const db = getDb()!;
    const ref = await addDoc(collection(db, "watchlists"), {
      ...newItem,
      addedAt: serverTimestamp(),
    });
    return { ...newItem, id: ref.id };
  }
  async update(id: string, updates: Partial<WatchlistItem>): Promise<WatchlistItem> {
    if (!isFirebaseConfigured()) {
      const idx = this.local.findIndex((i) => i.id === id);
      if (idx === -1) throw new Error("Item not found");
      this.local[idx] = { ...this.local[idx], ...updates };
      return this.local[idx];
    }
    const db = getDb()!;
    await updateDoc(doc(db, "watchlists", id), updates);
    return { ...(updates as WatchlistItem), id };
  }
  async remove(id: string): Promise<void> {
    if (!isFirebaseConfigured()) {
      const item = this.local.find((i) => i.id === id);
      if (item) item.deleted = true;
      return;
    }
    const db = getDb()!;
    await deleteDoc(doc(db, "watchlists", id));
  }
}
