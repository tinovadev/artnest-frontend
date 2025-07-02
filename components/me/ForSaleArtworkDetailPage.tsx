"use client";

import { ArrowLeft, PencilSimple } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { forSaleArtworks } from "@/data/for-sale-artworks";
import { forSaleArtworkDetails } from "@/data/for-sale-artwork-details";
import TotalRoyaltyDrawer from "./TotalRoyaltyDrawer";

interface ForSaleArtworkDetailPageProps {
  artworkId: string;
}

export default function ForSaleArtworkDetailPage({
  artworkId,
}: ForSaleArtworkDetailPageProps) {
  const router = useRouter();
  const [isRoyaltyDrawerOpen, setIsRoyaltyDrawerOpen] = useState(false);
  const artwork = forSaleArtworks.find((art) => art.id === artworkId);
  const details = forSaleArtworkDetails.find(
    (detail) => detail.artworkId === artworkId,
  );

  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    router.push(`/me/for-sale/${artworkId}/edit`);
  };

  const handleCheckTotalRoyalty = () => {
    setIsRoyaltyDrawerOpen(true);
  };

  if (!artwork || !details) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <p className="text-muted-foreground">Artwork not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollArea className="h-screen">
        <div className="pb-8">
          {/* Header */}
          <div className="mx-auto flex max-w-7xl items-center justify-between border-b border-border px-6 py-4 lg:px-12">
            <div className="flex items-center gap-4">
              <button onClick={handleBack} className="-ml-2 p-2">
                <ArrowLeft size={24} className="text-foreground" />
              </button>
              <h1 className="truncate text-lg font-semibold">
                {artwork.title}
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
                    src={artwork.image}
                    alt={artwork.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Content - Right Side on Desktop */}
              <div className="space-y-8 lg:flex-1">
                {/* Basic Info */}
                <div>
                  <h2 className="mb-2 text-2xl font-bold text-foreground lg:text-3xl">
                    {artwork.title}
                  </h2>
                  <p className="mb-4 text-2xl font-bold text-foreground lg:text-3xl">
                    ${artwork.price}
                  </p>

                  <div className="space-y-1 text-muted-foreground">
                    <p>
                      {details.year} | {details.artist}
                    </p>
                    <p>
                      {details.dimensions} | {details.medium}
                    </p>
                    <p>{details.edition}</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="text-base leading-relaxed text-foreground lg:text-lg">
                    {details.description}
                  </p>
                </div>

                {/* About the Artist */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-foreground lg:text-xl">
                    About the Artist
                  </h3>
                  <Card className="rounded-2xl border-border bg-secondary p-6">
                    <p className="mb-4 text-foreground">
                      {details.artistBio.title}
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      {details.artistBio.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="mt-1 text-primary">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>

                {/* Royalty per Use */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-foreground lg:text-xl">
                    Royalty per Use
                  </h3>
                  <Card className="rounded-2xl border-border bg-secondary p-6">
                    <div className="mb-2 text-2xl font-bold text-foreground">
                      ${details.royalty.pricePerUse.toFixed(2)} / use
                    </div>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {details.royalty.description}
                    </p>

                    <Button
                      onClick={handleCheckTotalRoyalty}
                      className="w-full rounded-xl bg-primary py-3 font-semibold text-white hover:bg-primary/90"
                    >
                      Check Total Royalty
                    </Button>
                  </Card>
                </div>

                {/* AI Usage License */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-foreground lg:text-xl">
                    AI Usage License
                  </h3>
                  <Card className="rounded-2xl border-border bg-secondary p-6">
                    <div className="space-y-3">
                      {details.license.permissions.map((permission, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="h-2 w-2 flex-shrink-0 rounded-full bg-success"></div>
                          <span className="text-foreground">{permission}</span>
                        </div>
                      ))}
                      {details.license.restrictions.map(
                        (restriction, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="h-2 w-2 flex-shrink-0 rounded-full bg-red-400"></div>
                            <span className="text-foreground">
                              {restriction}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </Card>
                </div>

                {/* File Details */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-foreground lg:text-xl">
                    File Details
                  </h3>
                  <Card className="rounded-2xl border-border bg-secondary p-6">
                    <div className="space-y-2 text-muted-foreground">
                      <p>
                        <span className="font-medium text-foreground">
                          Format:
                        </span>{" "}
                        {details.fileDetails.format}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">
                          Dimensions:
                        </span>{" "}
                        {details.fileDetails.dimensions}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">
                          Size:
                        </span>{" "}
                        {details.fileDetails.size}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">
                          Uploaded:
                        </span>{" "}
                        {details.fileDetails.uploaded}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">
                          Version:
                        </span>{" "}
                        {details.fileDetails.version}
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Total Royalty Drawer */}
      <TotalRoyaltyDrawer
        isOpen={isRoyaltyDrawerOpen}
        onClose={() => setIsRoyaltyDrawerOpen(false)}
        artwork={artwork}
        details={details}
      />
    </div>
  );
}
