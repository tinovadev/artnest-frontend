export enum TrackingArtworkStatus {
  Tracking = "tracking",
  Stopped = "stopped",
}

//
export interface TrackingArtwork {
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

export interface ArtworksTrackingHistoryResponse {
  id?: string;
  user_id: string;
  artwork_id: string;
  status: TrackingArtworkStatus;
  created_at: Date;
}
