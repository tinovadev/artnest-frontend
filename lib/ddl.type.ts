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
