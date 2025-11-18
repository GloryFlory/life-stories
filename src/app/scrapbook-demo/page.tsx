/**
 * Scrapbook Demo Page
 * Showcases all template types with example data
 */

'use client';

import React, { useState } from 'react';
import ScrapbookLayout from '@/components/book/ScrapbookLayout';
import { 
  ScrapbookPage, 
  ChapterOpener,
  TemplateATornPaper,
  TemplateBPolaroidGallery,
  TemplateCTimeline,
  TemplateDQuote,
  TemplateEQA,
  TemplateFTwoColumn,
  TemplateGLetter,
  TemplateHCollage
} from '@/components/book';
import { getChapterMetadata, getQuoteForChapter } from '@/lib/scrapbook/chapterMetadata';
import { EXAMPLE_CHAPTER } from '@/lib/scrapbook/exampleData';

export default function ScrapbookDemo() {
  const [currentPage, setCurrentPage] = useState(0);
  const metadata = getChapterMetadata('childhood')!;

  // Create all demo pages
  const pages = [
    {
      type: 'opener',
      content: (
        <ChapterOpener
          chapterNumber={2}
          chapterTitle={metadata.name}
          chapterIcon="🎈"
          accentColor={metadata.accentColor}
          secondaryColor={metadata.secondaryColor}
          quote={metadata.quotes[0]}
        />
      )
    },
    {
      type: 'tornpaper',
      content: (
        <TemplateATornPaper
          question="What is your earliest childhood memory?"
          answer="I remember the old oak tree in our backyard where I used to spend hours reading books and dreaming of adventures. The sun would filter through the leaves creating patterns of light and shadow on the grass below. It was my special place, my sanctuary from the world."
          annotation="My favorite reading spot"
          accentColor={metadata.accentColor}
        />
      )
    },
    {
      type: 'polaroid',
      content: (
        <TemplateBPolaroidGallery
          question="Favorite Childhood Photos"
          photos={[
            { url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400', caption: '5th birthday' },
            { url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400', caption: 'First bicycle!' },
            { url: 'https://images.unsplash.com/photo-1476234251651-f353708ec0c5?w=400', caption: 'Beach day' }
          ]}
          accentColor={metadata.accentColor}
        />
      )
    },
    {
      type: 'timeline',
      content: (
        <TemplateCTimeline
          question="Growing Up Milestones"
          events={[
            { year: '1958', title: 'Born', icon: '👶' },
            { year: '1963', title: 'Started School', icon: '📚' },
            { year: '1965', title: 'Learned to Swim', icon: '🏊' },
            { year: '1968', title: 'Won Spelling Bee', icon: '🏆' }
          ]}
          accentColor={metadata.accentColor}
          secondaryColor={metadata.secondaryColor}
        />
      )
    },
    {
      type: 'quote',
      content: (
        <TemplateDQuote
          quote="Childhood is the most beautiful of all life's seasons."
          accentColor={metadata.accentColor}
          secondaryColor={metadata.secondaryColor}
        />
      )
    },
    {
      type: 'qa',
      content: (
        <TemplateEQA
          question="What games did you love to play?"
          answer="We played outside from sunrise to sunset. Hide and seek in the neighborhood, building forts in the woods, riding bikes to the creek. We didn't have video games or phones - we had imagination and freedom. Those summer evenings catching fireflies were pure magic."
          stickyNote="Remember: simpler times, bigger adventures"
          accentColor={metadata.accentColor}
        />
      )
    },
    {
      type: 'twocolumn',
      content: (
        <TemplateFTwoColumn
          question="Who was your best friend growing up?"
          answer="Sarah lived three houses down and we were inseparable from age 6 onwards. We shared everything - secrets, dreams, adventures. She taught me how to braid hair and I taught her how to climb trees."
          photo="https://images.unsplash.com/photo-1529562312398-11e49c53b2f5?w=400"
          photoCaption="Best friends forever"
          accentColor={metadata.accentColor}
        />
      )
    },
    {
      type: 'letter',
      content: (
        <TemplateGLetter
          greeting="Dear Little Me,"
          content="Those scraped knees and dirty hands tell stories of bravery and exploration. Don't rush to grow up. Savor the wonder in every puddle, every lightning bug, every blanket fort.

The person you're becoming is shaped by these simple joys. The world is bigger and more beautiful than you can imagine."
          signature="With love from your future self"
          accentColor={metadata.accentColor}
        />
      )
    },
    {
      type: 'collage',
      content: (
        <TemplateHCollage
          title="Pieces of My Childhood"
          items={[
            { type: 'photo', url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200' },
            { type: 'text', content: 'Saturday morning cartoons and cereal' },
            { type: 'photo', url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=200' },
            { type: 'shape', color: '#F4D36B' },
            { type: 'text', content: 'The smell of fresh-cut grass' },
            { type: 'photo', url: 'https://images.unsplash.com/photo-1476234251651-f353708ec0c5?w=200' }
          ]}
          accentColor={metadata.accentColor}
          secondaryColor={metadata.secondaryColor}
        />
      )
    }
  ];

  const currentPageData = pages[currentPage];

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <ScrapbookLayout>
      <div className="min-h-screen bg-scrapbook-cream p-8">
        <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="font-serif text-4xl font-bold text-scrapbook-gray mb-2">
            Scrapbook Template Showcase
          </h1>
          <p className="font-sans text-scrapbook-gray/70">
            Demonstrating all 8 template types + chapter opener
          </p>
        </div>

        {/* Template selector */}
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          {pages.map((page, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`px-4 py-2 rounded-lg font-sans text-sm transition-all ${
                currentPage === idx
                  ? 'bg-scrapbook-yellow text-white shadow-md'
                  : 'bg-white text-scrapbook-gray hover:bg-scrapbook-yellow/20'
              }`}
            >
              {page.type}
            </button>
          ))}
        </div>

        {/* Page display */}
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden mb-6">
          <ScrapbookPage theme={metadata.theme}>
            {currentPageData.content}
          </ScrapbookPage>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="px-6 py-3 bg-white rounded-lg shadow-md font-sans disabled:opacity-30 disabled:cursor-not-allowed hover:bg-scrapbook-yellow/10 transition-colors"
          >
            ← Previous
          </button>

          <div className="font-sans text-scrapbook-gray">
            {currentPage + 1} / {pages.length}
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === pages.length - 1}
            className="px-6 py-3 bg-white rounded-lg shadow-md font-sans disabled:opacity-30 disabled:cursor-not-allowed hover:bg-scrapbook-yellow/10 transition-colors"
          >
            Next →
          </button>
        </div>

        {/* Template info */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="font-serif text-xl font-semibold mb-3 text-scrapbook-gray">
            Current Template: <span style={{ color: metadata.accentColor }}>{currentPageData.type}</span>
          </h3>
          <div className="font-sans text-sm text-scrapbook-gray/70">
            {currentPageData.type === 'opener' && 'Decorative chapter introduction with icon, title, and quote'}
            {currentPageData.type === 'tornpaper' && 'Large serif text with torn paper background and corner-taped photo'}
            {currentPageData.type === 'polaroid' && '3-5 Polaroid frames with handwritten captions and soft shadows'}
            {currentPageData.type === 'timeline' && 'Horizontal timeline with icons and watercolor wash'}
            {currentPageData.type === 'quote' && 'Large centered circle with quote and watercolor background'}
            {currentPageData.type === 'qa' && 'Question in handwriting, answer in serif, with sticky note element'}
            {currentPageData.type === 'twocolumn' && 'Text on left, taped photo on right'}
            {currentPageData.type === 'letter' && 'Lined paper texture with handwritten greeting and serif body'}
            {currentPageData.type === 'collage' && 'Overlapping shapes, photos, and text for emotional impact'}
          </div>
        </div>
        </div>
      </div>
    </ScrapbookLayout>
  );
}
