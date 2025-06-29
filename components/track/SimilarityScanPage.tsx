"use client";

import TopNavbar from "@/components/shared/TopNavbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DetectionResult } from "@/data/detection-results";
import { ImageSimilarityReport, TrackingArtwork } from "@/lib/types/track";
import { Download } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "phosphor-react";
import { useEffect, useState } from "react";

interface SimilarityScanPageProps {
  artworkId: string;
  detectionId: string;
}

export default function SimilarityScanPage({
  artworkId,
  detectionId,
}: SimilarityScanPageProps) {
  const router = useRouter();

  const [imageSimilarity, setImageSimilarity] =
    useState<ImageSimilarityReport | null>(null);
  const [artworkHistory, setArtworkHistory] = useState<TrackingArtwork | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handler = async () => {
      setIsLoading(true);

      try {
        const detectionStored = sessionStorage.getItem("detection");
        const artworkHistoryStored = sessionStorage.getItem(
          "artworkTrackingHistory",
        );

        if (!detectionStored || !artworkHistoryStored) {
          console.log("No session data");
          return;
        }

        const detectionParsed = JSON.parse(detectionStored) as DetectionResult;
        const artworkHistoryParsed = JSON.parse(
          artworkHistoryStored,
        ) as TrackingArtwork[];

        if (!detectionParsed || !artworkHistoryParsed) {
          console.log("No session data");
          return;
        }

        console.log("artworkHistoryParsed", artworkHistoryParsed);
        console.log("detectionParsed", detectionParsed);

        const response = await fetch(
          `/api/tracking/${detectionParsed.artworkId}/similarity/${detectionParsed.detections[0].detectionId}`,
          {
            method: "GET",
          },
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "Artworks tracking detail page upload failed",
          );
        }

        const parsedResponse = await response.json();

        console.log("parsedResponse", parsedResponse);

        const artwork = artworkHistoryParsed.find(
          (value) => value.artworkId === detectionParsed.artworkId,
        );

        if (!artwork) {
          return;
        }

        setImageSimilarity(parsedResponse.result);
        setArtworkHistory(artwork);
      } catch (error) {
        console.error("Error in handler:", error);
      } finally {
        setIsLoading(false);
      }
    };

    void handler();
  }, [artworkId, detectionId]);

  const handleBack = () => {
    router.back();
  };

  const handleDownloadReport = () => {
    // Use the reportUrl from the similarity report
    window.open(imageSimilarity?.reportUrl, "_blank");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">로딩 중입니다...</p>
      </div>
    );
  }

  if (!imageSimilarity || !artworkHistory) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  // Calculate overall similarity percentage from multiple metrics
  const overallSimilarity = Math.round(
    (imageSimilarity.cosineSimilarity * 100 +
      (1 - imageSimilarity.lpipsScore) * 100 +
      (1 - imageSimilarity.distsScore) * 100) /
      3,
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
                <div className="space-y-4">
                  {/* Original vs Suspected Comparison */}
                  <div className="mx-auto grid grid-cols-2 gap-[1px] overflow-hidden rounded-2xl lg:mx-0">
                    {/* Original Artwork */}
                    <div className="relative">
                      <div className="bg-primary py-2 text-center text-xs font-medium text-white lg:text-sm">
                        Original Artwork
                      </div>
                      <div className="relative aspect-square bg-muted">
                        <Image
                          src={imageSimilarity.originalImageUrl}
                          alt="Original artwork"
                          className="z-0 h-full w-full object-cover"
                          fill={true}
                          priority={true}
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <div className="bg-primary py-2 text-center text-xs font-medium text-white lg:text-sm">
                        Suspected Artwork
                      </div>
                      <div className="relative aspect-square bg-muted">
                        <Image
                          src={imageSimilarity.suspectedImageUrl}
                          alt="Matched artwork"
                          className="h-full w-full object-cover"
                          fill={true}
                          priority={true}
                        />
                      </div>
                    </div>
                  </div>

                  {/* GradCAM Overlay Section */}
                  <div className="overflow-hidden rounded-2xl">
                    <div className="bg-success py-2 text-center text-xs font-medium text-black lg:text-sm">
                      GradCAM Overlay Analysis
                    </div>
                    <div className="relative aspect-square bg-muted">
                      <Image
                        src={imageSimilarity?.gradcamOverlayUrl}
                        alt="Matched artwork"
                        className="h-full w-full object-cover"
                        fill={true}
                        priority={true}
                      />
                    </div>
                    <div className="bg-secondary p-3">
                      <p className="text-xs text-muted-foreground lg:text-sm">
                        Heat map highlighting the most similar regions between
                        images
                      </p>
                    </div>
                  </div>
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
                    Detected on {imageSimilarity?.createdAt}
                  </p>
                </div>

                {/* Artwork Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">
                      Original Artwork
                    </h3>
                    <p className="text-muted-foreground">
                      &quot;{artworkHistory.title}&quot; by @linalee
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-semibold">
                      Suspected Artwork
                    </h3>
                    <p className="text-muted-foreground">
                      &quot;
                      {imageSimilarity.suspectedImageUrl &&
                        imageSimilarity.suspectedImageUrl.split("/").pop()}
                      &quot; found on{" "}
                      {imageSimilarity.suspectedImageUrl &&
                        new URL(
                          imageSimilarity.suspectedImageUrl,
                        ).hostname.split(".")[0]}
                    </p>
                  </div>
                </div>

                {/* Detailed Metrics */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold lg:text-xl">
                    Similarity Metrics
                  </h3>

                  <div className="space-y-4">
                    {/* Cosine Similarity */}
                    <Card className="rounded-2xl border-border bg-secondary p-6">
                      <div className="mb-2 flex items-center justify-between">
                        <h4 className="font-semibold">Cosine Similarity</h4>
                        <span className="text-lg font-bold text-primary">
                          {(imageSimilarity.cosineSimilarity * 100).toFixed(1)}%
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Measures the cosine of the angle between feature
                        vectors. Higher values indicate greater similarity in
                        overall composition and style.
                      </p>
                    </Card>

                    {/* LPIPS Score */}
                    <Card className="rounded-2xl border-border bg-secondary p-6">
                      <div className="mb-2 flex items-center justify-between">
                        <h4 className="font-semibold">LPIPS Distance</h4>
                        <span className="text-lg font-bold text-primary">
                          {imageSimilarity.lpipsScore}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Learned Perceptual Image Patch Similarity. Lower values
                        indicate images that are more perceptually similar to
                        humans.
                      </p>
                    </Card>

                    {/* DISTS Score */}
                    <Card className="rounded-2xl border-border bg-secondary p-6">
                      <div className="mb-2 flex items-center justify-between">
                        <h4 className="font-semibold">DISTS Score</h4>
                        <span className="text-lg font-bold text-primary">
                          {imageSimilarity.distsScore}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Deep Image Structure and Texture Similarity. Lower
                        values indicate better structural and textural
                        similarity.
                      </p>
                    </Card>
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
                        <div
                          className={`h-3 w-3 rounded-full ${
                            imageSimilarity.cosineSimilarity > 0.8
                              ? "bg-red-400"
                              : imageSimilarity.cosineSimilarity > 0.6
                                ? "bg-yellow-400"
                                : "bg-green-400"
                          }`}
                        ></div>
                        <span className="text-foreground">
                          High compositional similarity detected
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-3 w-3 rounded-full ${
                            imageSimilarity.lpipsScore < 0.3
                              ? "bg-red-400"
                              : imageSimilarity.lpipsScore < 0.5
                                ? "bg-yellow-400"
                                : "bg-green-400"
                          }`}
                        ></div>
                        <span className="text-foreground">
                          Perceptual similarity analysis completed
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-3 w-3 rounded-full ${
                            imageSimilarity.distsScore < 0.2
                              ? "bg-red-400"
                              : imageSimilarity.distsScore < 0.4
                                ? "bg-yellow-400"
                                : "bg-green-400"
                          }`}
                        ></div>
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
