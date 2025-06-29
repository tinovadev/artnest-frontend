import { ArtworkDetails, artworkDetails } from '@/data/artwork-details';
import { query } from '@/lib/db';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const artworkId = req.nextUrl.searchParams.get('artworkId');
  if (!artworkId) {
    return NextResponse.json({ error: 'Artwork ID is required' }, { status: 400 });
  }

  const data = await query(`
    SELECT
      artworks.id AS artwork_id,
      artworks.year::TEXT,
      artworks.artist,
      artworks.dimensions,
      artworks.medium,
      artworks.edition,
      artworks.description,
      
      -- Artist Bio
      users.artist_name AS bio_title,
      ARRAY_REMOVE(ARRAY[
        'Username: ' || users.username,
        'Email: ' || users.email,
        'Portfolio: ' || users.portfolio_link,
        'File: ' || users.file_link
      ], NULL) AS bio_highlights,

      -- Royalty (??)
      0.05 AS royalty_price_per_use,
      'Standard royalty for training usage' AS royalty_description,

      -- License Permissions
      ARRAY_REMOVE(ARRAY[
        CASE WHEN artwork_license.ai_training_allowed THEN 'AI training allowed' ELSE NULL END,
        CASE WHEN artwork_license.commercial_use_allowed THEN 'Commercial use allowed' ELSE NULL END,
        CASE WHEN artwork_license.derivatives_allowed THEN 'Derivatives allowed' ELSE NULL END
      ], NULL) AS license_permissions,

      -- License Restrictions
      ARRAY_REMOVE(ARRAY[
        CASE WHEN NOT artwork_license.resale_use_allowed THEN 'Resale not allowed' ELSE NULL END
      ], NULL) AS license_restrictions,

      -- FileDetails (??)
      'PNG (high-res)' AS file_format,
      artworks.dimensions AS file_dimensions,
      '8.4MB' AS file_size,  -- 또는 추후 metadata 테이블로 관리
      TO_CHAR(copyright_protection.created_at, 'Month DD, YYYY') AS file_uploaded,
      'v1.0' AS file_version

    FROM artworks AS artworks
    LEFT JOIN copyright_protection AS copyright_protection ON copyright_protection.artwork_id = artworks.id
    LEFT JOIN users AS users ON users.id = artworks.user_id
    LEFT JOIN image_similarity AS image_similarity ON image_similarity.artwork_id = artworks.id
    LEFT JOIN artwork_license AS artwork_license ON artwork_license.artwork_id = artworks.id

    WHERE 
      artworks.id = $1 AND 
      artworks.deleted_at IS NULL;
  `, [artworkId]);

  if (!data || data.rows.length === 0) {
    return NextResponse.json({ error: 'Artwork not found' }, { status: 400 });
  }
  const artworkDetails = data.rows[0];
  const parsed: ArtworkDetails = toArtworkDetails(artworkDetails);
  return NextResponse.json(parsed);
}

export async function POST() {
  return new NextResponse('Method Not Allowed', {
    status: 405,
    headers: { Allow: 'GET' },
  });
}

function toArtworkDetails(raw: any): ArtworkDetails {
  return {
    artworkId: raw.artwork_id,
    year: raw.year,
    artist: raw.artist,
    dimensions: raw.dimensions,
    medium: raw.medium,
    edition: raw.edition,
    description: raw.description || 'No description available',
    artistBio: {
      title: raw.bio_title || '',
      highlights: raw.bio_highlights || [],
    },
    royalty: {
      pricePerUse: parseFloat(raw.royalty_price_per_use || '0'),
      description: raw.royalty_description || '',
    },
    license: {
      permissions: raw.license_permissions || [],
      restrictions: raw.license_restrictions || [],
    },
    fileDetails: {
      format: raw.file_format || '',
      dimensions: raw.file_dimensions || '',
      size: raw.file_size || '',
      uploaded: raw.file_uploaded || 'Unknown',
      version: raw.file_version || '',
    },
  };
}
