/**
 * localStorage utility for Life Story Book
 * Stores stories separately for mom and dad
 */

export type Parent = 'mom' | 'dad';

export interface StoryAnswer {
  question: string;
  answer: string;
  photos?: string[]; // Base64 encoded images
  lastModified: string; // ISO timestamp
}

export interface ChapterData {
  [questionIndex: number]: StoryAnswer;
}

export interface StoryData {
  [chapter: string]: ChapterData;
}

export interface ParentStoryBook {
  mom: StoryData;
  dad: StoryData;
}

const STORAGE_KEY = 'life-story-book';

/**
 * Get all story data from localStorage
 */
export function getAllStories(): ParentStoryBook {
  if (typeof window === 'undefined') {
    return { mom: {}, dad: {} };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { mom: {}, dad: {} };
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading stories:', error);
    return { mom: {}, dad: {} };
  }
}

/**
 * Get stories for a specific parent
 */
export function getParentStories(parent: Parent): StoryData {
  const allStories = getAllStories();
  return allStories[parent] || {};
}

/**
 * Save an answer to a specific question
 */
export function saveAnswer(
  parent: Parent,
  chapter: string,
  questionIndex: number,
  question: string,
  answer: string,
  photos?: string[]
): void {
  if (typeof window === 'undefined') return;

  try {
    const allStories = getAllStories();
    
    if (!allStories[parent]) {
      allStories[parent] = {};
    }
    
    if (!allStories[parent][chapter]) {
      allStories[parent][chapter] = {};
    }

    allStories[parent][chapter][questionIndex] = {
      question,
      answer,
      photos,
      lastModified: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(allStories));
  } catch (error) {
    console.error('Error saving answer:', error);
  }
}

/**
 * Get a specific answer
 */
export function getAnswer(
  parent: Parent,
  chapter: string,
  questionIndex: number
): StoryAnswer | null {
  const parentStories = getParentStories(parent);
  return parentStories[chapter]?.[questionIndex] || null;
}

/**
 * Get all answers for a chapter
 */
export function getChapterAnswers(parent: Parent, chapter: string): ChapterData {
  const parentStories = getParentStories(parent);
  return parentStories[chapter] || {};
}

/**
 * Check if a chapter has any answers
 */
export function isChapterStarted(parent: Parent, chapter: string): boolean {
  const chapterAnswers = getChapterAnswers(parent, chapter);
  return Object.keys(chapterAnswers).length > 0;
}

/**
 * Check if a chapter is complete (all questions answered)
 */
export function isChapterComplete(
  parent: Parent,
  chapter: string,
  totalQuestions: number
): boolean {
  // First check if chapter is explicitly marked as complete
  const completionKey = `${parent}_${chapter}_completed`;
  const isMarkedComplete = localStorage.getItem(completionKey) === 'true';
  
  if (isMarkedComplete) {
    return true;
  }
  
  // Otherwise check if all questions have non-empty answers
  const chapterAnswers = getChapterAnswers(parent, chapter);
  for (let i = 0; i < totalQuestions; i++) {
    const answer = chapterAnswers[i];
    if (!answer || !answer.answer.trim()) {
      return false;
    }
  }
  
  return true;
}

/**
 * Mark a chapter as completed
 */
export function markChapterComplete(parent: Parent, chapter: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const completionKey = `${parent}_${chapter}_completed`;
    localStorage.setItem(completionKey, 'true');
  } catch (error) {
    console.error('Error marking chapter complete:', error);
  }
}

/**
 * Get completion statistics for a parent
 * Note: Photos chapter is optional and excluded from completion calculation
 */
export function getCompletionStats(
  parent: Parent,
  chapters: { id: string; questionCount: number }[]
): {
  completedChapters: number;
  totalChapters: number;
  percentComplete: number;
  startedChapters: number;
  isFullyComplete: boolean;
} {
  let completedChapters = 0;
  let startedChapters = 0;
  
  // Only count first 12 chapters (exclude Photos chapter which is optional)
  const requiredChapters = chapters.filter(ch => ch.id !== 'photos');
  const totalChapters = requiredChapters.length;

  requiredChapters.forEach((chapter) => {
    if (isChapterComplete(parent, chapter.id, chapter.questionCount)) {
      completedChapters++;
    } else if (isChapterStarted(parent, chapter.id)) {
      startedChapters++;
    }
  });

  const percentComplete = Math.round((completedChapters / totalChapters) * 100);
  const isFullyComplete = completedChapters === totalChapters;

  return {
    completedChapters,
    totalChapters,
    percentComplete,
    startedChapters,
    isFullyComplete,
  };
}

/**
 * Clear all data for a parent (useful for testing or reset)
 */
export function clearParentStories(parent: Parent): void {
  if (typeof window === 'undefined') return;

  try {
    const allStories = getAllStories();
    allStories[parent] = {};
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allStories));
  } catch (error) {
    console.error('Error clearing stories:', error);
  }
}

/**
 * Export all data as JSON (for backup/sharing)
 */
export function exportStories(): string {
  const allStories = getAllStories();
  return JSON.stringify(allStories, null, 2);
}

/**
 * Import data from JSON
 */
export function importStories(jsonData: string): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const parsed = JSON.parse(jsonData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    return true;
  } catch (error) {
    console.error('Error importing stories:', error);
    return false;
  }
}
