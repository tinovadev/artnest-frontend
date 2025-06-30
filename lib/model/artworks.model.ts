export interface ArtworksModel {
  id: string;
  user_id: string;
  title: string;
  artist: string;
  year: number;
  medium: string;
  dimensions: string;
  edition?: string;
  description?: string;
  image_url?: string;
  unit_price?: number;
  currency?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
