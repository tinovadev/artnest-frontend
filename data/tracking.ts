export interface PrevTrackingArtwork {
  id: string;
  title: string;
  image: string;
  latestDate: string;
  status: "tracking" | "stopped";
}

export const trackingArtworks: PrevTrackingArtwork[] = [
  {
    id: "1",
    title: "Sunny Garden",
    image:
      "https://images.unsplash.com/photo-1578321709315-d0dc844abfe5?q=80&w=1362&auto=format&fit=crop",
    latestDate: "2025.06.04",
    status: "tracking",
  },
  {
    id: "",
    title: "Memories of Spring",
    image:
      "https://images.unsplash.com/photo-1579009615313-c951b4023427?q=80&w=2270&auto=format&fit=crop",
    latestDate: "2025.06.04",
    status: "tracking",
  },
  {
    id: "3",
    title: "Blute Patterns",
    image:
      "https://images.unsplash.com/photo-1579009721337-cec3c69778e4?q=80&w=2150&auto=format&fit=crop",
    latestDate: "2025.06.04",
    status: "stopped",
  },
];
