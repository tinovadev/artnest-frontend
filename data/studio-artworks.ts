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
    id: "1",
    title: "Memories of Sunny",
    price: 10,
    image:
      "https://images.unsplash.com/photo-1647937526882-820802b4fa87?q=80&w=2832&auto=format&fit=crop",
    artist: "Digital Artist",
    category: "Abstract",
  },
  {
    id: "2",
    title: "Song of the Wind",
    price: 10,
    image:
      "https://images.unsplash.com/photo-1582201942961-2e1c3e63d9b4?w=900&auto=format&fit=crop",
    artist: "Contemporary Artist",
    category: "Landscape",
  },
  {
    id: "3",
    title: "Canvas of Remembrance",
    price: 10,
    image:
      "https://images.unsplash.com/photo-1579762715459-5a068c289fda?q=80&w=1288&auto=format&fit=crop",
    artist: "Modern Artist",
    category: "Abstract",
  },
  {
    id: "4",
    title: "Stars in the Night",
    price: 10,
    image:
      "https://images.unsplash.com/photo-1533208087231-c3618eab623c?q=80&w=2370&auto=format&fit=crop",
    artist: "Night Sky Artist",
    category: "Cosmic",
  },
  {
    id: "5",
    title: "Whispers of the Sea",
    price: 10,
    image:
      "https://images.unsplash.com/photo-1579168133409-34acb719c8b6?q=80&w=3410&auto=format&fit=crop",
    artist: "Nature Artist",
    category: "Organic",
  },
  {
    id: "6",
    title: "Ode to Love",
    price: 10,
    image:
      "https://images.unsplash.com/photo-1602464729960-f95937746b68?q=80&w=927&auto=format&fit=crop",
    artist: "Portrait Artist",
    category: "Portrait",
  },
  {
    id: "7",
    title: "Urban Dreams",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1579762593155-42faee39d0b4?q=80&w=2458&auto=format&fit=crop",
    artist: "City Artist",
    category: "Urban",
  },
  {
    id: "8",
    title: "Ocean Waves",
    price: 12,
    image:
      "https://images.unsplash.com/photo-1594201272716-9ad78d16848b?q=80&w=1760&auto=format&fit=crop",
    artist: "Marine Artist",
    category: "Nature",
  },
];
