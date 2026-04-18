import React from 'react';
import { cn } from '@/src/lib/utils';

interface ImageCarouselProps {
  images: string[];
  className?: string;
  reverse?: boolean;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, className, reverse = false }) => {
  // Create a seamless loop by repeating images 4x
  const displayImages = [...images, ...images, ...images, ...images];
  const duration = images.length * 4;

  return (
    <div className={cn("overflow-hidden w-full", className)}>
      <div 
        className="carousel-track"
        style={{
          animation: `carousel-scroll ${duration}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal'
        }}
      >
        {displayImages.map((src, idx) => (
          <div 
            key={idx} 
            className="flex-shrink-0 w-[280px] md:w-[360px] rounded-2xl overflow-hidden bg-zinc-100"
          >
            <img 
              src={src} 
              alt={`Project image ${(idx % images.length) + 1}`} 
              className="w-full h-auto object-contain"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
