'use client';

import React, { useMemo, useState, use } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSelector } from '@/components/LanguageSelector';
import { getParentStories } from '@/lib/storyStorage';
import { generateBookPagesWithChapters } from '@/lib/book/engine';
import { BookPageViewer } from '@/components/BookPageViewer';
import { Story } from '@/lib/book/types';
import { chapters as chapterDefinitions } from '@/lib/types';
import '../[chapter]/story.css';

export default function BookPage({ params }: { params: Promise<{ parent: string }> }) {
  const { language } = useLanguage();
  const { parent: parentParam } = use(params);
  const parent = parentParam as 'mom' | 'dad';
  
  const t = (key: string): string => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        mom: "Mom",
        dad: "Dad",
        bookTitle: "'s Life Story Book",
        backToChapters: "Back to Chapters",
        viewGallery: "View Gallery",
        noStoriesYet: "No stories yet",
        startAddingStories: "Start adding stories",
        previous: "Previous",
        next: "Next",
        page: "Page",
        of: "of",
        landscape: "Landscape",
        portrait: "Portrait",
        story: "Story",
        downloadPDF: "Download as PDF",
        generating: "Generating PDF..."
      },
      de: {
        mom: "Mama",
        dad: "Papa",
        bookTitle: "s Lebensbuch",
        backToChapters: "Zurück zu Kapiteln",
        viewGallery: "Galerie ansehen",
        noStoriesYet: "Noch keine Geschichten",
        startAddingStories: "Geschichten hinzufügen",
        previous: "Zurück",
        next: "Weiter",
        page: "Seite",
        of: "von",
        landscape: "Querformat",
        portrait: "Hochformat",
        story: "Geschichte",
        downloadPDF: "Als PDF herunterladen",
        generating: "PDF wird erstellt..."
      },
      it: {
        mom: "Mamma",
        dad: "Papà",
        bookTitle: " Storia di Vita",
        backToChapters: "Torna ai Capitoli",
        viewGallery: "Vedi Galleria",
        noStoriesYet: "Nessuna storia ancora",
        startAddingStories: "Inizia ad aggiungere storie",
        previous: "Precedente",
        next: "Avanti",
        page: "Pagina",
        of: "di",
        landscape: "Orizzontale",
        portrait: "Verticale",
        story: "Storia",
        downloadPDF: "Scarica come PDF",
        generating: "Generazione PDF..."
      },
      no: {
        mom: "Mamma",
        dad: "Pappa",
        bookTitle: "s Livshistorie",
        backToChapters: "Tilbake til Kapitler",
        viewGallery: "Se Galleri",
        noStoriesYet: "Ingen historier ennå",
        startAddingStories: "Begynn å legge til historier",
        previous: "Forrige",
        next: "Neste",
        page: "Side",
        of: "av",
        landscape: "Liggende",
        portrait: "Stående",
        story: "Historie",
        downloadPDF: "Last ned som PDF",
        generating: "Genererer PDF..."
      },
      et: {
        mom: "Ema",
        dad: "Isa",
        bookTitle: " Elulugu",
        backToChapters: "Tagasi Peatükkide Juurde",
        viewGallery: "Vaata Galeriid",
        noStoriesYet: "Veel pole lugusid",
        startAddingStories: "Alusta lugude lisamist",
        previous: "Eelmine",
        next: "Järgmine",
        page: "Lehekülg",
        of: "/",
        landscape: "Horisontaalne",
        portrait: "Vertikaalne",
        story: "Lugu",
        downloadPDF: "Laadi alla PDF-na",
        generating: "PDF-i loomine..."
      },
      uk: {
        mom: "Мама",
        dad: "Тато",
        bookTitle: " - Історія життя",
        backToChapters: "Назад до розділів",
        viewGallery: "Переглянути галерею",
        noStoriesYet: "Поки немає історій",
        startAddingStories: "Почати додавати історії",
        previous: "Попередня",
        next: "Наступна",
        page: "Сторінка",
        of: "з",
        landscape: "Альбомна",
        portrait: "Книжкова",
        story: "Історія",
        downloadPDF: "Завантажити як PDF",
        generating: "Створення PDF..."
      }
    };
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const parentName = t(parent);

  // Get proper uppercase parent name for display - translate it
  const displayParentName = t(parent).toUpperCase();

  // Convert StoryData to Story[] format
  const convertToStories = (storyData: any): Story[] => {
    const stories: Story[] = [];
    
    chapterDefinitions.forEach((chapter) => {
      const chapterData = storyData[chapter.id];
      if (!chapterData) return;
      
      Object.entries(chapterData).forEach(([questionIndex, data]: [string, any]) => {
        if (data.answer || (data.photos && data.photos.length > 0)) {
          stories.push({
            id: `${chapter.id}-${questionIndex}`,
            question: data.question || '',
            answer: data.answer || '',
            photos: data.photos,
            chapterId: chapter.id,
            chapterName: chapter.title
          });
        }
      });
    });
    
    return stories;
  };

  const pages = useMemo(() => {
    const storyData = getParentStories(parent);
    const stories = convertToStories(storyData);
    
    // Collect chapter photos from localStorage
    const chapterPhotos: Record<string, string> = {};
    chapterDefinitions.forEach((chapter) => {
      const chapterPhotoKey = `${parent}_${chapter.id}_photo`;
      const chapterPhoto = localStorage.getItem(chapterPhotoKey);
      if (chapterPhoto) {
        chapterPhotos[chapter.id] = chapterPhoto;
      }
    });
    
    return generateBookPagesWithChapters(stories, chapterPhotos);
  }, [parent]);

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  // Touch swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && currentPageIndex < pages.length - 1) {
      goToNextPage();
    }
    if (isRightSwipe && currentPageIndex > 0) {
      goToPreviousPage();
    }
  };

  const currentPage = pages[currentPageIndex];

  const goToNextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      const jsPDF = (await import('jspdf')).default;
      const html2canvas = (await import('html2canvas')).default;
      const React = (await import('react')).default;
      const ReactDOM = (await import('react-dom/client')).default;
      
      // Create PDF in landscape A4 format
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      // A4 landscape dimensions: 297mm x 210mm
      const pdfWidth = 297;
      const pdfHeight = 210;
      
      // Create a completely hidden container
      const hiddenContainer = document.createElement('div');
      hiddenContainer.style.position = 'fixed';
      hiddenContainer.style.left = '-99999px';
      hiddenContainer.style.top = '0';
      hiddenContainer.style.zIndex = '-9999';
      hiddenContainer.style.width = '1122px';
      hiddenContainer.style.height = '794px';
      hiddenContainer.style.overflow = 'hidden';
      document.body.appendChild(hiddenContainer);
      
      // Process each page
      for (let i = 0; i < pages.length; i++) {
        // Create a wrapper that will contain the full-size page
        const pageWrapper = document.createElement('div');
        pageWrapper.style.width = '1122px';
        pageWrapper.style.height = '794px';
        pageWrapper.style.backgroundColor = '#ffffff';
        pageWrapper.style.position = 'relative';
        hiddenContainer.appendChild(pageWrapper);
        
        // Render the BookPageViewer component at full size
        const root = ReactDOM.createRoot(pageWrapper);
        
        const { BookPageViewer } = await import('@/components/BookPageViewer');
        
        root.render(
          React.createElement(BookPageViewer, {
            page: pages[i],
            orientation: 'landscape',
            parentName: displayParentName,
            language,
            pageText: t('page'),
            storyText: t('story'),
            forPDF: true
          })
        );
        
        // Wait for React to render and images to load
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        try {
          // Capture the page wrapper
          const canvas = await html2canvas(pageWrapper, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            logging: false,
            backgroundColor: '#ffffff',
            width: 1122,
            height: 794
          });
          
          // Convert to image
          const imgData = canvas.toDataURL('image/jpeg', 0.95);
          
          // Add page to PDF
          if (i > 0) {
            pdf.addPage();
          }
          pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
          
        } catch (pageError) {
          console.error(`Error capturing page ${i}:`, pageError);
        }
        
        // Clean up
        root.unmount();
        pageWrapper.remove();
      }
      
      // Clean up hidden container
      hiddenContainer.remove();
      
      // Save the PDF
      const fileName = `${displayParentName}_Life_Story.pdf`;
      pdf.save(fileName);
      
      console.log('PDF generated successfully');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please check the console for details.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="life-story-app">
      <header className="top-bar">
        <div className="top-bar-content book-header">
          <div className="book-header-row">
            <Link href={`/${parent}`} className="logo back-link-book">
              ← {t('backToChapters')}
            </Link>
            <div className="book-header-actions">
              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF || pages.length === 0}
                className="pdf-download-btn"
              >
                {isGeneratingPDF ? t('generating') : t('downloadPDF')}
              </button>
              <LanguageSelector />
            </div>
          </div>
          <div className="book-title book-title-center">
            {parentName.charAt(0).toUpperCase() + parentName.slice(1)}{t('bookTitle')}
          </div>
        </div>
      </header>

      <main style={{ 
        padding: '8px',
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
      }}>
        
        {/* Book Viewer */}
        {pages.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            color: '#666'
          }}>
            <p style={{ fontSize: '18px', marginBottom: '16px' }}>
              {t('noStoriesYet')}
            </p>
            <Link 
              href={`/${parent}`}
              style={{
                color: '#8B4513',
                textDecoration: 'underline'
              }}
            >
              {t('startAddingStories')}
            </Link>
          </div>
        ) : (
          <>
            <div 
              style={{ marginBottom: '16px', width: '100%' }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <BookPageViewer 
                page={currentPage} 
                orientation="landscape"
                parentName={displayParentName}
                language={language}
                pageText={t('page')}
                storyText={t('story')}
              />
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '600px'
            }}>
              <button
                onClick={goToPreviousPage}
                disabled={currentPageIndex === 0}
                style={{
                  padding: '8px 12px',
                  fontSize: '13px',
                  fontWeight: '500',
                  backgroundColor: currentPageIndex === 0 ? '#e0e0e0' : '#8B4513',
                  color: currentPageIndex === 0 ? '#999' : 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: currentPageIndex === 0 ? 'not-allowed' : 'pointer',
                  flex: '0 0 auto'
                }}
              >
                ← {t('previous')}
              </button>

              <div style={{
                fontSize: '13px',
                color: '#2C1810',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                flex: '0 0 auto'
              }}>
                {t('page')} {currentPageIndex + 1} {t('of')} {pages.length}
              </div>

              <button
                onClick={goToNextPage}
                disabled={currentPageIndex === pages.length - 1}
                style={{
                  padding: '8px 12px',
                  fontSize: '13px',
                  fontWeight: '500',
                  backgroundColor: currentPageIndex === pages.length - 1 ? '#e0e0e0' : '#8B4513',
                  color: currentPageIndex === pages.length - 1 ? '#999' : 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: currentPageIndex === pages.length - 1 ? 'not-allowed' : 'pointer',
                  flex: '0 0 auto'
                }}
              >
                {t('next')} →
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
