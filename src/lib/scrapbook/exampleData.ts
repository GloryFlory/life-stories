/**
 * Example Scrapbook Data Structure
 * Demonstrates how to structure data for the scrapbook templates
 */

export interface ScrapbookPageData {
  template: 'TornPaper' | 'PolaroidGallery' | 'Timeline' | 'Quote' | 'QA' | 'TwoColumn' | 'Letter' | 'Collage';
  data: Record<string, unknown>;
}

export interface ScrapbookChapter {
  chapterId: string;
  chapterTitle: string;
  chapterIcon: string;
  accentColor: string;
  secondaryColor: string;
  quote?: string;
  pages: ScrapbookPageData[];
}

/**
 * Example chapter with all template types
 */
export const EXAMPLE_CHAPTER: ScrapbookChapter = {
  chapterId: 'childhood',
  chapterTitle: 'Childhood Memories',
  chapterIcon: '🎈',
  accentColor: '#F4D36B',
  secondaryColor: '#FFF7EB',
  quote: 'Childhood is the most beautiful of all life\'s seasons.',
  pages: [
    {
      template: 'TornPaper',
      data: {
        question: 'What is your earliest childhood memory?',
        answer: 'I remember the old oak tree in our backyard where I used to spend hours reading books and dreaming of adventures. The sun would filter through the leaves creating patterns of light and shadow on the grass below. It was my special place, my sanctuary from the world.',
        photo: '/photos/oak-tree.jpg',
        annotation: 'My favorite reading spot, summer 1965'
      }
    },
    {
      template: 'PolaroidGallery',
      data: {
        question: 'Favorite Childhood Photos',
        photos: [
          { url: '/photos/birthday-1963.jpg', caption: '5th birthday', date: '1963' },
          { url: '/photos/first-bike.jpg', caption: 'My first bicycle!' },
          { url: '/photos/halloween-1965.jpg', caption: 'Halloween costume', date: '1965' },
          { url: '/photos/summer-1964.jpg', caption: 'Beach day' }
        ]
      }
    },
    {
      template: 'Timeline',
      data: {
        question: 'Growing Up Milestones',
        events: [
          { year: '1958', title: 'Born in Springfield', icon: '👶' },
          { year: '1963', title: 'Started School', icon: '📚' },
          { year: '1965', title: 'Learned to Swim', icon: '🏊' },
          { year: '1968', title: 'Won Spelling Bee', icon: '🏆' },
          { year: '1970', title: 'First Camping Trip', icon: '⛺' }
        ]
      }
    },
    {
      template: 'Quote',
      data: {
        quote: 'The greatest gifts you can give your children are the roots of responsibility and the wings of independence.',
        author: 'Denis Waitley'
      }
    },
    {
      template: 'QA',
      data: {
        question: 'What games did you love to play?',
        answer: 'We played outside from sunrise to sunset. Hide and seek in the neighborhood, building forts in the woods, riding bikes to the creek. We didn\'t have video games or phones - we had imagination and freedom. Those summer evenings catching fireflies were pure magic.',
        stickyNote: 'Remember: simpler times, bigger adventures'
      }
    },
    {
      template: 'TwoColumn',
      data: {
        question: 'Who was your best friend growing up?',
        answer: 'Sarah lived three houses down and we were inseparable from age 6 onwards. We shared everything - secrets, dreams, adventures. She taught me how to braid hair and I taught her how to climb trees. We made a pact to be friends forever, and even though life took us to different cities, that bond never broke.',
        photo: '/photos/sarah-and-me.jpg',
        photoCaption: 'Sarah and me, age 8'
      }
    },
    {
      template: 'Letter',
      data: {
        greeting: 'Dear Little Me,',
        content: 'Those scraped knees and dirty hands tell stories of bravery and exploration. Don\'t rush to grow up. Savor the wonder in every puddle, every lightning bug, every blanket fort. The person you\'re becoming is shaped by these simple joys.\n\nThe world is bigger and more beautiful than you can imagine, but you\'ll always carry these memories like treasures in your pocket.',
        signature: 'With love from your future self'
      }
    },
    {
      template: 'Collage',
      data: {
        title: 'Pieces of My Childhood',
        items: [
          { type: 'photo', url: '/photos/tree-house.jpg' },
          { type: 'text', content: 'Saturday morning cartoons and cereal' },
          { type: 'photo', url: '/photos/school-photo.jpg' },
          { type: 'shape', color: '#F4D36B' },
          { type: 'text', content: 'The smell of fresh-cut grass' },
          { type: 'photo', url: '/photos/christmas-1966.jpg' }
        ]
      }
    }
  ]
};

/**
 * Helper function to create page data from story answers
 */
export function createScrapbookPageFromAnswer(
  question: string,
  answer: { answer: string; photos?: string[] },
  template: 'TornPaper' | 'QA' | 'TwoColumn',
  accentColor: string
): ScrapbookPageData {
  const hasPhotos = answer.photos && answer.photos.length > 0;

  if (template === 'TornPaper' && hasPhotos) {
    return {
      template: 'TornPaper',
      data: {
        question,
        answer: answer.answer,
        photo: answer.photos![0],
        accentColor
      }
    };
  }

  if (template === 'TwoColumn' && hasPhotos) {
    return {
      template: 'TwoColumn',
      data: {
        question,
        answer: answer.answer,
        photo: answer.photos![0],
        accentColor
      }
    };
  }

  return {
    template: 'QA',
    data: {
      question,
      answer: answer.answer,
      accentColor
    }
  };
}
