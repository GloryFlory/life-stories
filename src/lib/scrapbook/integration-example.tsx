/**
 * Integration Example: How to use scrapbook templates in the story export page
 * 
 * IMPORTANT: Always wrap scrapbook components in <ScrapbookLayout> to load special fonts
 * This keeps the main app (home, chapters, questions) using original Italiana/Lora fonts
 */

import ScrapbookLayout from '@/components/book/ScrapbookLayout';
import { ScrapbookPage, TemplateEQA, TemplateFTwoColumn, ChapterOpener } from '@/components/book';
import { getChapterMetadata, getQuoteForChapter } from '@/lib/scrapbook/chapterMetadata';
import { selectRandomTemplate } from '@/lib/scrapbook/templateUtils';

// Example: Full story export page with scrapbook layout
export default function StoryExportPage({ parent }: { parent: string }) {
  return (
    <ScrapbookLayout>
      {/* All content here uses Cormorant Garamond, Patrick Hand, Inter fonts */}
      <div className="story-export-container">
        {/* Your scrapbook pages */}
      </div>
    </ScrapbookLayout>
  );
}

// Example: Convert existing answer data to scrapbook page
function renderScrapbookQuestion(
  chapterId: string,
  question: string,
  answer: { answer: string; photos?: string[] },
  questionIndex: number
) {
  const metadata = getChapterMetadata(chapterId)!;
  const hasPhotos = answer.photos && answer.photos.length > 0;
  
  // Smart template selection based on content
  const template = selectRandomTemplate(
    chapterId,
    hasPhotos,
    1 // single question
  );

  return (
    <ScrapbookPage theme={metadata.theme}>
      {/* Use Q&A template for text-only answers */}
      {!hasPhotos && (
        <TemplateEQA
          question={question}
          answer={answer.answer}
          accentColor={metadata.accentColor}
        />
      )}

      {/* Use Two-Column template for answers with photos */}
      {hasPhotos && (
        <TemplateFTwoColumn
          question={question}
          answer={answer.answer}
          photo={answer.photos![0]}
          accentColor={metadata.accentColor}
        />
      )}
    </ScrapbookPage>
  );
}

// Example: Create chapter opener page
function renderChapterOpener(chapterId: string, chapterNumber: number) {
  const metadata = getChapterMetadata(chapterId)!;
  const quote = getQuoteForChapter(chapterId);

  return (
    <ScrapbookPage theme={metadata.theme}>
      <ChapterOpener
        chapterNumber={chapterNumber}
        chapterTitle={metadata.name}
        chapterIcon="📖" // You can map this from your existing chapter icons
        accentColor={metadata.accentColor}
        secondaryColor={metadata.secondaryColor}
        quote={quote}
      />
    </ScrapbookPage>
  );
}

// Example: Full page generation for a chapter
function generateChapterPages(
  chapterId: string,
  chapterNumber: number,
  questions: Array<{ question: string; answer: { answer: string; photos?: string[] } }>
) {
  const pages = [];

  // Add chapter opener
  pages.push({
    type: 'chapter-opener',
    content: renderChapterOpener(chapterId, chapterNumber)
  });

  // Add question pages
  questions.forEach((item, idx) => {
    pages.push({
      type: 'question',
      content: renderScrapbookQuestion(chapterId, item.question, item.answer, idx)
    });
  });

  return pages;
}

export { renderScrapbookQuestion, renderChapterOpener, generateChapterPages };
