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
  forPDF?: boolean;
}

export function BookPageViewer({ page, orientation = 'portrait', parentName = '', language = 'en', pageText = 'Page', storyText = 'Story', forPDF = false }: BookPageViewerProps) {
  const isLandscape = orientation === 'landscape';
  const chapter = chapters.find(c => c.id === page.chapterId);
  
  // Helper to get class names - use fixed sizes for PDF, responsive for web
  const getTextClass = (mobileClass: string, desktopClass: string, fixedClass: string) => {
    return forPDF ? fixedClass : `${mobileClass} ${desktopClass}`;
  };
  
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
  
  // Translate question based on chapter - find the question in ANY language and get the translation
  const translateQuestion = (questionText: string, chapterId: string): string => {
    if (!questionText) return questionText;
    
    // Get questions for this chapter in all available languages
    const allLanguages = Object.keys(questionTranslations) as Array<keyof typeof questionTranslations>;
    
    // Find which language this question is in, and its index
    let questionIndex = -1;
    for (const lang of allLanguages) {
      const questionsInLang = questionTranslations[lang]?.[chapterId];
      if (questionsInLang) {
        const idx = questionsInLang.findIndex(q => q === questionText);
        if (idx !== -1) {
          questionIndex = idx;
          break;
        }
      }
    }
    
    // If we couldn't find the question in any language, return original
    if (questionIndex === -1) return questionText;
    
    // Get the translated question for the current language
    const translatedQuestions = questionTranslations[language]?.[chapterId];
    if (!translatedQuestions || !translatedQuestions[questionIndex]) {
      // Fall back to English if current language not available
      const englishQuestions = questionTranslations.en?.[chapterId];
      return englishQuestions?.[questionIndex] || questionText;
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
    <div className="bg-neutral-100 flex items-center justify-center p-1 sm:p-2 md:p-4">
      {/* A4 Page Container */}
      <div 
        id="book-page-for-pdf"
        className="bg-white shadow-lg sm:shadow-2xl relative w-full"
        style={forPDF ? {
          width: '297mm',
          height: '210mm',
          minWidth: '297mm',
          minHeight: '210mm',
          overflow: 'hidden',
          padding: '40px',
          boxSizing: 'border-box',
        } : {
          width: '100%',
          maxWidth: isLandscape ? '297mm' : '210mm',
          aspectRatio: isLandscape ? '297/210' : '210/297',
          minHeight: isLandscape ? 'min(70vh, 210mm)' : 'min(80vh, 297mm)',
          overflow: 'hidden',
          padding: 'clamp(16px, 4vw, 40px)',
          boxSizing: 'border-box',
        }}
      >
        {isWelcomePage ? (
          // Welcome Page Layout
          <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-white to-neutral-50 px-2 sm:px-4">
            <div className={`flex flex-col items-center max-w-full ${forPDF ? 'space-y-8' : 'space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8'}`}>
              {/* Logo */}
              <img 
                src="/life-stories-logo-new.png" 
                alt="Life Stories" 
                className={forPDF ? 'w-48 h-auto' : 'w-20 sm:w-28 md:w-36 lg:w-44 xl:w-48 h-auto max-w-[60vw]'}
              />
              
              {/* Welcome Title */}
              <h1 className={forPDF ? 'text-6xl font-serif font-light text-neutral-800 text-center' : 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-light text-neutral-800 text-center max-w-full px-2'}>
                {parentName}'s {t('life_story')}
              </h1>
              
              {/* Decorative line */}
              <div className={forPDF ? 'w-24 h-0.5 bg-amber-600' : 'w-12 sm:w-16 md:w-20 lg:w-24 h-0.5 bg-amber-600'}></div>
              
              {/* Subtitle */}
              <p className={forPDF ? 'text-xl text-neutral-600 text-center max-w-md font-serif italic' : 'text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-neutral-600 text-center max-w-[90vw] sm:max-w-xs md:max-w-sm lg:max-w-md font-serif italic px-2'}>
                {t('welcome_subtitle')}
              </p>
            </div>
          </div>
        ) : isEndPage ? (
          // End Page Layout
          <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-amber-50 px-2 sm:px-4">
            <div className={`flex flex-col items-center max-w-full ${forPDF ? 'space-y-8' : 'space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8'}`}>
              {/* Logo */}
              <img 
                src="/life-stories-green.png" 
                alt="Life Stories" 
                className={forPDF ? 'w-40 h-auto opacity-80' : 'w-16 sm:w-24 md:w-28 lg:w-36 xl:w-40 h-auto opacity-80 max-w-[50vw]'}
              />
              
              {/* End Message */}
              <div className={`text-center max-w-full ${forPDF ? 'space-y-4' : 'space-y-2 sm:space-y-3 md:space-y-4'}`}>
                <h1 className={forPDF ? 'text-5xl font-serif font-light text-neutral-800' : 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-light text-neutral-800 px-2'}>
                  {t('the_end')}
                </h1>
                <p className={forPDF ? 'text-lg text-neutral-600 font-serif italic max-w-md' : 'text-xs sm:text-sm md:text-base lg:text-lg text-neutral-600 font-serif italic max-w-[90vw] sm:max-w-xs md:max-w-sm lg:max-w-md px-2'}>
                  {t('end_message')}
                </p>
              </div>
              
              {/* Decorative line */}
              <div className={forPDF ? 'w-24 h-0.5 bg-amber-600' : 'w-12 sm:w-16 md:w-20 lg:w-24 h-0.5 bg-amber-600'}></div>
              
              {/* Footer */}
              <p className={forPDF ? 'text-sm text-neutral-400 font-sans' : 'text-xs sm:text-sm text-neutral-400 font-sans px-2'}>
                {t('created_with')}
              </p>
            </div>
          </div>
        ) : isChapterOpener ? (
          // Chapter Opener Layout
          <>
            <div className={`h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 ${forPDF ? 'p-16' : 'p-6 sm:p-10 md:p-16'}`}>
              {chapter && (
                <div className={`flex flex-col items-center ${forPDF ? 'space-y-8' : 'space-y-4 sm:space-y-6 md:space-y-8'}`}>
                  {/* Large decorative icon */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-neutral-200 blur-2xl opacity-50 rounded-full"></div>
                    <ChapterIcon 
                      icon={chapter.icon} 
                      className={forPDF ? 'w-32 h-32 text-neutral-800 relative z-10' : 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 text-neutral-800 relative z-10'}
                    />
                  </div>
                  
                  {/* Chapter title */}
                  <h1 className={forPDF ? 'text-6xl font-serif font-semibold text-center text-neutral-900 max-w-2xl leading-tight' : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-semibold text-center text-neutral-900 max-w-2xl leading-tight px-4'}>
                    {getChapterTitle()}
                  </h1>
                  
                  {/* Decorative line */}
                  <div className={forPDF ? 'w-24 h-0.5 bg-neutral-400' : 'w-16 sm:w-20 md:w-24 h-0.5 bg-neutral-400'}></div>
                  
                  {/* Description */}
                  <p className={forPDF ? 'text-lg text-neutral-600 text-center max-w-xl italic leading-relaxed' : 'text-sm sm:text-base md:text-lg text-neutral-600 text-center max-w-xl italic leading-relaxed px-4'}>
                    {getChapterDescription()}
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Magazine Header */}
            <div className={forPDF ? 'border-b border-neutral-200 px-12 py-5' : 'border-b border-neutral-200 px-4 md:px-12 py-3 md:py-5'}>
              <div className="flex justify-between items-center gap-2">
                <p className={forPDF ? 'font-sans text-xs uppercase tracking-widest text-neutral-400' : 'font-sans text-xs md:text-sm uppercase tracking-widest text-neutral-400 truncate'}>{parentName}'s {storyText}</p>
                <p className={forPDF ? 'font-serif text-sm italic text-neutral-500' : 'font-serif text-sm md:text-base italic text-neutral-500 truncate flex-1 text-center'}>{getChapterTitle() || ''}</p>
                <p className={forPDF ? 'font-sans text-xs text-neutral-400' : 'font-sans text-xs md:text-sm text-neutral-400 whitespace-nowrap'}>{pageText} {page.pageNumber}</p>
              </div>
            </div>

            {/* Content Area */}
            <div 
              className={forPDF ? 'p-12 space-y-14 pb-18 overflow-y-auto' : 'p-4 sm:p-6 md:p-8 lg:p-12 space-y-6 sm:space-y-8 md:space-y-12 lg:space-y-14 pb-8 sm:pb-12 md:pb-16 lg:pb-18 overflow-y-auto'}
              style={{
                maxHeight: forPDF ? 'calc(100% - 60px)' : 'calc(100% - 40px)',
              }}
            >
              {isMultiStory ? (
                <MultiStoryLayout 
                  qaBlocks={qaBlocks} 
                  photo={page.photo} 
                  isLandscape={isLandscape}
                  translateQuestion={translateQuestion}
                  chapterId={page.chapterId}
                  forPDF={forPDF}
                />
              ) : (
                <SingleStoryLayout 
                  question={questionContent?.text || ''} 
                  answer={answerContents[0]?.text || ''} 
                  photo={page.photo}
                  isLandscape={isLandscape}
                  translateQuestion={translateQuestion}
                  chapterId={page.chapterId}
                  forPDF={forPDF}
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
function SingleStoryLayout({ question, answer, photo, isLandscape, translateQuestion, chapterId, forPDF = false }: { 
  question: string; 
  answer: string; 
  photo?: string;
  isLandscape: boolean;
  translateQuestion: (questionText: string, chapterId: string) => string;
  chapterId: string;
  forPDF?: boolean;
}) {
  const answerLength = answer.length;
  const translatedQuestion = translateQuestion(question, chapterId);
  
  // For PDF, use fixed desktop-like styles
  // For screen, use responsive classes
  
  // Hero layout for long answers
  if (answerLength > 600) {
    if (forPDF && isLandscape) {
      // For PDF: use table-based layout
      return (
        <div>
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ 
              fontSize: '28px', 
              marginBottom: '24px', 
              fontWeight: 900, 
              letterSpacing: '-0.025em', 
              lineHeight: 1.1, 
              fontFamily: 'sans-serif',
              color: '#171717'
            }}>
              {translatedQuestion}
            </h1>
            <p style={{ 
              fontSize: '14px', 
              lineHeight: 1.7, 
              maxWidth: '700px',
              fontFamily: 'Georgia, serif',
              color: '#404040'
            }}>
              {answer.substring(0, Math.floor(answerLength / 2))}
            </p>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
            <tbody>
              <tr>
                <td style={{ width: '48%', verticalAlign: 'top', paddingRight: '24px' }}>
                  <p style={{ 
                    fontSize: '14px', 
                    lineHeight: 1.7,
                    fontFamily: 'Georgia, serif',
                    color: '#404040',
                    margin: 0
                  }}>
                    {answer.substring(Math.floor(answerLength / 2))}
                  </p>
                </td>
                <td style={{ width: '4%' }}></td>
                <td style={{ width: '48%', verticalAlign: 'top', paddingLeft: '24px' }}>
                  {photo && (
                    <div style={{ height: '200px', overflow: 'hidden', border: '1px solid #e5e5e5' }}>
                      <img src={photo} alt="Memory" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
    
    // For screen - always use larger text sizes for book view
    return (
      <>
        <div className="mb-8 md:mb-12 lg:mb-16">
          <h1 className="font-sans text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight text-neutral-900 leading-tight mb-6 md:mb-8 lg:mb-10">
            {translatedQuestion}
          </h1>
          <p className="font-serif text-sm md:text-base leading-relaxed text-neutral-700 max-w-3xl">
            {answer.substring(0, Math.floor(answerLength / 2))}
          </p>
        </div>
        
        {isLandscape && (
          <div className="grid grid-cols-2 gap-8 md:gap-12 lg:gap-24">
            <p className="font-serif text-sm md:text-base leading-relaxed text-neutral-700">
              {answer.substring(Math.floor(answerLength / 2))}
            </p>
            
            {photo && (
              <div className="relative h-56 md:h-64 overflow-hidden border border-neutral-200">
                <img src={photo} alt="Memory" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        )}
        
        {!isLandscape && (
          <>
            <p className="font-serif text-sm md:text-base leading-relaxed text-neutral-700 mb-6">
              {answer.substring(Math.floor(answerLength / 2))}
            </p>
            {photo && (
              <div className="relative h-56 md:h-64 mb-6 overflow-hidden border border-neutral-200">
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
    if (forPDF && isLandscape) {
      // For PDF: use table-based layout
      return (
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <tbody>
            <tr>
              <td style={{ width: '48%', verticalAlign: 'top', paddingRight: '24px' }}>
                <div style={{ border: '2px solid #262626', padding: '32px', backgroundColor: 'white' }}>
                  <h3 style={{ 
                    fontSize: '16px', 
                    fontWeight: 600, 
                    marginBottom: '20px', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.05em', 
                    fontFamily: 'sans-serif',
                    color: '#171717'
                  }}>
                    {translatedQuestion}
                  </h3>
                  <p style={{ 
                    fontSize: '14px', 
                    lineHeight: 1.8, 
                    fontFamily: 'Georgia, serif',
                    color: '#404040',
                    margin: 0
                  }}>
                    {answer}
                  </p>
                </div>
              </td>
              <td style={{ width: '4%' }}></td>
              <td style={{ width: '48%', verticalAlign: 'top', paddingLeft: '24px' }}>
                {photo && (
                  <div style={{ height: '100%', minHeight: '250px', overflow: 'hidden' }}>
                    <img src={photo} alt="Memory" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
    
    // For screen - always two columns for landscape book view
    return (
      <div className={isLandscape ? 'grid grid-cols-2 gap-8 md:gap-12 lg:gap-24' : 'space-y-6'}>
        <div className="border-2 border-neutral-800 p-6 md:p-10 lg:p-12 bg-white">
          <h3 className="font-sans text-sm md:text-base lg:text-lg font-semibold mb-4 md:mb-6 lg:mb-8 leading-tight uppercase tracking-wide">
            {translatedQuestion}
          </h3>
          <p className="font-serif text-sm md:text-base leading-relaxed md:leading-loose text-neutral-700">
            {answer}
          </p>
        </div>
        
        {photo && (
          <div className="relative h-64 md:h-full min-h-[250px] md:min-h-[300px] overflow-hidden">
            <img src={photo} alt="Memory" className="w-full h-full object-cover" />
          </div>
        )}
      </div>
    );
  }
  
  // Short - minimal card
  if (forPDF) {
    return (
      <div style={{ maxWidth: '500px' }}>
        <div style={{ backgroundColor: '#fafafa', padding: '28px', borderRadius: '8px' }}>
          <h3 style={{ 
            fontSize: '12px', 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em', 
            marginBottom: '16px',
            fontFamily: 'sans-serif',
            color: '#737373'
          }}>
            {translatedQuestion}
          </h3>
          <p style={{ 
            fontSize: '14px', 
            lineHeight: 1.8,
            fontFamily: 'Georgia, serif',
            color: '#525252',
            margin: 0
          }}>
            {answer}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-lg">
      <div className="bg-neutral-50 p-6 md:p-8 rounded">
        <h3 className="font-sans text-xs md:text-sm uppercase tracking-widest text-neutral-500 mb-4 md:mb-5">
          {translatedQuestion}
        </h3>
        <p className="font-serif text-sm md:text-base text-neutral-600 leading-relaxed md:leading-loose">
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
  chapterId,
  forPDF = false
}: { 
  qaBlocks: Array<{question: string, answer: string, length: number}>; 
  photo?: string;
  isLandscape: boolean;
  translateQuestion: (questionText: string, chapterId: string) => string;
  chapterId: string;
  forPDF?: boolean;
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
    
    if (forPDF) {
      // For PDF: use table-based layout which html2canvas handles reliably
      return (
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <tbody>
            <tr>
              <td style={{ width: '48%', verticalAlign: 'top', paddingRight: '24px' }}>
                {leftQAs.map((qa, idx) => (
                  <div key={`left-${idx}`} style={{ marginBottom: '24px' }}>
                    <h3 style={{ 
                      fontSize: '16px', 
                      fontWeight: 600, 
                      marginBottom: '10px', 
                      fontFamily: 'Georgia, serif', 
                      color: '#171717' 
                    }}>
                      {translateQuestion(qa.question, chapterId)}
                    </h3>
                    <p style={{ 
                      fontSize: '13px', 
                      lineHeight: 1.7, 
                      fontFamily: 'Georgia, serif', 
                      color: '#404040',
                      margin: 0
                    }}>
                      {qa.answer}
                    </p>
                  </div>
                ))}
              </td>
              <td style={{ width: '4%' }}></td>
              <td style={{ width: '48%', verticalAlign: 'top', paddingLeft: '24px' }}>
                {photo && (
                  <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                    <div style={{ 
                      display: 'inline-block',
                      transform: 'rotate(2deg)',
                      maxWidth: '280px',
                      backgroundColor: 'white',
                      padding: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}>
                      <img src={photo} alt="Memory" style={{ width: '100%', height: 'auto', maxHeight: '200px', objectFit: 'cover' }} />
                    </div>
                  </div>
                )}
                {rightQAs.map((qa, idx) => (
                  <div key={`right-${idx}`} style={{ marginBottom: '24px' }}>
                    <h3 style={{ 
                      fontSize: '16px', 
                      fontWeight: 600, 
                      marginBottom: '10px', 
                      fontFamily: 'Georgia, serif', 
                      color: '#171717' 
                    }}>
                      {translateQuestion(qa.question, chapterId)}
                    </h3>
                    <p style={{ 
                      fontSize: '13px', 
                      lineHeight: 1.7, 
                      fontFamily: 'Georgia, serif', 
                      color: '#404040',
                      margin: 0
                    }}>
                      {qa.answer}
                    </p>
                  </div>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
    
    // For screen: use flexbox - always two columns for landscape book view
    return (
      <div className="flex flex-row gap-8 md:gap-12">
        {/* Left column */}
        <div className="w-1/2 space-y-6 md:space-y-8">
          {leftQAs.map((qa, idx) => (
            <div key={`left-${idx}`}>
              <h3 className="font-serif text-base md:text-lg font-semibold text-neutral-900 mb-2 md:mb-3">
                {translateQuestion(qa.question, chapterId)}
              </h3>
              <p className="font-serif text-sm md:text-base leading-relaxed text-neutral-700">
                {qa.answer}
              </p>
            </div>
          ))}
        </div>
        
        {/* Right column */}
        <div className="w-1/2 space-y-6 md:space-y-8">
          {photo && (
            <div className="mb-6 md:mb-8 flex justify-center">
              <div 
                className="relative bg-white p-3 shadow-lg"
                style={{ transform: 'rotate(2deg)' }}
              >
                <img src={photo} alt="Memory" className="w-full h-auto" style={{ maxWidth: '280px', maxHeight: '220px', objectFit: 'cover' }} />
              </div>
            </div>
          )}
          {rightQAs.map((qa, idx) => (
            <div key={`right-${idx}`}>
              <h3 className="font-serif text-base md:text-lg font-semibold text-neutral-900 mb-2 md:mb-3">
                {translateQuestion(qa.question, chapterId)}
              </h3>
              <p className="font-serif text-sm md:text-base leading-relaxed text-neutral-700">
                {qa.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Single Q&A or portrait - simple clean layout
  if (forPDF) {
    return (
      <div>
        {photo && (
          <div style={{ marginBottom: '24px', textAlign: 'center' }}>
            <div style={{ 
              display: 'inline-block',
              transform: 'rotate(-1.5deg)',
              maxWidth: '300px',
              backgroundColor: 'white',
              padding: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}>
              <img src={photo} alt="Memory" style={{ width: '100%', height: 'auto', maxHeight: '220px', objectFit: 'cover' }} />
            </div>
          </div>
        )}
        {translatedQAs.map((qa, idx) => (
          <div key={idx} style={{ marginBottom: '28px' }}>
            <h2 style={{ 
              fontSize: '18px', 
              fontWeight: 600, 
              marginBottom: '10px', 
              fontFamily: 'Georgia, serif', 
              color: '#171717' 
            }}>
              {qa.translatedQuestion}
            </h2>
            <p style={{ 
              fontSize: '13px', 
              lineHeight: 1.7, 
              fontFamily: 'Georgia, serif', 
              color: '#404040',
              margin: 0
            }}>
              {qa.answer}
            </p>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="space-y-8 md:space-y-10">
      {photo && (
        <div className="mb-6 md:mb-8 flex justify-center">
          <div 
            className="relative bg-white p-3 shadow-lg"
            style={{ transform: 'rotate(-1.5deg)' }}
          >
            <img src={photo} alt="Memory" className="w-full h-auto" style={{ maxWidth: '320px', maxHeight: '250px', objectFit: 'cover' }} />
          </div>
        </div>
      )}
      {translatedQAs.map((qa, idx) => (
        <div key={idx}>
          <h2 className="font-serif text-lg md:text-xl font-semibold text-neutral-900 mb-2 md:mb-3">
            {qa.translatedQuestion}
          </h2>
          <p className="font-serif text-sm md:text-base leading-relaxed text-neutral-700">
            {qa.answer}
          </p>
        </div>
      ))}
    </div>
  );
}
