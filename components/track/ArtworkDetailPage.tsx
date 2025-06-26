"use client";

import { useState } from "react";

import { ArrowLeft, Eye, Calendar, MapPin, Download } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import TopNavbar from "@/components/shared/TopNavbar";
import { useRouter } from "next/navigation";
import { trackingArtworks } from "@/data/tracking";
import { detectionResults } from "@/data/detection-results";

interface ArtworkDetailPageProps {
  artworkId: string;
}

export default function ArtworkDetailPage({
  artworkId,
}: ArtworkDetailPageProps) {
  const router = useRouter();
  const [loadingArtworkId, setLoadingArtworkId] = useState<string | null>(null);
  const artwork = trackingArtworks.find((art) => art.id === artworkId);
  const results = detectionResults.find(
    (result) => result.artworkId === artworkId,
  );

  const handleBack = () => {
    router.back();
  };

  const handleViewDetails = (detectionIndex: number) => {
    router.push(`/track/${artworkId}/similarity/${detectionIndex}`);
  };

  const handleTrackNow = (artworkId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLoadingArtworkId(artworkId);

    // Simulate tracking logic with a timeout
    setTimeout(() => {
      console.log("Tracking artwork:", artworkId);
      setLoadingArtworkId(null);
    }, 2000);
  };

  if (!artwork) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <p className="text-muted-foreground">Artwork not found</p>
      </div>
    );
  }

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
            <h1 className="truncate text-lg font-semibold">{artwork.title}</h1>
          </div>

          <div className="mx-auto max-w-7xl px-6 py-6 lg:px-12">
            {/* Responsive Layout */}
            <div className="lg:flex lg:items-start lg:gap-12">
              {/* Artwork Image - Left Side on Desktop */}
              <div className="mb-8 lg:mb-0 lg:flex-shrink-0">
                <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-2xl bg-muted lg:mx-0 lg:h-96 lg:w-96">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Content - Right Side on Desktop */}
              <div className="space-y-8 lg:flex-1">
                {/* Status and Info */}
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-foreground lg:text-3xl">
                      {artwork.title}
                    </h2>
                    <Badge
                      variant="secondary"
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        artwork.status === "tracking"
                          ? "border-primary/30 bg-primary/20 text-primary"
                          : "border-border bg-muted text-muted-foreground"
                      }`}
                    >
                      {artwork.status === "tracking" ? "Tracking" : "Stopped"}
                    </Badge>
                  </div>

                  <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>Latest: {artwork.latestDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye size={16} />
                      <span>Search Complete</span>
                    </div>
                  </div>

                  <Button
                    onClick={(e) => handleTrackNow(artworkId, e)}
                    className="w-full rounded-xl bg-primary py-3 font-semibold text-white hover:bg-primary/90"
                    disabled={loadingArtworkId === artwork.id}
                  >
                    {loadingArtworkId === artwork.id ? (
                      <div className="flex items-center gap-2">
                        <span className="loader h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                        Tracking...
                      </div>
                    ) : (
                      "Track Now"
                    )}
                  </Button>
                </div>

                {/* Detection Results */}
                {results && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-foreground lg:text-2xl">
                      Detection Results
                    </h3>

                    {/* Summary Card */}
                    <Card className="rounded-2xl border-border bg-secondary p-6">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="mb-1 text-2xl font-bold text-primary lg:text-3xl">
                            {results.totalDetections}
                          </div>
                          <div className="text-sm text-muted-foreground lg:text-base">
                            Total Detections
                          </div>
                        </div>
                        <div>
                          <div className="mb-1 text-2xl font-bold text-success lg:text-3xl">
                            {results.verifiedThefts}
                          </div>
                          <div className="text-sm text-muted-foreground lg:text-base">
                            Verified Thefts
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Detection List */}
                    <div className="space-y-4">
                      {results.detections.map((detection, index) => (
                        <Card
                          key={index}
                          className="rounded-2xl border-border bg-secondary p-6"
                        >
                          <div className="flex items-start gap-4">
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-muted lg:h-20 lg:w-20">
                              <img
                                src={detection.image}
                                alt="Detection result"
                                className="h-full w-full object-cover"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="mb-2 flex items-start justify-between">
                                <h4 className="truncate pr-2 text-base font-semibold text-foreground lg:text-lg">
                                  {detection.source}
                                </h4>
                                <Badge
                                  variant="secondary"
                                  className={`flex-shrink-0 rounded-full px-2 py-1 text-xs ${
                                    detection.similarity >= 90
                                      ? "border-red-500/30 bg-red-500/20 text-red-400"
                                      : detection.similarity >= 70
                                        ? "border-yellow-500/30 bg-yellow-500/20 text-yellow-400"
                                        : "border-green-500/30 bg-green-500/20 text-green-400"
                                  }`}
                                >
                                  {detection.similarity}% Similar
                                </Badge>
                              </div>

                              <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar size={14} />
                                  <span>{detection.detectedDate}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin size={14} />
                                  <span>{detection.platform}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleViewDetails(index)}
                                  className="h-8 rounded-xl border-border bg-transparent px-3 py-1 text-xs text-foreground hover:bg-muted"
                                >
                                  View Details
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 rounded-xl border-border bg-transparent px-3 py-1 text-xs text-foreground hover:bg-muted"
                                >
                                  <Download size={14} className="mr-1" />
                                  Report
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
