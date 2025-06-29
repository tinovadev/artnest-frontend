export enum TrackingArtworkStatus {
  Tracking = "tracking",
  Stopped = "stopped",
}

export interface TrackingArtworkModel {
  id: string;
  artwork_id: string;
  title: string;
  image_url: string;
  created_at: string;
  status: TrackingArtworkStatus;
}
