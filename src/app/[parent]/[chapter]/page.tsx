'use client';

import Link from 'next/link';
import { useState, use, useRef, useEffect } from 'react';
import { chapters, storyQuestions } from '@/lib/types';
import { getQuestions } from '@/lib/questionTranslations';
import { ChapterIcon } from '@/components/ChapterIcon';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation, formatTranslation } from '@/lib/translations';
import { LanguageSelector } from '@/components/LanguageSelector';
import { saveAnswer, getChapterAnswers, getCompletionStats, markChapterComplete, isChapterComplete } from '@/lib/storyStorage';
import { compressImage } from '@/lib/imageCompression';
import './story.css';

interface ChapterPageProps {
  params: Promise<{
    parent: 'mom' | 'dad';
    chapter: string;
  }>;
}

export default function ChapterPage({ params }: ChapterPageProps) {
  const { parent, chapter: chapterId } = use(params);
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key);
  const tf = (key: string, params: Record<string, string | number>) => formatTranslation(language, key, params);
  
  const isMom = parent === 'mom';
  const parentName = t(parent); // Translate 'mom' or 'dad'

  const chapter = chapters.find((c) => c.id === chapterId);
  const questions = getQuestions(language, chapterId);

  const [stories, setStories] = useState<Record<number, { answer: string; photos: (File | string)[] }>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showChapterPhotoScreen, setShowChapterPhotoScreen] = useState(false);
  const [chapterPhoto, setChapterPhoto] = useState<File | string | null>(null);
  const [chapterPhotoCaption, setChapterPhotoCaption] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [progress, setProgress] = useState({ completedChapters: 0, totalChapters: 0, percentComplete: 0, startedChapters: 0 });
  
  const questionCardRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Load saved stories from localStorage on mount
  useEffect(() => {
    const savedChapter = getChapterAnswers(parent, chapterId);
    const loadedStories: Record<number, { answer: string; photos: (File | string)[] }> = {};
    
    Object.keys(savedChapter).forEach((key) => {
      const index = parseInt(key);
      const saved = savedChapter[index];
      if (saved) {
        loadedStories[index] = {
          answer: saved.answer,
          photos: saved.photos || [], // Load base64 photo strings
        };
      }
    });
    
    setStories(loadedStories);

    // Load chapter photo if exists
    const savedChapterPhoto = localStorage.getItem(`${parent}_${chapterId}_photo`);
    const savedChapterPhotoCaption = localStorage.getItem(`${parent}_${chapterId}_photo_caption`);
    
    if (savedChapterPhoto) {
      setChapterPhoto(savedChapterPhoto);
    }
    if (savedChapterPhotoCaption) {
      setChapterPhotoCaption(savedChapterPhotoCaption);
    }
  }, [parent, chapterId]);

  // Calculate progress stats
  useEffect(() => {
    const chaptersWithCounts = chapters.map(ch => ({
      id: ch.id,
      questionCount: storyQuestions[ch.id]?.length || 0,
    }));
    
    const stats = getCompletionStats(parent, chaptersWithCounts);
    setProgress(stats);
  }, [parent, stories]); // Recalculate when stories change

  // Auto-save current answer after typing stops (debounced)
  useEffect(() => {
    const currentStory = stories[currentQuestionIndex];
    const question = questions[currentQuestionIndex];
    if (!currentStory?.answer || !question) return;

    const timeoutId = setTimeout(async () => {
      // Convert photos to base64 for storage (compress if File objects)
      const photoPromises = currentStory.photos.map(async (photo) => {
        if (typeof photo === 'string') {
          // Already base64, return as-is
          return photo;
        }
        // Compress and convert File to base64
        try {
          return await compressImage(photo);
        } catch (error) {
          console.error('Error compressing photo:', error);
          // Fallback to non-compressed version
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(photo);
          });
        }
      });
      
      const photoBase64Array = await Promise.all(photoPromises);
      
      saveAnswer(
        parent,
        chapterId,
        currentQuestionIndex,
        question,
        currentStory.answer,
        photoBase64Array
      );
    }, 1000); // Save 1 second after user stops typing

    return () => clearTimeout(timeoutId);
  }, [stories, currentQuestionIndex, parent, chapterId, questions]);

  if (!chapter) {
    return <div>Chapter not found</div>;
  }

  const currentChapterIndex = chapters.findIndex((c) => c.id === chapterId);
  const answeredCount = Object.keys(stories).filter(key => stories[parseInt(key)]?.answer).length;
  const completedChapters = currentChapterIndex; // In a real app, track across all chapters

  const handleSave = async () => {
    // Save current answer to localStorage
    const currentStory = stories[currentQuestionIndex];
    if (currentStory) {
      // Compress and convert File objects to base64 strings for storage
      const photoPromises = currentStory.photos.map(async (photo) => {
        if (typeof photo === 'string') {
          // Already base64, return as-is
          return photo;
        }
        // Compress and convert File to base64
        try {
          return await compressImage(photo);
        } catch (error) {
          console.error('Error compressing photo:', error);
          // Fallback to non-compressed version
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(photo);
          });
        }
      });
      
      const photoBase64Array = await Promise.all(photoPromises);
      
      saveAnswer(
        parent,
        chapterId,
        currentQuestionIndex,
        currentQuestion,
        currentStory.answer,
        photoBase64Array
      );
    }
    
    // Show save confirmation
    setShowSaveConfirm(true);
    setTimeout(() => setShowSaveConfirm(false), 1500);
  };

  const handleSaveAndNext = async () => {
    await handleSave();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Last question in chapter
      const chapterIndex = chapters.findIndex(c => c.id === chapterId);
      if (chapterIndex >= 0 && chapterIndex < 12) {
        // For chapters 1-12, show chapter photo screen (final "question")
        setShowChapterPhotoScreen(true);
      } else {
        // For Photos chapter (13), show celebration then go to next
        showChapterCelebration();
      }
    }
  };

  const showChapterCelebration = () => {
    // Mark chapter as completed
    markChapterComplete(parent, chapterId);
    
    // Check if this completion makes the story 100% complete
    const updatedStats = getCompletionStats(parent, chapters.map(ch => ({
      id: ch.id,
      questionCount: storyQuestions[ch.id as keyof typeof storyQuestions]?.length || 0
    })));
    
    setShowCelebration(true);
    setTimeout(() => {
      setShowCelebration(false);
      // After celebration fades out, check if fully complete
      setTimeout(() => {
        if (updatedStats.isFullyComplete) {
          // Show special 100% completion celebration
          showFullCompletionCelebration();
        } else {
          navigateToNextChapter();
        }
      }, 300); // Wait for fade-out animation
    }, 3200); // Show for 3.2s before starting fade-out
  };

  const showFullCompletionCelebration = () => {
    // Navigate to parent page which will show the completion celebration
    window.location.href = `/${parent}?completed=true`;
  };

  const navigateToNextChapter = () => {
    const nextChapter = chapters[currentChapterIndex + 1];
    if (nextChapter) {
      window.location.href = `/${parent}/${nextChapter.id}`;
    } else {
      window.location.href = `/${parent}`;
    }
  };

  const handleChapterPhotoUpload = (file: File | null) => {
    if (file) {
      setChapterPhoto(file);
    }
  };

  const handleSkipChapterPhoto = () => {
    setShowChapterPhotoScreen(false);
    showChapterCelebration();
  };

  const handleSaveChapterPhoto = async () => {
    if (chapterPhoto) {
      setIsCompressing(true);
      try {
        const photoFile = typeof chapterPhoto === 'string' ? null : chapterPhoto;
        if (photoFile) {
          const base64 = await compressImage(photoFile);
          localStorage.setItem(`${parent}_${chapterId}_photo`, base64);
          localStorage.setItem(`${parent}_${chapterId}_photo_caption`, chapterPhotoCaption);
        } else {
          // Photo already saved, just update caption
          localStorage.setItem(`${parent}_${chapterId}_photo_caption`, chapterPhotoCaption);
        }
        setIsCompressing(false);
        setShowChapterPhotoScreen(false);
        showChapterCelebration();
      } catch (error) {
        console.error('Error compressing photo:', error);
        setIsCompressing(false);
      }
    } else {
      handleSkipChapterPhoto();
    }
  };

  const handlePhotoUpload = (files: FileList | null) => {
    if (!files) return;
    const currentStory = stories[currentQuestionIndex] || { answer: '', photos: [] };
    setStories({
      ...stories,
      [currentQuestionIndex]: {
        ...currentStory,
        photos: [...currentStory.photos, ...Array.from(files)]
      }
    });
  };

  const currentStory = stories[currentQuestionIndex] || { answer: '', photos: [] };
  const currentQuestion = questions[currentQuestionIndex];

  // Swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 75; // minimum distance for swipe
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left - go to next question
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      } else {
        // Swiped right - go to previous question
        if (currentQuestionIndex > 0) {
          setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div className="life-story-app">
      {/* Mobile Progress Bar - Slim at top */}
      <div className="mobile-progress-bar">
        <div className="mobile-progress-container">
          <div 
            className={`mobile-progress-fill ${isMom ? 'mom' : 'dad'}`}
            style={{ width: `${progress.percentComplete}%` }}
          />
        </div>
        <div className="mobile-progress-text">
          {tf('chaptersComplete', { completed: progress.completedChapters, total: progress.totalChapters })}
        </div>
      </div>

      {/* Top Navigation Bar */}
      <header className="top-bar">
        <div className="top-bar-content">
          <Link href="/" className="logo">{t('appTitle')}</Link>
          <div className="book-title">{parentName}{t('bookTitle')}</div>
          <div className="top-bar-actions">
            <Link href={`/${parent}/gallery`} className="gallery-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span>{t('gallery')}</span>
            </Link>
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="main-layout">
        {/* Sidebar - Chapters Navigation */}
        <aside className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          <button 
            className="sidebar-toggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle chapters menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isSidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
            <span>{t('chapters')}</span>
          </button>
          <div className="sidebar-card">
            <h2 className="sidebar-title">{t('chapters')}</h2>
            <nav className="chapters-nav">
              {chapters.map((ch) => {
                const chapterQuestions = storyQuestions[ch.id as keyof typeof storyQuestions];
                const questionCount = chapterQuestions?.length || 0;
                const isComplete = isChapterComplete(parent, ch.id, questionCount);
                
                return (
                  <Link
                    key={ch.id}
                    href={`/${parent}/${ch.id}`}
                    className={`chapter-item ${ch.id === chapterId ? 'active' : ''} ${isComplete ? 'completed' : ''}`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <ChapterIcon icon={ch.icon} className="chapter-icon-small" />
                    <span className="chapter-name">{t(`chapters_list.${ch.id}`)}</span>
                    {isComplete && (
                      <svg className="chapter-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </Link>
                );
              })}
            </nav>
            
            {/* Desktop Progress Bar - Below chapters */}
            <div className="sidebar-progress">
              <div className="sidebar-progress-header">
                <span className="sidebar-progress-title">{t('overallProgress')}</span>
                <span className={`sidebar-progress-percent ${isMom ? 'mom' : 'dad'}`}>
                  {progress.percentComplete}%
                </span>
              </div>
              <div className="sidebar-progress-bar-container">
                <div 
                  className={`sidebar-progress-bar-fill ${isMom ? 'mom' : 'dad'}`}
                  style={{ width: `${progress.percentComplete}%` }}
                />
              </div>
              <div className="sidebar-progress-stats">
                <span>{tf('chaptersComplete', { completed: progress.completedChapters, total: progress.totalChapters })}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content - Question Card */}
        <main className="content-area">
          <div 
            className="question-card"
            ref={questionCardRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Show chapter photo screen or regular questions */}
            {showChapterPhotoScreen ? (
              <>
                {/* Question Header - Same style as regular questions */}
                <div className="question-header">
                  <div className="question-meta">
                    <span className="question-number">{t('chapterMemory')}</span>
                    <span className="chapter-badge">
                      <ChapterIcon icon={chapter.icon} className="badge-icon" />
                      {t(`chapters_list.${chapter.id}`)}
                    </span>
                  </div>
                  <h1 className="question-title">{t('chapterPhotoPrompt')}</h1>
                  <p className="question-hint">
                    {t('chapterPhotoHint')}
                  </p>
                </div>

                {/* Answer Area - Split layout for photo and caption */}
                <div className="answer-section">
                  <div className="photo-caption-grid">
                    {/* Left: Photo Upload */}
                    <div className="photo-upload-side">
                      {chapterPhoto ? (
                        <div className="photo-preview-container">
                          <img 
                            src={typeof chapterPhoto === 'string' 
                              ? chapterPhoto 
                              : URL.createObjectURL(chapterPhoto)
                            } 
                            alt="Chapter memory" 
                            className="uploaded-photo-preview"
                          />
                        </div>
                      ) : (
                        <div className="photo-upload-placeholder">
                          <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p>{t('noPhotoYet')}</p>
                        </div>
                      )}
                      <label className="btn btn-secondary" style={{ marginTop: '1rem', width: '100%' }}>
                        <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {chapterPhoto ? t('changePhoto') : t('uploadChapterPhoto')}
                        <input
                          type="file"
                          accept="image/*"
                          className="file-input"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleChapterPhotoUpload(file);
                          }}
                        />
                      </label>
                    </div>

                    {/* Right: Caption */}
                    <div className="caption-side">
                      <textarea
                        value={chapterPhotoCaption}
                        onChange={(e) => setChapterPhotoCaption(e.target.value)}
                        className="answer-textarea"
                        placeholder={t('chapterPhotoCaptionPlaceholder')}
                        rows={12}
                      />
                    </div>
                  </div>

                  {/* Actions - Same style as regular questions */}
                  <div className="actions-row">
                    <div className="actions-left"></div>
                    <div className="actions-right">
                      <button 
                        onClick={handleSkipChapterPhoto} 
                        className="btn btn-ghost"
                        disabled={isCompressing}
                      >
                        {t('skipPhoto')}
                      </button>
                      <button 
                        onClick={handleSaveChapterPhoto} 
                        className="btn btn-primary"
                        disabled={isCompressing || !chapterPhoto}
                      >
                        {isCompressing ? t('compressingPhoto') : t('saveAndContinue')}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Question Header */}
                <div className="question-header">
                  <div className="question-meta">
                    <span className="question-number">{tf('questionNumber', { current: currentQuestionIndex + 1, total: questions.length })}</span>
                    <span className="chapter-badge">
                      <ChapterIcon icon={chapter.icon} className="badge-icon" />
                      {t(`chapters_list.${chapter.id}`)}
                    </span>
                  </div>
                  <h1 className="question-title">{currentQuestion}</h1>
                  <p className="question-hint">
                    {t('questionHint')}
                  </p>
                </div>

                {/* Answer Area */}
                <div className="answer-section">
              <textarea
                value={currentStory.answer}
                onChange={(e) =>
                  setStories({
                    ...stories,
                    [currentQuestionIndex]: { ...currentStory, answer: e.target.value }
                  })
                }
                className="answer-textarea"
                placeholder={t('answerPlaceholder')}
                rows={12}
              />

              {/* Photo Preview - Only show for Photos chapter */}
              {chapterId === 'photos' && currentStory.photos.length > 0 && (
                <div className="photo-preview">
                  {currentStory.photos.map((photo, idx) => {
                    // Handle both File objects (newly uploaded) and base64 strings (loaded from storage)
                    const photoSrc = typeof photo === 'string' 
                      ? photo // Already base64 data URL
                      : URL.createObjectURL(photo); // Convert File to object URL
                    
                    return (
                      <div key={idx} className="photo-thumb">
                        <img src={photoSrc} alt={`Photo ${idx + 1}`} />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Actions */}
              <div className="actions-row">
                <div className="actions-left">
                  {/* Photo upload only for Photos chapter */}
                  {chapterId === 'photos' && (
                    <>
                      <label className="btn btn-secondary">
                        <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {t('addPhoto')}
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          className="file-input"
                          onChange={(e) => handlePhotoUpload(e.target.files)}
                        />
                      </label>
                      {currentStory.photos.length > 0 && (
                        <span className="photo-count">
                          {currentStory.photos.length === 1 
                            ? tf('photoCount', { count: currentStory.photos.length })
                            : tf('photoCountPlural', { count: currentStory.photos.length })
                          }
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="actions-right">
                  <button onClick={handleSave} className="btn btn-ghost">
                    {t('saveDraft')}
                  </button>
                  <button onClick={handleSaveAndNext} className="btn btn-primary">
                    {currentQuestionIndex < questions.length - 1 ? t('saveNext') : t('completeChapter')}
                  </button>
                </div>
              </div>
            </div>
            </>
            )}

            {/* Question Navigation - Only show for regular questions, not chapter photo screen */}
            {!showChapterPhotoScreen && (
            <div className="question-nav">
              <button
                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0}
                className="nav-btn"
              >
                {t('previous')}
              </button>
              <div className="question-dots">
                {questions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`dot ${idx === currentQuestionIndex ? 'active' : ''} ${stories[idx]?.answer ? 'answered' : ''}`}
                    title={`${t('questionNumber').split(' ')[0]} ${idx + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))}
                disabled={currentQuestionIndex === questions.length - 1}
                className="nav-btn"
              >
                {t('next')}
              </button>
            </div>
            )}
          </div>
        </main>
      </div>

      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="celebration-overlay">
          <div className={`celebration-card ${isMom ? 'mom' : 'dad'}`}>
            <div className="celebration-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 className="celebration-title">{t('celebrationTitle')}</h2>
            <p className="celebration-message">{t(`chapters_list.${chapter.id}`)}</p>
            <p className="celebration-progress">{tf('celebrationProgress', { completed: completedChapters + 1, total: 12 })}</p>
          </div>
        </div>
      )}

      {/* Save Confirmation */}
      {showSaveConfirm && (
        <div className="save-confirm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span>{t('saved')}</span>
        </div>
      )}
    </div>
  );
}
