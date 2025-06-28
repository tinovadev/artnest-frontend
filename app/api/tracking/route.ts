import { query } from "@/lib/db";
import { ApiResponse, Artwork } from "@/lib/types";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { QueryResult } from "pg";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<ApiResponse<Artwork>>> {
  try {
    const userId = "37b5571d-1049-4f7a-b8a1-486c5bcacbe6";
    const searchText = `SELECT * FROM artworks WHERE user_id = $1;`;

    const response: QueryResult<Artwork> = await query(searchText, [userId]);

    return NextResponse.json({ success: true, result: response.rows });
  } catch (error) {
    console.error("DB SELECT 실패:", error);
    return NextResponse.json(
      { success: false, error: "DB 조회 실패" },
      { status: 500 },
    );
  }
}
