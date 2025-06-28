import { artworkDetails } from '@/data/artwork-details';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json(artworkDetails);
}

export async function POST() {
  return new NextResponse('Method Not Allowed', {
    status: 405,
    headers: { Allow: 'GET' },
  });
}

