import { TrackingArtworkStatus } from "../model/artwork-tracking-history.model";

export interface TrackingArtwork {
  id: string;
  artworkId: string;
  title: string;
  image: string;
  latestDate: string;
  status: TrackingArtworkStatus;
}

export interface ImageSimilarityReport {
  id: string;
  artworkId: string;
  lpipsScore: number;
  distsScore: number;
  cosineSimilarity: number;
  originalImageUrl: string;
  suspectedImageUrl: string;
  gradcamOverlayUrl: string;
  // suspectedWebsiteLink: string;
  // similarityScore: string;
  reportUrl: string;
  createdAt: string;
  // updatedAt: string;
}
