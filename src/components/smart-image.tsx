import { useState, useEffect } from "react";
import { Film } from "lucide-react";

interface SmartImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  fallbackIcon?: React.ComponentType<{ className?: string }>;
  fallbackText?: string;
}

export default function SmartImage({ src, alt, className, fallbackIcon: Icon = Film, fallbackText }: SmartImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setError(false);
    setLoaded(false);
  }, [src]);

  if (!src || error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-ink-800 to-ink-850 ${className ?? ""}`}>
        {fallbackText ? (
          <span className="text-lg font-bold text-ink-500">{fallbackText}</span>
        ) : (
          <Icon className="h-8 w-8 text-ink-600" />
        )}
      </div>
    );
  }

  return (
    <>
      {!loaded && <div className={`absolute inset-0 animate-pulse bg-ink-800 ${className ?? ""}`} />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        className={`${className ?? ""} ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
      />
    </>
  );
}
