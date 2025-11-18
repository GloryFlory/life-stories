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
  const name = isMom ? "Mom" : "Dad";
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
            Back to home
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
                href={`/${parent}/story`}
                className="gallery-link-button"
                style={{ marginTop: '0.5rem' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                {t('viewYourStory')}
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
          </div>
        </div>
      )}
    </main>
  );
}
