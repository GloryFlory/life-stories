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

  const getCardText = (key: string) => {
    if (language === 'en') {
      if (key === 'momTitle') return "Mom's Story";
      if (key === 'dadTitle') return "Dad's Story";
      if (key === 'description') return "Share your memories, wisdom, and life experiences with the ones you love most";
      if (key === 'button') return "Start Sharing";
    } else if (language === 'de') {
      if (key === 'momTitle') return "Mamas Geschichte";
      if (key === 'dadTitle') return "Papas Geschichte";
      if (key === 'description') return "Teile deine Erinnerungen, Weisheit und Lebenserfahrungen mit denen, die du am meisten liebst";
      if (key === 'button') return "Beginne zu teilen";
    } else if (language === 'no') {
      if (key === 'momTitle') return "Mammas Historie";
      if (key === 'dadTitle') return "Pappas Historie";
      if (key === 'description') return "Del dine minner, visdom og livserfaringer med de du elsker mest";
      if (key === 'button') return "Begynn å dele";
    } else { // Italian
      if (key === 'momTitle') return "La Storia della Mamma";
      if (key === 'dadTitle') return "La Storia del Papà";
      if (key === 'description') return "Condividi i tuoi ricordi, la tua saggezza e le tue esperienze di vita con le persone che ami di più";
      if (key === 'button') return "Inizia a Condividere";
    }
    return '';
  };

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
            <h2 className="card-title">{getCardText('momTitle')}</h2>
            <p className="card-description">{getCardText('description')}</p>
            <span className="card-link">
              <span>{getCardText('button')}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>

          <Link href="/dad" className="parent-card dad">
            <div className="card-accent dad"></div>
            <h2 className="card-title">{getCardText('dadTitle')}</h2>
            <p className="card-description">{getCardText('description')}</p>
            <span className="card-link">
              <span>{getCardText('button')}</span>
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
