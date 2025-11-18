/**
 * Template H - Final Collage Page
 * Overlapping shapes, photos, tape, textures for emotional scrapbook ending
 */

import React from 'react';
import { applyScrapOffset } from '@/lib/scrapbook/templateUtils';

interface CollageItem {
  type: 'photo' | 'text' | 'shape';
  content?: string;
  url?: string;
  color?: string;
}

interface TemplateHCollageProps {
  title: string;
  items: CollageItem[];
  accentColor: string;
  secondaryColor: string;
}

export function TemplateHCollage({
  title,
  items,
  accentColor,
  secondaryColor
}: TemplateHCollageProps) {
  return (
    <div className="p-8 h-full relative overflow-hidden">
      {/* Title */}
      <h2 
        className="font-handwriting text-3xl mb-8 text-center relative z-20"
        style={{ color: accentColor }}
      >
        {title}
      </h2>

      {/* Collage container */}
      <div className="relative h-[28rem]">
        {/* Background shapes */}
        <div 
          className="absolute top-12 left-12 w-48 h-48 rounded-full opacity-10"
          style={{ background: accentColor }}
        />
        <div 
          className="absolute bottom-16 right-16 w-64 h-64 opacity-10"
          style={{ 
            background: secondaryColor,
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'
          }}
        />

        {/* Collage items */}
        {items.map((item, idx) => {
          const offset = applyScrapOffset('strong');
          const positions = [
            { top: '10%', left: '10%' },
            { top: '15%', right: '15%' },
            { bottom: '20%', left: '20%' },
            { top: '40%', right: '10%' },
            { bottom: '15%', right: '25%' },
            { top: '25%', left: '40%' }
          ];
          const position = positions[idx % positions.length];

          if (item.type === 'photo' && item.url) {
            return (
              <div
                key={idx}
                className="absolute z-10"
                style={{ ...position, ...offset }}
              >
                {/* Tape */}
                <div 
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-5 bg-yellow-100/60 shadow-tape z-10"
                  style={{ transform: 'rotate(-5deg)' }}
                />
                
                {/* Photo */}
                <div className="bg-white p-2 shadow-polaroid">
                  <img 
                    src={item.url} 
                    alt="Collage" 
                    className="w-32 h-32 object-cover"
                  />
                </div>
              </div>
            );
          }

          if (item.type === 'text' && item.content) {
            return (
              <div
                key={idx}
                className="absolute z-10 bg-white p-4 shadow-soft max-w-[200px]"
                style={{ ...position, ...offset }}
              >
                <p className="font-handwriting text-sm text-scrapbook-gray leading-relaxed">
                  {item.content}
                </p>
              </div>
            );
          }

          if (item.type === 'shape') {
            const shapes = ['circle', 'rounded', 'blob'];
            const shape = shapes[idx % shapes.length];
            
            return (
              <div
                key={idx}
                className={`absolute z-0 w-24 h-24 opacity-20 ${
                  shape === 'circle' ? 'rounded-full' : 
                  shape === 'rounded' ? 'rounded-lg' : ''
                }`}
                style={{ 
                  ...position, 
                  background: item.color || accentColor,
                  borderRadius: shape === 'blob' ? '30% 70% 70% 30% / 30% 30% 70% 70%' : undefined
                }}
              />
            );
          }

          return null;
        })}

        {/* Decorative corner elements */}
        <div className="absolute bottom-4 left-4 opacity-20" style={{ color: accentColor }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path 
              d="M5 20 L30 20 M25 15 L30 20 L25 25" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
