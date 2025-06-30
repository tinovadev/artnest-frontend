import { query } from "@/lib/db";
import { ProtectedArtworksGetDto } from "@/lib/dto/protected-artworks/get";
import { getServerSession } from "next-auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { QueryResult } from "pg";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.dbId;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchHistoryText = `
    SELECT * FROM artworks
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;

  const response: QueryResult<ProtectedArtworksGetDto> = await query(
    searchHistoryText,
    [userId],
  );

  return NextResponse.json({
    success: true,
    result: response.rows,
  });
}

export async function POST() {
  return new NextResponse("Method Not Allowed", {
    status: 405,
    headers: { Allow: "GET" },
  });
}
