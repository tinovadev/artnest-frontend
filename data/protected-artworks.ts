export interface ProtectedArtwork {
  id: string;
  title: string;
  image: string;
  date: string;
  status: "protected" | "processing";
}

export const protectedArtworks: ProtectedArtwork[] = [
  {
    id: "1",
    title: "Sunny Garden",
    image:
      "https://images.unsplash.com/photo-1578321709315-d0dc844abfe5?q=80&w=1362&auto=format&fit=crop",
    date: "2025.01.15",
    status: "protected",
  },
  {
    id: "2",
    title: "Memories of Spring",
    image:
      "https://images.unsplash.com/photo-1579009615313-c951b4023427?q=80&w=2270&auto=format&fit=crop",
    date: "2025.01.12",
    status: "protected",
  },
  {
    id: "3",
    title: "Blue Patterns",
    image:
      "https://images.unsplash.com/photo-1579009721337-cec3c69778e4?q=80&w=2150&auto=format&fit=crop",
    date: "2025.01.10",
    status: "protected",
  },
  {
    id: "4",
    title: "My room",
    image:
      "https://images.unsplash.com/photo-1578321272794-79e82a581d5d?q=80&w=1925&auto=format&fit=crop",
    date: "2025.01.08",
    status: "protected",
  },
];
