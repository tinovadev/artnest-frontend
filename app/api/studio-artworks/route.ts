import { studioArtworks } from '@/data/studio-artworks';
import { query } from '@/lib/db';
import { Artwork } from '@/lib/ddl.type';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const result = await query(`SELECT * FROM artworks`);
    if (!result || result.rows.length === 0) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const studioArtworks = result.rows.map((artwork: Artwork) => ({
      id: artwork.id,
      title: artwork.title,
      price: artwork.unit_price ?? 0,
      image: artwork.image_url,
      artist: artwork.artist,
      category: artwork.medium,
    }));

    return NextResponse.json(studioArtworks);
  } catch (error) {
    throw new Error(`Failed to fetch artworks: ${error}`);
  }
}

export async function POST() {
  return new NextResponse('Method Not Allowed', {
    status: 405,
    headers: { Allow: 'GET' },
  });
}
