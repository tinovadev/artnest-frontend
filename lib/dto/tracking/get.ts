import { TrackingArtworkStatus } from "@/lib/model/artwork-tracking-history.model";
import { ImageSimilarityModel } from "@/lib/model/image-similarity.model";

export interface TrackingArtworkDto {
  id: string;
  artwork_id: string;
  title: string;
  image_url: string;
  created_at: string;
  status: TrackingArtworkStatus;
}

export interface TrackingArtworkHistoryDto {
  id?: string;
  user_id: string;
  artwork_id: string;
  status: TrackingArtworkStatus;
  created_at: Date;
}

export type ImageSimilarityDetailDto = Pick<
  ImageSimilarityModel,
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
