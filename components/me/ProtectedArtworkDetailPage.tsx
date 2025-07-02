"use client";

import { ArrowLeft, PencilSimple } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ABC, ProtectedSaleArtWorks } from "@/lib/ddl.type";

interface ProtectedArtworkDetailPageProps {
  artworkId: string;
}

export default function ProtectedArtworkDetailPage({
  artworkId,
}: ProtectedArtworkDetailPageProps) {
  const router = useRouter();
  const [protectedArtwork, setProtectedArtwork] = useState<ABC>();
  // const artwork = protectedArtworks.find((art) => art.id === artworkId);
  // const details = protectedArtworkDetails.find(
  //   (detail) => detail.artworkId === artworkId,
  // );

  useEffect(() => {
    const generateStaticParams = async () => {
      const protectedArtworks = await fetch('/api/me/protected-sale-artworks');
     
      if (!protectedArtworks.ok) {
        console.error('Failed to fetch protected artworks');
        return [];
      }
      const protectedArtworksData = await protectedArtworks.json() as ProtectedSaleArtWorks;

      if (!protectedArtworksData) {
        return [];
      }

      const result = protectedArtworksData.protectedArtworks.find((artwork) => artwork.id === artworkId);
      if (result) {
        setProtectedArtwork(result);
      } else {
        console.error('Artwork not found');
      }
    }
    generateStaticParams();
    }, []);

  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    router.push(`/me/protected/${artworkId}/edit`);
  };

  const handleStartTracking = () => {
    // Navigate to tracking or implement tracking logic
    console.log("Start tracking artwork:", artworkId);
  };

  const handleConvertToForSale = () => {
    router.push(`/me/for-sale/${artworkId}/edit`);
  };

  if (!protectedArtwork) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <p className="text-muted-foreground">Artwork not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollArea className="h-screen">
        <div className="pb-48 lg:pb-8">
          {/* Header */}
          <div className="mx-auto flex max-w-7xl items-center justify-between border-b border-border px-6 py-4 lg:px-12">
            <div className="flex items-center gap-4">
              <button onClick={handleBack} className="-ml-2 p-2">
                <ArrowLeft size={24} className="text-foreground" />
              </button>
              <h1 className="truncate text-lg font-semibold">
                {protectedArtwork.title}
              </h1>
            </div>

            <button
              onClick={handleEdit}
              className="rounded-lg p-2 transition-colors hover:bg-muted"
            >
              <PencilSimple size={24} className="text-foreground" />
            </button>
          </div>

          <div className="mx-auto max-w-7xl px-6 py-6 lg:px-12">
            {/* Responsive Layout */}
            <div className="lg:flex lg:items-start lg:gap-12">
              {/* Artwork Image - Left Side on Desktop */}
              <div className="mb-8 lg:mb-0 lg:flex-shrink-0">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl bg-muted lg:mx-0 lg:h-[480px] lg:w-96">
                  <img
                    src={protectedArtwork.image}
                    alt={protectedArtwork.title}
                    className="h-full w-full object-cover"
                  />

                  {/* Grid overlay to show protection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10">
                    <div className="absolute inset-0 opacity-20">
                      <div className="grid-rows-10 grid h-full w-full grid-cols-8">
                        {Array.from({ length: 80 }).map((_, i) => (
                          <div key={i} className="border border-white/10" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content - Right Side on Desktop */}
              <div className="space-y-6 lg:flex-1">
                {/* Title */}
                <h2 className="text-2xl font-bold text-foreground lg:text-3xl">
                  {protectedArtwork.title}
                </h2>

                {/* Details */}
                <div className="space-y-2 text-muted-foreground">
                  <p className="text-base">
                    {protectedArtwork.year} | {protectedArtwork.artist}
                  </p>
                  <p className="text-base">
                    {protectedArtwork.dimensions} | {protectedArtwork.medium}
                  </p>
                  <p className="text-base">{protectedArtwork.edition}</p>
                </div>

                {/* Description */}
                <div>
                  <p className="text-base leading-relaxed text-foreground lg:text-lg">
                    {protectedArtwork.description}
                  </p>
                </div>

                <div className="flex w-full gap-4">
                  {/* Start Tracking Button - Desktop */}
                  <div className="hidden pt-4 lg:block">
                    <Button
                      onClick={handleStartTracking}
                      className="w-[240px] rounded-2xl bg-primary py-4 text-lg font-semibold text-white hover:bg-primary/90"
                    >
                      Start Tracking
                    </Button>
                  </div>

                  {/* For Sale Button - TODO: 클릭시 해당 이미지 For Sale Edit 화면으로 전환, 등록 후 Me page에서 Protected->For Sale로 이동 @gawon */}
                  <div className="hidden pt-4 lg:block">
                    <Button
                      onClick={handleConvertToForSale}
                      className="w-[240px] rounded-2xl border border-primary py-4 text-lg font-semibold text-primary hover:bg-secondary"
                      variant="outline"
                    >
                      Put on Sale
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Fixed For Sale & Start Tracking Button - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background p-6 lg:hidden">
        <div className="flex flex-col gap-3">
          <Button
            onClick={handleStartTracking}
            className="w-full rounded-2xl bg-primary py-4 text-lg font-semibold text-white hover:bg-primary/90"
          >
            Start Tracking
          </Button>

          <Button
            onClick={handleConvertToForSale}
            className="w-full rounded-2xl border border-primary py-4 text-lg font-semibold text-primary"
            variant="outline"
          >
            Put on Sale
          </Button>
        </div>
      </div>
    </div>
  );
}
