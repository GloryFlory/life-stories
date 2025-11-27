// Core types for the book system

export interface Story {
  id: string;
  question: string;
  answer: string;
  photos?: string[];
  chapterId: string;
  chapterName: string;
}

export interface TextBox {
  x: number;        // 0-1 (percentage of page width)
  y: number;        // 0-1 (percentage of page height)
  width: number;    // 0-1 (percentage of page width)
  height: number;   // 0-1 (percentage of page height)
  align?: 'left' | 'center' | 'right';
  fontSize?: 'small' | 'medium' | 'large';
  style?: 'question' | 'answer' | 'chapter-title' | 'welcome-title' | 'end-title';
}

export interface PhotoBox {
  x: number;
  y: number;
  width: number;
  height: number;
  style?: 'polaroid' | 'full-bleed' | 'rounded';
}

export interface PageTemplate {
  id: string;
  name: string;
  textBoxes: TextBox[];
  photoBox?: PhotoBox;
  maxTextLength: number;  // Approximate character limit for this template
  supportsPhoto: boolean;
}

export interface PageModel {
  id: string;
  templateId: string;
  content: {
    textBoxIndex: number;
    text: string;
    style?: 'question' | 'answer' | 'chapter-title' | 'welcome-title' | 'end-title';
  }[];
  photo?: string;
  chapterId: string;
  pageNumber: number;
  multiStory?: boolean;  // Flag for pages with multiple Q&As
  storyCount?: number;   // Number of stories on this page
}
