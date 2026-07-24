import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Actor } from "@/types";
import { initials } from "@/lib/utils";
import SmartImage from "./smart-image";

export default function ActorCard({ actor }: { actor: Actor }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="group">
      <Link to={`/actor/${actor.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-ink-700/60 bg-ink-800">
          <SmartImage src={actor.profile_url} alt={actor.name} className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105" fallbackText={initials(actor.name)} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="truncate text-sm font-semibold text-white">{actor.name}</h3>
            <p className="truncate text-xs text-ink-300">{actor.known_for_department}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
