import { protectedArtworkDetails } from "@/data/protected-artwork-details";
import { query } from "@/lib/db";
import { CreateArtworkDto } from '@/lib/dto/ai-learning-off/post';
import { ArtworksModel } from "@/lib/model/artworks.model";
import { ArtworkBody } from "@/lib/types/ai-learning-off";
import { ApiResponse } from "@/lib/types/global";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { QueryResult } from "pg";

export async function GET(request: NextRequest) {
  return NextResponse.json(protectedArtworkDetails);
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ApiResponse<ArtworksModel>>> {
  const body: ArtworkBody = await request.json();

  try {
    const insertText = `
      INSERT INTO artworks (
        user_id, title, artist, year, medium, dimensions, edition, description, image_url, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW()
      ) RETURNING *
    `;

    const response: QueryResult<CreateArtworkDto> = await query(insertText, [
      process.env.USERID,
      body.title,
      body.artist,
      body.year,
      body.medium,
      body.dimensions,
      body.edition,
      body.description,
      body.imageUrl,
    ]);

    return NextResponse.json({ success: true, result: response.rows });
  } catch (error) {
    console.error("DB INSERT 실패:", error);
    return NextResponse.json(
      { success: false, error: "DB 저장 실패" },
      { status: 500 },
    );
  }
}
