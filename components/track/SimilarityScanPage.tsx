"use client";

import { ArrowLeft, Download } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import TopNavbar from "@/components/shared/TopNavbar";
import { useRouter } from "next/navigation";
import { trackingArtworks } from "@/data/tracking";
import { detectionResults } from "@/data/detection-results";

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

  const handleBack = () => {
    router.back();
  };

  const handleDownloadReport = () => {
    // Implement download report functionality
    console.log("Downloading report...");
  };

  if (!artwork || !detection) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <p className="text-muted-foreground">Detection not found</p>
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
            <h1 className="text-lg font-semibold">Similarity Scan</h1>
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
                        src={artwork.image}
                        alt="Original artwork"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Matched Artwork */}
                  <div className="relative">
                    <div className="bg-primary py-2 text-center text-xs font-medium text-white lg:text-sm">
                      Matched Artwork
                    </div>
                    <div className="aspect-square bg-muted">
                      <img
                        src={detection.image}
                        alt="Matched artwork"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content - Right Side on Desktop */}
              <div className="space-y-8 lg:flex-1">
                {/* Similarity Score */}
                <div>
                  <h2 className="mb-4 text-lg font-semibold lg:text-xl">
                    Similarity
                  </h2>
                  <div className="mb-2 font-pixel text-4xl font-bold text-primary lg:text-6xl">
                    {detection.similarity}%
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
                      Matched Artwork
                    </h3>
                    <p className="text-muted-foreground">
                      "{detection.source}" found on{" "}
                      {detection.platform.toLowerCase()}
                    </p>
                  </div>
                </div>

                {/* Detected Similarities */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold lg:text-xl">
                    Detected Similarities
                  </h3>

                  <div className="space-y-4">
                    {/* Color Palette */}
                    <Card className="rounded-2xl border-border bg-secondary p-6">
                      <h4 className="mb-3 font-semibold">Color Palette</h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Over 85% overlap in dominant hues — especially in the
                        oranges, midnight blues, and soft whites used in the sky
                        and the sun.
                      </p>
                    </Card>

                    {/* Composition */}
                    <Card className="rounded-2xl border-border bg-secondary p-6">
                      <h4 className="mb-3 font-semibold">Composition</h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Nearly identical layout: the sun on the left, with a
                        human face positioned below.
                      </p>
                    </Card>

                    {/* Lighting & Mood */}
                    <Card className="rounded-2xl border-border bg-secondary p-6">
                      <h4 className="mb-3 font-semibold">Lighting & Mood</h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Overall atmospheric tone and soft light gradient is
                        remarkably similar.
                      </p>
                    </Card>
                  </div>
                </div>

                <div className="flex justify-end">
                  {/* Download Report Button */}
                  <Button
                    onClick={handleDownloadReport}
                    className="w-full rounded-2xl bg-primary py-4 text-lg font-semibold text-white hover:bg-primary/90"
                  >
                    Download Report
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
