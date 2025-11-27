import { Story, PageModel, TextBox } from './types';
import { chooseBestTemplate } from './templates';

/**
 * Main Book Engine
 * Takes an array of stories and generates paginated book pages
 */
export function generateBookPages(stories: Story[]): PageModel[] {
  const pages: PageModel[] = [];
  let pageNumber = 1;

  stories.forEach((story) => {
    const answerLength = story.answer?.length || 0;
    const hasPhoto = !!(story.photos && story.photos.length > 0);
    
    // Choose best template for this story
    const template = chooseBestTemplate(answerLength, hasPhoto);
    
    // Build content array from template's text boxes
    const content: PageModel['content'] = [];
    
    template.textBoxes.forEach((textBox, index) => {
      if (textBox.style === 'question') {
        content.push({
          textBoxIndex: index,
          text: story.question,
          style: 'question'
        });
      } else if (textBox.style === 'answer') {
        content.push({
          textBoxIndex: index,
          text: story.answer || '',
          style: 'answer'
        });
      } else if (textBox.style === 'chapter-title') {
        content.push({
          textBoxIndex: index,
          text: story.chapterName || '',
          style: 'chapter-title'
        });
      }
    });
    
    // Create page model
    const page: PageModel = {
      id: `page-${pageNumber}`,
      templateId: template.id,
      content,
      photo: hasPhoto && template.supportsPhoto ? story.photos![0] : undefined,
      chapterId: story.chapterId,
      pageNumber
    };
    
    pages.push(page);
    pageNumber++;
  });

  return pages;
}

/**
 * Estimate text length for template selection
 */
function estimateTextLength(text: string): number {
  return text.length;
}

/**
 * Split long text into multiple text boxes
 * Used when a story is too long for a single template
 */
function splitTextIntoBoxes(text: string, textBoxes: TextBox[]): string[] {
  const content: string[] = [];
  const words = text.split(' ');
  
  let currentBoxIndex = 0;
  let currentText = '';
  
  // Simple word-based distribution across text boxes
  // More sophisticated logic could balance visual weight
  const wordsPerBox = Math.ceil(words.length / textBoxes.length);
  
  words.forEach((word, index) => {
    currentText += word + ' ';
    
    if ((index + 1) % wordsPerBox === 0 && currentBoxIndex < textBoxes.length - 1) {
      content.push(currentText.trim());
      currentText = '';
      currentBoxIndex++;
    }
  });
  
  // Add remaining text
  if (currentText.trim()) {
    content.push(currentText.trim());
  }
  
  return content;
}

/**
 * Group stories by chapter for chapter opener pages
 * Enhanced to combine multiple short stories on single pages
 */
