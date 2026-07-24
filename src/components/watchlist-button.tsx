import { Bookmark, Check, Loader2 } from "lucide-react";
import { useWatchlist, useAddToWatchlist } from "@/hooks/use-data";

export default function WatchlistButton({ movieId }: { movieId: string }) {
  const { data: watchlist } = useWatchlist();
  const addToWatchlist = useAddToWatchlist();
  const inList = !!watchlist?.find((w) => w.movie_id === movieId);
  function handleClick() { if (inList) return; addToWatchlist.mutate({ movieId, status: "planning" }); }
  return (
    <button onClick={handleClick} disabled={inList || addToWatchlist.isPending} className={inList ? "btn-outline" : "btn-primary"}>
      {addToWatchlist.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : inList ? <><Check className="h-4 w-4" />In Watchlist</> : <><Bookmark className="h-4 w-4" />Add to Watchlist</>}
    </button>
  );
}
