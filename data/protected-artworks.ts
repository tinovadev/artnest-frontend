export interface ProtectedArtwork {
  id: string;
  title: string;
  image: string;
  date: string;
  status: 'protected' | 'processing';
}

export const protectedArtworks: ProtectedArtwork[] = [
  {
    id: '1',
    title: 'Abstract Composition #1',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop',
    date: '2025.01.15',
    status: 'protected'
  },
  {
    id: '2',
    title: 'Urban Landscape',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=500&fit=crop',
    date: '2025.01.12',
    status: 'protected'
  },
  {
    id: '3',
    title: 'Geometric Patterns',
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=500&fit=crop',
    date: '2025.01.10',
    status: 'protected'
  },
  {
    id: '4',
    title: 'Abstract Portrait',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=500&fit=crop',
    date: '2025.01.08',
    status: 'protected'
  }
];