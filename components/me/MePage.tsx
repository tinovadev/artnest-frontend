'use client';

import { DotsThree, ArrowUpRight } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Navbar from '@/components/shared/Navbar';
import TopNavbar from '@/components/shared/TopNavbar';
import { protectedArtworks } from '@/data/protected-artworks';
import { useState } from 'react';

type TabType = 'protected' | 'for-sale';

export default function MePage() {
  const [activeTab, setActiveTab] = useState<TabType>('protected');

  const handleApplyArtist = () => {
    // Handle apply artist functionality
    console.log('Apply Artist clicked');
  };

  const handleWalletClick = () => {
    // Handle wallet navigation
    console.log('My NFT Wallet clicked');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNavbar />
      
      <ScrollArea className="h-screen">
        <div className="pb-20 lg:pb-8 lg:pt-20">
          {/* Header */}
          <div className="flex items-center justify-between px-6 lg:px-12 py-6 max-w-7xl mx-auto">
            <h1 className="text-2xl lg:text-3xl font-pixel font-bold text-foreground">
              Me
            </h1>
            
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <DotsThree size={24} className="text-foreground" />
            </button>
          </div>

          <div className="px-6 lg:px-12 max-w-7xl mx-auto">
            {/* Profile Card */}
            <Card className="bg-secondary border-border rounded-3xl p-8 mb-8">
              <div className="space-y-6">
                {/* Artist Name */}
                <h2 className="text-3xl lg:text-4xl font-pixel font-bold text-foreground">
                  Aria Solen
                </h2>

                {/* NFT Wallet Link */}
                <button 
                  onClick={handleWalletClick}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="text-base lg:text-lg">My NFT Wallet</span>
                  <ArrowUpRight size={20} />
                </button>

                {/* Apply Artist Button */}
                <Button 
                  onClick={handleApplyArtist}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-2xl text-lg"
                >
                  Apply Artist
                </Button>
              </div>
            </Card>

            {/* Tab Navigation */}
            <div className="flex mb-6">
              <button
                onClick={() => setActiveTab('protected')}
                className={`px-6 py-3 rounded-2xl font-semibold text-base transition-colors ${
                  activeTab === 'protected'
                    ? 'bg-primary text-white'
                    : 'bg-transparent text-muted-foreground border border-border'
                }`}
              >
                Protected
              </button>
              <button
                onClick={() => setActiveTab('for-sale')}
                className={`px-6 py-3 rounded-2xl font-semibold text-base transition-colors ml-4 ${
                  activeTab === 'for-sale'
                    ? 'bg-primary text-white'
                    : 'bg-transparent text-muted-foreground border border-border'
                }`}
              >
                For Sale
              </button>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'protected' && (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {protectedArtworks.map((artwork) => (
                  <Card 
                    key={artwork.id} 
                    className="bg-secondary border-0 rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
                  >
                    {/* Artwork Image */}
                    <div className="relative aspect-[4/5] overflow-hidden">
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
                      <h3 className="text-sm lg:text-base font-semibold text-foreground truncate">
                        {artwork.title}
                      </h3>
                      <p className="text-xs lg:text-sm text-muted-foreground mt-1">
                        {artwork.date}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'for-sale' && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-2">No artworks for sale</h3>
                  <p className="text-muted-foreground">
                    Your artworks available for purchase will appear here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      <Navbar />
    </div>
  );
}