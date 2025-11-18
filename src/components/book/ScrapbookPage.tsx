/**
 * ScrapbookPage - Main wrapper component for all scrapbook-style pages
 * Provides consistent background, texture, and print-safe layout
 */

import React from 'react';

interface ScrapbookPageProps {
  children: React.ReactNode;
  theme?: 'warm' | 'cool' | 'earth' | 'soft';
  className?: string;
  showTexture?: boolean;
}

export function ScrapbookPage({ 
  children, 
  theme = 'warm', 
  className = '',
  showTexture = true 
}: ScrapbookPageProps) {
  const themeStyles = {
    warm: 'bg-scrapbook-cream',
    cool: 'bg-scrapbook-cornflower/10',
    earth: 'bg-scrapbook-sage/20',
    soft: 'bg-scrapbook-blush/15'
  };

  const watercolorClass = showTexture ? {
    warm: 'bg-watercolor-warm',
    cool: 'bg-watercolor-cool',
    earth: 'bg-watercolor-earth',
    soft: 'bg-watercolor-soft'
  }[theme] : '';

  return (
    <div 
      className={`
        relative w-full h-[36rem] overflow-y-auto
        ${themeStyles[theme]} 
        ${watercolorClass}
        ${showTexture ? 'bg-paper-texture' : ''}
        ${className}
      `}
      style={{
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Subtle vignette effect for depth */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.03) 100%)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
