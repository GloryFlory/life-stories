import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/stories?bookId=xxx&chapterId=xxx
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bookId = searchParams.get('bookId');
    const chapterId = searchParams.get('chapterId');

    if (!bookId) {
      return NextResponse.json({ error: 'bookId is required' }, { status: 400 });
    }

    const where: any = { bookId };
    if (chapterId) {
      where.chapterId = chapterId;
    }

    const stories = await prisma.story.findMany({
      where,
      include: {
        photos: true,
      },
      orderBy: {
        questionIndex: 'asc',
      },
    });

    return NextResponse.json(stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    return NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 });
  }
}

// POST /api/stories
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookId, chapterId, questionIndex, answer } = body;

    if (!bookId || !chapterId || questionIndex === undefined || !answer) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const story = await prisma.story.upsert({
      where: {
        bookId_chapterId_questionIndex: {
          bookId,
          chapterId,
          questionIndex,
        },
      },
      update: {
        answer,
      },
      create: {
        bookId,
        chapterId,
        questionIndex,
        answer,
      },
    });

    return NextResponse.json(story);
  } catch (error) {
    console.error('Error saving story:', error);
    return NextResponse.json({ error: 'Failed to save story' }, { status: 500 });
  }
}
