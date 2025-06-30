export interface ImageSimilarityModel {
  id: string;
  artwork_id: string;
  lpips_score: number;
  dists_score: number;
  cosine_similarity: number;
  original_image_url: string;
  suspected_image_url: string;
  gradcam_overlay_url: string;
  suspected_website_link: string;
  similarity_score: string;
  report_url: string;
  created_at: Date;
  updated_at: Date;
}
