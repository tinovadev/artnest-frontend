"use client";

import { Plus, ShoppingCart, Minus } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "@/components/shared/Navbar";
import TopNavbar from "@/components/shared/TopNavbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArtworkCard } from "@/lib/ddl.type";

export default function StudioPage() {
  const CART_KEY = 'artCart';
  const router = useRouter();
  const [cart, setCart] = useState<string[]>([]);

  const [studioArtworks, setStudioArtworks] = useState<ArtworkCard[]>([]);

  useEffect(() => {
    const getStudioArtworks = async () => {
        try {
          const studioArtworkData = await fetch("/api/studio-artworks");
        if (!studioArtworkData.ok) {
          console.error("Failed to fetch studio artworks");
          return [];
        }
        const artworks = await studioArtworkData.json();
        setStudioArtworks(artworks); 
      } catch (err) {
        console.error("Error fetching studio artworks:", err);
        return [];
      }
    };
    const storedCart = sessionStorage.getItem(CART_KEY);
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {
        console.error("Invalid cart data in sessionStorage");
      }
    }
    getStudioArtworks();  
  }, []);

    useEffect(() => {
      if (cart.length > 0) {
        sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
        return;
      }
    }, [cart]);


  const handleAddOrRemoveToCart = (artworkId: string) => {
    if (cart.includes(artworkId)) {
      setCart((prev) => prev.filter((id) => id !== artworkId));
      return;
    }

    setCart((prev) => [...prev, artworkId]);
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

            <button
              onClick={handleCartClick}
              className="relative rounded-lg p-2 transition-colors hover:bg-muted"
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
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            {/* Artwork Grid */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
              {studioArtworks.map((artwork) => {
                // artiwork.id 가 cart 에 있는지 확인하고, 있으면 remove 버튼을 보여주고, 없으면 add 버튼을 보여줌
                const isInCart = cart.includes(artwork.id);
                
                return <Card
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
                          handleAddOrRemoveToCart(artwork.id);
                        }}
                        className="ml-2 h-8 w-8 flex-shrink-0 rounded-full bg-primary p-0 text-white hover:bg-primary/90 lg:h-10 lg:w-10"
                      >
                        {/* subtraction */}
                        {isInCart ? <Minus size={16} weight="bold" /> : <Plus size={16} weight="bold" />}
                      </Button>
                    </div>
                  </div>
                </Card>
            })} 
            </div>
          </div>
        </div>
      </ScrollArea>

      <Navbar />
    </div>
  );
}