export function generateBookPagesWithChapters(
  stories: Story[],
  chapterPhotos: Record<string, string> = {}
): PageModel[] {
  const pages: PageModel[] = [];
  let pageNumber = 1;
  
  // Add Welcome Page
  const welcomePage: PageModel = {
    id: `page-${pageNumber}`,
    templateId: 'welcome-page',
    content: [{
      textBoxIndex: 0,
      text: 'Welcome',
      style: 'welcome-title'
    }],
    chapterId: 'welcome',
    pageNumber
  };
  pages.push(welcomePage);
  pageNumber++;
  
  // Group stories by chapter
  const chapterGroups = stories.reduce((acc, story) => {
    if (!acc[story.chapterId]) {
      acc[story.chapterId] = {
        chapterName: story.chapterName,
        stories: []
      };
    }
    acc[story.chapterId].stories.push(story);
    return acc;
  }, {} as Record<string, { chapterName: string; stories: Story[] }>);
  
  // Generate pages for each chapter
  Object.entries(chapterGroups).forEach(([chapterId, group]) => {
    // Add chapter opener page (no photo on opener)
    const openerPage: PageModel = {
      id: `page-${pageNumber}`,
      templateId: 'template-f', // Chapter opener template
      content: [{
        textBoxIndex: 0,
        text: group.chapterName,
        style: 'chapter-title'
      }],
      chapterId,
      pageNumber
    };
    pages.push(openerPage);
    pageNumber++;
    
    // Add story pages - combine multiple short stories on one page
    let currentPageStories: Story[] = [];
    let currentPageLength = 0;
    const MAX_PAGE_LENGTH = 1200; // Max for very long stories
    const MAX_STORIES_PER_PAGE = 6; // Max Q&As per page
    const MAX_MULTI_STORY_LENGTH = 2500; // Max characters per page - increased for cleaner layout
    const chapterPhoto = chapterPhotos[chapterId]; // Get chapter photo if available
    let chapterPhotoUsed = false; // Track if we've added the chapter photo
    
    group.stories.forEach((story, index) => {
      const answerLength = story.answer?.length || 0;
      const hasPhoto = !!(story.photos && story.photos.length > 0);
      
      // If story is extremely long, split it across multiple pages
      if (answerLength > MAX_PAGE_LENGTH) {
        // First, flush any accumulated stories
        if (currentPageStories.length > 0) {
          const page = createMultiStoryPage(currentPageStories, chapterId, pageNumber);
          if (chapterPhoto && !chapterPhotoUsed) {
            page.photo = chapterPhoto;
            chapterPhotoUsed = true;
          }
          pages.push(page);
          pageNumber++;
          currentPageStories = [];
          currentPageLength = 0;
        }
        
        // Split the long story into multiple pages
        const splitPages = splitLongStory(story, chapterId, pageNumber);
        pages.push(...splitPages);
        pageNumber += splitPages.length;
      }
      // If story has photo, give it its own page
      else if (hasPhoto) {
        // First, flush any accumulated stories
        if (currentPageStories.length > 0) {
          const page = createMultiStoryPage(currentPageStories, chapterId, pageNumber);
          if (chapterPhoto && !chapterPhotoUsed) {
            page.photo = chapterPhoto;
            chapterPhotoUsed = true;
          }
          pages.push(page);
          pageNumber++;
          currentPageStories = [];
          currentPageLength = 0;
        }
        
        // Then create page for this story
        pages.push(createSingleStoryPage(story, chapterId, pageNumber));
        pageNumber++;
      } else {
        // Check if adding this story would exceed limits
        const willHavePhoto = !chapterPhotoUsed && chapterPhoto && currentPageStories.length === 0;
        
        // If we'll add a photo, be more conservative
        const effectiveMaxLength = willHavePhoto ? 1200 : MAX_MULTI_STORY_LENGTH;
        const effectiveMaxCount = willHavePhoto ? 4 : MAX_STORIES_PER_PAGE;
        
        // Flush if we exceed EITHER length OR count limits (not both)
        const exceedsLength = currentPageLength + answerLength > effectiveMaxLength;
        const exceedsCount = currentPageStories.length >= effectiveMaxCount;
        
        if ((exceedsLength || exceedsCount) && currentPageStories.length > 0) {
          const page = createMultiStoryPage(currentPageStories, chapterId, pageNumber);
          if (chapterPhoto && !chapterPhotoUsed) {
            page.photo = chapterPhoto;
            chapterPhotoUsed = true;
          }
          pages.push(page);
          pageNumber++;
          currentPageStories = [];
          currentPageLength = 0;
        }
        
        currentPageStories.push(story);
        currentPageLength += answerLength;
      }
    });
    
    // Flush any remaining stories
    if (currentPageStories.length > 0) {
      const lastPage = createMultiStoryPage(currentPageStories, chapterId, pageNumber);
      // If chapter photo hasn't been used yet, add it to this page
      if (chapterPhoto && !chapterPhotoUsed) {
        lastPage.photo = chapterPhoto;
        chapterPhotoUsed = true;
      }
      pages.push(lastPage);
      pageNumber++;
    }
  });
  
  // Add End Page
  const endPage: PageModel = {
    id: `page-${pageNumber}`,
    templateId: 'end-page',
    content: [{
      textBoxIndex: 0,
      text: 'The End',
      style: 'end-title'
    }],
    chapterId: 'end',
    pageNumber
  };
  pages.push(endPage);
  
  return pages;
}

