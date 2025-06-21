'use client';

import { DotsThree, Info } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/shared/Navbar';
import { trackingArtworks } from '@/data/tracking';

export default function TrackPage() {
  const handleTrackNow = (artworkId: string) => {
    console.log('Tracking artwork:', artworkId);
    // Implement tracking logic here
  };

  const handleStopTracking = (artworkId: string) => {
    console.log('Stopping tracking for:', artworkId);
    // Implement stop tracking logic here
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollArea className="h-screen">
        <div className="pb-20 lg:pb-8">
          {/* Header */}
          <div className="flex items-center justify-between px-6 lg:px-12 py-6 max-w-7xl mx-auto">
            <h1 className="text-2xl lg:text-3xl font-pixel font-bold text-foreground">
              Track
            </h1>
            <button className="p-2">
              <DotsThree size={24} className="text-foreground" />
            </button>
          </div>

          <div className="px-6 lg:px-12 max-w-7xl mx-auto">
            {/* Info Banner */}
            <Card className="bg-primary/20 border-primary/30 rounded-2xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <Info size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <p className="text-primary text-sm lg:text-base font-medium">
                  Automatic tracking is performed once every day.
                </p>
              </div>
            </Card>

            {/* Artwork List */}
            <div className="space-y-4">
              {trackingArtworks.map((artwork) => (
                <Card 
                  key={artwork.id} 
                  className="bg-secondary border-border rounded-2xl p-6"
                >
                  <div className="flex items-center gap-4">
                    {/* Artwork Thumbnail */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden bg-muted">
                        <img 
                          src={artwork.image}
                          alt={artwork.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Artwork Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg lg:text-xl font-semibold text-foreground truncate pr-2">
                          {artwork.title}
                        </h3>
                        <Badge 
                          variant="secondary"
                          className={`flex-shrink-0 ${
                            artwork.status === 'tracking' 
                              ? 'bg-primary/20 text-primary border-primary/30' 
                              : 'bg-muted text-muted-foreground border-border'
                          }`}
                        >
                          {artwork.status === 'tracking' ? 'Tracking' : 'Stopped'}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        Latest Date  {artwork.latestDate}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        {artwork.status === 'tracking' ? (
                          <>
                            <Button 
                              onClick={() => handleTrackNow(artwork.id)}
                              className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-2 rounded-xl text-sm"
                            >
                              Track Now
                            </Button>
                            {artwork.canStop && (
                              <Button 
                                onClick={() => handleStopTracking(artwork.id)}
                                variant="secondary"
                                className="bg-muted hover:bg-muted/80 text-foreground font-semibold px-6 py-2 rounded-xl text-sm border-0"
                              >
                                Stop
                              </Button>
                            )}
                          </>
                        ) : (
                          <Button 
                            onClick={() => handleTrackNow(artwork.id)}
                            className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-2 rounded-xl text-sm"
                          >
                            Start Tracking
                          </Button>
                        )}
                      </div>
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