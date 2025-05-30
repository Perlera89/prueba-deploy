"use client";

import { useState, useEffect } from "react";
import { ImageIcon } from "lucide-react";

interface ImageFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}

export function ImageFallback({
  src,
  alt,
  className = "",
  fallbackClassName = "",
}: ImageFallbackProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setImgSrc(src);
  }, [src]);

  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  if (error || !imgSrc) {
    return (
      <div
        className={`flex items-center justify-center bg-muted ${fallbackClassName || className}`}
      >
        <div className="flex flex-col items-center text-muted-foreground">
          <ImageIcon className="h-10 w-10 mb-2" />
          <span className="text-xs">Imagen no disponible</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {loading && (
        <div
          className={`flex items-center justify-center bg-muted ${fallbackClassName || className}`}
        >
          <div className="animate-pulse text-muted-foreground">
            <ImageIcon className="h-10 w-10" />
          </div>
        </div>
      )}
      <img
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        className={`${className} ${loading ? "hidden" : ""}`}
        onError={handleError}
        onLoad={handleLoad}
      />
    </>
  );
}
