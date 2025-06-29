export enum TrackingArtworkStatus {
  Tracking = "tracking",
  Stopped = "stopped",
}

//
export interface TrackingArtwork2 {
  id: string;
  artworkId: string;
  title: string;
  image: string;
  latestDate: string;
  status: TrackingArtworkStatus;
}

export interface TrackingArtworkDB {
  id: string;
  artwork_id: string;
  title: string;
  image_url: string;
  created_at: string;
  status: TrackingArtworkStatus;
}

export interface ImageSimilarity {
  id: string;
  artworkId: string;
  lpipsScore: number;
  distsScore: number;
  cosineSimilarity: number;
  originalImage_url: string;
  suspected_image_url: string;
  gradcam_overlay_url: string;
  similarity_score: string;
  report_url: string;
  created_at: Date;
  updated_at: Date;
}

export interface ImageSimilarityDB {
  id: string;
  artwork_id: string;
  lpips_score: number;
  dists_score: number;
  cosine_similarity: number;
  original_image_url: string;
  suspected_image_url: string;
  gradcam_overlay_url: string;
  similarity_score: string;
  report_url: string;
  created_at: Date;
  updated_at: Date;
}

export interface ArtworksTrackingHistoryResponse {
  id?: string;
  user_id: string;
  artwork_id: string;
  status: TrackingArtworkStatus;
  created_at: Date;
}
