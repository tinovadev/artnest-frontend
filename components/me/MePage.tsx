'use client';

import { DotsThree, ArrowUpRight, PencilSimple, Plus } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Navbar from '@/components/shared/Navbar';
import TopNavbar from '@/components/shared/TopNavbar';
import { protectedArtworks } from '@/data/protected-artworks';
import { forSaleArtworks } from '@/data/for-sale-artworks';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type TabType = 'protected' | 'for-sale';

export default function MePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('protected');
  const [isVerifiedArtist, setIsVerifiedArtist] = useState(false);

  // Check verification status on component mount
  useEffect(() => {
    const verificationStatus = localStorage.getItem('artistVerified');
    setIsVerifiedArtist(verificationStatus === 'true');
  }, []);

  // Listen for verification status changes
  useEffect(() => {
    const handleStorageChange = () => {
      const verificationStatus = localStorage.getItem('artistVerified');
      setIsVerifiedArtist(verificationStatus === 'true');
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom event for same-tab updates
    window.addEventListener('artistVerified', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('artistVerified', handleStorageChange);
    };
  }, []);

  const handleApplyArtist = () => {
    router.push('/artist-verification');
  };

  const handleWalletClick = () => {
    // Handle wallet navigation
    console.log('My NFT Wallet clicked');
  };

  const handleArtistBadgeClick = () => {
    // Reset verification status
    localStorage.removeItem('artistVerified');
    setIsVerifiedArtist(false);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('artistVerified'));
  };

  const handleProtectedArtworkClick = (artworkId: string) => {
    router.push(`/me/protected/${artworkId}`);
  };

  const handleForSaleArtworkClick = (artworkId: string) => {
    router.push(`/me/for-sale/${artworkId}`);
  };

  const handleEditProfile = () => {
    router.push('/me/edit-profile');
  };

  const handleUpload = () => {
    router.push('/ai-learning-off');
  };

  if (!isVerifiedArtist) {
    // Initial state - not verified artist
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
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <DotsThree size={24} className="text-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="bg-secondary border-border rounded-xl p-2 min-w-[160px]"
                >
                  <DropdownMenuItem 
                    onClick={handleEditProfile}
                    className="flex items-center gap-3 px-3 py-2 text-foreground hover:bg-muted rounded-lg cursor-pointer"
                  >
                    <PencilSimple size={16} className="text-muted-foreground" />
                    Edit Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={handleUpload}
                    className="flex items-center gap-3 px-3 py-2 text-foreground hover:bg-muted rounded-lg cursor-pointer"
                  >
                    <Plus size={16} className="text-muted-foreground" />
                    Upload
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="px-6 lg:px-12 max-w-7xl mx-auto">
              {/* Profile Card - Initial State */}
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

              {/* Single Artwork - Initial State */}
              {activeTab === 'protected' && (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  <Card 
                    className="bg-secondary border-0 rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
                    onClick={() => handleProtectedArtworkClick('1')}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop"
                        alt="Abstract Composition"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                  </Card>
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

  // Verified artist state
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
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <DotsThree size={24} className="text-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="bg-secondary border-border rounded-xl p-2 min-w-[160px]"
              >
                <DropdownMenuItem 
                  onClick={handleEditProfile}
                  className="flex items-center gap-3 px-3 py-2 text-foreground hover:bg-muted rounded-lg cursor-pointer"
                >
                  <PencilSimple size={16} className="text-muted-foreground" />
                  Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleUpload}
                  className="flex items-center gap-3 px-3 py-2 text-foreground hover:bg-muted rounded-lg cursor-pointer"
                >
                  <Plus size={16} className="text-muted-foreground" />
                  Upload
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="px-6 lg:px-12 max-w-7xl mx-auto">
            {/* Profile Card - Verified State */}
            <Card className="bg-secondary border-border rounded-3xl p-8 mb-8 relative">
              <div className="space-y-6">
                {/* Artist Badge - Clickable to reset */}
                <div className="absolute top-6 right-6">
                  <button onClick={handleArtistBadgeClick}>
                    <Badge className="bg-success text-black font-semibold px-4 py-2 rounded-full text-sm hover:bg-success/90 transition-colors cursor-pointer">
                      Artist
                    </Badge>
                  </button>
                </div>

                {/* Profile Photo and Info */}
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-muted flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                      alt="Aria Solen"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 pt-2">
                    {/* Artist Name */}
                    <h2 className="text-3xl lg:text-4xl font-pixel font-bold text-foreground mb-3">
                      Aria Solen
                    </h2>

                    {/* Artist Description */}
                    <p className="text-muted-foreground text-base leading-relaxed mb-4">
                      I'm a digital illustrator exploring the<br />
                      intersection of nature and imagination.
                    </p>

                    {/* Divider */}
                    <div className="border-t border-border my-4"></div>

                    {/* NFT Wallet Link */}
                    <button 
                      onClick={handleWalletClick}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="text-base lg:text-lg">My NFT Wallet</span>
                      <ArrowUpRight size={20} />
                    </button>
                  </div>
                </div>
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
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {protectedArtworks.map((artwork, index) => (
                  <Card 
                    key={artwork.id} 
                    className="bg-secondary border-0 rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-200 cursor-pointer relative"
                    onClick={() => handleProtectedArtworkClick(artwork.id)}
                  >
                    {/* Artwork Image */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img 
                        src={artwork.image}
                        alt={artwork.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Tracking Badge - Only on first artwork */}
                      {index === 0 && (
                        <div className="absolute bottom-3 left-3">
                          <Badge className="bg-primary text-white font-semibold px-3 py-1 rounded-full text-xs">
                            Tracking
                          </Badge>
                        </div>
                      )}
                      
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'for-sale' && (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {forSaleArtworks.map((artwork) => (
                  <Card 
                    key={artwork.id} 
                    className="bg-secondary border-0 rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
                    onClick={() => handleForSaleArtworkClick(artwork.id)}
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
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      <Navbar />
    </div>
  );
}