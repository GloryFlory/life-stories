/**
 * Template B - Polaroid Gallery
 * Features 3-5 Polaroid-style frames with handwritten dates and soft shadows
 */

import React from 'react';
import { applyScrapOffset } from '@/lib/scrapbook/templateUtils';

interface Photo {
  url: string;
  caption?: string;
  date?: string;
}

interface TemplateBPolaroidGalleryProps {
  question: string;
  photos: Photo[];
  accentColor: string;
}

export function TemplateBPolaroidGallery({
  question,
  photos,
  accentColor
}: TemplateBPolaroidGalleryProps) {
  // Limit to 5 photos for visual balance
  const displayPhotos = photos.slice(0, 5);

  return (
    <div className="p-6 h-full">
      {/* Question header */}
      <h2 
        className="font-serif text-2xl font-semibold mb-8 text-center"
        style={{ color: accentColor }}
      >
        {question}
      </h2>

      {/* Polaroid grid */}
      <div className="flex flex-wrap justify-center items-center gap-6">
        {displayPhotos.map((photo, idx) => {
          const offset = applyScrapOffset('strong');
          const rotations = ['-2deg', '1deg', '-1deg', '2deg', '0deg'];
          
          return (
            <div 
              key={idx}
              className="relative"
              style={{
                ...offset,
                transform: `${offset.transform} rotate(${rotations[idx % rotations.length]})`
              }}
            >
              {/* Polaroid frame */}
              <div className="bg-white p-3 pb-12 shadow-polaroid">
                <img 
                  src={photo.url} 
                  alt={photo.caption || `Photo ${idx + 1}`}
                  className="w-40 h-40 object-cover"
                />
                
                {/* Handwritten caption */}
                {(photo.caption || photo.date) && (
                  <div className="absolute bottom-3 left-0 right-0 text-center">
                    <p className="font-handwriting text-sm text-scrapbook-gray px-2">
                      {photo.caption || photo.date}
                    </p>
                  </div>
                )}
              </div>

              {/* Occasional tape accent */}
              {idx % 3 === 0 && (
                <div 
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-5 bg-yellow-100/60 shadow-tape"
                  style={{ transform: 'rotate(-3deg)' }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
