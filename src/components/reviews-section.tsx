import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star, ThumbsUp, Trash2, Plus, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import type { Review } from "@/types";
import { useReviews, useAddReview, useDeleteReview, useVoteReview } from "@/hooks/use-data";
import { formatDate } from "@/lib/utils";

const reviewSchema = z.object({
  rating: z.number().min(0.5).max(10),
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Review must be at least 10 characters"),
});
type ReviewForm = z.infer<typeof reviewSchema>;

export default function ReviewsSection({ movieId }: { movieId: string }) {
  const { data: reviews, isLoading } = useReviews(movieId);
  const addReview = useAddReview();
  const deleteReview = useDeleteReview();
  const voteReview = useVoteReview();
  const [showForm, setShowForm] = useState(false);
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set());

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<ReviewForm>({
    resolver: zodResolver(reviewSchema), defaultValues: { rating: 8, title: "", content: "" },
  });
  const ratingVal = watch("rating");

  function onSubmit(data: ReviewForm) {
    addReview.mutate({ movie_id: movieId, ...data }, { onSuccess: () => { reset(); setShowForm(false); } });
  }
  function handleVote(review: Review) {
    if (votedIds.has(review.id)) return;
    voteReview.mutate({ id: review.id, helpfulCount: (review.helpful_count ?? 0) + 1, movieId });
    setVotedIds((prev) => new Set(prev).add(review.id));
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="section-title flex items-center gap-2"><MessageSquare className="h-5 w-5 text-brand-400" />Reviews &amp; Comments</h2>
        <button onClick={() => setShowForm((v) => !v)} className="btn-primary"><Plus className="h-4 w-4" />Write Review</button>
      </div>
      {showForm && (
        <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} onSubmit={handleSubmit(onSubmit)} className="card space-y-4 p-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-ink-200">Rating: <span className="font-bold text-brand-400">{ratingVal.toFixed(1)}</span></label>
            <input type="range" min={0.5} max={10} step={0.5} value={ratingVal} onChange={(e) => setValue("rating", Number(e.target.value))} className="w-full accent-brand-500" />
          </div>
          <div><input {...register("title")} placeholder="Review title" className="input" />{errors.title && <p className="mt-1 text-xs text-error-400">{errors.title.message}</p>}</div>
          <div><textarea {...register("content")} placeholder="Share your thoughts about this movie..." rows={4} className="input resize-none" />{errors.content && <p className="mt-1 text-xs text-error-400">{errors.content.message}</p>}</div>
          <div className="flex gap-2">
            <button type="submit" className="btn-primary" disabled={addReview.isPending}>{addReview.isPending ? "Posting..." : "Post Review"}</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
          </div>
        </motion.form>
      )}
      {isLoading && <div className="space-y-4">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="card h-32 animate-pulse" />)}</div>}
      {!isLoading && reviews && reviews.length === 0 && <div className="card p-8 text-center text-ink-400">No reviews yet. Be the first to share your thoughts!</div>}
      <div className="space-y-4">
        {reviews?.map((review) => (
          <motion.div key={review.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 rounded-lg bg-ink-700/60 px-2 py-1 text-sm font-bold text-warning-400"><Star className="h-3.5 w-3.5 fill-current" />{Number(review.rating).toFixed(1)}</span>
                  <h3 className="font-semibold text-white">{review.title}</h3>
                </div>
                <p className="mt-1 text-xs text-ink-400">by {review.user_name} · {formatDate(review.created_at)}{review.edited && " · (edited)"}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-200">{review.content}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-2">
                <button onClick={() => handleVote(review)} disabled={votedIds.has(review.id)} className="flex items-center gap-1 rounded-lg border border-ink-600 px-2.5 py-1.5 text-xs text-ink-200 hover:border-brand-500 hover:text-brand-400 disabled:opacity-50 transition"><ThumbsUp className="h-3.5 w-3.5" />{review.helpful_count ?? 0}</button>
                <button onClick={() => deleteReview.mutate(review.id)} className="flex items-center justify-center rounded-lg border border-ink-600 px-2.5 py-1.5 text-xs text-ink-300 hover:border-error-500 hover:text-error-400 transition"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
