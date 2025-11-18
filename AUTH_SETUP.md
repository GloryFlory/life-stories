# Authentication Setup Guide

## Overview
Life Stories now uses NextAuth.js v5 with magic link authentication via email. Users receive a beautiful, branded email with a link to sign in - no password needed!

## What's Been Configured

### 1. Database Schema
- Added NextAuth tables: `Account`, `Session`, `VerificationToken`
- Updated `User` model with required fields for NextAuth
- Migration applied: `20251116212406_add_auth`

### 2. Authentication Flow
- **Magic Link Email**: Users enter their email and receive a sign-in link
- **Custom Email Template**: Beautiful branded email using the life-stories-logo.png
- **Protected Routes**: Middleware protects all pages except home and auth pages
- **Session Management**: Automatic session handling via NextAuth

### 3. Required Environment Variables

Add these to your `.env` file:

```env
# Database (already configured)
DATABASE_URL="your-neon-database-url"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="0CH8OV/oDgmwjheIi/49wLVWLtSguXNmzvTwuDLTXu8="

# Resend Email Service
RESEND_API_KEY="your-resend-api-key"
EMAIL_FROM="Life Stories <onboarding@resend.dev>"
```

## Getting Your Resend API Key

1. **Sign up for Resend** (free tier includes 100 emails/day)
   - Visit: https://resend.com
   - Sign up with your email
   - Verify your email address

2. **Get your API key**
   - Go to: https://resend.com/api-keys
   - Click "Create API Key"
   - Give it a name (e.g., "Life Stories Development")
   - Copy the API key (starts with `re_`)

3. **Add to .env**
   ```env
   RESEND_API_KEY="re_your_api_key_here"
   ```

4. **Configure sender domain (optional for production)**
   - For development: You can send from `onboarding@resend.dev`
   - For production: Add and verify your domain in Resend settings
   - Update `EMAIL_FROM` with your verified domain

## Testing Authentication

### Local Development

1. **Start the dev server**
   ```bash
   npm run dev
   ```

2. **Visit http://localhost:3000**
   - You'll see the home page with logo
   - Click "Send Magic Link" button
   - Enter your email address

3. **Check your email**
   - You should receive a beautiful branded email
   - Click the "Sign in to Life Stories" button
   - You'll be redirected back and signed in

4. **Access protected pages**
   - Once signed in, you can access /mom and /dad
   - Your session persists across browser refreshes
   - Click "Sign out" in the home page to log out

## File Structure

```
/src
  /app
    /api
      /auth
        /[...nextauth]
          route.ts          # NextAuth API endpoints
    /auth
      /signin
        page.tsx            # Sign-in page
  /emails
    magic-link.tsx          # Custom email template
  /lib
    auth.ts                 # NextAuth configuration
  middleware.ts             # Route protection
```

## How It Works

1. **User visits protected route** → middleware redirects to /auth/signin
2. **User enters email** → NextAuth creates verification token
3. **Email sent via Resend** → user receives magic link
4. **User clicks link** → NextAuth verifies token and creates session
5. **User redirected to home** → can now access all features

## Production Deployment

### Environment Variables for Production

When deploying to production (Vercel, etc.):

1. Update `NEXTAUTH_URL` to your production domain:
   ```env
   NEXTAUTH_URL="https://lifestories.app"
   ```

2. Verify your sending domain in Resend (recommended for production)

3. Update `EMAIL_FROM` once your domain is verified, otherwise continue using the Resend onboarding domain:
   ```env
   EMAIL_FROM="Life Stories <onboarding@resend.dev>"
   ```

4. Keep your `NEXTAUTH_SECRET` secure (never commit to git)

### Resend Production Setup

1. Add your domain in Resend dashboard
2. Add DNS records (SPF, DKIM) to verify domain
3. Wait for verification (usually < 30 minutes)
4. Test sending from your domain

## Customization

### Change Email Template

Edit `/src/emails/magic-link.tsx` to customize:
- Colors
- Text content
- Logo position
- Button styling

### Change Sign-in Page

Edit `/src/app/auth/signin/page.tsx` to customize:
- Page layout
- Form styling
- Success message
- Translations

### Modify Protected Routes

Edit `/src/middleware.ts` to:
- Add public routes
- Change redirect behavior
- Add custom auth logic

## Troubleshooting

### Email not arriving?
1. Check spam folder
2. Verify `RESEND_API_KEY` is correct
3. Check Resend logs: https://resend.com/logs
4. Verify sender address is allowed

### "Invalid session" errors?
1. Clear browser cookies
2. Verify `NEXTAUTH_SECRET` is set
3. Check database connection
4. Restart dev server

### Can't access pages after sign-in?
1. Check browser console for errors
2. Verify middleware.ts matcher pattern
3. Clear cookies and try again

## Security Notes

- Magic links expire after 24 hours (configurable)
- Tokens are single-use only
- All sessions stored in database
- HTTPS required in production
- Secrets should never be committed to git

## Next Steps

- Add user profile page
- Implement book/story ownership checks
- Add invitation system for family members
- Set up email notifications
- Add account settings page
