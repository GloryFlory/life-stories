/**
 * ChapterOpener - Decorative chapter title page
 * Features chapter icon, number, title, and theme-specific styling
 */

import React from 'react';
import { ChapterIcon } from '../ChapterIcon';
import { applyScrapOffset } from '@/lib/scrapbook/templateUtils';

interface ChapterOpenerProps {
  chapterNumber: number;
  chapterTitle: string;
  chapterIcon: string;
  accentColor: string;
  secondaryColor: string;
  quote?: string;
}

export function ChapterOpener({
  chapterNumber,
  chapterTitle,
  chapterIcon,
  accentColor,
  secondaryColor,
  quote
}: ChapterOpenerProps) {
  const offset = applyScrapOffset('subtle');

  return (
    <div className="flex flex-col items-center justify-center h-full px-8 py-12 text-center">
      {/* Decorative circle background */}
      <div 
        className="absolute w-64 h-64 rounded-full opacity-20 blur-2xl"
        style={{ 
          background: accentColor,
          ...offset 
        }}
      />

      {/* Chapter Icon */}
      <div 
        className="relative z-10 w-24 h-24 mb-6 p-6 rounded-full bg-white shadow-polaroid"
        style={{ borderColor: accentColor, borderWidth: '3px' }}
      >
        <ChapterIcon icon={chapterIcon} />
      </div>

      {/* Chapter Number */}
      <div 
        className="font-handwriting text-lg mb-2 tracking-wider"
        style={{ color: accentColor }}
      >
        Chapter {chapterNumber}
      </div>

      {/* Chapter Title */}
      <h1 
        className="font-serif text-4xl font-bold mb-8 max-w-md"
        style={{ color: accentColor }}
      >
        {chapterTitle}
      </h1>

      {/* Decorative divider */}
      <div className="flex items-center gap-3 mb-6">
        <div 
          className="w-16 h-0.5"
          style={{ background: accentColor }}
        />
        <div 
          className="w-2 h-2 rounded-full"
          style={{ background: accentColor }}
        />
        <div 
          className="w-16 h-0.5"
          style={{ background: accentColor }}
        />
      </div>

      {/* Optional Quote */}
      {quote && (
        <blockquote 
          className="font-serif italic text-lg max-w-lg leading-relaxed"
          style={{ color: secondaryColor }}
        >
          &ldquo;{quote}&rdquo;
        </blockquote>
      )}

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 opacity-30" style={{ color: accentColor }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 3 L3 12 M3 3 L12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="absolute bottom-8 right-8 opacity-30" style={{ color: accentColor }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M21 21 L21 12 M21 21 L12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}
