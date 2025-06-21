'use client';

import { ArrowLeft, Download } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import TopNavbar from '@/components/shared/TopNavbar';
import { useRouter } from 'next/navigation';
import { trackingArtworks } from '@/data/tracking';
import { detectionResults } from '@/data/detection-results';

interface SimilarityScanPageProps {
  artworkId: string;
  detectionId: string;
}

export default function SimilarityScanPage({ artworkId, detectionId }: SimilarityScanPageProps) {
  const router = useRouter();
  const artwork = trackingArtworks.find(art => art.id === artworkId);
  const results = detectionResults.find(result => result.artworkId === artworkId);
  const detection = results?.detections[parseInt(detectionId)];

  const handleBack = () => {
    router.back();
  };

  const handleDownloadReport = () => {
    // Implement download report functionality
    console.log('Downloading report...');
  };

  if (!artwork || !detection) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-muted-foreground">Detection not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNavbar />
      
      <ScrollArea className="h-screen">
        <div className="pb-8 lg:pt-20">
          {/* Header */}
          <div className="flex items-center gap-4 px-6 lg:px-12 py-4 border-b border-border">
            <button onClick={handleBack} className="p-2 -ml-2">
              <ArrowLeft size={24} className="text-foreground" />
            </button>
            <h1 className="text-lg font-semibold">Similarity Scan</h1>
          </div>

          <div className="px-6 lg:px-12 py-6 max-w-7xl mx-auto">
            {/* Responsive Layout */}
            <div className="lg:flex lg:gap-12 lg:items-start">
              {/* Comparison Images - Left Side on Desktop */}
              <div className="lg:flex-shrink-0 mb-8 lg:mb-0">
                <div className="grid grid-cols-2 gap-0 rounded-2xl overflow-hidden max-w-md mx-auto lg:mx-0 lg:w-96">
                  {/* Original Artwork */}
                  <div className="relative">
                    <div className="bg-primary text-white text-center py-2 text-xs lg:text-sm font-medium">
                      Original Artwork
                    </div>
                    <div className="aspect-square bg-muted">
                      <img 
                        src={artwork.image}
                        alt="Original artwork"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Matched Artwork */}
                  <div className="relative">
                    <div className="bg-primary text-white text-center py-2 text-xs lg:text-sm font-medium">
                      Matched Artwork
                    </div>
                    <div className="aspect-square bg-muted">
                      <img 
                        src={detection.image}
                        alt="Matched artwork"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content - Right Side on Desktop */}
              <div className="lg:flex-1 lg:max-w-2xl space-y-8">
                {/* Similarity Score */}
                <div>
                  <h2 className="text-lg lg:text-xl font-semibold mb-4">Similarity</h2>
                  <div className="text-4xl lg:text-6xl font-pixel font-bold text-primary mb-2">
                    {detection.similarity}%
                  </div>
                </div>

                {/* Artwork Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Original Artwork</h3>
                    <p className="text-muted-foreground">
                      "{artwork.title}" by @linalee
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Matched Artwork</h3>
                    <p className="text-muted-foreground">
                      "{detection.source}" found on {detection.platform.toLowerCase()}
                    </p>
                  </div>
                </div>

                {/* Detected Similarities */}
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold mb-4">Detected Similarities</h3>
                  
                  <div className="space-y-4">
                    {/* Color Palette */}
                    <Card className="bg-secondary border-border rounded-2xl p-6">
                      <h4 className="font-semibold mb-3">Color Palette</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Over 85% overlap in dominant hues — especially in the oranges, midnight blues, and soft whites used in the sky and the sun.
                      </p>
                    </Card>

                    {/* Composition */}
                    <Card className="bg-secondary border-border rounded-2xl p-6">
                      <h4 className="font-semibold mb-3">Composition</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Nearly identical layout: the sun on the left, with a human face positioned below.
                      </p>
                    </Card>

                    {/* Lighting & Mood */}
                    <Card className="bg-secondary border-border rounded-2xl p-6">
                      <h4 className="font-semibold mb-3">Lighting & Mood</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Overall atmospheric tone and soft light gradient is remarkably similar.
                      </p>
                    </Card>
                  </div>
                </div>

                {/* Download Report Button */}
                <Button 
                  onClick={handleDownloadReport}
                  className="w-full lg:max-w-md bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-2xl text-lg"
                >
                  Download Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}