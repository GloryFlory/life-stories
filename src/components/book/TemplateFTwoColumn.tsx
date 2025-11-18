/**
 * Template F - Two-Column Memory Page
 * Text on left, taped photo on right
 */

import React from 'react';
import { applyScrapOffset, getTapeRotation } from '@/lib/scrapbook/templateUtils';

interface TemplateFTwoColumnProps {
  question: string;
  answer: string;
  photo?: string;
  photoCaption?: string;
  accentColor: string;
}

export function TemplateFTwoColumn({
  question,
  answer,
  photo,
  photoCaption,
  accentColor
}: TemplateFTwoColumnProps) {
  const photoOffset = applyScrapOffset('medium');
  const tapeRotation = getTapeRotation();

  return (
    <div className="p-8 h-full flex items-center gap-8">
      {/* Left column - Text */}
      <div className="flex-1">
        {/* Question */}
        <h2 
          className="font-serif text-2xl font-semibold mb-6 leading-tight"
          style={{ color: accentColor }}
        >
          {question}
        </h2>

        {/* Decorative line */}
        <div 
          className="w-16 h-1 mb-6"
          style={{ background: accentColor, opacity: 0.4 }}
        />

        {/* Answer */}
        <div className="font-serif text-base leading-loose text-scrapbook-gray pr-4">
          {answer}
        </div>
      </div>

      {/* Right column - Photo */}
      {photo && (
        <div className="flex-1 flex items-center justify-center">
          <div className="relative" style={photoOffset}>
            {/* Washi tape strips */}
            <div 
              className="absolute -top-3 left-8 w-20 h-6 bg-pink-200/50 shadow-tape z-10"
              style={{ transform: `rotate(${tapeRotation}deg)` }}
            />
            <div 
              className="absolute -top-3 right-8 w-20 h-6 bg-blue-200/50 shadow-tape z-10"
              style={{ transform: `rotate(${-tapeRotation}deg)` }}
            />

            {/* Photo with white border */}
            <div className="bg-white p-4 shadow-polaroid">
              <img 
                src={photo} 
                alt={photoCaption || 'Memory'}
                className="w-72 h-auto object-cover"
                style={{ aspectRatio: '3/4' }}
              />
              
              {/* Caption */}
              {photoCaption && (
                <p className="font-handwriting text-sm mt-3 text-scrapbook-gray text-center">
                  {photoCaption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
