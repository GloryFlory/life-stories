# Life Story Book 📖

A beautiful digital "Life Story Book" web application where parents (Mom and Dad) can share their life stories with photos and memories.

## ✨ Features

- **Separate Books for Mom & Dad** - Each parent has their own dedicated story book
- **13 Life Chapters** - Organized themes covering different life stages with 95 thoughtful questions
- **Magic Link Authentication** - Secure, passwordless sign-in via email
- **Multi-language Support** - Available in English, German, and Italian
- **Photo Upload** - Share memories with images for each story
- **Beautiful Design** - Premium SaaS-style design with handwritten fonts
- **Mobile Optimized** - Swipe gestures, collapsible sidebar, responsive layout
- **Database Persistence** - Stories saved to PostgreSQL via Prisma ORM
- **Celebration Animations** - Rewarding experience when completing chapters

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn
- PostgreSQL database (Neon recommended)
- Resend account for email (free tier available)

### Installation

1. Clone and install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# Copy from .env.example or add manually
DATABASE_URL="your-neon-database-url"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
RESEND_API_KEY="your-resend-api-key"
EMAIL_FROM="Life Stories <onboarding@resend.dev>"
```

3. Run database migrations:
```bash
npx prisma migrate dev
```

4. Start the development server:
```bash
npm run dev
```

### Setting Up Authentication

See [AUTH_SETUP.md](./AUTH_SETUP.md) for detailed instructions on:
- Getting your Resend API key
- Configuring email sending
- Testing magic link authentication
- Production deployment

### Database Setup

See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for:
- Neon PostgreSQL configuration
- Schema details
- Migration commands

### Building for Production

Create an optimized production build:

```bash
npm run build
npm start
```

## 🎨 Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL (Neon serverless)
- **ORM**: Prisma
- **Authentication**: NextAuth.js v5 with magic links
- **Email**: Resend + React Email
- **Fonts**: Italiana (handwriting), Lora (serif)
- **UI**: React with Context API for state management

## 📁 Project Structure

```
├── prisma/
│   ├── schema.prisma                   # Database schema
│   └── migrations/                     # Database migrations
├── public/
│   └── life-stories-logo.png          # App logo
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Home page (parent selection)
│   │   ├── layout.tsx                  # Root layout
│   │   ├── [parent]/
│   │   │   ├── page.tsx                # Chapter selection
│   │   │   ├── [chapter]/
│   │   │   │   └── page.tsx            # Story questions
│   │   │   └── gallery/
│   │   │       └── page.tsx            # Photo gallery
│   │   ├── auth/
│   │   │   └── signin/
│   │   │       └── page.tsx            # Sign-in page
│   │   └── api/
│   │       ├── auth/[...nextauth]/     # NextAuth endpoints
│   │       ├── books/                  # Book API routes
│   │       └── stories/                # Story API routes
│   ├── components/
│   │   ├── ChapterIcon.tsx             # SVG icons
│   │   └── LanguageSelector.tsx        # Language dropdown
│   ├── contexts/
│   │   └── LanguageContext.tsx         # i18n state
│   ├── emails/
│   │   └── magic-link.tsx              # Email template
│   └── lib/
│       ├── auth.ts                     # NextAuth config
│       ├── prisma.ts                   # Prisma client
│       ├── types.ts                    # TypeScript types
│       ├── translations.ts             # UI translations
│       └── questionTranslations.ts     # Question translations
├── AUTH_SETUP.md                       # Authentication guide
├── DATABASE_SETUP.md                   # Database guide
└── README.md                           # This file
```

## 🎯 How to Use

1. **Visit the App** - Go to http://localhost:3000
2. **Sign In** - Enter your email to receive a magic link
3. **Check Email** - Click the sign-in link (check spam if needed)
4. **Choose a Parent** - Select "Mom's Story" or "Dad's Story"
5. **Select Language** - Pick English, German, or Italian
6. **Pick a Chapter** - Choose a life stage to explore
7. **Answer Questions** - Navigate with swipe gestures or arrows
8. **Add Photos** - Upload images to accompany memories (coming soon)
9. **Save Stories** - Automatically saved to database
10. **Track Progress** - See completion status and celebrations

## 🔮 Roadmap

### ✅ Completed
- [x] 13 chapters with 95 questions
- [x] Multi-language support (EN/DE/IT)
- [x] Database integration (PostgreSQL + Prisma)
- [x] Magic link authentication
- [x] Mobile-responsive design
- [x] Celebration animations
- [x] Chapter progress tracking

### 🚧 In Progress
- [ ] Photo upload to cloud storage
- [ ] Connect UI to database API
- [ ] Gallery page functionality

### 📋 Planned
- [ ] Export to PDF
- [ ] Share stories with family
- [ ] Audio/video recording
- [ ] Timeline view
- [ ] Search functionality
- [ ] Email notifications
- [ ] Multi-user collaboration
- [ ] SaaS subscription features

## 💝 Purpose

This application recreates the beloved "I'd like to know your story" books in digital form, making it easier to share photos and create a lasting digital legacy for families.

## 📝 License

This is a personal family project.

---

Made with ❤️ for preserving family memories
