/**
 * Chapter Metadata
 * Defines accent colors, themes, and inspiring quotes for each chapter
 */

export interface ChapterMetadata {
  id: string;
  name: string;
  accentColor: string;
  secondaryColor: string;
  quotes: string[];
  theme: 'warm' | 'cool' | 'earth' | 'soft';
}

export const CHAPTER_METADATA: Record<string, ChapterMetadata> = {
  roots: {
    id: 'roots',
    name: 'Family Roots',
    accentColor: '#A0835F', // Warm Soil Brown
    secondaryColor: '#C9D5C0', // Dusty Sage
    quotes: [
      'Every family tree has its roots in love and resilience.',
      'We carry the stories of those who came before us.',
      'Roots run deep, connecting generations across time.'
    ],
    theme: 'earth'
  },
  childhood: {
    id: 'childhood',
    name: 'Childhood Memories',
    accentColor: '#F4D36B', // Sunny Yellow
    secondaryColor: '#FFF7EB', // Warm Cream
    quotes: [
      'The child who is not embraced by the village will burn it down to feel its warmth.',
      'Childhood is the most beautiful of all life\'s seasons.',
      'In every real man, a child is hidden that wants to play.'
    ],
    theme: 'warm'
  },
  teenage: {
    id: 'teenage',
    name: 'Teenage Years',
    accentColor: '#94A9D1', // Cornflower Blue
    secondaryColor: '#C7B7E5', // Lavender
    quotes: [
      'Youth is not a time of life; it is a state of mind.',
      'The teenage years are a time of discovery and transformation.',
      'We were young and we were reckless, but we were alive.'
    ],
    theme: 'cool'
  },
  youngadult: {
    id: 'youngadult',
    name: 'Young Adult',
    accentColor: '#B65A5A', // Berry Red
    secondaryColor: '#F3D7D1', // Soft Blush
    quotes: [
      'The future belongs to those who believe in the beauty of their dreams.',
      'Life is either a daring adventure or nothing at all.',
      'Twenty years from now you will be more disappointed by the things you didn\'t do.'
    ],
    theme: 'warm'
  },
  lovestory: {
    id: 'lovestory',
    name: 'Love Story',
    accentColor: '#F3D7D1', // Soft Blush
    secondaryColor: '#B65A5A', // Berry Red
    quotes: [
      'Love recognizes no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination.',
      'The best thing to hold onto in life is each other.',
      'You know you\'re in love when you can\'t fall asleep because reality is finally better than your dreams.'
    ],
    theme: 'soft'
  },
  wedding: {
    id: 'wedding',
    name: 'Wedding Day',
    accentColor: '#FFF7EB', // Warm Cream
    secondaryColor: '#F3D7D1', // Soft Blush
    quotes: [
      'A successful marriage requires falling in love many times, always with the same person.',
      'Grow old with me, the best is yet to be.',
      'Two souls with but a single thought, two hearts that beat as one.'
    ],
    theme: 'soft'
  },
  parent: {
    id: 'parent',
    name: 'Becoming a Parent',
    accentColor: '#C9D5C0', // Dusty Sage
    secondaryColor: '#F4D36B', // Sunny Yellow
    quotes: [
      'Making the decision to have a child is momentous. It is to decide forever to have your heart go walking around outside your body.',
      'A baby fills a place in your heart that you never knew was empty.',
      'We never know the love of a parent till we become parents ourselves.'
    ],
    theme: 'earth'
  },
  career: {
    id: 'career',
    name: 'Career & Work',
    accentColor: '#5E5E5E', // Pencil Gray
    secondaryColor: '#94A9D1', // Cornflower Blue
    quotes: [
      'Choose a job you love, and you will never have to work a day in your life.',
      'Success is not the key to happiness. Happiness is the key to success.',
      'Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.'
    ],
    theme: 'cool'
  },
  challenges: {
    id: 'challenges',
    name: 'Challenges & Growth',
    accentColor: '#A0835F', // Warm Soil Brown
    secondaryColor: '#5E5E5E', // Pencil Gray
    quotes: [
      'The oak fought the wind and was broken, the willow bent when it must and survived.',
      'Rock bottom became the solid foundation on which I rebuilt my life.',
      'You may encounter many defeats, but you must not be defeated.'
    ],
    theme: 'earth'
  },
  joy: {
    id: 'joy',
    name: 'Joy & Celebration',
    accentColor: '#F4D36B', // Sunny Yellow
    secondaryColor: '#C7B7E5', // Lavender
    quotes: [
      'Joy is not in things; it is in us.',
      'The best way to pay for a lovely moment is to enjoy it.',
      'Find ecstasy in life; the mere sense of living is joy enough.'
    ],
    theme: 'warm'
  },
  lessons: {
    id: 'lessons',
    name: 'Life Lessons',
    accentColor: '#94A9D1', // Cornflower Blue
    secondaryColor: '#A0835F', // Warm Soil Brown
    quotes: [
      'In the end, it\'s not the years in your life that count. It\'s the life in your years.',
      'The only impossible journey is the one you never begin.',
      'Life is what happens when you\'re busy making other plans.'
    ],
    theme: 'cool'
  },
  messages: {
    id: 'messages',
    name: 'Messages to Loved Ones',
    accentColor: '#B65A5A', // Berry Red
    secondaryColor: '#F3D7D1', // Soft Blush
    quotes: [
      'What we have once enjoyed we can never lose. All that we love deeply becomes a part of us.',
      'To live in hearts we leave behind is not to die.',
      'Love is a promise; love is a souvenir, once given never forgotten, never let it disappear.'
    ],
    theme: 'soft'
  },
  photos: {
    id: 'photos',
    name: 'Special Photos',
    accentColor: '#C7B7E5', // Lavender
    secondaryColor: '#FFF7EB', // Warm Cream
    quotes: [
      'A photograph is a pause button on life.',
      'In photography there is a reality so subtle that it becomes more real than reality.',
      'Every picture tells a story.'
    ],
    theme: 'soft'
  }
};

/**
 * Get metadata for a specific chapter
 */
export function getChapterMetadata(chapterId: string): ChapterMetadata | null {
  return CHAPTER_METADATA[chapterId] || null;
}

/**
 * Get a random quote for a chapter
 */
export function getQuoteForChapter(chapterId: string): string {
  const metadata = getChapterMetadata(chapterId);
  if (!metadata || !metadata.quotes.length) return '';
  
  const randomIndex = Math.floor(Math.random() * metadata.quotes.length);
  return metadata.quotes[randomIndex];
}

/**
 * Get accent color for a chapter
 */
export function getChapterAccentColor(chapterId: string): string {
  const metadata = getChapterMetadata(chapterId);
  return metadata?.accentColor || '#5E5E5E';
}

/**
 * Get secondary color for a chapter
 */
export function getChapterSecondaryColor(chapterId: string): string {
  const metadata = getChapterMetadata(chapterId);
  return metadata?.secondaryColor || '#FFF7EB';
}
