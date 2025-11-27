'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';
import { LanguageSelector } from '@/components/LanguageSelector';
import './home.css';

export default function Home() {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key);

  return (
    <div className="home-container">
      <div className="language-selector-wrapper">
        <LanguageSelector />
      </div>

      <section className="hero-section">
        <Image
          src="/life-stories-logo-new.png"
          alt="Life Stories"
          width={180}
          height={180}
          className="mx-auto"
          priority
          style={{ filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))' }}
        />
        <h1 className="hero-title">{t('appTitle')}</h1>
        <p className="hero-subtitle">{t('homeSubtitle')}</p>
      </section>

      <div className="content-container">
        <div className="parent-grid">
          <Link href="/mom" className="parent-card mom">
            <div className="card-accent mom"></div>
            <h2 className="card-title">{t('momCard')}</h2>
            <p className="card-description">{t('momDescription')}</p>
            <span className="card-link">
              <span>{t('beginButton')}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>

          <Link href="/dad" className="parent-card dad">
            <div className="card-accent dad"></div>
            <h2 className="card-title">{t('dadCard')}</h2>
            <p className="card-description">{t('dadDescription')}</p>
            <span className="card-link">
              <span>{t('beginButton')}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
