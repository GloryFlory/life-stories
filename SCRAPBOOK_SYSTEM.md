# Life Story Book - Scrapbook System Documentation

## 🎨 System Overview

The scrapbook system transforms the Life Story Book into a warm, handcrafted experience with layered textures, mixed fonts, imperfect alignment, and a storybook aesthetic.

### Architecture

```
src/
├── components/book/          # All scrapbook UI components
│   ├── ScrapbookPage.tsx    # Main page wrapper
│   ├── ChapterOpener.tsx    # Chapter title pages
│   ├── TemplateA-H.tsx      # 8 page templates
│   └── index.ts             # Component exports
│
├── lib/scrapbook/           # Utilities and data
│   ├── chapterMetadata.ts   # Chapter colors, quotes, themes
│   ├── templateUtils.ts     # Selection, randomization, helpers
│   └── exampleData.ts       # Example JSON structures
│
└── app/scrapbook-demo/      # Live template showcase
    └── page.tsx
```

## 🎨 Color Palette

Defined in `tailwind.config.ts` under `scrapbook.*`:

### Primary Colors
- **cream** (`#FFF7EB`) - Warm background
- **blush** (`#F3D7D1`) - Soft pink accent
- **sage** (`#C9D5C0`) - Dusty green
- **cornflower** (`#94A9D1`) - Gentle blue
- **gray** (`#5E5E5E`) - Pencil gray for text
- **brown** (`#A0835F`) - Warm soil brown

### Accent Colors
- **yellow** (`#F4D36B`) - Sunny highlights
- **berry** (`#B65A5A`) - Deep red
- **lavender** (`#C7B7E5`) - Purple accent

### Usage
```tsx
<div className="bg-scrapbook-cream text-scrapbook-gray">
  <h1 className="text-scrapbook-berry">Title</h1>
</div>
```

## 🔠 Typography System

### Fonts (Google Fonts)
- **Serif**: Cormorant Garamond (400, 600, 700) - `font-serif`
- **Handwriting**: Patrick Hand (400) - `font-handwriting`
- **Sans**: Inter (variable) - `font-sans`

### Utility Classes
```tsx
<h1 className="font-serif text-2xl font-bold">Elegant Title</h1>
<p className="font-handwriting text-lg">Handwritten Note</p>
<span className="font-sans text-sm">Clean Caption</span>
```

## 📐 Component Guide

### ScrapbookPage (Wrapper)

Main container for all scrapbook pages. Provides:
- Themed backgrounds
- Paper texture overlays
- Watercolor effects
- Print-safe layout

```tsx
<ScrapbookPage theme="warm" showTexture={true}>
  {/* Your content */}
</ScrapbookPage>
```

**Props:**
- `theme`: `'warm' | 'cool' | 'earth' | 'soft'`
- `showTexture`: boolean (default: true)
- `className`: additional CSS classes

### ChapterOpener

Decorative chapter introduction page.

```tsx
<ChapterOpener
  chapterNumber={2}
  chapterTitle="Childhood Memories"
  chapterIcon="🎈"
  accentColor="#F4D36B"
  secondaryColor="#FFF7EB"
  quote="Childhood is the most beautiful of all life's seasons."
/>
```

## 📄 Template Catalog

### Template A: Torn Paper Story Page

**Best for:** Long-form stories with optional photo

**Features:**
- Large serif text
- Torn paper clip-path effect
- Corner-taped photo
- Handwritten annotation

```tsx
<TemplateATornPaper
  question="What is your earliest memory?"
  answer="Long story text..."
  photo="/path/to/photo.jpg"
  annotation="Summer 1965"
  accentColor="#F4D36B"
/>
```

### Template B: Polaroid Gallery

**Best for:** Multiple photos (3-5 ideal)

**Features:**
- Polaroid-style frames
- Random rotation (-2° to +2°)
- Handwritten captions
- Tape accents

```tsx
<TemplateBPolaroidGallery
  question="Favorite Memories"
  photos={[
    { url: '/photo1.jpg', caption: '5th birthday' },
    { url: '/photo2.jpg', date: '1963' }
  ]}
  accentColor="#B65A5A"
/>
```

### Template C: Life Timeline

**Best for:** Sequential events, milestones

**Features:**
- Horizontal timeline
- Icon support (emoji or custom)
- Watercolor background
- Year markers

```tsx
<TemplateCTimeline
  question="Major Life Events"
  events={[
    { year: '1958', title: 'Born', icon: '👶' },
    { year: '1963', title: 'School', icon: '📚' }
  ]}
  accentColor="#94A9D1"
  secondaryColor="#C7B7E5"
/>
```

### Template D: Quote Page

**Best for:** Inspirational quotes, reflections

**Features:**
- Large centered layout
- Watercolor circle background
- Decorative quotation marks
- Optional author attribution

```tsx
<TemplateDQuote
  quote="Life is what happens when you're busy making other plans."
  author="John Lennon"
  accentColor="#A0835F"
  secondaryColor="#C9D5C0"
/>
```

### Template E: Q&A Scrap Page

**Best for:** Question-answer format

**Features:**
- Handwritten question with underline
- Serif answer text
- Sticky note element
- Decorative doodles

```tsx
<TemplateEQA
  question="What games did you play?"
  answer="We played outside from sunrise to sunset..."
  stickyNote="Remember: simpler times"
  accentColor="#F4D36B"
/>
```

### Template F: Two-Column Memory

