import { query } from '@/lib/db';
import { User } from '@/lib/ddl.type';
import { camelToSnake } from '@/lib/utils';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await req.json();
    const { fullName: fullname, artistName: artist_name, description, portfolioLink, file } = body;
    if (!fullname || !artist_name || !description || !portfolioLink) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const res = await query(
      `UPDATE users SET fullname = $1, artist_name = $2, description = $3, portfolio_link = $4, file_link = $5 WHERE email = $6;`,
      [fullname, artist_name, description, portfolioLink, file || null, token.email]
    );

    if (res.rowCount === 0) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    return NextResponse.json(
        { message: 'Artist verification request submitted successfully' },
        { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );

  } catch (error) {
    console.error("API /api/me POST error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
