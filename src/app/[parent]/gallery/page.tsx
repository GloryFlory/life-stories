'use client';

import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';
import { LanguageSelector } from '@/components/LanguageSelector';
import { chapters, storyQuestions } from '@/lib/types';
import { getChapterAnswers } from '@/lib/storyStorage';
import './gallery.css';

interface GalleryPageProps {
  params: Promise<{
    parent: 'mom' | 'dad';
  }>;
}

export default function GalleryPage({ params }: GalleryPageProps) {
  const { parent } = use(params);
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key);
  
  const isMom = parent === 'mom';
  const parentName = isMom ? 'Mom' : 'Dad';

  const [photos, setPhotos] = useState<{ url: string; caption: string; chapter: string; isChapterPhoto: boolean }[]>([]);

  useEffect(() => {
    const allPhotos: { url: string; caption: string; chapter: string; isChapterPhoto: boolean }[] = [];

    // Load photos from all chapters
    chapters.forEach((chapter) => {
      // Get chapter photo
      const chapterPhoto = localStorage.getItem(`${parent}_${chapter.id}_photo`);
      const chapterPhotoCaption = localStorage.getItem(`${parent}_${chapter.id}_photo_caption`) || '';
      
      if (chapterPhoto) {
        const chapterName = getTranslation(language, `chapters_list.${chapter.id}`);
        allPhotos.push({
          url: chapterPhoto,
          caption: chapterPhotoCaption || chapterName,
          chapter: chapterName,
          isChapterPhoto: true
        });
      }

      // Get question photos (only for Photos chapter)
      if (chapter.id === 'photos') {
        const answers = getChapterAnswers(parent, chapter.id);
        const chapterName = getTranslation(language, `chapters_list.${chapter.id}`);
        Object.keys(answers).forEach((questionIndex) => {
          const answer = answers[parseInt(questionIndex)];
          if (answer?.photos && answer.photos.length > 0) {
            answer.photos.forEach((photo) => {
              allPhotos.push({
                url: photo,
                caption: answer.answer ? answer.answer.substring(0, 100) + '...' : answer.question,
                chapter: chapterName,
                isChapterPhoto: false
              });
            });
          }
        });
      }
    });

    setPhotos(allPhotos);
  }, [parent, language]);

  return (
    <div className="gallery-container">
      {/* Top Bar */}
      <header className="gallery-header">
        <div className="gallery-header-content">
          <Link href={`/${parent}/roots`} className="back-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>{t('backToStory')}</span>
          </Link>
          <h1 className="gallery-title">{t('galleryTitle')}</h1>
          <LanguageSelector />
        </div>
      </header>

      {/* Gallery Content */}
      <main className="gallery-main">
        <div className="gallery-intro">
          <p className="gallery-subtitle">{t('gallerySubtitle')}</p>
        </div>

        {photos.length === 0 ? (
          <div className="empty-gallery">
            <div className="empty-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <h2 className="empty-title">{t('noPhotos')}</h2>
            <p className="empty-message">{t('noPhotosMessage')}</p>
          </div>
        ) : (
          <div className="photo-grid">
            {photos.map((photo, idx) => (
              <div key={idx} className="photo-item">
                <div className="photo-image-wrapper">
                  <img src={photo.url} alt={photo.caption} className="photo-image" />
                </div>
                <div className="photo-details">
                  <p className="photo-caption">{photo.caption}</p>
                  <span className="photo-chapter">{photo.chapter}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
