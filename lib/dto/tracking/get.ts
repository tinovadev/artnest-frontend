import { ImageSimilarityDB } from "@/lib/types/track";

export type ImageSimilarityDetailDto = Pick<
  ImageSimilarityDB,
  | "id"
  | "artwork_id"
  | "suspected_image_url"
  | "similarity_score"
  | "created_at"
  | "suspected_image_url"
>;

export interface ArtworkTrackingHistoryCountDto {
  count: number;
}

export interface ImageSimilarityCountDto {
  count: number;
}
