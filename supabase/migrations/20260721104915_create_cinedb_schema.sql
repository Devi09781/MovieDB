/*
# Create Cinedb schema (single-tenant, no auth)

1. New Tables
- `movies` — movie records with title, overview, poster, backdrop, ratings, genres, etc.
- `actors` — actor records with name, biography, profile image, filmography.
- `reviews` — user reviews for movies (rating, title, content).
- `watchlist` — user watchlist items (movie_id, status).
- `genres` — genre catalog.
- `directors` — director records.
- `collections` — movie collections/groupings.

2. Security
- All tables: RLS enabled with anon+authenticated CRUD (single-tenant, no sign-in).
- Data is intentionally public/shared.

3. Notes
- Uses text IDs for movies/actors/genres/directors/collections for seed data compatibility.
- reviews and watchlist use uuid PKs with auto-generation.
- Column named "cast_members" (not "cast") to avoid SQL reserved word.
- Column named "similar_movies" (not "similar") to avoid SQL reserved word.
*/

CREATE TABLE IF NOT EXISTS movies (
  id text PRIMARY KEY,
  title text NOT NULL,
  original_title text,
  overview text NOT NULL,
  poster_url text NOT NULL,
  backdrop_url text NOT NULL,
  release_date text NOT NULL,
  year int NOT NULL,
  runtime int NOT NULL,
  rating numeric NOT NULL DEFAULT 0,
  vote_count int NOT NULL DEFAULT 0,
  genres text[] NOT NULL DEFAULT '{}',
  languages text[] NOT NULL DEFAULT '{}',
  budget numeric,
  revenue numeric,
  tagline text,
  status text NOT NULL DEFAULT 'Released',
  trailer_url text,
  cast_members jsonb NOT NULL DEFAULT '[]',
  crew jsonb NOT NULL DEFAULT '[]',
  production_companies jsonb NOT NULL DEFAULT '[]',
  streaming_providers text[] NOT NULL DEFAULT '{}',
  awards jsonb NOT NULL DEFAULT '[]',
  recommendations text[] NOT NULL DEFAULT '{}',
  similar_movies text[] NOT NULL DEFAULT '{}',
  industry text NOT NULL DEFAULT 'Hollywood',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS actors (
  id text PRIMARY KEY,
  name text NOT NULL,
  also_known_as text[] NOT NULL DEFAULT '{}',
  biography text NOT NULL DEFAULT '',
  birthday text NOT NULL,
  birthplace text NOT NULL,
  profile_url text NOT NULL,
  known_for_department text NOT NULL DEFAULT 'Acting',
  place_of_birth text NOT NULL,
  nationality text NOT NULL,
  filmography jsonb NOT NULL DEFAULT '[]',
  awards jsonb NOT NULL DEFAULT '[]',
  social_media jsonb NOT NULL DEFAULT '[]',
  gallery text[] NOT NULL DEFAULT '{}',
  trivia text[] NOT NULL DEFAULT '{}',
  external_links jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  movie_id text NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
  user_id text NOT NULL DEFAULT 'local-user',
  user_name text NOT NULL DEFAULT 'Guest User',
  rating numeric NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  helpful_count int NOT NULL DEFAULT 0,
  edited boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS watchlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  movie_id text NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
  user_id text NOT NULL DEFAULT 'local-user',
  status text NOT NULL DEFAULT 'planned',
  deleted boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS genres (
  id text PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  movie_count int NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS directors (
  id text PRIMARY KEY,
  name text NOT NULL,
  profile_url text NOT NULL,
  biography text NOT NULL DEFAULT '',
  known_for text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS collections (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  poster_url text NOT NULL,
  movie_ids text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE actors ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE directors ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;

-- movies policies
DROP POLICY IF EXISTS "anon_select_movies" ON movies;
CREATE POLICY "anon_select_movies" ON movies FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_movies" ON movies;
CREATE POLICY "anon_insert_movies" ON movies FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_movies" ON movies;
CREATE POLICY "anon_update_movies" ON movies FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_movies" ON movies;
CREATE POLICY "anon_delete_movies" ON movies FOR DELETE TO anon, authenticated USING (true);

-- actors policies
DROP POLICY IF EXISTS "anon_select_actors" ON actors;
CREATE POLICY "anon_select_actors" ON actors FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_actors" ON actors;
CREATE POLICY "anon_insert_actors" ON actors FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_actors" ON actors;
CREATE POLICY "anon_update_actors" ON actors FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_actors" ON actors;
CREATE POLICY "anon_delete_actors" ON actors FOR DELETE TO anon, authenticated USING (true);

-- reviews policies
DROP POLICY IF EXISTS "anon_select_reviews" ON reviews;
CREATE POLICY "anon_select_reviews" ON reviews FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_reviews" ON reviews;
CREATE POLICY "anon_insert_reviews" ON reviews FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_reviews" ON reviews;
CREATE POLICY "anon_update_reviews" ON reviews FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_reviews" ON reviews;
CREATE POLICY "anon_delete_reviews" ON reviews FOR DELETE TO anon, authenticated USING (true);

-- watchlist policies
DROP POLICY IF EXISTS "anon_select_watchlist" ON watchlist;
CREATE POLICY "anon_select_watchlist" ON watchlist FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_watchlist" ON watchlist;
CREATE POLICY "anon_insert_watchlist" ON watchlist FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_watchlist" ON watchlist;
CREATE POLICY "anon_update_watchlist" ON watchlist FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_watchlist" ON watchlist;
CREATE POLICY "anon_delete_watchlist" ON watchlist FOR DELETE TO anon, authenticated USING (true);

-- genres policies
DROP POLICY IF EXISTS "anon_select_genres" ON genres;
CREATE POLICY "anon_select_genres" ON genres FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_genres" ON genres;
CREATE POLICY "anon_insert_genres" ON genres FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_genres" ON genres;
CREATE POLICY "anon_update_genres" ON genres FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_genres" ON genres;
CREATE POLICY "anon_delete_genres" ON genres FOR DELETE TO anon, authenticated USING (true);

-- directors policies
DROP POLICY IF EXISTS "anon_select_directors" ON directors;
CREATE POLICY "anon_select_directors" ON directors FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_directors" ON directors;
CREATE POLICY "anon_insert_directors" ON directors FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_directors" ON directors;
CREATE POLICY "anon_update_directors" ON directors FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_directors" ON directors;
CREATE POLICY "anon_delete_directors" ON directors FOR DELETE TO anon, authenticated USING (true);

-- collections policies
DROP POLICY IF EXISTS "anon_select_collections" ON collections;
CREATE POLICY "anon_select_collections" ON collections FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_collections" ON collections;
CREATE POLICY "anon_insert_collections" ON collections FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_collections" ON collections;
CREATE POLICY "anon_update_collections" ON collections FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_collections" ON collections;
CREATE POLICY "anon_delete_collections" ON collections FOR DELETE TO anon, authenticated USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_reviews_movie_id ON reviews(movie_id);
CREATE INDEX IF NOT EXISTS idx_watchlist_user_id ON watchlist(user_id);
CREATE INDEX IF NOT EXISTS idx_movies_year ON movies(year);
CREATE INDEX IF NOT EXISTS idx_movies_rating ON movies(rating);
