export interface User {
  id: string;
  email: string;
  username: string;
  fullname: string;
  artist_name?: string | null;
  description?: string | null;
  portfolio_link?: string | null;
  file_link?: string | null;
  status?: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  algo_address?: string | null;
  algo_private_key?: string | null;
}

export type Artwork = {
  id: string;
  user_id: string;
  title: string;
  artist: string;
  year: number;
  medium: string;
  dimensions: string;
  edition: string | null;
  description: string | null;
  image_url: string | null;
  unit_price: number | null;
  currency: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type ArtworkCard = {
  id: string;
  title: string;
  price: number;
  image: string;
  artist: string;
  category: string;
};

export type AlgorandBalance = {
  id: string;
  user_id: string;
  balance: string;
  checked_at: string;
};

protectedArtworks: {

}
forSaleArtworks: {

}
export type ABC = {
  id: string;
  title: string;
  image: string;
  date: string;
  status: "protected" | "processing";
  price: string;
  artist: string;
  currency: string;
  year: string;
  medium: string;
  dimensions: string;
  edition: string;
  description: string;
  created_at: string;
  updated_at: string;
  
  // api/me/for-sale-artworks (forSaleArtworksData)
  artwork_license_ai_training_allowed: boolean;
  artwork_license_commercial_use_allowed: boolean;
  artwork_license_resale_use_allowed: boolean;
  artwork_license_derivatives_allowed: boolean;
  artwork_license_description: string;
  artwork_license_created_at: string;
  artwork_license_version: number;
};

export type ProtectedSaleArtWorks = {
  protectedArtworks: ABC[];
  forSaleArtworks: ABC[];
}