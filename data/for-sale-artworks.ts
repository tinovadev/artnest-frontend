export interface ForSaleArtwork {
  id: string;
  title: string;
  price: number;
  image: string;
  artist?: string;
  category?: string;
}

export const forSaleArtworks: ForSaleArtwork[] = [
  {
    id: '1',
    title: 'Song of the Wind',
    price: 10,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop',
    artist: 'Aria Solen',
    category: 'Abstract'
  },
  {
    id: '2',
    title: 'Urban Dreams',
    price: 15,
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=500&fit=crop',
    artist: 'Aria Solen',
    category: 'Urban'
  },
  {
    id: '3',
    title: 'Ocean Waves',
    price: 12,
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=500&fit=crop',
    artist: 'Aria Solen',
    category: 'Nature'
  }
];