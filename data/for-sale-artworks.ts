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
    id: "1",
    title: "Stars in the Night",
    price: 10,
    image:
      "https://images.unsplash.com/photo-1533208087231-c3618eab623c?q=80&w=2370&auto=format&fit=crop",
    artist: "Aria Solen",
    category: "Abstract",
  },
  {
    id: "2",
    title: "Ode to Love",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1602464729960-f95937746b68?q=80&w=927&auto=format&fit=crop",
    artist: "Aria Solen",
    category: "Urban",
  },
  {
    id: "3",
    title: "Ocean Waves",
    price: 12,
    image:
      "https://images.unsplash.com/photo-1594201272716-9ad78d16848b?q=80&w=1760&auto=format&fit=crop",
    artist: "Aria Solen",
    category: "Nature",
  },
];
