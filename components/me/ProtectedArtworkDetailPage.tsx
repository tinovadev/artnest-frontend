'use client';

import { ArrowLeft, PencilSimple } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';
import { protectedArtworks } from '@/data/protected-artworks';
import { protectedArtworkDetails } from '@/data/protected-artwork-details';

interface ProtectedArtworkDetailPageProps {
  artworkId: string;
}

export default function ProtectedArtworkDetailPage({ artworkId }: ProtectedArtworkDetailPageProps) {
  const router = useRouter();
  const artwork = protectedArtworks.find(art => art.id === artworkId);
  const details = protectedArtworkDetails.find(detail => detail.artworkId === artworkId);

  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    router.push(`/me/protected/${artworkId}/edit`);
  };

  const handleStartTracking = () => {
    // Navigate to tracking or implement tracking logic
    console.log('Start tracking artwork:', artworkId);
  };

  if (!artwork || !details) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-muted-foreground">Artwork not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollArea className="h-screen">
        <div className="pb-32 lg:pb-8">
          {/* Header */}
          <div className="flex items-center justify-between px-6 lg:px-12 py-4 border-b border-border max-w-7xl mx-auto lg:mt-20">
            <div className="flex items-center gap-4">
              <button onClick={handleBack} className="p-2 -ml-2">
                <ArrowLeft size={24} className="text-foreground" />
              </button>
              <h1 className="text-lg font-semibold truncate">{artwork.title}</h1>
            </div>
            
            <button 
              onClick={handleEdit}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <PencilSimple size={24} className="text-foreground" />
            </button>
          </div>

          <div className="px-6 lg:px-12 py-6 max-w-7xl mx-auto">
            {/* Responsive Layout */}
            <div className="lg:flex lg:gap-12 lg:items-start">
              {/* Artwork Image - Left Side on Desktop */}
              <div className="lg:flex-shrink-0 mb-8 lg:mb-0">
                <div className="relative rounded-3xl overflow-hidden bg-muted aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 lg:w-96 lg:h-[480px]">
                  <img 
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Grid overlay to show protection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10">
                    <div className="absolute inset-0 opacity-20">
                      <div className="grid grid-cols-8 grid-rows-10 h-full w-full">
                        {Array.from({ length: 80 }).map((_, i) => (
                          <div key={i} className="border border-white/10" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content - Right Side on Desktop */}
              <div className="lg:flex-1 space-y-6">
                {/* Title */}
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                  {artwork.title}
                </h2>

                {/* Details */}
                <div className="space-y-2 text-muted-foreground">
                  <p className="text-base">
                    {details.year} | {details.artist}
                  </p>
                  <p className="text-base">
                    {details.dimensions} | {details.medium}
                  </p>
                  <p className="text-base">
                    {details.edition}
                  </p>
                </div>

                {/* Description */}
                <div>
                  <p className="text-foreground leading-relaxed text-base lg:text-lg">
                    {details.description}
                  </p>
                </div>

                {/* Start Tracking Button - Desktop */}
                <div className="hidden lg:block pt-4">
                  <Button 
                    onClick={handleStartTracking}
                    className="w-full  bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-2xl text-lg"
                  >
                    Start Tracking
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Fixed Start Tracking Button - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background border-t border-border lg:hidden">
        <Button 
          onClick={handleStartTracking}
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-2xl text-lg"
        >
          Start Tracking
        </Button>
      </div>
    </div>
  );
}