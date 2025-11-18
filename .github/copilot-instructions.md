# Life Story Book - Project Instructions

## Project Overview
Digital "Life Story Book" web application where parents (Mom and Dad) can share their life stories with photos.

## Technology Stack
- Next.js 16 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- React for UI components
- Photo upload capability

## Features
- Separate books for Mom and Dad
- 8 organized life chapters (childhood, teenage years, career, family life, etc.)
- Photo upload for each story/memory
- Pre-written thoughtful questions to inspire storytelling
- Easy navigation between sections
- Responsive design for desktop and tablets
- Warm, beautiful interface with serif typography

## Project Structure
- `/src/app/page.tsx` - Home page with parent selection
- `/src/app/[parent]/page.tsx` - Chapter selection for mom/dad
- `/src/app/[parent]/[chapter]/page.tsx` - Story questions and answers
- `/src/lib/types.ts` - Type definitions and story data

## Development Guidelines
- Use TypeScript for type safety
- Follow React best practices
- Keep components modular and reusable
- Ensure responsive design for all screen sizes
- Maintain clean, readable code with proper comments
- Use Tailwind CSS utility classes for styling
- Keep the design warm and inviting for family use

## Current Status
✅ Project scaffolded and configured
✅ Core pages and navigation implemented
✅ Chapter and question structure defined
✅ Photo upload UI created
✅ Development server running on port 3000
✅ Documentation completed

## Running the Project
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
```

## Next Steps (Future Enhancements)
- Add database integration for persistent storage
- Implement user authentication
- Add export to PDF feature
- Enable sharing with family members
- Support audio/video recordings
