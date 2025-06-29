import { query } from '@/lib/db';
import { User } from '@/lib/ddl.type';
import { camelToSnake } from '@/lib/utils';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


// ?? ME 써도 될듯
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
    delete user.deleted_at;
    delete user.algo_address;
    delete user.algo_private_key;
    return NextResponse.json(camelToSnake(user), { status: 200 });

  } catch (error) {
    console.error("API /api/me POST error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
