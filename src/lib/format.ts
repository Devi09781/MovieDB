export function formatRuntime(min: number): string {
  const h = Math.floor(min / 60); const m = min % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
export function calcAge(birthday: string): number {
  return Math.floor((Date.now() - new Date(birthday).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
}
export function ratingColor(r: number): string {
  if (r >= 8) return "text-accent-green"; if (r >= 6.5) return "text-brand-400";
  if (r >= 5) return "text-yellow-500"; return "text-red-500";
} 
