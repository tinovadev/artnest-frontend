"use client";




import { useEffect, useState } from 'react';
// @/data/ 폴더 봐야함
import { ArtworkDetails } from '@/data/artwork-details';
import { ArrowLeft, PencilSimple } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import TotalRoyaltyDrawer from "./TotalRoyaltyDrawer";

interface ForSaleArtworkDetailPageProps {
  artworkId: string;
}

export default function ForSaleArtworkDetailPage({
  artworkId,
}: ForSaleArtworkDetailPageProps) {
  const router = useRouter();
  const [isRoyaltyDrawerOpen, setIsRoyaltyDrawerOpen] = useState(false);
  // const details = forSaleArtworkartworkDetail.find(detail => detail.artworkId === artworkId);
  const [artworkDetail, setArtworkDetail] = useState<ArtworkDetails | null>(null);
  const [protectedArtwork, setProtectedArtwork] = useState<any>(null);

  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    router.push(`/me/for-sale/${artworkId}/edit`);
  };

  const handleCheckTotalRoyalty = () => {
    console.log("Checking total royalty for artwork:", artworkDetail);
    setIsRoyaltyDrawerOpen(true);
  };

  useEffect(() => {
    const generateStaticParams = async () => {
      const res = await fetch('/api/artwork-details?artworkId=' + artworkId);
      if (!res.ok) {
        throw new Error('Failed to fetch artwork details')
      };

      const data: ArtworkDetails = await res.json();
      console.log('Fetched artwork details:', data);
      if (!data) {
        console.error('Artwork not found for ID:', artworkId);
        return;
      } else {
        console.log('Artwork details fetched:', data);
        setArtworkDetail(data);
      }

      const res2 = await fetch('/api/protected-artworks');
      if (!res2.ok) {
        console.error('Failed to fetch protected artworks');
        return;
      }
      const protectedArtworksData = await res2.json();
      if (!protectedArtworksData) {
        console.error('Protected artworks data not found');
        return;
      }

      const result2 = protectedArtworksData.find((artwork: any) => artwork.id === artworkId);
      if (result2) {
        console.log('Protected artwork found:', result2);
        setProtectedArtwork(result2);
      } else {
        console.error('Protected artwork not found for ID:', artworkId);
      }
    }
    generateStaticParams();
  }, [artworkId]);

  if (!artworkDetail || !protectedArtwork) {
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
              <h1 className="text-lg font-semibold truncate">{protectedArtwork.title}</h1>
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
              <div className="lg:flex-shrink-0 mb-8 lg:mb-0">
                <div className="relative rounded-3xl overflow-hidden bg-muted aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 lg:w-96 lg:h-[480px]">
                  <img 
                    src={protectedArtwork.image}
                    alt={protectedArtwork.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content - Right Side on Desktop */}
              <div className="space-y-8 lg:flex-1">
                {/* Basic Info */}
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                    {protectedArtwork.title}
                  </h2>
                  <p className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                    ${protectedArtwork.price}
                  </p>

                  <div className="space-y-1 text-muted-foreground">
                    <p>{artworkDetail.year} | {artworkDetail.artist}</p>
                    <p>{artworkDetail.dimensions} | {artworkDetail.medium}</p>
                    <p>{artworkDetail.edition}</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="text-foreground leading-relaxed text-base lg:text-lg">
                    {artworkDetail.description}
                  </p>
                </div>

                {/* About the Artist */}
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-4">About the Artist</h3>
                  <Card className="bg-secondary border-border rounded-2xl p-6">
                    <p className="text-foreground mb-4">{artworkDetail.artistBio.title}</p>
                    <ul className="space-y-2 text-muted-foreground">
                      {artworkDetail.artistBio.highlights.map((highlight, index) => (
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
                  <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-4">Royalty per Use</h3>
                  <Card className="bg-secondary border-border rounded-2xl p-6">
                    <div className="text-2xl font-bold text-foreground mb-2">
                      ${artworkDetail.royalty.pricePerUse.toFixed(2)} / use
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                      {artworkDetail.royalty.description}
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
                      {artworkDetail.license.permissions.map((permission, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="h-2 w-2 flex-shrink-0 rounded-full bg-success"></div>
                          <span className="text-foreground">{permission}</span>
                        </div>
                      ))}
                      {artworkDetail.license.restrictions.map((restriction, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                          <span className="text-foreground">{restriction}</span>
                        </div>
                      ))}
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
                      <p><span className="text-foreground font-medium">Format:</span> {artworkDetail.fileDetails.format}</p>
                      <p><span className="text-foreground font-medium">Dimensions:</span> {artworkDetail.fileDetails.dimensions}</p>
                      <p><span className="text-foreground font-medium">Size:</span> {artworkDetail.fileDetails.size}</p>
                      <p><span className="text-foreground font-medium">Uploaded:</span> {artworkDetail.fileDetails.uploaded}</p>
                      <p><span className="text-foreground font-medium">Version:</span> {artworkDetail.fileDetails.version}</p>
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
        artwork={protectedArtwork}
        details={artworkDetail}
      />
    </div>
  );
}
