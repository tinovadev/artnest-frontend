export interface ArtworkForm {
  id?: string;
  userId?: string;
  title: string;
  artist: string;
  year: string;
  medium: string;
  dimensions: string;
  edition: string;
  description: string;
  imageUrl?: string;
  unitPrice?: number;
  currency?: string;
}
