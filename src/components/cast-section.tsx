import { Link } from "react-router-dom";
import type { CastMember } from "@/types";
import { initials } from "@/lib/utils";
import SmartImage from "./smart-image";

export default function CastSection({ cast }: { cast: CastMember[] }) {
  if (!cast || cast.length === 0) return null;
  const sorted = [...cast].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return (
    <section className="space-y-4">
      <h2 className="section-title">Cast</h2>
      <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
        {sorted.map((member, i) => {
          const content = (
            <div className="group w-28 shrink-0 space-y-2">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-ink-700/60 bg-ink-800">
                <SmartImage src={member.profile_url} alt={member.name} className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105" fallbackText={initials(member.name)} />
              </div>
              <p className="truncate text-xs font-semibold text-ink-100 group-hover:text-brand-400">{member.name}</p>
              <p className="truncate text-xs text-ink-400">{member.character}</p>
            </div>
          );
          return member.actor_id ? <Link key={i} to={`/actor/${member.actor_id}`}>{content}</Link> : <div key={i}>{content}</div>;
        })}
      </div>
    </section>
  );
}