/**
 * Split a long story across multiple pages
 */
function splitLongStory(story: Story, chapterId: string, startPageNumber: number): PageModel[] {
  const pages: PageModel[] = [];
  const MAX_CHARS_PER_PAGE = 1200; // Match the increased limit
  const answer = story.answer || '';
  const hasPhoto = !!(story.photos && story.photos.length > 0);
  
  // Split answer into chunks that fit on a page
  const chunks: string[] = [];
  let currentChunk = '';
  const sentences = answer.split(/(?<=[.!?])\s+/); // Split by sentences
  
  sentences.forEach((sentence) => {
    if ((currentChunk + sentence).length > MAX_CHARS_PER_PAGE && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += (currentChunk ? ' ' : '') + sentence;
    }
  });
  
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }
  
  // Create pages for each chunk
  chunks.forEach((chunk, index) => {
    const isFirstPage = index === 0;
    const content: PageModel['content'] = [];
    
    // Only include question on first page
    if (isFirstPage) {
      content.push({
        textBoxIndex: 0,
        text: story.question,
        style: 'question'
      });
      content.push({
        textBoxIndex: 1,
        text: chunk,
        style: 'answer'
      });
    } else {
      // Continuation pages - just the answer
      content.push({
        textBoxIndex: 0,
        text: chunk,
        style: 'answer'
      });
    }
    
    const template = chooseBestTemplate(chunk.length, hasPhoto && isFirstPage);
    
    pages.push({
      id: `page-${startPageNumber + index}`,
      templateId: template.id,
      content,
      photo: (hasPhoto && isFirstPage && template.supportsPhoto) ? story.photos![0] : undefined,
      chapterId,
      pageNumber: startPageNumber + index
    });
  });
  
  return pages;
}

/**
 * Create a page with a single story
 */
function createSingleStoryPage(story: Story, chapterId: string, pageNumber: number): PageModel {
  const answerLength = story.answer?.length || 0;
  const hasPhoto = !!(story.photos && story.photos.length > 0);
  const template = chooseBestTemplate(answerLength, hasPhoto);
  
  const content: PageModel['content'] = [];
  template.textBoxes.forEach((textBox, index) => {
    if (textBox.style === 'question') {
      content.push({
        textBoxIndex: index,
        text: story.question,
        style: 'question'
      });
    } else if (textBox.style === 'answer') {
      content.push({
        textBoxIndex: index,
        text: story.answer || '',
        style: 'answer'
      });
    }
  });
  
  return {
    id: `page-${pageNumber}`,
    templateId: template.id,
    content,
    photo: hasPhoto && template.supportsPhoto ? story.photos![0] : undefined,
    chapterId,
    pageNumber
  };
}

/**
 * Create a page combining multiple short stories
 */
function createMultiStoryPage(stories: Story[], chapterId: string, pageNumber: number): PageModel {
  const content: PageModel['content'] = [];
  
  // Check if any story has a photo
  const storyWithPhoto = stories.find(s => s.photos && s.photos.length > 0);
  console.log('createMultiStoryPage - stories:', stories.length);
  console.log('createMultiStoryPage - storyWithPhoto:', storyWithPhoto);
  console.log('createMultiStoryPage - photo will be:', storyWithPhoto ? storyWithPhoto.photos![0].substring(0, 50) : 'none');
  
  // Add all questions and answers
  stories.forEach((story, index) => {
    content.push({
      textBoxIndex: index * 2, // Question
      text: story.question,
      style: 'question'
    });
    content.push({
      textBoxIndex: index * 2 + 1, // Answer
      text: story.answer || '',
      style: 'answer'
    });
  });
  
  return {
    id: `page-${pageNumber}`,
    templateId: 'template-multi', // Special template for multiple Q&As
    content,
    photo: storyWithPhoto ? storyWithPhoto.photos![0] : undefined,
    chapterId,
    pageNumber,
    multiStory: true, // Flag to indicate multiple stories
    storyCount: stories.length
  };
}
