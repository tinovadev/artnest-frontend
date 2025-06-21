'use client';

import { Plus, ShoppingCart } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Navbar from '@/components/shared/Navbar';
import { studioArtworks } from '@/data/studio-artworks';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudioPage() {
  const router = useRouter();
  const [cart, setCart] = useState<string[]>([]);

  const handleAddToCart = (artworkId: string) => {
    setCart(prev => [...prev, artworkId]);
    // Add visual feedback or toast notification here
  };

  const handleArtworkClick = (artworkId: string) => {
    router.push(`/studio/${artworkId}`);
  };

  const handleCartClick = () => {
    router.push('/cart');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollArea className="h-screen">
        <div className="pb-20 lg:pb-8">
          {/* Header */}
          <div className="flex items-center justify-between px-6 lg:px-12 py-6 max-w-7xl mx-auto">
            <h1 className="text-2xl lg:text-3xl font-pixel font-bold text-foreground">
              Studio
            </h1>
            
            <button 
              onClick={handleCartClick}
              className="p-2 hover:bg-muted rounded-lg transition-colors relative"
            >
              <ShoppingCart size={24} className="text-foreground" />
              {cart.length > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{cart.length}</span>
                </div>
              )}
            </button>
          </div>

          <div className="px-6 lg:px-12 max-w-7xl mx-auto">
            {/* Artwork Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {studioArtworks.map((artwork) => (
                <Card 
                  key={artwork.id} 
                  className="bg-secondary border-0 rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
                  onClick={() => handleArtworkClick(artwork.id)}
                >
                  {/* Artwork Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>

                  {/* Artwork Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm lg:text-base font-semibold text-foreground truncate mb-1">
                          {artwork.title}
                        </h3>
                        <p className="text-lg lg:text-xl font-bold text-foreground">
                          ${artwork.price}
                        </p>
                      </div>
                      
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(artwork.id);
                        }}
                        className="bg-primary hover:bg-primary/90 text-white rounded-full w-8 h-8 lg:w-10 lg:h-10 p-0 flex-shrink-0 ml-2"
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