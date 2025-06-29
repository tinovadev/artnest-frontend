import { protectedArtworkDetails } from "@/data/protected-artwork-details";
import { query } from "@/lib/db";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json(protectedArtworkDetails);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const result = await query(
      `
      INSERT INTO artworks (
        user_id, title, artist, year, medium, dimensions, edition, description, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW()
      ) RETURNING *
      `,
      [
        process.env.USERID,
        body.title,
        body.artist,
        body.year,
        body.medium,
        body.dimensions,
        body.edition,
        body.description,
      ],
    );

    return NextResponse.json({ success: true, result: result.rows });
  } catch (error) {
    console.error("DB INSERT 실패:", error);
    return NextResponse.json(
      { success: false, error: "DB 저장 실패" },
      { status: 500 },
    );
  }
}
