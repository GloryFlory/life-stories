/**
 * Template E - Q&A Scrap Page
 * Question in handwriting, answer in serif, sticky note element
 */

import React from 'react';
import { applyScrapOffset } from '@/lib/scrapbook/templateUtils';

interface TemplateEQAProps {
  question: string;
  answer: string;
  accentColor: string;
  stickyNote?: string;
}

export function TemplateEQA({
  question,
  answer,
  accentColor,
  stickyNote
}: TemplateEQAProps) {
  const stickyOffset = applyScrapOffset('medium');

  return (
    <div className="p-8 h-full flex flex-col justify-center relative">
      {/* Question - handwritten style */}
      <div className="mb-6">
        <h2 
          className="font-handwriting text-3xl leading-relaxed"
          style={{ color: accentColor }}
        >
          {question}
        </h2>
        
        {/* Underline scribble */}
        <svg width="200" height="8" className="mt-2" viewBox="0 0 200 8">
          <path 
            d="M5 4 Q50 2 100 4 T195 4" 
            stroke={accentColor} 
            strokeWidth="2" 
            fill="none"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Answer - serif text */}
      <div className="font-serif text-lg leading-loose text-scrapbook-gray max-w-2xl mb-8">
        {answer}
      </div>

      {/* Sticky note */}
      {stickyNote && (
        <div 
          className="absolute bottom-8 right-8 w-56 bg-yellow-100 p-4 shadow-soft"
          style={stickyOffset}
        >
          {/* Tape at top */}
          <div 
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-yellow-200/70"
            style={{ transform: 'rotate(1deg)' }}
          />
          
          <p className="font-handwriting text-base text-scrapbook-gray leading-relaxed">
            {stickyNote}
          </p>
        </div>
      )}

      {/* Small decorative doodle */}
      <div 
        className="absolute top-8 right-12 opacity-20"
        style={{ color: accentColor }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path 
            d="M20 5 L23 15 L33 15 L25 22 L28 32 L20 25 L12 32 L15 22 L7 15 L17 15 Z" 
            stroke="currentColor" 
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
}
