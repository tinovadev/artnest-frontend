import { query } from "@/lib/db";
import { ImageSimilarityScanDto } from "@/lib/dto/tracking/get";
import { ImageSimilarityReport } from "@/lib/types/track";
import { formatDateToDotFormat } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { QueryResult } from "pg";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; detectionId: string } },
) {
  try {
    const { id, detectionId } = params;

    const searchText = `
    SELECT
    *
    from image_similarity
    where id = $1
    and artwork_id = $2
    `;

    const response: QueryResult<ImageSimilarityScanDto> = await query(
      searchText,
      [detectionId, id],
    );

    const rawResponse = response.rows[0];

    const result: ImageSimilarityReport = {
      id: rawResponse.id,
      artworkId: rawResponse.artwork_id,
      lpipsScore: rawResponse.lpips_score,
      distsScore: rawResponse.dists_score,
      cosineSimilarity: rawResponse.cosine_similarity,
      originalImageUrl: rawResponse.original_image_url,
      suspectedImageUrl: rawResponse.suspected_image_url,
      gradcamOverlayUrl: rawResponse.gradcam_overlay_url,
      reportUrl: rawResponse.report_url,
      createdAt: formatDateToDotFormat(rawResponse.created_at.toString()),
    };

    console.log(result);

    return NextResponse.json({
      success: true,
      result: result,
    });
  } catch (error) {
    console.error("DB SELECT 실패:", error);
    return NextResponse.json(
      { success: false, error: "DB 조회 실패" },
      { status: 500 },
    );
  }
}
