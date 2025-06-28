import { forSaleArtworks } from '@/data/for-sale-artworks';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json(forSaleArtworks);
}

export async function POST() {
  return new NextResponse('Method Not Allowed', {
    status: 405,
    headers: { Allow: 'GET' },
  });
}

