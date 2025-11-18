/**
 * Template Selection and Layout Utilities
 * Handles random template selection, imperfect alignment, and layout variations
 */

export type TemplateType = 
  | 'TornPaper' 
  | 'PolaroidGallery' 
  | 'Timeline' 
  | 'Quote' 
  | 'QA' 
  | 'TwoColumn' 
  | 'Letter' 
  | 'Collage';

/**
 * Template weights for random selection
 * Higher weight = more likely to be selected
 */
const TEMPLATE_WEIGHTS: Record<TemplateType, number> = {
  TornPaper: 25,
  PolaroidGallery: 15,
  Timeline: 10,
  Quote: 15,
  QA: 30,
  TwoColumn: 20,
  Letter: 10,
  Collage: 5
};

/**
 * Select a random template based on weights and chapter context
 */
export function selectRandomTemplate(
  chapterId: string, 
  hasPhotos: boolean = false,
  questionCount: number = 1
): TemplateType {
  // If multiple questions, prefer QA or TwoColumn
  if (questionCount > 1) {
    return Math.random() > 0.5 ? 'QA' : 'TwoColumn';
  }
  
  // If photos present, prefer photo-friendly templates
  if (hasPhotos) {
    const photoTemplates: TemplateType[] = ['PolaroidGallery', 'TwoColumn', 'TornPaper', 'Collage'];
    return photoTemplates[Math.floor(Math.random() * photoTemplates.length)];
  }
  
  // Weighted random selection
  const totalWeight = Object.values(TEMPLATE_WEIGHTS).reduce((sum, w) => sum + w, 0);
  let random = Math.random() * totalWeight;
  
  for (const [template, weight] of Object.entries(TEMPLATE_WEIGHTS)) {
    random -= weight;
    if (random <= 0) {
      return template as TemplateType;
    }
  }
  
  return 'QA'; // Fallback
}

/**
 * Apply random scrapbook offset for imperfect, handcrafted feel
 * Returns transform CSS values
 */
export function applyScrapOffset(intensity: 'subtle' | 'medium' | 'strong' = 'medium'): {
  transform: string;
  transition: string;
} {
  const ranges = {
    subtle: { translate: 2, rotate: 0.5 },
    medium: { translate: 4, rotate: 1.5 },
    strong: { translate: 8, rotate: 3 }
  };
  
  const range = ranges[intensity];
  
  const translateX = (Math.random() - 0.5) * range.translate * 2;
  const translateY = (Math.random() - 0.5) * range.translate * 2;
  const rotate = (Math.random() - 0.5) * range.rotate * 2;
  
  return {
    transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`,
    transition: 'all 0.3s ease'
  };
}

/**
 * Generate random watercolor splash position
 */
export function getWatercolorPosition(): {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
} {
  const positions = [
    { top: '5%', left: '5%' },
    { top: '10%', right: '8%' },
    { bottom: '15%', left: '10%' },
    { bottom: '10%', right: '12%' },
    { top: '50%', left: '2%' },
    { top: '30%', right: '5%' }
  ];
  
  return positions[Math.floor(Math.random() * positions.length)];
}

/**
 * Get tape rotation for realistic tape effect
 */
export function getTapeRotation(): number {
  return (Math.random() - 0.5) * 6; // -3 to +3 degrees
}

/**
 * Determine page layout based on content
 */
export function determineLayout(
  answerLength: number,
  photoCount: number
): 'single-column' | 'two-column' | 'photo-focus' | 'text-focus' {
  if (photoCount > 3) return 'photo-focus';
  if (photoCount === 0 && answerLength > 600) return 'text-focus';
  if (photoCount >= 1 && answerLength < 300) return 'photo-focus';
  if (answerLength > 400) return 'single-column';
  return 'two-column';
}

/**
 * Get decorative doodle SVG
 */
export function getRandomDoodle(): string {
  const doodles = [
    // Arrow
    '<svg viewBox="0 0 40 40" fill="none"><path d="M5 20 L30 20 M25 15 L30 20 L25 25" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    // Star
    '<svg viewBox="0 0 40 40" fill="none"><path d="M20 5 L23 15 L33 15 L25 22 L28 32 L20 25 L12 32 L15 22 L7 15 L17 15 Z" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>',
    // Heart
    '<svg viewBox="0 0 40 40" fill="none"><path d="M20 30 C20 30 8 22 8 14 C8 10 11 8 14 8 C17 8 20 11 20 11 C20 11 23 8 26 8 C29 8 32 10 32 14 C32 22 20 30 20 30 Z" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>',
    // Circle
    '<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="12" stroke="currentColor" stroke-width="2"/></svg>',
    // Wavy line
    '<svg viewBox="0 0 60 20" fill="none"><path d="M5 10 Q15 5 25 10 T45 10 T65 10" stroke="currentColor" stroke-width="2" fill="none"/></svg>'
  ];
  
  return doodles[Math.floor(Math.random() * doodles.length)];
}