**Best for:** Story with single featured photo

**Features:**
- Text column on left
- Taped photo on right
- Washi tape decoration
- Photo caption support

```tsx
<TemplateFTwoColumn
  question="Who was your best friend?"
  answer="Sarah lived three houses down..."
  photo="/sarah.jpg"
  photoCaption="Sarah and me, age 8"
  accentColor="#B65A5A"
/>
```

### Template G: Letter Page

**Best for:** Personal letters, messages

**Features:**
- Lined paper effect
- Handwritten greeting
- Serif body text
- Signature with heart doodle

```tsx
<TemplateGLetter
  greeting="Dear Little Me,"
  content="Those scraped knees tell stories of bravery..."
  signature="With love from your future self"
  accentColor="#F3D7D1"
/>
```

### Template H: Final Collage

**Best for:** Chapter endings, emotional summaries

**Features:**
- Overlapping elements
- Photos, text, shapes
- Tape and shadow effects
- Organic composition

```tsx
<TemplateHCollage
  title="Pieces of My Childhood"
  items={[
    { type: 'photo', url: '/photo.jpg' },
    { type: 'text', content: 'Saturday cartoons' },
    { type: 'shape', color: '#F4D36B' }
  ]}
  accentColor="#C7B7E5"
  secondaryColor="#FFF7EB"
/>
```

## 🛠️ Utility Functions

### Chapter Metadata

```typescript
import { 
  getChapterMetadata, 
  getQuoteForChapter, 
  getChapterAccentColor 
} from '@/lib/scrapbook/chapterMetadata';

const metadata = getChapterMetadata('childhood');
// { accentColor, secondaryColor, quotes, theme }

const quote = getQuoteForChapter('childhood');
// Returns random quote from chapter's quote array

const color = getChapterAccentColor('teenage');
// Returns '#94A9D1' (cornflower blue)
```

### Template Selection

```typescript
import { 
  selectRandomTemplate, 
  applyScrapOffset, 
  getTapeRotation 
} from '@/lib/scrapbook/templateUtils';

// Smart template selection based on content
const template = selectRandomTemplate(
  'childhood',    // chapterId
  true,           // hasPhotos
  3               // questionCount
);

// Random offset for imperfect alignment
const offset = applyScrapOffset('medium');
// Returns { transform: '...', transition: '...' }

// Tape rotation (-3° to +3°)
const rotation = getTapeRotation();
```

## 📊 Example Data Structure

```json
{
  "chapterId": "childhood",
  "chapterTitle": "Childhood Memories",
  "chapterIcon": "🎈",
  "accentColor": "#F4D36B",
  "secondaryColor": "#FFF7EB",
  "quote": "Childhood is the most beautiful of all life's seasons.",
  "pages": [
    {
      "template": "TornPaper",
      "data": {
        "question": "What is your earliest memory?",
        "answer": "I remember the old oak tree...",
        "photo": "/photos/oak-tree.jpg",
        "annotation": "My favorite spot, summer 1965"
      }
    },
    {
      "template": "PolaroidGallery",
      "data": {
        "question": "Favorite Photos",
        "photos": [
          { "url": "/photo1.jpg", "caption": "5th birthday" }
        ]
      }
    }
  ]
}
```

## 🎯 Integration Guide

### Adding to Existing Story Export

```tsx
import { ScrapbookPage, TemplateEQA } from '@/components/book';
import { getChapterMetadata } from '@/lib/scrapbook/chapterMetadata';

function StoryPage({ chapterId, question, answer }) {
  const metadata = getChapterMetadata(chapterId)!;
  
  return (
    <ScrapbookPage theme={metadata.theme}>
      <TemplateEQA
        question={question}
        answer={answer}
        accentColor={metadata.accentColor}
      />
    </ScrapbookPage>
  );
}
```

## 🎨 Design Principles

1. **Imperfection is Beauty**: Use `applyScrapOffset()` for slight randomness
2. **Layering**: Tape, shadows, and textures create depth
3. **Mixed Typography**: Combine serif, handwriting, and sans fonts
4. **Warm Colors**: Prioritize cream, blush, and earth tones
5. **White Space**: Don't overcrowd pages
6. **Print-Safe**: All components work in print media queries

## 🚀 Live Demo

Visit `/scrapbook-demo` to see all templates in action with example data.

## 📝 Chapter Themes

Each chapter has a theme that affects watercolor backgrounds:

- **warm**: Childhood, Joy, Young Adult (yellow/cream)
- **cool**: Teenage, Career, Lessons (blue/lavender)
- **earth**: Roots, Parent, Challenges (brown/sage)
- **soft**: Love Story, Wedding, Messages (blush/lavender)

## 🎭 CSS Classes

All scrapbook-specific Tailwind classes:

### Colors
- `bg-scrapbook-{cream|blush|sage|cornflower|gray|brown|yellow|berry|lavender}`
- `text-scrapbook-*`

### Shadows
- `shadow-tape` - Light tape shadow
- `shadow-polaroid` - Medium photo shadow
- `shadow-paper` - Strong paper shadow
- `shadow-soft` - Subtle soft shadow

### Backgrounds
- `bg-watercolor-{warm|cool|earth|soft}` - Themed watercolor washes
- `bg-paper-texture` - Subtle noise texture

### Rotation
- `rotate-{1|2|-1|-2}` - Small rotation values for imperfection

---

**Created for Life Story Book** - A warm, emotional scrapbook system for preserving family memories.
