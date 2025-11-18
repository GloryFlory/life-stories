# Database Setup Instructions

## 1. Create Neon Account & Database

1. Go to https://neon.tech
2. Sign up for free account
3. Create a new project called "life-stories"
4. Copy the connection string (should look like: `postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require`)

## 2. Configure Environment Variables

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add your database URL:

```env
DATABASE_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require"
```

## 3. Run Database Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Create the database tables
npx prisma migrate dev --name init

# Optional: Open Prisma Studio to view your database
npx prisma studio
```

## 4. What's Next?

Once the database is set up, I'll:
- Create API routes for saving/loading stories
- Add photo upload to cloud storage (Cloudinary/UploadThing)
- Update the UI to persist data
- Add authentication (NextAuth.js)

## Database Schema Overview

**User** - Each user account
- email, name

**Book** - Each parent's life story book (mom/dad)
- Belongs to a user
- Has a language setting

**Story** - Individual question answers
- Belongs to a book and chapter
- Contains the answer text

**Photo** - Uploaded images
- Belongs to a book
- Can be attached to a specific story
- Stored URL and optional caption

## Neon Benefits

✅ **Free tier**: 0.5 GB storage, unlimited reads
✅ **Auto-scaling**: Scales to zero when not in use
✅ **Database branching**: Create dev/staging databases
✅ **Connection pooling**: Built-in for serverless
✅ **Backups**: Automatic daily backups

## Need Help?

Run these commands to check your setup:
```bash
# Check Prisma version
npx prisma --version

# Validate schema
npx prisma validate

# View current database state
npx prisma db pull
```
