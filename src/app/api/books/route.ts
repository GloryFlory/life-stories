import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/books?userId=xxx&parent=mom
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const parent = searchParams.get('parent');

    if (!userId || !parent) {
      return NextResponse.json(
        { error: 'userId and parent are required' },
        { status: 400 }
      );
    }

    const book = await prisma.book.findUnique({
      where: {
        userId_parent: {
          userId,
          parent,
        },
      },
      include: {
        stories: {
          include: {
            photos: true,
          },
        },
      },
    });

    return NextResponse.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    return NextResponse.json({ error: 'Failed to fetch book' }, { status: 500 });
  }
}

// POST /api/books
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, parent, language = 'en' } = body;

    if (!userId || !parent) {
      return NextResponse.json(
        { error: 'userId and parent are required' },
        { status: 400 }
      );
    }

    const book = await prisma.book.upsert({
      where: {
        userId_parent: {
          userId,
          parent,
        },
      },
      update: {
        language,
      },
      create: {
        userId,
        parent,
        language,
      },
    });

    return NextResponse.json(book);
  } catch (error) {
    console.error('Error creating book:', error);
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
  }
}
