import { HeroSkeleton, MovieRailSkeleton } from "@/components/ui/skeleton";
export default function Loading() {
  return (<div className="pb-16"><HeroSkeleton /><div className="mt-8 space-y-8"><MovieRailSkeleton /><MovieRailSkeleton /><MovieRailSkeleton /></div></div>);
}
