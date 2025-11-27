'use client';

import React from 'react';
import { PageModel } from '@/lib/book/types';
import { ChapterIcon } from './ChapterIcon';
import { chapters } from '@/lib/types';
import { Language, translations } from '@/lib/translations';
import { questionTranslations } from '@/lib/questionTranslations';

interface BookPageViewerProps {
  page: PageModel;
  orientation?: 'portrait' | 'landscape';
  parentName?: string;
  language?: Language;
  pageText?: string;
  storyText?: string;
}

export function BookPageViewer({ page, orientation = 'portrait', parentName = '', language = 'en', pageText = 'Page', storyText = 'Story' }: BookPageViewerProps) {
  const isLandscape = orientation === 'landscape';
  const chapter = chapters.find(c => c.id === page.chapterId);
  
  // Get translated chapter title
  const getChapterTitle = () => {
    if (!chapter) return '';
    const translatedChapters = translations[language]?.chapters_list as Record<string, string> | undefined;
    return translatedChapters?.[chapter.id] || chapter.title;
  };
  
  // Get translated chapter description
  const getChapterDescription = () => {
    if (!chapter) return '';
    const translatedDescriptions = translations[language]?.chapter_descriptions as Record<string, string> | undefined;
    return translatedDescriptions?.[chapter.id] || chapter.description;
  };
  
  // Translate question based on chapter and English text
  const translateQuestion = (questionText: string, chapterId: string): string => {
    if (!questionText || language === 'en') return questionText;
    
    // Get English questions for this chapter
    const englishQuestions = questionTranslations.en[chapterId];
    if (!englishQuestions) return questionText;
    
    // Find the index of this question in the English list
    const questionIndex = englishQuestions.findIndex(q => q === questionText);
    if (questionIndex === -1) return questionText; // Question not found, return original
    
    // Get translated questions for this chapter
    const translatedQuestions = questionTranslations[language]?.[chapterId];
    if (!translatedQuestions || !translatedQuestions[questionIndex]) {
      return questionText; // Translation not available, return original
    }
    
    return translatedQuestions[questionIndex];
  };
  
  // Translation helper
  const t = (key: string): string => {
    const trans = translations[language] as any;
    const enTrans = translations.en as any;
    return trans?.[key] || enTrans[key] || key;
  };
  
  // Check if this is a chapter opener page
  const isChapterOpener = page.templateId === 'template-f';
  
  // Check if this is a welcome or end page
  const isWelcomePage = page.templateId === 'welcome-page';
  const isEndPage = page.templateId === 'end-page';
  
  // Check if this is a multi-story page
  const isMultiStory = page.multiStory === true;
  
  // Get question and answer(s) from content
  const chapterTitleContent = page.content.find(c => c.style === 'chapter-title');
  
  // For multi-story pages, group Q&As
  const qaBlocks: Array<{question: string, answer: string, length: number}> = [];
  if (isMultiStory) {
    for (let i = 0; i < page.content.length; i += 2) {
      const q = page.content[i];
      const a = page.content[i + 1];
      if (q && a) {
        qaBlocks.push({
          question: q.text,
          answer: a.text,
          length: a.text.length
        });
      }
    }
  }
  
  // Single story Q&A
  const questionContent = page.content.find(c => c.style === 'question');
  const answerContents = page.content.filter(c => c.style === 'answer');
  
  // Categorize Q&As by length for layout decisions
  const categorizeByLength = (text: string) => {
    const len = text.length;
    if (len < 50) return 'minimal';
    if (len < 150) return 'short';
    if (len < 400) return 'medium';
    if (len < 800) return 'long';
    return 'hero';
  };
  
  return (
    <div className="bg-neutral-100 flex items-center justify-center p-2 sm:p-4">
      {/* A4 Page Container */}
      <div 
        id="book-page-for-pdf"
        className="bg-white shadow-2xl relative"
        style={{
          width: isLandscape ? '297mm' : '210mm',
          height: isLandscape ? '210mm' : '297mm',
          minWidth: isLandscape ? '297mm' : '210mm',
          minHeight: isLandscape ? '210mm' : '297mm',
          maxWidth: '100%',
          maxHeight: isLandscape ? '70vh' : '80vh',
          overflow: 'hidden',
          padding: '40px',
          boxSizing: 'border-box',
        }}
      >
        {isWelcomePage ? (
          // Welcome Page Layout
          <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-white to-neutral-50">
            <div className="flex flex-col items-center space-y-8">
              {/* Logo */}
              <img 
                src="/life-stories-logo-new.png" 
                alt="Life Stories" 
                className="w-48 h-auto"
              />
              
              {/* Welcome Title */}
              <h1 className="text-5xl md:text-6xl font-serif font-light text-neutral-800 text-center">
                {parentName}'s {t('life_story')}
              </h1>
              
              {/* Decorative line */}
              <div className="w-24 h-0.5 bg-amber-600"></div>
              
              {/* Subtitle */}
              <p className="text-lg md:text-xl text-neutral-600 text-center max-w-md font-serif italic">
                {t('welcome_subtitle')}
              </p>
            </div>
          </div>
        ) : isEndPage ? (
          // End Page Layout
          <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-amber-50">
            <div className="flex flex-col items-center space-y-8">
              {/* Logo */}
              <img 
                src="/life-stories-green.png" 
                alt="Life Stories" 
                className="w-40 h-auto opacity-80"
              />
              
              {/* End Message */}
              <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-serif font-light text-neutral-800">
                  {t('the_end')}
                </h1>
                <p className="text-base md:text-lg text-neutral-600 font-serif italic max-w-md">
                  {t('end_message')}
                </p>
              </div>
              
              {/* Decorative line */}
              <div className="w-24 h-0.5 bg-amber-600"></div>
              
              {/* Footer */}
              <p className="text-sm text-neutral-400 font-sans">
                {t('created_with')}
              </p>
            </div>
          </div>
        ) : isChapterOpener ? (
          // Chapter Opener Layout
          <>
            <div className="h-full flex flex-col items-center justify-center p-6 sm:p-10 md:p-16 bg-gradient-to-br from-neutral-50 to-neutral-100">
              {chapter && (
                <div className="flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-8">
                  {/* Large decorative icon */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-neutral-200 blur-2xl opacity-50 rounded-full"></div>
                    <ChapterIcon 
                      icon={chapter.icon} 
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 text-neutral-800 relative z-10"
                    />
                  </div>
                  
                  {/* Chapter title */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-semibold text-center text-neutral-900 max-w-2xl leading-tight px-4">
                    {getChapterTitle()}
                  </h1>
                  
                  {/* Decorative line */}
                  <div className="w-16 sm:w-20 md:w-24 h-0.5 bg-neutral-400"></div>
                  
                  {/* Description */}
                  <p className="text-sm sm:text-base md:text-lg text-neutral-600 text-center max-w-xl italic leading-relaxed px-4">
                    {getChapterDescription()}
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Magazine Header */}
            <div className="border-b border-neutral-200 px-8 md:px-12 py-4 md:py-5">
              <div className="flex justify-between items-center">
                <p className="font-sans text-xs uppercase tracking-widest text-neutral-400">{parentName}'s {storyText}</p>
                <p className="font-serif text-sm italic text-neutral-500">{getChapterTitle() || ''}</p>
                <p className="font-sans text-xs text-neutral-400">{pageText} {page.pageNumber}</p>
              </div>
            </div>

            {/* Content Area */}
            <div 
              className="p-8 md:p-12 space-y-12 md:space-y-14 pb-16 md:pb-18 overflow-y-auto"
              style={{
                maxHeight: 'calc(100% - 60px)',
              }}
            >
              {isMultiStory ? (
                <MultiStoryLayout 
                  qaBlocks={qaBlocks} 
                  photo={page.photo} 
                  isLandscape={isLandscape}
                  translateQuestion={translateQuestion}
                  chapterId={page.chapterId}
                />
              ) : (
                <SingleStoryLayout 
                  question={questionContent?.text || ''} 
                  answer={answerContents[0]?.text || ''} 
                  photo={page.photo}
                  isLandscape={isLandscape}
                  translateQuestion={translateQuestion}
                  chapterId={page.chapterId}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Single Story Layout Component
function SingleStoryLayout({ question, answer, photo, isLandscape, translateQuestion, chapterId }: { 
  question: string; 
  answer: string; 
  photo?: string;
  isLandscape: boolean;
  translateQuestion: (questionText: string, chapterId: string) => string;
  chapterId: string;
}) {
  const answerLength = answer.length;
  const translatedQuestion = translateQuestion(question, chapterId);
  
  // Hero layout for long answers
  if (answerLength > 600) {
    return (
      <>
        <div className="mb-12 md:mb-16">
          <h1 className="font-sans text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 leading-tight mb-8 md:mb-10">
            {translatedQuestion}
          </h1>
          <p className="font-serif text-base leading-relaxed text-neutral-700 max-w-3xl">
            {answer.substring(0, Math.floor(answerLength / 2))}
          </p>
        </div>
        
        {isLandscape && (
          <div className="grid grid-cols-2 gap-20 md:gap-24">
            <p className="font-serif text-base leading-relaxed text-neutral-700">
              {answer.substring(Math.floor(answerLength / 2))}
            </p>
            
            {photo && (
              <div className="relative h-64 overflow-hidden border border-neutral-200">
                <img src={photo} alt="Memory" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        )}
        
        {!isLandscape && (
          <>
            <p className="font-serif text-base leading-relaxed text-neutral-700 mb-6">
              {answer.substring(Math.floor(answerLength / 2))}
            </p>
            {photo && (
              <div className="relative h-64 mb-6 overflow-hidden border border-neutral-200">
                <img src={photo} alt="Memory" className="w-full h-full object-cover" />
              </div>
            )}
          </>
        )}
      </>
    );
  }
  
  // Medium - featured box layout
  if (answerLength > 250) {
    return (
      <div className={isLandscape ? 'grid grid-cols-2 gap-20 md:gap-24' : 'space-y-6'}>
        <div className="border-2 border-neutral-800 p-10 md:p-12 bg-white">
          <h3 className="font-sans text-sm md:text-lg font-semibold mb-6 md:mb-8 leading-tight uppercase tracking-wide">
            {translatedQuestion}
          </h3>
          <p className="font-serif text-sm md:text-base leading-loose text-neutral-700">
            {answer}
          </p>
        </div>
        
        {photo && (
          <div className="relative h-full min-h-[300px] overflow-hidden">
            <img src={photo} alt="Memory" className="w-full h-full object-cover" />
          </div>
        )}
      </div>
    );
  }
  
  // Short - minimal card
  return (
    <div className="max-w-lg">
      <div className="bg-neutral-50 p-6 md:p-8 rounded">
        <h3 className="font-sans text-xs uppercase tracking-widest text-neutral-500 mb-5">
          {translatedQuestion}
        </h3>
        <p className="font-serif text-sm md:text-base text-neutral-600 leading-loose">
          {answer}
        </p>
      </div>
    </div>
  );
}

// Multi-Story Layout Component - Clean, elegant magazine layouts
function MultiStoryLayout({ 
  qaBlocks, 
  photo, 
  isLandscape, 
  translateQuestion, 
  chapterId 
}: { 
  qaBlocks: Array<{question: string, answer: string, length: number}>; 
  photo?: string;
  isLandscape: boolean;
  translateQuestion: (questionText: string, chapterId: string) => string;
  chapterId: string;
}) {
  if (qaBlocks.length === 0) return null;
  
  const count = qaBlocks.length;
  const translatedQAs = qaBlocks.map(qa => ({
    ...qa,
    translatedQuestion: translateQuestion(qa.question, chapterId)
  }));
  
  // For landscape pages with multiple Q&As - clean two-column layout
  if (isLandscape && count > 1) {
    // Split Q&As into two columns
    const midPoint = Math.ceil(translatedQAs.length / 2);
    const leftQAs = translatedQAs.slice(0, midPoint);
    const rightQAs = translatedQAs.slice(midPoint);
    
    return (
      <div className="flex gap-12">
        {/* Left column */}
        <div className="w-1/2 space-y-8">
          {leftQAs.map((qa, idx) => (
            <div key={`left-${idx}`}>
              <h3 className="font-serif text-lg font-semibold text-neutral-900 mb-3">
                {translateQuestion(qa.question, chapterId)}
              </h3>
              <p className="font-serif text-base leading-relaxed text-neutral-700">
                {qa.answer}
              </p>
            </div>
          ))}
        </div>
        
        {/* Right column */}
        <div className="w-1/2 space-y-8">
          {photo && (
            <div className="mb-8 flex justify-center">
              <div 
                className="relative bg-white p-2 shadow-lg"
                style={{ 
                  transform: 'rotate(2deg)',
                  maxWidth: '280px'
                }}
              >
                <img src={photo} alt="Memory" className="w-full h-auto" style={{ maxHeight: '220px', objectFit: 'cover' }} />
                
                {/* Tape on top corners */}
                <div 
                  className="absolute -top-2 left-8 w-16 h-6 bg-amber-100/70"
                  style={{ transform: 'rotate(-45deg)' }}
                />
                <div 
                  className="absolute -top-2 right-8 w-16 h-6 bg-amber-100/70"
                  style={{ transform: 'rotate(45deg)' }}
                />
              </div>
            </div>
          )}
          {rightQAs.map((qa, idx) => (
            <div key={`right-${idx}`}>
              <h3 className="font-serif text-lg font-semibold text-neutral-900 mb-3">
                {translateQuestion(qa.question, chapterId)}
              </h3>
              <p className="font-serif text-base leading-relaxed text-neutral-700">
                {qa.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Single Q&A or portrait - simple clean layout
  return (
    <div className="space-y-10">
      {photo && (
        <div className="mb-8 flex justify-center">
          <div 
            className="relative bg-white p-2 shadow-lg"
            style={{ 
              transform: 'rotate(-1.5deg)',
              maxWidth: '340px'
            }}
          >
            <img src={photo} alt="Memory" className="w-full h-auto" style={{ maxHeight: '280px', objectFit: 'cover' }} />
            
            {/* Tape on top corners */}
            <div 
              className="absolute -top-2 left-10 w-16 h-6 bg-amber-100/70"
              style={{ transform: 'rotate(-45deg)' }}
            />
            <div 
              className="absolute -top-2 right-10 w-16 h-6 bg-amber-100/70"
              style={{ transform: 'rotate(45deg)' }}
            />
          </div>
        </div>
      )}
      {translatedQAs.map((qa, idx) => (
        <div key={idx}>
          <h2 className="font-serif text-xl font-semibold text-neutral-900 mb-3">
            {qa.translatedQuestion}
          </h2>
          <p className="font-serif text-base leading-relaxed text-neutral-700">
            {qa.answer}
          </p>
        </div>
      ))}
    </div>
  );
}
