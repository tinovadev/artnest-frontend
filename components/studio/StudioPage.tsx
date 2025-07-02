"use client";

import { Coin, Plus, ShoppingCart } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "@/components/shared/Navbar";
import TopNavbar from "@/components/shared/TopNavbar";
import { studioArtworks } from "@/data/studio-artworks";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CoinButton from "../coin-withdrawal/CoinButton";

export default function StudioPage() {
  const router = useRouter();
  const [cart, setCart] = useState<string[]>([]);

  const handleAddToCart = (artworkId: string) => {
    setCart((prev) => [...prev, artworkId]);
    // Add visual feedback or toast notification here
  };

  const handleArtworkClick = (artworkId: string) => {
    router.push(`/studio/${artworkId}`);
  };

  const handleCartClick = () => {
    router.push("/cart");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNavbar />

      <ScrollArea className="mb-9 h-screen">
        <div className="pb-20 lg:pb-8 lg:pt-20">
          {/* Header */}
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12">
            <h1 className="font-pixel text-2xl font-bold text-foreground lg:text-3xl">
              Studio
            </h1>

            <div className="flex gap-2">
              <button
                onClick={handleCartClick}
                className="relative rounded-xl p-2 transition-colors hover:bg-muted"
              >
                <ShoppingCart size={24} className="text-foreground" />
                {cart.length > 0 && (
                  <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                    <span className="text-xs font-bold text-white">
                      {cart.length}
                    </span>
                  </div>
                )}
              </button>

              <div className="lg:hidden">
                <CoinButton />
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            {/* Artwork Grid */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
              {studioArtworks.map((artwork) => (
                <Card
                  key={artwork.id}
                  className="group cursor-pointer overflow-hidden rounded-2xl border-0 bg-secondary transition-transform duration-200 hover:scale-[1.02]"
                  onClick={() => handleArtworkClick(artwork.id)}
                >
                  {/* Artwork Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="h-full w-full object-cover"
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  </div>

                  {/* Artwork Info */}
                  <div className="p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 className="mb-1 truncate text-sm font-semibold text-foreground lg:text-base">
                          {artwork.title}
                        </h3>
                        <p className="text-lg font-bold text-foreground lg:text-xl">
                          ${artwork.price}
                        </p>
                      </div>

                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(artwork.id);
                        }}
                        className="ml-2 h-8 w-8 flex-shrink-0 rounded-full bg-primary p-0 text-white hover:bg-primary/90 lg:h-10 lg:w-10"
                      >
                        <Plus size={16} weight="bold" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      <Navbar />
    </div>
  );
}
