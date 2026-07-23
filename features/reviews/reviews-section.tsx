"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewRepository } from "@/repositories";
import type { Review } from "@/types";
import { Star, Trash2, Edit3, ThumbsUp, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const USER_ID = "local-user";
const USER_NAME = "Guest User";
const reviewSchema = z.object({
  rating: z.number().min(1).max(10),
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  content: z.string().min(10, "Review must be at least 10 characters").max(2000),
});
type ReviewForm = z.infer<typeof reviewSchema>;
const filterProfanity = (text: string) => text.replace(/badword/gi, "***");

export function ReviewsSection({ movieId }: { movieId: string }) {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 5;

  const { data: reviews = [], isLoading } = useQuery({ queryKey: ["reviews", movieId], queryFn: () => reviewRepository.getByMovie(movieId) });

  const addMutation = useMutation({
    mutationFn: (data: ReviewForm) => reviewRepository.add({ movieId, userId: USER_ID, userName: USER_NAME, rating: data.rating, title: filterProfanity(data.title), content: filterProfanity(data.content) }),
    onMutate: async (data) => {
      await qc.cancelQueries({ queryKey: ["reviews", movieId] });
      const prev = qc.getQueryData<Review[]>(["reviews", movieId]) ?? [];
      const optimistic: Review = { id: `temp-${Date.now()}`, movieId, userId: USER_ID, userName: USER_NAME, rating: data.rating, title: data.title, content: data.content, createdAt: Date.now(), updatedAt: Date.now(), helpfulCount: 0, edited: false };
      qc.setQueryData<Review[]>(["reviews", movieId], [optimistic, ...prev]);
      return { prev };
    },
    onError: (_e, _d, ctx) => qc.setQueryData(["reviews", movieId], ctx?.prev ?? []),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["reviews", movieId] }); setShowForm(false); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ReviewForm }) => reviewRepository.update(id, { rating: data.rating, title: filterProfanity(data.title), content: filterProfanity(data.content) }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["reviews", movieId] }); setEditingId(null); setShowForm(false); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => reviewRepository.remove(id),
    onMutate: async (id) => {
      const prev = qc.getQueryData<Review[]>(["reviews", movieId]) ?? [];
      qc.setQueryData<Review[]>(["reviews", movieId], prev.filter((r) => r.id !== id));
      return { prev };
    },
    onError: (_e, _id, ctx) => qc.setQueryData(["reviews", movieId], ctx?.prev ?? []),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["reviews", movieId] }),
  });

  const voteMutation = useMutation({ mutationFn: (id: string) => reviewRepository.voteHelpful(id, USER_ID), onSuccess: () => qc.invalidateQueries({ queryKey: ["reviews", movieId] }) });

  const form = useForm<ReviewForm>({ resolver: zodResolver(reviewSchema), defaultValues: { rating: 8, title: "", content: "" } });
  const onSubmit = (data: ReviewForm) => { if (editingId) updateMutation.mutate({ id: editingId, data }); else addMutation.mutate(data); };
  const startEdit = (review: Review) => { setEditingId(review.id); form.reset({ rating: review.rating, title: review.title, content: review.content }); setShowForm(true); };

  const sorted = [...reviews].sort((a, b) => b.helpfulCount - a.helpfulCount);
  const paginated = sorted.slice(0, page * perPage);
  const hasMore = sorted.length > page * perPage;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-2xl text-white">Reviews <span className="text-base text-zinc-400">({reviews.length})</span></h2>
        <button onClick={() => { if (editingId) { setEditingId(null); form.reset(); } setShowForm((s) => !s); }} className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-ink-950 transition-all hover:bg-brand-400">{showForm ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}{showForm ? "Cancel" : "Write Review"}</button>
      </div>
      <AnimatePresence>
        {showForm && (
          <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} onSubmit={form.handleSubmit(onSubmit)} className="mb-6 overflow-hidden rounded-xl border border-ink-700 bg-ink-800 p-5">
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium text-zinc-300">Rating</label>
              <div className="flex gap-1">{Array.from({ length: 10 }).map((_, i) => <button key={i} type="button" onClick={() => form.setValue("rating", i + 1, { shouldValidate: true })} aria-label={`Rate ${i + 1}`} className="p-1"><Star className={`h-5 w-5 transition-colors ${i < form.watch("rating") ? "fill-brand-400 text-brand-400" : "text-zinc-600"}`} /></button>)}</div>
            </div>
            <div className="mb-3"><label htmlFor="review-title" className="mb-1 block text-sm font-medium text-zinc-300">Title</label><input id="review-title" {...form.register("title")} className="w-full rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-sm text-white focus:border-brand-500 focus:outline-none" placeholder="Summarize your thoughts" />{form.formState.errors.title && <p className="mt-1 text-xs text-red-400">{form.formState.errors.title.message}</p>}</div>
            <div className="mb-3"><label htmlFor="review-content" className="mb-1 block text-sm font-medium text-zinc-300">Review</label><textarea id="review-content" {...form.register("content")} rows={4} className="w-full rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-sm text-white focus:border-brand-500 focus:outline-none" placeholder="Share your thoughts..." />{form.formState.errors.content && <p className="mt-1 text-xs text-red-400">{form.formState.errors.content.message}</p>}</div>
            <button type="submit" disabled={addMutation.isPending || updateMutation.isPending} className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-2 text-sm font-semibold text-ink-950 transition-all hover:bg-brand-400 disabled:opacity-60">{(addMutation.isPending || updateMutation.isPending) && <Loader2 className="h-4 w-4 animate-spin" />}{editingId ? "Update Review" : "Post Review"}</button>
          </motion.form>
        )}
      </AnimatePresence>
      {isLoading ? (<div className="space-y-4">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton h-32 rounded-xl" />)}</div>
      ) : paginated.length === 0 ? (<p className="rounded-xl border border-ink-700 bg-ink-800 p-8 text-center text-zinc-400">No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>{paginated.map((review) => (
            <motion.article key={review.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} className="rounded-xl border border-ink-700 bg-ink-800 p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/20 text-brand-400 font-semibold">{review.userName.charAt(0)}</div><div><p className="font-medium text-white">{review.userName}</p><p className="text-xs text-zinc-400">{new Date(review.createdAt).toLocaleDateString()}{review.edited && " · edited"}</p></div></div>
                <span className="flex items-center gap-1 rounded-md bg-ink-700 px-2 py-1 text-sm font-semibold text-brand-400"><Star className="h-3 w-3 fill-current" />{review.rating}</span>
              </div>
              <h3 className="mt-3 font-semibold text-white">{review.title}</h3>
              <p className="mt-1 text-sm text-zinc-300">{review.content}</p>
              <div className="mt-4 flex items-center gap-4">
                <button onClick={() => voteMutation.mutate(review.id)} className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-brand-400 transition-colors"><ThumbsUp className="h-3.5 w-3.5" />Helpful ({review.helpfulCount})</button>
                {review.userId === USER_ID && (<><button onClick={() => startEdit(review)} className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-brand-400 transition-colors"><Edit3 className="h-3.5 w-3.5" />Edit</button><button onClick={() => deleteMutation.mutate(review.id)} className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-red-400 transition-colors"><Trash2 className="h-3.5 w-3.5" />Delete</button></>)}
              </div>
            </motion.article>
          ))}</AnimatePresence>
          {hasMore && <button onClick={() => setPage((p) => p + 1)} className="w-full rounded-xl border border-ink-700 bg-ink-800 py-3 text-sm font-medium text-zinc-300 transition-colors hover:bg-ink-700 hover:text-white">Load more reviews</button>}
        </div>
      )}
    </div>
  );
}
