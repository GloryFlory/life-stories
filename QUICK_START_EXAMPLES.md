/**
 * QUICK START GUIDE
 * Copy-paste these examples to get started with the scrapbook system
 */

// ============================================
// EXAMPLE 1: Simple Q&A Page
// ============================================

import { ScrapbookPage, TemplateEQA } from '@/components/book';
import { getChapterMetadata } from '@/lib/scrapbook/chapterMetadata';

function SimpleQA() {
  const metadata = getChapterMetadata('childhood')!;
  
  return (
    <ScrapbookPage theme={metadata.theme}>
      <TemplateEQA
        question="What is your earliest childhood memory?"
        answer="I remember playing in the backyard under the old oak tree..."
        accentColor={metadata.accentColor}
      />
    </ScrapbookPage>
  );
}

// ============================================
// EXAMPLE 2: Photo Gallery
// ============================================

import { ScrapbookPage, TemplateBPolaroidGallery } from '@/components/book';

function PhotoGallery() {
  const metadata = getChapterMetadata('wedding')!;
  
  return (
    <ScrapbookPage theme="soft">
      <TemplateBPolaroidGallery
        question="Our Wedding Day"
        photos={[
          { url: '/photos/ceremony.jpg', caption: 'Saying I do' },
          { url: '/photos/first-dance.jpg', caption: 'First dance' },
          { url: '/photos/cake.jpg', caption: 'Cutting the cake' }
        ]}
        accentColor="#F3D7D1"
      />
    </ScrapbookPage>
  );
}

// ============================================
// EXAMPLE 3: Chapter Opener
// ============================================

import { ScrapbookPage, ChapterOpener } from '@/components/book';

function ChapterStart() {
  return (
    <ScrapbookPage theme="warm">
      <ChapterOpener
        chapterNumber={2}
        chapterTitle="Childhood Memories"
        chapterIcon="🎈"
        accentColor="#F4D36B"
        secondaryColor="#FFF7EB"
        quote="Childhood is the most beautiful of all life's seasons."
      />
    </ScrapbookPage>
  );
}

// ============================================
// EXAMPLE 4: Two-Column with Photo
// ============================================

import { ScrapbookPage, TemplateFTwoColumn } from '@/components/book';

function StoryWithPhoto() {
  return (
    <ScrapbookPage theme="earth">
      <TemplateFTwoColumn
        question="Tell me about your first job"
        answer="I started working at the local grocery store when I was 16. It taught me responsibility and the value of hard work..."
        photo="/photos/first-job.jpg"
        photoCaption="Summer job, 1975"
        accentColor="#A0835F"
      />
    </ScrapbookPage>
  );
}

// ============================================
// EXAMPLE 5: Timeline
// ============================================

import { ScrapbookPage, TemplateCTimeline } from '@/components/book';

function LifeTimeline() {
  return (
    <ScrapbookPage theme="cool">
      <TemplateCTimeline
        question="Major Life Milestones"
        events={[
          { year: '1958', title: 'Born', icon: '👶' },
          { year: '1976', title: 'Graduated', icon: '🎓' },
          { year: '1982', title: 'Married', icon: '💍' },
          { year: '1985', title: 'First Child', icon: '👨‍👩‍👧' }
        ]}
        accentColor="#94A9D1"
        secondaryColor="#C7B7E5"
      />
    </ScrapbookPage>
  );
}

// ============================================
// EXAMPLE 6: Dynamic Template Selection
// ============================================

import { selectRandomTemplate } from '@/lib/scrapbook/templateUtils';
import { TemplateEQA, TemplateFTwoColumn } from '@/components/book';

function DynamicPage({ question, answer, photos }) {
  const metadata = getChapterMetadata('career')!;
  const hasPhotos = photos && photos.length > 0;
  
  // Automatically choose template based on content
  const template = selectRandomTemplate('career', hasPhotos, 1);
  
  return (
    <ScrapbookPage theme={metadata.theme}>
      {template === 'QA' && !hasPhotos && (
        <TemplateEQA
          question={question}
          answer={answer}
          accentColor={metadata.accentColor}
        />
      )}
      
      {template === 'TwoColumn' && hasPhotos && (
        <TemplateFTwoColumn
          question={question}
          answer={answer}
          photo={photos[0]}
          accentColor={metadata.accentColor}
        />
      )}
    </ScrapbookPage>
  );
}

// ============================================
// EXAMPLE 7: Full Chapter Generation
// ============================================

function generateFullChapter(chapterId: string, questionsData: any[]) {
  const metadata = getChapterMetadata(chapterId)!;
  const pages = [];
  
  // Chapter opener
  pages.push(
    <ScrapbookPage key="opener" theme={metadata.theme}>
      <ChapterOpener
        chapterNumber={1}
        chapterTitle={metadata.name}
        chapterIcon="📖"
        accentColor={metadata.accentColor}
        secondaryColor={metadata.secondaryColor}
        quote={metadata.quotes[0]}
      />
    </ScrapbookPage>
  );
  
  // Question pages
  questionsData.forEach((item, idx) => {
    const hasPhotos = item.photos && item.photos.length > 0;
    
    pages.push(
      <ScrapbookPage key={idx} theme={metadata.theme}>
        {hasPhotos ? (
          <TemplateFTwoColumn
            question={item.question}
            answer={item.answer}
            photo={item.photos[0]}
            accentColor={metadata.accentColor}
          />
        ) : (
          <TemplateEQA
            question={item.question}
            answer={item.answer}
            accentColor={metadata.accentColor}
          />
        )}
      </ScrapbookPage>
    );
  });
  
  return pages;
}

// ============================================
// EXAMPLE 8: Using All Metadata Utilities
// ============================================

import { 
  getChapterMetadata, 
  getQuoteForChapter, 
  getChapterAccentColor 
} from '@/lib/scrapbook/chapterMetadata';

function MetadataExample() {
  // Get full metadata
  const metadata = getChapterMetadata('teenage');
  console.log(metadata?.accentColor);    // '#94A9D1'
  console.log(metadata?.theme);          // 'cool'
  console.log(metadata?.quotes.length);  // 3
  
  // Get random quote
  const quote = getQuoteForChapter('teenage');
  
  // Get just the color
  const color = getChapterAccentColor('teenage');
  
  return (
    <div style={{ backgroundColor: color }}>
      <blockquote>{quote}</blockquote>
    </div>
  );
}

// ============================================
// EXAMPLE 9: Add Randomness/Imperfection
// ============================================

import { applyScrapOffset, getTapeRotation } from '@/lib/scrapbook/templateUtils';

function RandomizedElement() {
  const offset = applyScrapOffset('medium');
  const rotation = getTapeRotation();
  
  return (
    <>
      {/* Photo with random offset */}
      <div style={offset} className="photo-frame">
        <img src="/photo.jpg" alt="Memory" />
      </div>
      
      {/* Tape with random rotation */}
      <div 
        className="tape"
        style={{ transform: `rotate(${rotation}deg)` }}
      />
    </>
  );
}

// ============================================
// QUICK TIPS
// ============================================

/*
1. Always wrap templates in <ScrapbookPage>
2. Use getChapterMetadata() for colors and themes
3. Match theme to chapter (warm/cool/earth/soft)
4. Photos work best in TwoColumn and Polaroid templates
5. Use QA template for simple question-answer
6. Add ChapterOpener at start of each chapter
7. selectRandomTemplate() handles smart selection
8. All templates are print-safe
9. Accent colors should come from chapter metadata
10. Visit /scrapbook-demo to see all templates
*/
