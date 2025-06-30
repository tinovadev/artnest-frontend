import { query } from '@/lib/db';
import { User } from '@/lib/ddl.type';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const res = await query(
      `SELECT * FROM users WHERE email = $1 LIMIT 1;`,
      [token.email]
    );

    if (res.rowCount === 0) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = res.rows[0] as User;
    // user.id = '76212565-6f9e-413e-abf7-59499196dfd8';
    const result = await query(
      `SELECT 
        artworks.id AS id,
        artworks.title AS title,
        artworks.image_url AS image, 
        artwork_license.created_at AS date,
        -- artwork_license 가 있으면 판매중, 없으면 보호중
        CASE
          WHEN artwork_license.id IS NOT NULL THEN 'for_sale'
          ELSE 'protected'
        END AS status,

        artworks.unit_price AS price,
        artworks.artist AS artist,
        artworks.currency AS currency,
        artworks.year AS year,
        artworks.medium AS medium,
        artworks.dimensions AS dimensions,
        artworks.edition AS edition,
        artworks.description AS description,
        artworks.created_at AS created_at,
        artworks.updated_at AS updated_at
      FROM artworks AS artworks
      FULL OUTER JOIN
        artwork_license ON artworks.id = artwork_license.artwork_id 
      WHERE 
        artworks.deleted_at IS NULL AND 
        artworks.user_id = $1
      ;`,
      [user.id]
    );

    const response = {
      protectedArtworks: result.rows.filter(row => row.status === 'protected'),
      forSaleArtworks: result.rows.filter(row => row.status === 'for_sale'),
    }

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error("API /api/me POST error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
