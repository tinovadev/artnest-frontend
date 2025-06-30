export interface Detection {
  detectionId: string;
  source: string;
  platform: string;
  similarity: number;
  detectedDate: string;
  image: string;
}

export interface DetectionResult {
  artworkId: string;
  totalDetections: number;
  verifiedThefts: number;
  detections: Detection[];
}

export const detectionResults: DetectionResult[] = [
  {
    artworkId: "1", // Sunny Garden
    totalDetections: 3,
    verifiedThefts: 0,
    detections: [
      {
        detectionId: "1",
        source: "AI Generated Art #1234",
        platform: "Instagram",
        similarity: 87,
        detectedDate: "2025.06.03",
        image:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop",
      },
      {
        detectionId: "2",
        source: "Digital Artwork Collection",
        platform: "Pinterest",
        similarity: 72,
        detectedDate: "2025.06.02",
        image:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop",
      },
      {
        detectionId: "3",
        source: "Art Portfolio Website",
        platform: "Behance",
        similarity: 65,
        detectedDate: "2025.06.01",
        image:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop",
      },
    ],
  },
];
