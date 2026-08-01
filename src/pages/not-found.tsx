import { Link } from "react-router-dom";
import { Home as HomeIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-7xl font-bold text-brand-500">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-white">Page Not Found</h1>
      <p className="mt-2 text-ink-400">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary mt-6"><HomeIcon className="h-4 w-4" />Back Home</Link>
    </div>
  );
}
////