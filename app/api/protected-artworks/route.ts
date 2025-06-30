import { query } from "@/lib/db";
import { ProtectedArtworksGetDto } from "@/lib/dto/protected-artworks/get";
import { getServerSession } from "next-auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { QueryResult } from "pg";
import { authOptions } from "../auth/[...nextauth]/route";
import { getToken } from "next-auth/jwt";
import { User } from "@/lib/ddl.type";

export async function GET(req: NextRequest) {
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

    const searchHistoryText = `
      SELECT * FROM artworks
      WHERE user_id = $1
      ORDER BY created_at DESC
    `;

  const response: QueryResult<ProtectedArtworksGetDto> = await query(
    searchHistoryText,
    [user.id],
  );

  return NextResponse.json(response.rows);
}

export async function POST() {
  return new NextResponse("Method Not Allowed", {
    status: 405,
    headers: { Allow: "GET" },
  });
}
