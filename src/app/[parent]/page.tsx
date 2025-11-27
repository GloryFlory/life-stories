'use client';

import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { chapters, storyQuestions } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';
import { LanguageSelector } from '@/components/LanguageSelector';
import { getCompletionStats } from '@/lib/storyStorage';
import '../home.css';

interface ParentBookProps {
  params: Promise<{
    parent: 'mom' | 'dad';
  }>;
}

export default function ParentBook({ params }: ParentBookProps) {
  const { parent } = use(params);
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key);
  
  const [showCompletionCelebration, setShowCompletionCelebration] = useState(false);
  const [isFullyComplete, setIsFullyComplete] = useState(false);
  
  const isMom = parent === 'mom';
  const name = t(parent); // Translate 'mom' or 'dad'
  const firstChapter = chapters[0];
  const welcomeText = isMom ? t('welcomeMom') : t('welcomeDad');
  const emoji = isMom ? '🧡' : '💙';

  useEffect(() => {
    // Check if redirected here after completing final chapter
    const urlParams = new URLSearchParams(window.location.search);
    const justCompleted = urlParams.get('completed') === 'true';
    
    // Check completion status
    const stats = getCompletionStats(parent, chapters.map(ch => ({
      id: ch.id,
      questionCount: storyQuestions[ch.id as keyof typeof storyQuestions]?.length || 0
    })));
    
    setIsFullyComplete(stats.isFullyComplete);
    
    if (justCompleted && stats.isFullyComplete) {
      setShowCompletionCelebration(true);
      // Clear the query parameter
      window.history.replaceState({}, '', `/${parent}`);
      
      // Hide celebration after 5 seconds
      setTimeout(() => {
        setShowCompletionCelebration(false);
      }, 5000);
    }
  }, [parent]);

  return (
    <main className="home-container">
      <div className="language-selector-wrapper">
        <LanguageSelector />
      </div>
      
      {/* Header */}
      <div className="page-header">
        <div className="content-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Link href="/" className="back-link">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('backToHome')}
          </Link>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="content-container" style={{ maxWidth: '42rem', paddingTop: '4rem', paddingBottom: '6rem' }}>
        <div className={`welcome-card ${isMom ? 'mom' : 'dad'}`}>
          <div className={`welcome-accent ${isMom ? 'mom' : 'dad'}`}></div>
          <h1 className="welcome-title">{welcomeText} {emoji}</h1>
          
          <div className="welcome-message">
            <p>{t('welcomeMessage')}</p>
          </div>
          
          <div className="welcome-actions">
            <Link 
              href={`/${parent}/${firstChapter.id}`}
              className={`begin-button ${isMom ? 'mom' : 'dad'}`}
            >
              {isFullyComplete ? t('continueStory') : t('beginButton')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            {isFullyComplete && (
              <Link 
                href={`/${parent}/book`}
                className="gallery-link-button"
                style={{ marginTop: '0.5rem', background: '#f59e0b', color: 'white' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {t('viewYourLifeStory')}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 100% Completion Celebration */}
      {showCompletionCelebration && (
        <div className="full-completion-overlay">
          <div className={`full-completion-card ${isMom ? 'mom' : 'dad'}`}>
            <div className="completion-confetti">
              <span>🎉</span>
              <span>✨</span>
              <span>🎊</span>
              <span>💫</span>
              <span>⭐</span>
              <span>🌟</span>
              <span>🎉</span>
              <span>✨</span>
              <span>🎊</span>
              <span>💫</span>
              <span>⭐</span>
              <span>🌟</span>
              <span>🎉</span>
              <span>✨</span>
              <span>🎊</span>
              <span>💫</span>
              <span>⭐</span>
              <span>🌟</span>
            </div>
            <h1 className="completion-main-title">{t('storyComplete')}</h1>
            <p className="completion-subtitle">{t('storyCompleteMessage')}</p>
            <div className="completion-stats">
              <div className="completion-stat">
                <span className="stat-number">12</span>
                <span className="stat-label">{t('chaptersCompleted')}</span>
              </div>
            </div>
            <Link 
              href={`/${parent}/book`}
              className="gallery-link-button"
              style={{ marginTop: '2rem', background: '#f59e0b', color: 'white', fontSize: '1.1rem', padding: '0.875rem 1.5rem' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {t('viewYourLifeStory')}
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
