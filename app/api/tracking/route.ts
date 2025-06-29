import { query } from "@/lib/db";
import {
  TrackingArtworkDto,
  TrackingArtworkHistoryDto,
} from "@/lib/dto/tracking/get";
import { ApiResponse } from "@/lib/types/global";
import { TrackingArtwork } from "@/lib/types/track";
import { formatDateToDotFormat } from "@/lib/utils";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { QueryResult } from "pg";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<ApiResponse<TrackingArtwork>>> {
  try {
    const searchText = `
    SELECT DISTINCT ON (ah.artwork_id)
      ah.id,
      ah.artwork_id,
      a.title,
      a.image_url,
      ah.created_at,
      ah.status
    FROM artwork_tracking_history ah
    JOIN artworks a ON a.id = ah.artwork_id
    WHERE ah.user_id = $1
    ORDER BY ah.artwork_id, ah.created_at DESC;
    `;

    const response: QueryResult<TrackingArtworkDto> = await query(searchText, [
      process.env.USERID,
    ]);

    const results: TrackingArtwork[] = response.rows.map((row) => ({
      id: row.id,
      artworkId: row.artwork_id,
      title: row.title,
      image: row.image_url,
      latestDate: formatDateToDotFormat(row.created_at),
      status: row.status,
    }));

    return NextResponse.json({ success: true, result: results });
  } catch (error) {
    console.error("DB SELECT 실패:", error);
    return NextResponse.json(
      { success: false, error: "DB 조회 실패" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ApiResponse<TrackingArtworkHistoryDto>>> {
  try {
    const body = await request.json();

    const insertText = `
    INSERT INTO artwork_tracking_history (
      id, user_id, artwork_id, status, created_at 
    ) VALUES (
      gen_random_uuid(), $1, $2, $3, NOW()
    ) RETURNING status
    `;

    const response: QueryResult<TrackingArtworkHistoryDto> = await query(
      insertText,
      [process.env.USERID, body.artworkId, body.newStatus],
    );

    return NextResponse.json({ success: true, result: response.rows });
  } catch (error) {
    console.error("DB SELECT 실패:", error);
    return NextResponse.json(
      { success: false, error: "DB 입력 실패" },
      { status: 500 },
    );
  }
}
