import { query } from '@/lib/db';
import { User } from '@/lib/ddl.type';
import { camelToSnake } from '@/lib/utils';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await query(`SELECT * FROM users WHERE email = $1 LIMIT 1;`, [
      token.email,
    ]);

    if (res.rowCount === 0) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = res.rows[0] as User;
    delete user.algo_private_key;
    delete user.deleted_at;
    delete user.status;

    const data = camelToSnake(user);

    return NextResponse.json(data, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("API /api/me error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { artistName: artist_name, description: description } = body;

    if (!artist_name || !description) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const res = await query(
      `UPDATE users SET artist_name = $1, description = $2 WHERE email = $3 RETURNING *;`,
      [artist_name, description, token.email],
    );

    if (res.rowCount === 0) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = res.rows[0] as User;
    delete user.algo_private_key;
    delete user.deleted_at;
    delete user.status;

    return NextResponse.json(camelToSnake(user), { status: 200 });
  } catch (error) {
    console.error("API /api/me POST error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
