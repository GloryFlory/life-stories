export interface Chapter {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export interface Story {
  id: string;
  chapterId: string;
  question: string;
  answer?: string;
  photos?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type Parent = 'mom' | 'dad';

export const chapters: Chapter[] = [
  {
    id: 'roots',
    title: 'Roots & Family Background',
    icon: 'tree',
    description: 'Where you came from and the family that shaped you'
  },
  {
    id: 'childhood',
    title: 'Childhood (0–12)',
    icon: 'balloon',
    description: 'Your earliest years and foundational memories'
  },
  {
    id: 'teenage',
    title: 'Teenage Years',
    icon: 'sparkles',
    description: 'Coming of age, identity, and discovery'
  },
  {
    id: 'young-adult',
    title: 'Young Adulthood & Independence',
    icon: 'compass',
    description: 'Finding your path and stepping into the world'
  },
  {
    id: 'love',
    title: 'Love, Relationships & Marriage',
    icon: 'heart-pair',
    description: 'Finding your person and building a life together'
  },
  {
    id: 'wedding',
    title: 'Wedding or Commitment',
    icon: 'rings',
    description: 'The day you celebrated your commitment'
  },
  {
    id: 'parenthood',
    title: 'Parenthood & Family Life',
    icon: 'home',
    description: 'Raising children and creating a family'
  },
  {
    id: 'work',
    title: 'Work, Purpose & Passion',
    icon: 'briefcase',
    description: 'Your professional journey and calling'
  },
  {
    id: 'challenges',
    title: 'Challenges, Strength & Turning Points',
    icon: 'mountain',
    description: 'The hard times that shaped who you are'
  },
  {
    id: 'joy',
    title: 'Joy, Hobbies & Everyday Life',
    icon: 'sun',
    description: 'The passions and pleasures that bring you alive'
  },
  {
    id: 'lessons',
    title: 'Life Lessons, Beliefs & Looking Back',
    icon: 'book',
    description: 'Wisdom gained and reflections on your journey'
  },
  {
    id: 'messages',
    title: 'Messages for the Future',
    icon: 'feather',
    description: 'Words for your children and generations to come'
  },
  {
    id: 'photos',
    title: 'Photo Memories',
    icon: 'camera',
    description: 'Stories behind the pictures of your life'
  }
];

export const storyQuestions: Record<string, string[]> = {
  roots: [
    'Where and when were you born, and what was the atmosphere of your hometown?',
    'What is the earliest memory you have of your parents?',
    'What do you know about your grandparents or great-grandparents?',
    'What stories, traditions, or sayings were passed down through your family?',
    'Was there a family ritual, celebration, or routine that meant a lot to you?',
    'What three words best describe the family you were born into?',
    'What made your family unique, unusual, or charming in its own way?',
    'Who made you feel safe as a child, and how?'
  ],
  childhood: [
    'What is one of your happiest childhood memories?',
    'What did a normal day in your childhood look like—morning to evening?',
    'What was your favorite place to play or hide as a child?',
    'What foods, smells, or sounds instantly bring you back to your childhood?',
    'Who were the people who shaped your childhood in small or big ways?',
    'What was your favorite toy, game, or activity?',
    'Was there a moment when you got in trouble, and now you can laugh about it?',
    'What frightened you as a child, and how did you cope?',
    'What advice would you give the 7-year-old version of yourself?'
  ],
  teenage: [
    'What kind of teenager were you—quiet, rebellious, curious, social?',
    'Who were your closest friends, and what adventures did you share?',
    'What was school like for you? Any teachers who left a mark?',
    'What hobbies, clubs, or sports defined your teenage years?',
    'What songs, bands, or artists shaped your teenage identity?',
    'What was something you desperately wanted at that age?',
    'What\'s a teenage memory that still makes you smile?',
    'Was there a moment you felt misunderstood—or truly understood?',
    'What did you dream your adult life would look like back then?'
  ],
  'young-adult': [
    'What was your first home or apartment like?',
    'What did independence feel like during your early adulthood?',
    'What were your biggest dreams or fears in your twenties?',
    'What is a decision you made in early adulthood that changed your life?',
    'What adventures (big or small) shaped who you became?',
    'Did you go to university or training? What stands out from that time?',
    'Who were the important people or friendships in this phase?',
    'What was your relationship with money at that time?'
  ],
  love: [
    'How did you meet your partner, and what were your first impressions?',
    'What do you remember most vividly from the early days of your relationship?',
    'What was your first date like?',
    'When did you know they were "the one"?',
    'What small acts of love do you treasure the most?',
    'What values hold your relationship together?',
    'What challenges did you overcome as a couple?',
    'What is one funny, sweet, or unexpected memory from your relationship?',
    'What advice would you give about choosing or nurturing a loving partnership?'
  ],
  wedding: [
    'If you had a wedding or ceremony, what stands out from that day?',
    'What was the atmosphere or emotional tone of the celebration?',
    'What moment from that day still feels vivid to you?',
    'Was there anything that went "wrong" but became a great story?'
  ],
  parenthood: [
    'How did you feel when you found out you were going to be a parent?',
    'Describe the day each child came into your life.',
    'What surprised you most about being a parent?',
    'What were some favorite family routines you created?',
    'What did you find challenging in parenting, and what helped you?',
    'What did you learn about yourself through becoming a parent?',
    'What values did you hope to teach your children?',
    'What\'s one of your funniest parenting stories?',
    'What\'s one of your most tender parenting memories?'
  ],
  work: [
    'What was your first job, and how did it shape you?',
    'What professional moment are you most proud of?',
    'What part of your work brought you meaning or joy?',
    'Did you ever feel called in a particular direction?',
    'What were your mentors like?',
    'What did you learn about leadership, teamwork, or responsibility?',
    'What is a work challenge that taught you something important?',
    'If you could go back, would you choose the same career path? Why or why not?'
  ],
  challenges: [
    'What was one of the hardest periods of your life?',
    'How did you get through it—what helped you survive, grow, or adapt?',
    'Was there a moment you realized, "I need to change something"?',
    'What\'s something you once thought was a disaster but became a blessing?',
    'What have your struggles taught you about strength, resilience, or identity?',
    'If you could comfort your past self during a hard time, what would you say?'
  ],
  joy: [
    'What hobbies or passions have brought you the most joy?',
    'What\'s a simple everyday pleasure that always lifts your mood?',
    'What do you do when you want to unwind or feel grounded?',
    'What activity makes you lose track of time?',
    'Have your hobbies changed over time? What stayed? What faded?',
    'What\'s something you always wanted to try but haven\'t yet?'
  ],
  lessons: [
    'What values or principles guided you most strongly in life?',
    'What is the best advice you ever received?',
    'What belief have you changed over the years?',
    'What are you most grateful for at this stage of your life?',
    'What are you proudest of when you look back?',
    'What would you tell your younger self?',
    'What do you hope future generations will remember about you?',
    'What does a "good life" mean to you now?'
  ],
  messages: [
    'Write a message for your children, grandchildren, or future family.',
    'What wisdom do you want to pass down?',
    'What dreams do you have for the people who will come after you?',
    'What is something you\'ve never really said out loud but want to share here?'
  ],
  photos: [
    'Choose a photo from your childhood and tell its story.',
    'Share a photo that makes you smile every time you see it.',
    'Upload a photo from a turning point in your life.',
    'Choose a photo with someone you\'ll never forget.',
    'Share a photo that represents a proud moment.',
    'Upload a photo from a place that holds special meaning.',
    'Choose a photo that shows you doing what you love.',
    'Share a photo from a time of unexpected joy.',
    'Upload a photo that reminds you of home.',
    'Choose a photo that tells a story without words.',
    'Share a photo from an adventure or journey.',
    'Upload a photo that captures a tradition or celebration.',
    'Choose a photo that shows love in action.',
    'Share a photo from a "before and after" moment in your life.',
    'Upload a photo that represents who you are today.'
  ]
};
