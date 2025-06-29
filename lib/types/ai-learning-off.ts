export interface ArtworkForm {
  title: string;
  artist: string;
  year: string;
  medium: string;
  dimensions: string;
  edition: string;
  description: string;
}

export interface ArtworkBody extends ArtworkForm {
  imageUrl: string;
}
