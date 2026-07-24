import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";
import MoviePage from "@/pages/movie";
import ActorPage from "@/pages/actor";
import MoviesPage from "@/pages/movies";
import ActorsPage from "@/pages/actors";
import WatchlistPage from "@/pages/watchlist";
import NotFound from "@/pages/not-found";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/actor/:id" element={<ActorPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/actors" element={<ActorsPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
