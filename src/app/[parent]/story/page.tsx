'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { chapters, storyQuestions } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';
import { getChapterAnswers, type ChapterData, type StoryAnswer } from '@/lib/storyStorage';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ChapterIcon } from '@/components/ChapterIcon';
import './story.css';

interface StoryPageProps {
  params: Promise<{
    parent: 'mom' | 'dad';
  }>;
}

interface BookPage {
  type: 'title' | 'chapter-title' | 'content' | 'photos-gallery' | 'end';
  chapterId?: string;
  chapterNumber?: number;
  chapterTitle?: string;
  questions?: Array<{
    question: string;
    answer: StoryAnswer;
    questionIndex: number;
  }>;
  layoutStyle?: number;
  photos?: Array<{ photo: string; caption?: string }>;
}

export default function StoryPage({ params }: StoryPageProps) {
  const { parent } = use(params);
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key);
  
  const [bookPages, setBookPages] = useState<BookPage[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const isMom = parent === 'mom';
  const name = t(parent); // Translate 'mom' or 'dad'

  useEffect(() => {
    // Build the book pages
    const pages: BookPage[] = [];
    
    // Title page
    pages.push({ type: 'title' });
    
    // Load all chapters including Photos
    chapters.forEach((chapter, chapterIndex) => {
      if (chapter.id === 'photos') {
        // Handle Photos chapter specially - collect ALL photos with captions
        const photosData = getChapterAnswers(parent, 'photos');
        const allPhotos: Array<{ photo: string; caption?: string }> = [];
        
        Object.entries(photosData).forEach(([qIndex, data]) => {
          if (data.photos && data.photos.length > 0) {
            data.photos.forEach((photo: string) => {
              allPhotos.push({
                photo: photo,
                caption: data.answer || ''
              });
            });
          }
        });
        
        if (allPhotos.length > 0) {
          // Add chapter title page for Photos
          pages.push({
            type: 'chapter-title',
            chapterId: 'photos',
            chapterNumber: chapterIndex + 1,
            chapterTitle: t('chapters_list.photos')
          });
          
          // Add photos gallery page (all photos together)
          pages.push({
            type: 'photos-gallery',
            chapterId: 'photos',
            photos: allPhotos
          });
        }
      } else {
        // Regular chapters
        const chapterAnswers = getChapterAnswers(parent, chapter.id);
        const questions = storyQuestions[chapter.id as keyof typeof storyQuestions] || [];
        
        // Only include chapters with answers
        const answeredQuestions = questions
          .map((q, idx) => ({ question: q, answer: chapterAnswers[idx], questionIndex: idx }))
          .filter(item => item.answer && item.answer.answer);
        
        if (answeredQuestions.length > 0) {
          // Add chapter title page
          pages.push({
            type: 'chapter-title',
            chapterId: chapter.id,
            chapterNumber: chapterIndex + 1,
            chapterTitle: t(`chapters_list.${chapter.id}`)
          });
          
          // Group questions into pages (2-3 per page based on length)
          let i = 0;
          while (i < answeredQuestions.length) {
            const questionsForPage = [];
            let currentPageLength = 0;
            
            // Add questions until we reach a good page length
            while (i < answeredQuestions.length && questionsForPage.length < 3) {
              const item = answeredQuestions[i];
              const answerLength = item.answer.answer.length;
              const hasPhotos = item.answer.photos && item.answer.photos.length > 0;
              
              // If answer is very long or has photos, give it its own page
              if (answerLength > 500 || hasPhotos) {
                if (questionsForPage.length > 0) {
                  // Start new page for this one
                  break;
                }
                questionsForPage.push(item);
                i++;
                break;
              }
              
              // Add to current page
              questionsForPage.push(item);
              currentPageLength += answerLength;
              i++;
              
              // If we've added enough content, start new page
              if (currentPageLength > 400 && questionsForPage.length >= 2) {
                break;
              }
            }
            
            // Create page with these questions
            pages.push({
              type: 'content',
              chapterId: chapter.id,
              questions: questionsForPage,
              layoutStyle: pages.length % 3 // Cycle through 3 layout styles
            });
          }
        }
      }
    });
    
    // End page
    pages.push({ type: 'end' });
    
    setBookPages(pages);
  }, [parent]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const nextPage = () => {
    if (currentPage < bookPages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (bookPages.length === 0) {
    return <div>Loading...</div>;
  }

  const currentPageData = bookPages[currentPage];

  return (
    <div className="story-page">
      <div className="no-print">
        <div className="language-selector-wrapper">
          <LanguageSelector />
        </div>
        
        <div className="story-header">
          <div className="story-header-content">
            <Link href={`/${parent}`} className="back-link">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Link>
            
            <button onClick={handlePrint} className={`print-button ${isMom ? 'mom' : 'dad'}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
                <path d="M6 14h12v8H6z" />
              </svg>
              Print Story
            </button>
          </div>
        </div>
      </div>

      {/* Book Container */}
      <div className="book-container">
        <div className={`book-page ${currentPageData.type}`}>
          
          {/* Title Page */}
          {currentPageData.type === 'title' && (
            <div className="title-page">
              <div className={`title-accent ${isMom ? 'mom' : 'dad'}`}></div>
              <h1 className="story-main-title">{name}{t('bookTitle')}</h1>
              <p className="story-subtitle">A collection of memories and moments</p>
              <div className="title-decoration">✦</div>
            </div>
          )}

          {/* Chapter Title Page */}
          {currentPageData.type === 'chapter-title' && (
            <div className="chapter-title-page">
              {currentPageData.chapterId && (
                <div className="chapter-icon-large">
                  <ChapterIcon 
                    icon={chapters.find(ch => ch.id === currentPageData.chapterId)?.icon || 'tree'} 
                  />
                </div>
              )}
              <div className="chapter-number">Chapter {currentPageData.chapterNumber}</div>
              <h2 className="chapter-title">{currentPageData.chapterTitle}</h2>
              <div className="chapter-divider"></div>
            </div>
          )}

          {/* Content Page with Multiple Questions */}
          {currentPageData.type === 'content' && currentPageData.questions && (
            <div className={`content-page layout-${currentPageData.layoutStyle}`}>
              {currentPageData.questions.map((item, idx) => (
                <div key={idx} className="question-block">
                  <h3 className="question-title">{item.question}</h3>
                  <div className="answer-text">{item.answer.answer}</div>
                  
                  {item.answer.photos && item.answer.photos.length > 0 && (
                    <div className="answer-photos">
                      {item.answer.photos.map((photo: string, photoIndex: number) => (
                        <div key={photoIndex} className="answer-photo">
                          <img src={photo} alt={`Memory ${photoIndex + 1}`} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Photos Gallery Page */}
          {currentPageData.type === 'photos-gallery' && currentPageData.photos && (
            <div className="photos-gallery-page">
              <div className="photo-grid">
                {currentPageData.photos.map((item, idx) => (
                  <div key={idx} className="gallery-photo-item">
                    <div className="gallery-photo">
                      <img src={item.photo} alt={`Gallery photo ${idx + 1}`} />
                    </div>
                    {item.caption && (
                      <p className="photo-caption">{item.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* End Page */}
          {currentPageData.type === 'end' && (
            <div className="end-page">
              <div className="end-decoration">✦</div>
              <p className="end-message">These memories are a precious gift, preserved for those who cherish them most.</p>
            </div>
          )}
        </div>

        {/* Page Navigation */}
        <div className="book-navigation no-print">
          <button 
            onClick={prevPage} 
            disabled={currentPage === 0}
            className="nav-button prev"
            aria-label="Previous page"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          <div className="page-indicator">
            <span className="current-page">{currentPage + 1}</span>
            <span className="page-separator">/</span>
            <span className="total-pages">{bookPages.length}</span>
          </div>
          
          <button 
            onClick={nextPage} 
            disabled={currentPage === bookPages.length - 1}
            className="nav-button next"
            aria-label="Next page"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Keyboard shortcuts hint */}
        <div className="keyboard-hint no-print">
          Use ← → arrow keys to navigate
        </div>
      </div>
    </div>
  );
}
