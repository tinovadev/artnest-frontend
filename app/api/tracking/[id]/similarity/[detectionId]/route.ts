import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; detectionId: string } },
) {
  try {
    const { id, detectionId } = params;

    console.log(id);
    console.log(detectionId);

    const searchText = `
    SELECT
    *
    from image_similarity
    where id = $1
    `;

    const response = await query(searchText, [detectionId]);

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
