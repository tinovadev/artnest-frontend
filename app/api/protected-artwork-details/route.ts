import { protectedArtworkDetails } from "@/data/protected-artwork-details";
import { query } from "@/lib/db";
import { CreateArtworkDto } from "@/lib/dto/ai-learning-off/post";
import { ArtworksModel } from "@/lib/model/artworks.model";
import { ArtworkBody } from "@/lib/types/ai-learning-off";
import { ApiResponse } from "@/lib/types/global";
import { getServerSession } from "next-auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { QueryResult } from "pg";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  return NextResponse.json(protectedArtworkDetails);
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ApiResponse<ArtworksModel>>> {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.dbId;

  if (!userId) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  //
  const body: ArtworkBody = await request.json();

  try {
    const insertText = `
      INSERT INTO artworks (
        user_id, title, artist, year, medium, dimensions, edition, description, image_url, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW()
      ) RETURNING *
    `;

    const response: QueryResult<CreateArtworkDto> = await query(insertText, [
      userId,
      body.title,
      body.artist,
      body.year,
      body.medium,
      body.dimensions,
      body.edition,
      body.description,
      body.imageUrl,
    ]);

    const insertArtworkHistoryText = `
      INSERT INTO artwork_tracking_history (
        id, user_id, artwork_id, created_at 
      ) VALUES (
        gen_random_uuid(), $1, $2, NOW()
      ) RETURNING *
    `;

    await query(insertArtworkHistoryText, [userId, response.rows[0].id]);

    return NextResponse.json({ success: true, result: response.rows });
  } catch (error) {
    console.error("DB INSERT 실패:", error);
    return NextResponse.json(
      { success: false, error: "DB 저장 실패" },
      { status: 500 },
    );
  }
}
