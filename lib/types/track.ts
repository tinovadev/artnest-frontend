import { TrackingArtworkStatus } from "../model/artwork-tracking-history.model";

export interface TrackingArtwork {
  id: string;
  artworkId: string;
  title: string;
  image: string;
  latestDate: string;
  status: TrackingArtworkStatus;
}
