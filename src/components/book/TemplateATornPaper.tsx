/**
 * Template A - Torn Paper Story Page
 * Features large serif text, torn paper background, corner-taped photo, handwritten annotation
 */

import React from 'react';
import { applyScrapOffset, getTapeRotation } from '@/lib/scrapbook/templateUtils';

interface TemplateATornPaperProps {
  question: string;
  answer: string;
  photo?: string;
  annotation?: string;
  accentColor: string;
}

export function TemplateATornPaper({
  question,
  answer,
  photo,
  annotation,
  accentColor
}: TemplateATornPaperProps) {
  const paperOffset = applyScrapOffset('medium');
  const tapeRotation = getTapeRotation();

  return (
    <div className="p-8 h-full flex flex-col justify-center">
      {/* Torn paper container */}
      <div 
        className="relative bg-white shadow-paper p-8 rounded-sm"
        style={{
          ...paperOffset,
          clipPath: 'polygon(0 2%, 3% 0, 97% 1%, 100% 3%, 99% 97%, 97% 100%, 2% 99%, 0 96%)'
        }}
      >
        {/* Question as title */}
        <h2 
          className="font-handwriting text-2xl mb-6 leading-relaxed"
          style={{ color: accentColor }}
        >
          {question}
        </h2>

        {/* Answer text */}
        <div className="font-serif text-base leading-loose text-scrapbook-gray max-w-2xl">
          {answer}
        </div>

        {/* Taped photo in corner */}
        {photo && (
          <div 
            className="absolute -top-4 -right-4 w-48"
            style={{ transform: `rotate(${tapeRotation}deg)` }}
          >
            {/* Masking tape */}
            <div 
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-100/70 shadow-tape z-10"
              style={{ transform: `rotate(${-tapeRotation * 0.3}deg)` }}
            />
            
            {/* Photo */}
            <div className="relative bg-white p-2 shadow-polaroid">
              <img 
                src={photo} 
                alt="Memory" 
                className="w-full h-auto object-cover"
                style={{ aspectRatio: '4/3' }}
              />
              
              {/* Handwritten annotation */}
              {annotation && (
                <p className="font-handwriting text-sm mt-2 text-scrapbook-gray text-center">
                  {annotation}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Decorative corner fold */}
        <div 
          className="absolute bottom-0 right-0 w-12 h-12 opacity-20"
          style={{ 
            background: `linear-gradient(135deg, transparent 50%, ${accentColor} 50%)`,
          }}
        />
      </div>
    </div>
  );
}
