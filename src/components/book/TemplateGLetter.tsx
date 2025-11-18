/**
 * Template G - Letter Page
 * Lined paper texture, handwritten greeting, serif body text
 */

import React from 'react';

interface TemplateGLetterProps {
  greeting: string;
  content: string;
  signature?: string;
  accentColor: string;
}

export function TemplateGLetter({
  greeting,
  content,
  signature,
  accentColor
}: TemplateGLetterProps) {
  return (
    <div className="p-12 h-full flex flex-col justify-center relative">
      {/* Lined paper effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            transparent,
            transparent 35px,
            rgba(94, 94, 94, 0.1) 35px,
            rgba(94, 94, 94, 0.1) 36px
          )`,
          backgroundPosition: '0 50px'
        }}
      />

      {/* Letter container */}
      <div className="relative max-w-2xl mx-auto">
        {/* Date area - top right */}
        <div className="text-right mb-8">
          <div className="font-handwriting text-base text-scrapbook-gray">
            A memory to cherish...
          </div>
        </div>

        {/* Greeting */}
        <div 
          className="font-handwriting text-2xl mb-6"
          style={{ color: accentColor }}
        >
          {greeting}
        </div>

        {/* Letter content */}
        <div className="font-serif text-base leading-loose text-scrapbook-gray mb-8 whitespace-pre-wrap">
          {content}
        </div>

        {/* Signature */}
        {signature && (
          <div className="text-right">
            <div 
              className="font-handwriting text-xl mb-2"
              style={{ color: accentColor }}
            >
              {signature}
            </div>
            
            {/* Small heart doodle */}
            <svg 
              width="30" 
              height="30" 
              viewBox="0 0 40 40" 
              className="inline-block ml-2"
              style={{ color: accentColor }}
            >
              <path 
                d="M20 30 C20 30 8 22 8 14 C8 10 11 8 14 8 C17 8 20 11 20 11 C20 11 23 8 26 8 C29 8 32 10 32 14 C32 22 20 30 20 30 Z" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                fill="none"
                opacity="0.5"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Corner fold decoration */}
      <div 
        className="absolute top-8 right-8 w-16 h-16"
        style={{
          background: `linear-gradient(135deg, transparent 50%, ${accentColor}20 50%)`,
          borderTopRightRadius: '4px'
        }}
      />
    </div>
  );
}
