'use client';

import { ArrowLeft, PencilSimple } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';
import { forSaleArtworks } from '@/data/for-sale-artworks';
import { forSaleArtworkDetails } from '@/data/for-sale-artwork-details';

interface ForSaleArtworkDetailPageProps {
  artworkId: string;
}

export default function ForSaleArtworkDetailPage({ artworkId }: ForSaleArtworkDetailPageProps) {
  const router = useRouter();
  const artwork = forSaleArtworks.find(art => art.id === artworkId);
  const details = forSaleArtworkDetails.find(detail => detail.artworkId === artworkId);

  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    router.push(`/me/for-sale/${artworkId}/edit`);
  };

  const handleCheckTotalRoyalty = () => {
    // Navigate to royalty details or implement royalty check
    console.log('Check total royalty for artwork:', artworkId);
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
        <div className="pb-8">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
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

          <div className="px-6 py-6 max-w-2xl mx-auto">
            {/* Artwork Image */}
            <div className="mb-8">
              <div className="relative rounded-3xl overflow-hidden bg-muted aspect-[4/5] w-full max-w-md mx-auto">
                <img 
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-6">
              {/* Title and Price */}
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  {artwork.title}
                </h2>
                <p className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  ${artwork.price}
                </p>
                
                <div className="space-y-1 text-muted-foreground">
                  <p>{details.year} | {details.artist}</p>
                  <p>{details.dimensions} | {details.medium}</p>
                  <p>{details.edition}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-foreground leading-relaxed text-base">
                  {details.description}
                </p>
              </div>

              {/* About the Artist */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">About the Artist</h3>
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
                <h3 className="text-lg font-semibold text-foreground mb-4">Royalty per Use</h3>
                <Card className="bg-secondary border-border rounded-2xl p-6">
                  <div className="text-2xl font-bold text-foreground mb-2">
                    ${details.royalty.pricePerUse.toFixed(2)} / use
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {details.royalty.description}
                  </p>
                  
                  <Button 
                    onClick={handleCheckTotalRoyalty}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-xl"
                  >
                    Check Total Royalty
                  </Button>
                </Card>
              </div>

              {/* AI Usage License */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">AI Usage License</h3>
                <Card className="bg-secondary border-border rounded-2xl p-6">
                  <div className="space-y-3">
                    {details.license.permissions.map((permission, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-success rounded-full flex-shrink-0"></div>
                        <span className="text-foreground">{permission}</span>
                      </div>
                    ))}
                    {details.license.restrictions.map((restriction, index) => (
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
                <h3 className="text-lg font-semibold text-foreground mb-4">File Details</h3>
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
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}