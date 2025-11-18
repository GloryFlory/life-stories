/**
 * Template C - Life Timeline
 * Horizontal timeline with icons, watercolor wash background
 */

import React from 'react';

interface TimelineEvent {
  year: string;
  title: string;
  icon?: string;
}

interface TemplateCTimelineProps {
  question: string;
  events: TimelineEvent[];
  accentColor: string;
  secondaryColor: string;
}

export function TemplateCTimeline({
  question,
  events,
  accentColor,
  secondaryColor
}: TemplateCTimelineProps) {
  return (
    <div className="p-8 h-full flex flex-col justify-center relative">
      {/* Watercolor wash background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse at center, ${secondaryColor} 0%, transparent 70%)`
        }}
      />

      {/* Question */}
      <h2 
        className="font-serif text-2xl font-semibold mb-12 text-center relative z-10"
        style={{ color: accentColor }}
      >
        {question}
      </h2>

      {/* Timeline */}
      <div className="relative z-10">
        {/* Timeline line */}
        <div 
          className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2"
          style={{ background: accentColor, opacity: 0.3 }}
        />

        {/* Timeline events */}
        <div className="flex justify-between items-center relative">
          {events.map((event, idx) => (
            <div key={idx} className="flex flex-col items-center">
              {/* Event dot/icon */}
              <div 
                className="w-12 h-12 rounded-full bg-white shadow-soft flex items-center justify-center mb-4 border-3"
                style={{ borderColor: accentColor, borderWidth: '3px' }}
              >
                {event.icon ? (
                  <span className="text-xl">{event.icon}</span>
                ) : (
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ background: accentColor }}
                  />
                )}
              </div>

              {/* Year */}
              <div 
                className="font-handwriting text-lg mb-1"
                style={{ color: accentColor }}
              >
                {event.year}
              </div>

              {/* Title */}
              <div className="font-sans text-sm text-scrapbook-gray text-center max-w-[120px]">
                {event.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
