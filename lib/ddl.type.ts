export interface User {
  id: string;              // UUID
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
  id: string;                    // uuid
  user_id: string;              // uuid
  title: string;                // varchar(50)
  artist: string;               // varchar(50)
  year: number;                 // integer
  medium: string;               // varchar(100)
  dimensions: string;           // varchar(100)
  edition: string | null;       // varchar(20)
  description: string | null;   // text
  image_url: string | null;     // text
  unit_price: number | null;    // double precision
  currency: string | null;      // varchar(50)
  created_at: string;           // timestamp (ISO format string)
  updated_at: string;           // timestamp
  deleted_at: string | null;    // timestamp
};

