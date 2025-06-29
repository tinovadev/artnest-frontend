"use client";

import TopNavbar from "@/components/shared/TopNavbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { detectionResults } from "@/data/detection-results";
import { trackingArtworks } from "@/data/tracking";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, Eye } from "phosphor-react";

interface ImageSimilarityReport {
  id: string;
  lpipsScore: number;
  distsScore: number;
  cosineSimilarity: number;
  originalImageUrl: string;
  suspectedImageUrl: string;
  gradcamOverlayUrl: string;
  reportUrl: string;
  createdAt: string;
}

interface SimilarityScanPageProps {
  artworkId: string;
  detectionId: string;
}

export default function SimilarityScanPage({
  artworkId,
  detectionId,
}: SimilarityScanPageProps) {
  const router = useRouter();
  const artwork = trackingArtworks.find((art) => art.id === artworkId);
  const results = detectionResults.find(
    (result) => result.artworkId === artworkId,
  );
  const detection = results?.detections[parseInt(detectionId)];

  // Mock data for the new structure - in real app this would come from API
  const similarityReport: ImageSimilarityReport = {
    id: "similarity_001",
    lpipsScore: 0.234,
    distsScore: 0.156,
    cosineSimilarity: 0.892,
    originalImageUrl: artwork?.image || "",
    suspectedImageUrl: detection?.image || "",
    gradcamOverlayUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    reportUrl: "/reports/similarity_001.pdf",
    createdAt: detection?.detectedDate || "2025.01.15",
  };

  const handleBack = () => {
    router.back();
  };

  const handleDownloadReport = () => {
    // Use the reportUrl from the similarity report
    window.open(similarityReport.reportUrl, '_blank');
  };

  const handleViewGradCAM = () => {
    // Open GradCAM overlay in a new window
    window.open(similarityReport.gradcamOverlayUrl, '_blank');
  };

  if (!artwork || !detection) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <p className="text-muted-foreground">Detection not found</p>
      </div>
    );
  }

  // Calculate overall similarity percentage from multiple metrics
  const overallSimilarity = Math.round(
    (similarityReport.cosineSimilarity * 100 + 
     (1 - similarityReport.lpipsScore) * 100 + 
     (1 - similarityReport.distsScore) * 100) / 3
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNavbar />

      <ScrollArea className="h-screen">
        <div className="pb-8 lg:pt-20">
          {/* Header */}
          <div className="mx-auto flex w-full max-w-7xl items-center gap-4 border-b border-border px-6 py-4 lg:px-12">
            <button onClick={handleBack} className="-ml-2 p-2">
              <ArrowLeft size={24} className="text-foreground" />
            </button>
            <h1 className="text-lg font-semibold">Similarity Analysis</h1>
          </div>

          <div className="mx-auto max-w-7xl px-6 py-6 lg:px-12">
            {/* Responsive Layout */}
            <div className="lg:flex lg:items-start lg:gap-12">
              {/* Comparison Images - Left Side on Desktop */}
              <div className="mb-8 lg:mb-0 lg:w-[50%] lg:flex-shrink-0">
                <div className="mx-auto grid grid-cols-2 gap-[1px] overflow-hidden rounded-2xl lg:mx-0">
                  {/* Original Artwork */}
                  <div className="relative">
                    <div className="bg-primary py-2 text-center text-xs font-medium text-white lg:text-sm">
                      Original Artwork
                    </div>
                    <div className="aspect-square bg-muted">
                      <img
                        src={similarityReport.originalImageUrl}
                        alt="Original artwork"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Suspected Artwork */}
                  <div className="relative">
                    <div className="bg-primary py-2 text-center text-xs font-medium text-white lg:text-sm">
                      Suspected Artwork
                    </div>
                    <div className="aspect-square bg-muted">
                      <img
                        src={similarityReport.suspectedImageUrl}
                        alt="Suspected artwork"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* GradCAM Overlay Button */}
                <div className="mt-4">
                  <Button
                    onClick={handleViewGradCAM}
                    variant="outline"
                    className="w-full rounded-xl border-border bg-transparent text-foreground hover:bg-muted"
                  >
                    <Eye size={16} className="mr-2" />
                    View GradCAM Overlay
                  </Button>
                </div>
              </div>

              {/* Content - Right Side on Desktop */}
              <div className="space-y-8 lg:flex-1">
                {/* Overall Similarity Score */}
                <div>
                  <h2 className="mb-4 text-lg font-semibold lg:text-xl">
                    Overall Similarity
                  </h2>
                  <div className="mb-2 font-pixel text-4xl font-bold text-primary lg:text-6xl">
                    {overallSimilarity}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Detected on {similarityReport.createdAt}
                  </p>
                </div>

                {/* Detailed Metrics */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold lg:text-xl">
                    Similarity Metrics
                  </h3>

                  <div className="space-y-4">
                    {/* Cosine Similarity */}
                    <Card className="rounded-2xl border-border bg-secondary p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Cosine Similarity</h4>
                        <span className="text-lg font-bold text-primary">
                          {(similarityReport.cosineSimilarity * 100).toFixed(1)}%
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Measures the cosine of the angle between feature vectors. Higher values indicate greater similarity in overall composition and style.
                      </p>
                    </Card>

                    {/* LPIPS Score */}
                    <Card className="rounded-2xl border-border bg-secondary p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">LPIPS Distance</h4>
                        <span className="text-lg font-bold text-primary">
                          {similarityReport.lpipsScore.toFixed(3)}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Learned Perceptual Image Patch Similarity. Lower values indicate images that are more perceptually similar to humans.
                      </p>
                    </Card>

                    {/* DISTS Score */}
                    <Card className="rounded-2xl border-border bg-secondary p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">DISTS Score</h4>
                        <span className="text-lg font-bold text-primary">
                          {similarityReport.distsScore.toFixed(3)}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Deep Image Structure and Texture Similarity. Lower values indicate better structural and textural similarity.
                      </p>
                    </Card>
                  </div>
                </div>

                {/* Artwork Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">
                      Original Artwork
                    </h3>
                    <p className="text-muted-foreground">
                      "{artwork.title}" by @linalee
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-semibold">
                      Suspected Artwork
                    </h3>
                    <p className="text-muted-foreground">
                      "{detection.source}" found on{" "}
                      {detection.platform.toLowerCase()}
                    </p>
                  </div>
                </div>

                {/* Analysis Summary */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold lg:text-xl">
                    Analysis Summary
                  </h3>

                  <Card className="rounded-2xl border-border bg-secondary p-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          similarityReport.cosineSimilarity > 0.8 ? 'bg-red-400' : 
                          similarityReport.cosineSimilarity > 0.6 ? 'bg-yellow-400' : 'bg-green-400'
                        }`}></div>
                        <span className="text-foreground">
                          High compositional similarity detected
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          similarityReport.lpipsScore < 0.3 ? 'bg-red-400' : 
                          similarityReport.lpipsScore < 0.5 ? 'bg-yellow-400' : 'bg-green-400'
                        }`}></div>
                        <span className="text-foreground">
                          Perceptual similarity analysis completed
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          similarityReport.distsScore < 0.2 ? 'bg-red-400' : 
                          similarityReport.distsScore < 0.4 ? 'bg-yellow-400' : 'bg-green-400'
                        }`}></div>
                        <span className="text-foreground">
                          Structural and textural analysis completed
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="flex justify-end">
                  {/* Download Report Button */}
                  <Button
                    onClick={handleDownloadReport}
                    className="w-full rounded-2xl bg-primary py-4 text-lg font-semibold text-white hover:bg-primary/90"
                  >
                    <Download size={20} className="mr-2" />
                    Download Full Report
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}