import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface ImageCarouselProps {
  images: string[];
  className?: string;
  reverse?: boolean;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, className, reverse = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create a seamless loop by repeating images
  const displayImages = [...images, ...images, ...images, ...images];

  return (
    <div className={cn("overflow-hidden w-full", className)} ref={containerRef}>
      <div 
        className={cn(
          "flex gap-4 w-max",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
        style={{
          animation: `marquee ${images.length * 5}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal'
        }}
      >
        {displayImages.map((src, idx) => (
          <div 
            key={idx} 
            className="flex-shrink-0 w-[300px] md:w-[400px] aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100"
          >
            <img 
              src={src} 
              alt={`Project image ${idx}`} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
