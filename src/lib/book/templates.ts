import { PageTemplate } from './types';

// Template A: Full page question + answer (no photo)
// Best for: Long, emotional stories
const templateA: PageTemplate = {
  id: 'template-a',
  name: 'Full Page Story',
  textBoxes: [
    { x: 0.1, y: 0.15, width: 0.8, height: 0.12, style: 'question', fontSize: 'large', align: 'center' },
    { x: 0.1, y: 0.32, width: 0.8, height: 0.58, style: 'answer', fontSize: 'medium', align: 'left' }
  ],
  maxTextLength: 1800,
  supportsPhoto: false
};

// Template B: Question + Answer with large photo
// Best for: Stories with one important photo
const templateB: PageTemplate = {
  id: 'template-b',
  name: 'Story with Large Photo',
  textBoxes: [
    { x: 0.1, y: 0.1, width: 0.8, height: 0.1, style: 'question', fontSize: 'large', align: 'left' },
    { x: 0.1, y: 0.58, width: 0.8, height: 0.32, style: 'answer', fontSize: 'medium', align: 'left' }
  ],
  photoBox: { x: 0.1, y: 0.23, width: 0.8, height: 0.3, style: 'rounded' },
  maxTextLength: 900,
  supportsPhoto: true
};

// Template C: Two column text (no photo)
// Best for: Medium-length stories that benefit from magazine-style layout
const templateC: PageTemplate = {
  id: 'template-c',
  name: 'Two Column Story',
  textBoxes: [
    { x: 0.1, y: 0.12, width: 0.8, height: 0.1, style: 'question', fontSize: 'large', align: 'left' },
    { x: 0.1, y: 0.26, width: 0.38, height: 0.64, style: 'answer', fontSize: 'medium', align: 'left' },
    { x: 0.52, y: 0.26, width: 0.38, height: 0.64, style: 'answer', fontSize: 'medium', align: 'left' }
  ],
  maxTextLength: 1400,
  supportsPhoto: false
};

// Template D: Photo top, text bottom
// Best for: Short stories with a key photo
const templateD: PageTemplate = {
  id: 'template-d',
  name: 'Photo Above Story',
  textBoxes: [
    { x: 0.1, y: 0.52, width: 0.8, height: 0.08, style: 'question', fontSize: 'large', align: 'left' },
    { x: 0.1, y: 0.63, width: 0.8, height: 0.27, style: 'answer', fontSize: 'medium', align: 'left' }
  ],
  photoBox: { x: 0.1, y: 0.1, width: 0.8, height: 0.38, style: 'full-bleed' },
  maxTextLength: 700,
  supportsPhoto: true
};

// Template E: Side-by-side photo and text
// Best for: Balanced story with photo
const templateE: PageTemplate = {
  id: 'template-e',
  name: 'Side by Side',
  textBoxes: [
    { x: 0.52, y: 0.12, width: 0.38, height: 0.1, style: 'question', fontSize: 'large', align: 'left' },
    { x: 0.52, y: 0.26, width: 0.38, height: 0.64, style: 'answer', fontSize: 'medium', align: 'left' }
  ],
  photoBox: { x: 0.1, y: 0.12, width: 0.38, height: 0.78, style: 'rounded' },
  maxTextLength: 900,
  supportsPhoto: true
};

// Template F: Chapter opener
// Best for: Chapter introductions
const templateF: PageTemplate = {
  id: 'template-f',
  name: 'Chapter Opener',
  textBoxes: [
    { x: 0.1, y: 0.65, width: 0.8, height: 0.2, style: 'chapter-title', fontSize: 'large', align: 'center' }
  ],
  photoBox: { x: 0.15, y: 0.12, width: 0.7, height: 0.45, style: 'rounded' },
  maxTextLength: 100,
  supportsPhoto: true
};

// Template G: Compact story (short answer)
// Best for: Brief memories
const templateG: PageTemplate = {
  id: 'template-g',
  name: 'Brief Memory',
  textBoxes: [
    { x: 0.1, y: 0.25, width: 0.8, height: 0.12, style: 'question', fontSize: 'large', align: 'center' },
    { x: 0.15, y: 0.42, width: 0.7, height: 0.35, style: 'answer', fontSize: 'medium', align: 'center' }
  ],
  maxTextLength: 600,
  supportsPhoto: false
};

// Template H: Three text boxes (for very long stories)
// Best for: Lengthy narratives
const templateH: PageTemplate = {
  id: 'template-h',
  name: 'Extended Story',
  textBoxes: [
    { x: 0.1, y: 0.1, width: 0.8, height: 0.08, style: 'question', fontSize: 'large', align: 'left' },
    { x: 0.1, y: 0.21, width: 0.8, height: 0.35, style: 'answer', fontSize: 'medium', align: 'left' },
    { x: 0.1, y: 0.59, width: 0.8, height: 0.31, style: 'answer', fontSize: 'medium', align: 'left' }
  ],
  maxTextLength: 2200,
  supportsPhoto: false
};

export const templates: PageTemplate[] = [
  templateA,
  templateB,
  templateC,
  templateD,
  templateE,
  templateF,
  templateG,
  templateH
];

// Helper to get template by ID
export function getTemplate(id: string): PageTemplate | undefined {
  return templates.find(t => t.id === id);
}

// Helper to choose best template based on story characteristics
export function chooseBestTemplate(
  answerLength: number,
  hasPhoto: boolean
): PageTemplate {
  // If has photo, prefer photo templates
  if (hasPhoto) {
    if (answerLength < 700) return templateD;      // Photo top
    if (answerLength < 900) return templateB;      // Large photo
    return templateE;                               // Side by side
  }
  
  // No photo - choose based on length
  if (answerLength < 600) return templateG;        // Brief
  if (answerLength < 1400) return templateC;       // Two column
  if (answerLength < 1800) return templateA;       // Full page
  return templateH;                                 // Extended
}
