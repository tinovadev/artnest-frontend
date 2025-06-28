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
