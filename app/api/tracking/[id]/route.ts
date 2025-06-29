import { Detection, DetectionResult } from "@/data/detection-results";
import { query } from "@/lib/db";
import {
  ArtworkTrackingHistoryCountDto,
  ImageSimilarityCountDto,
  ImageSimilarityDetailDto,
} from "@/lib/dto/tracking/get";
import { ApiResponse, ParamId } from "@/lib/types/global";
import { formatDateToDotFormat } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { QueryResult } from "pg";

// similarity 찾는겨
export async function GET(
  req: NextRequest,
  { params }: { params: ParamId },
): Promise<NextResponse<ApiResponse<DetectionResult>>> {
  const { id } = params;

  try {
    const searchImageSimilarityText1 = `
  select 
    id, 
    artwork_id,
    suspected_image_link as platform,
    similarity_score, 
    created_at as detectedDate,
    suspected_image_url
  from image_similarity 
  where artwork_id = $1
  `;

    const imageSimilarityResponse1: QueryResult<ImageSimilarityDetailDto> =
      await query(searchImageSimilarityText1, [id]);

    //
    const searchImageSimilarityText2 = `
  SELECT count(*) 
  FROM image_similarity 
  WHERE artwork_id = $1;
  `;

    const imageSimilarityResponse2: QueryResult<ImageSimilarityCountDto> =
      await query(searchImageSimilarityText2, [id]);

    //
    const searchHistoryText = `
  SELECT count(*)
  from artworks_tracking_history
  where artwork_id = $1
  `;

    const historyResponse: QueryResult<ArtworkTrackingHistoryCountDto> =
      await query(searchHistoryText, [id]);

    const result: DetectionResult = {
      artworkId: id,
      totalDetections: historyResponse.rows[0].count,
      verifiedThefts: imageSimilarityResponse2.rows[0].count,
      detections: imageSimilarityResponse1.rows.map((value) => {
        const { hostname } = new URL(value.suspected_image_url);
        const parts = hostname.split(".");

        return {
          source: value.suspected_image_url.toString(),
          platform: parts[1],
          similarity: parseInt(value.similarity_score),
          detectedDate: formatDateToDotFormat(value.created_at.toString()),
          image: value.suspected_image_url,
        } as Detection;
      }),
    };

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
