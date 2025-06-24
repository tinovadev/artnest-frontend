'use client';

import { ArrowLeft, Check, X } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';
import { studioArtworks } from '@/data/studio-artworks';
import { artworkDetails } from '@/data/artwork-details';

interface ArtworkDetailPageProps {
  artworkId: string;
}

export default function ArtworkDetailPage({ artworkId }: ArtworkDetailPageProps) {
  const router = useRouter();
  const artwork = studioArtworks.find(art => art.id === artworkId);
  const details = artworkDetails.find(detail => detail.artworkId === artworkId);

  const handleBack = () => {
    router.back();
  };

  const handleGoToCart = () => {
    // Navigate to cart page
    router.push('/cart');
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
          <div className="flex items-center gap-4 px-6 lg:px-12 py-4 border-b border-border max-w-7xl mx-auto">
            <button onClick={handleBack} className="p-2 -ml-2">
              <ArrowLeft size={24} className="text-foreground" />
            </button>
            <h1 className="text-lg font-semibold truncate">{artwork.title}</h1>
          </div>

          <div className="px-6 lg:px-12 py-6 max-w-7xl mx-auto">
            {/* Responsive Layout */}
            <div className="lg:flex lg:gap-12 lg:items-start">
              {/* Artwork Image - Left Side on Desktop */}
              <div className="lg:flex-shrink-0 mb-8 lg:mb-0">
                <div className="relative rounded-2xl overflow-hidden bg-muted aspect-[4/5] max-w-sm mx-auto lg:mx-0 lg:w-96 lg:h-[480px]">
                  <img 
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content - Right Side on Desktop */}
              <div className="lg:flex-1 lg:max-w-2xl space-y-8">
                {/* Basic Info */}
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">{artwork.title}</h2>
                  <p className="text-2xl lg:text-3xl font-bold text-foreground mb-4">${artwork.price}</p>
                  
                  <div className="space-y-1 text-muted-foreground">
                    <p>{details.year} | {details.artist}</p>
                    <p>{details.dimensions} | {details.medium}</p>
                    <p>{details.edition}</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="text-foreground leading-relaxed text-base lg:text-lg">
                    {details.description}
                  </p>
                </div>

                {/* About the Artist */}
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-4">About the Artist</h3>
                  <Card className="bg-secondary border-border rounded-2xl p-6">
                    <p className="text-foreground mb-4">{details.artistBio.title}</p>
                    <ul className="space-y-2 text-muted-foreground">
                      {details.artistBio.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
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
                      ${details.royalty.pricePerUse.toFixed(2)} / use
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {details.royalty.description}
                    </p>
                  </Card>
                </div>

                {/* AI Usage License */}
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-4">AI Usage License</h3>
                  <Card className="bg-secondary border-border rounded-2xl p-6">
                    <div className="space-y-3">
                      {details.license.permissions.map((permission, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Check size={20} className="text-success flex-shrink-0" />
                          <span className="text-foreground">{permission}</span>
                        </div>
                      ))}
                      {details.license.restrictions.map((restriction, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <X size={20} className="text-red-400 flex-shrink-0" />
                          <span className="text-foreground">{restriction}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* File Details */}
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-4">File Details</h3>
                  <Card className="bg-secondary border-border rounded-2xl p-6">
                    <div className="space-y-2 text-muted-foreground">
                      <p><span className="text-foreground font-medium">Format:</span> {details.fileDetails.format}</p>
                      <p><span className="text-foreground font-medium">Dimensions:</span> {details.fileDetails.dimensions}</p>
                      <p><span className="text-foreground font-medium">Size:</span> {details.fileDetails.size}</p>
                      <p><span className="text-foreground font-medium">Uploaded:</span> {details.fileDetails.uploaded}</p>
                      <p><span className="text-foreground font-medium">Version:</span> {details.fileDetails.version}</p>
                    </div>
                  </Card>
                </div>

                {/* Go to Cart Button - Desktop */}
                <div className="hidden lg:block">
                  <Button 
                    onClick={handleGoToCart}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-2xl text-lg"
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
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background border-t border-border lg:hidden">
        <Button 
          onClick={handleGoToCart}
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-2xl text-lg"
        >
          Go to Cart
        </Button>
      </div>
    </div>
  );
}