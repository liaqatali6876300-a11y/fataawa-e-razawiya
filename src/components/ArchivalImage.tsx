import { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface ArchivalImageProps {
  src: string;
  alt: string;
  caption?: string;
  aspectClass?: string;
  className?: string;
}

export function ArchivalImage({
  src,
  alt,
  caption,
  aspectClass = 'aspect-[4/3]',
  className = '',
}: ArchivalImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className={`flex flex-col ${className}`}>
      <div
        className={`relative overflow-hidden border border-stone-300/80 bg-[#EBE6DC] ${aspectClass}`}
      >
        {!hasError ? (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#EFECE4] to-[#E2DDD1] p-6 text-center text-stone-600">
            <BookOpen className="h-8 w-8 text-[#14532D]/70" strokeWidth={1.5} />
            <span className="font-nastaliq text-base text-stone-700">{alt}</span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2.5 text-xs leading-relaxed text-stone-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
