export interface TrackingArtwork {
  id: string;
  title: string;
  image: string;
  latestDate: string;
  status: 'tracking' | 'stopped';
}

export const trackingArtworks: TrackingArtwork[] = [
  {
    id: '1',
    title: 'Sunny Garden',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    latestDate: '2025.06.04',
    status: 'tracking'
  },
  {
    id: '2',
    title: 'Memories of...',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop',
    latestDate: '2025.06.04',
    status: 'tracking'
  },
  {
    id: '3',
    title: 'Canvas of Reme...',
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=400&fit=crop',
    latestDate: '2025.06.04',
    status: 'stopped'
  }
];