"use client";

import { useEffect, useState } from "react";

import { ArrowLeft, Check, X } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { StudioArtwork } from "@/data/studio-artworks";
import { ArtworkDetails } from "@/data/artwork-details";

interface ArtworkDetailPageProps {
  artworkId: string;
}

export default function ArtworkDetailPage({
  artworkId,
}: ArtworkDetailPageProps) {
  const router = useRouter();

  const [studioArtwork, setStudioArtwork] = useState<StudioArtwork | null>(null);
  const [artworkDetail, setArtworkDetail] = useState<ArtworkDetails | null>(null);

  useEffect(() => {
    if (!artworkId) return;

    const fetchArtworkDetail = async () => {
      try {
        const res = await fetch('/api/artwork-details?artworkId=' + artworkId);
        if (!res.ok) {
          throw new Error('Failed to fetch artwork details')
        };

        const data: ArtworkDetails = await res.json();
        if (!data) {
          console.error('Artwork not found for ID:', artworkId);
          return;
        }

        setArtworkDetail(data);
      } catch (err) {
        console.error('Error fetching artwork details:', err);
      }
    };

    const fetchStudioArtworks = async () => {
      try {
        const res = await fetch('/api/studio-artworks?artworkId=' + artworkId);
        if (!res.ok) {
          throw new Error('Failed to fetch studio artworks')
        };

        const data: StudioArtwork[] = await res.json();
        const result = data.find((art) => art.id === artworkId) ?? null;
        setStudioArtwork(result);
      } catch (err) {
        console.error('Error fetching studio artworks:', err);
      }
    };

    fetchArtworkDetail();
    fetchStudioArtworks();
  }, [artworkId]);


  const handleBack = () => {
    router.back();
  };

  const handleGoToCart = () => {
    // Navigate to cart page
    const cart = sessionStorage.getItem("artCart");
    let cartList = null;
    if (cart) {
      cartList = JSON.parse(cart);
    }

    if (cartList.includes(artworkId) === false) {
      cartList.push(artworkId);
    }

    sessionStorage.setItem("artCart", JSON.stringify(cartList));
    router.push("/cart");
  };

  if (!studioArtwork || !artworkDetail) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <p className="text-muted-foreground">Artwork not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollArea className="h-screen">
        <div className="pb-32 lg:pb-8">
          {/* Header */}
          <div className="mx-auto flex max-w-7xl items-center gap-4 border-b border-border px-6 py-4 lg:px-12">
            <button onClick={handleBack} className="-ml-2 p-2">
              <ArrowLeft size={24} className="text-foreground" />
            </button>
            <h1 className="truncate text-lg font-semibold">{studioArtwork.title}</h1>
          </div>

          <div className="mx-auto max-w-7xl px-6 py-6 lg:px-12">
            {/* Responsive Layout */}
            <div className="lg:flex lg:items-start lg:gap-12">
              {/* Artwork Image - Left Side on Desktop */}
              <div className="mb-8 lg:mb-0 lg:flex-shrink-0">
                <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-2xl bg-muted lg:mx-0 lg:h-[480px] lg:w-96">
                  <img
                    src={studioArtwork.image}
                    alt={studioArtwork.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Content - Right Side on Desktop */}
              <div className="space-y-8 lg:flex-1">
                {/* Basic Info */}
                <div>
                  <h2 className="mb-2 text-2xl font-bold text-foreground lg:text-3xl">
                    {studioArtwork.title}
                  </h2>
                  <p className="mb-4 text-2xl font-bold text-foreground lg:text-3xl">
                    ${studioArtwork.price}
                  </p>

                  <div className="space-y-1 text-muted-foreground">
                    <p>
                      {artworkDetail.year} | {artworkDetail.artist}
                    </p>
                    <p>
                      {artworkDetail.dimensions} | {artworkDetail.medium}
                    </p>
                    <p>{artworkDetail.edition}</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="text-base leading-relaxed text-foreground lg:text-lg">
                    {artworkDetail.description}
                  </p>
                </div>

                {/* About the Artist */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-foreground lg:text-xl">
                    About the Artist
                  </h3>
                  <Card className="rounded-2xl border-border bg-secondary p-6">
                    <p className="mb-4 text-foreground">
                      {artworkDetail.artistBio.title}
                    </p>
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
                  <h3 className="mb-4 text-lg font-semibold text-foreground lg:text-xl">
                    Royalty per Use
                  </h3>
                  <Card className="rounded-2xl border-border bg-secondary p-6">
                    <div className="mb-2 text-2xl font-bold text-foreground">
                      ${artworkDetail.royalty.pricePerUse.toFixed(2)} / use
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {artworkDetail.royalty.description}
                    </p>
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
                          <Check
                            size={20}
                            className="flex-shrink-0 text-success"
                          />
                          <span className="text-foreground">{permission}</span>
                        </div>
                      ))}
                      {artworkDetail.license.restrictions.map(
                        (restriction, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <X
                              size={20}
                              className="flex-shrink-0 text-red-400"
                            />
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
                        {artworkDetail.fileDetails.format}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">
                          Dimensions:
                        </span>{" "}
                        {artworkDetail.fileDetails.dimensions}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">
                          Size:
                        </span>{" "}
                        {artworkDetail.fileDetails.size}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">
                          Uploaded:
                        </span>{" "}
                        {artworkDetail.fileDetails.uploaded}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">
                          Version:
                        </span>{" "}
                        {artworkDetail.fileDetails.version}
                      </p>
                    </div>
                  </Card>
                </div>

                {/* Go to Cart Button - Desktop */}
                <div className="hidden lg:flex lg:justify-end">
                  <Button
                    onClick={handleGoToCart}
                    className="w-full rounded-2xl bg-primary py-4 text-lg font-semibold text-white hover:bg-primary/90"
                  >
                    Go to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Fixed Go to Cart Button - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background p-6 lg:hidden">
        <Button
          onClick={handleGoToCart}
          className="w-full rounded-2xl bg-primary py-4 text-lg font-semibold text-white hover:bg-primary/90"
        >
          Go to Cart
        </Button>
      </div>
    </div>
  );
}
