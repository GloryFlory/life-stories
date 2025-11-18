/**
 * Template D - Quote Page
 * Large centered circle shape with quote, watercolor background
 */

import React from 'react';

interface TemplateDQuoteProps {
  quote: string;
  author?: string;
  accentColor: string;
  secondaryColor: string;
}

export function TemplateDQuote({
  quote,
  author,
  accentColor,
  secondaryColor
}: TemplateDQuoteProps) {
  return (
    <div className="p-12 h-full flex items-center justify-center relative">
      {/* Large watercolor circle background */}
      <div 
        className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ 
          background: `radial-gradient(circle, ${accentColor} 0%, ${secondaryColor} 100%)` 
        }}
      />

      {/* Quote container */}
      <div className="relative z-10 max-w-2xl text-center">
        {/* Opening quotation mark */}
        <div 
          className="font-serif text-8xl leading-none mb-4 opacity-30"
          style={{ color: accentColor }}
        >
          &ldquo;
        </div>

        {/* Quote text */}
        <blockquote 
          className="font-serif text-2xl leading-relaxed mb-6"
          style={{ color: accentColor }}
        >
          {quote}
        </blockquote>

        {/* Author */}
        {author && (
          <cite className="font-handwriting text-xl not-italic text-scrapbook-gray">
            — {author}
          </cite>
        )}

        {/* Closing quotation mark */}
        <div 
          className="font-serif text-8xl leading-none mt-4 opacity-30 text-right"
          style={{ color: accentColor }}
        >
          &rdquo;
        </div>

        {/* Decorative flourish */}
        <div className="flex justify-center mt-8">
          <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
            <path 
              d="M5 10 Q15 5 25 10 T45 10" 
              stroke={accentColor} 
              strokeWidth="2" 
              fill="none"
              opacity="0.4"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
