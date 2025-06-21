export interface StudioArtwork {
  id: string;
  title: string;
  price: number;
  image: string;
  artist?: string;
  category?: string;
}

export const studioArtworks: StudioArtwork[] = [
  {
    id: '1',
    title: 'Memories of Su...',
    price: 10,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    artist: 'Digital Artist',
    category: 'Abstract'
  },
  {
    id: '2',
    title: 'Song of the Wind',
    price: 10,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop',
    artist: 'Contemporary Artist',
    category: 'Landscape'
  },
  {
    id: '3',
    title: 'Canvas of Reme...',
    price: 10,
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=400&fit=crop',
    artist: 'Modern Artist',
    category: 'Abstract'
  },
  {
    id: '4',
    title: 'Stars in the Nigh...',
    price: 10,
    image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=400&h=400&fit=crop',
    artist: 'Night Sky Artist',
    category: 'Cosmic'
  },
  {
    id: '5',
    title: 'Whispers of the...',
    price: 10,
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=400&fit=crop',
    artist: 'Nature Artist',
    category: 'Organic'
  },
  {
    id: '6',
    title: 'Ode to Love',
    price: 10,
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop',
    artist: 'Portrait Artist',
    category: 'Portrait'
  },
  {
    id: '7',
    title: 'Urban Dreams',
    price: 15,
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=400&fit=crop',
    artist: 'City Artist',
    category: 'Urban'
  },
  {
    id: '8',
    title: 'Ocean Waves',
    price: 12,
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=400&fit=crop',
    artist: 'Marine Artist',
    category: 'Nature'
  }
];