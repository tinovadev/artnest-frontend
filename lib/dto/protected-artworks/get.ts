export interface ProtectedArtworksGetDto {
  id: string;
  userId: string;
  title: string;
  artist: string;
  year: number;
  medium: string;
  dimensions: string;
  edition?: string;
  description?: string;
  imageUrl?: string;
  unitPrice?: number;
  currency?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
