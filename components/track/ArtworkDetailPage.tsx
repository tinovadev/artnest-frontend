'use client';

import { ArrowLeft, Shield, Eye, Calendar, MapPin, Download } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import TopNavbar from '@/components/shared/TopNavbar';
import { useRouter } from 'next/navigation';
import { trackingArtworks } from '@/data/tracking';
import { detectionResults } from '@/data/detection-results';

interface ArtworkDetailPageProps {
  artworkId: string;
}

export default function ArtworkDetailPage({ artworkId }: ArtworkDetailPageProps) {
  const router = useRouter();
  const artwork = trackingArtworks.find(art => art.id === artworkId);
  const results = detectionResults.find(result => result.artworkId === artworkId);

  const handleBack = () => {
    router.back();
  };

  const handleViewDetails = (detectionIndex: number) => {
    router.push(`/track/${artworkId}/similarity/${detectionIndex}`);
  };

  if (!artwork) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-muted-foreground">Artwork not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNavbar />
      
      <ScrollArea className="h-screen">
        <div className="pb-8 lg:pt-20">
          {/* Header */}
          <div className="flex items-center gap-4 px-6 lg:px-12 py-4 border-b border-border max-w-7xl mx-auto w-full">
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
                <div className="relative rounded-2xl overflow-hidden bg-muted aspect-square max-w-md mx-auto lg:mx-0 lg:w-96 lg:h-96">
                  <img 
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content - Right Side on Desktop */}
              <div className="lg:flex-1 space-y-8">
                {/* Status and Info */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{artwork.title}</h2>
                    <Badge 
                      variant="secondary"
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        artwork.status === 'tracking' 
                          ? 'bg-primary/20 text-primary border-primary/30' 
                          : 'bg-muted text-muted-foreground border-border'
                      }`}
                    >
                      {artwork.status === 'tracking' ? 'Tracking' : 'Stopped'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>Latest: {artwork.latestDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye size={16} />
                      <span>Search Complete</span>
                    </div>
                  </div>

              
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-xl">
                      Track Now
                    </Button>
                 
                </div>

                {/* Detection Results */}
                {results && (
                  <div className="space-y-6">
                    <h3 className="text-xl lg:text-2xl font-bold text-foreground">Detection Results</h3>
                    
                    {/* Summary Card */}
                    <Card className="bg-secondary border-border rounded-2xl p-6">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">
                            {results.totalDetections}
                          </div>
                          <div className="text-sm lg:text-base text-muted-foreground">Total Detections</div>
                        </div>
                        <div>
                          <div className="text-2xl lg:text-3xl font-bold text-success mb-1">
                            {results.verifiedThefts}
                          </div>
                          <div className="text-sm lg:text-base text-muted-foreground">Verified Thefts</div>
                        </div>
                      </div>
                    </Card>

                    {/* Detection List */}
                    <div className="space-y-4">
                      {results.detections.map((detection, index) => (
                        <Card key={index} className="bg-secondary border-border rounded-2xl p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                              <img 
                                src={detection.image}
                                alt="Detection result"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-semibold text-foreground truncate pr-2 text-base lg:text-lg">
                                  {detection.source}
                                </h4>
                                <Badge 
                                  variant="secondary"
                                  className={`flex-shrink-0 px-2 py-1 text-xs rounded-full ${
                                    detection.similarity >= 90 
                                      ? 'bg-red-500/20 text-red-400 border-red-500/30'
                                      : detection.similarity >= 70
                                      ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                                      : 'bg-green-500/20 text-green-400 border-green-500/30'
                                  }`}
                                >
                                  {detection.similarity}% Similar
                                </Badge>
                              </div>
                              
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                <div className="flex items-center gap-1">
                                  <Calendar size={14} />
                                  <span>{detection.detectedDate}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin size={14} />
                                  <span>{detection.platform}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <Button 
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleViewDetails(index)}
                                  className="bg-transparent border-border text-foreground hover:bg-muted text-xs px-3 py-1 h-8 rounded-xl"
                                >
                                  View Details
                                </Button>
                                <Button 
                                  size="sm"
                                  variant="outline"
                                  className="bg-transparent border-border text-foreground hover:bg-muted text-xs px-3 py-1 h-8 rounded-xl"
                                >
                                  <Download size={14} className="mr-1" />
                                  Report
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}