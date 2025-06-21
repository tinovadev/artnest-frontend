'use client';

import { DotsThree, Info, Trash, PencilSimple, X, Shield } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Navbar from '@/components/shared/Navbar';
import { trackingArtworks } from '@/data/tracking';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Mode = 'normal' | 'delete' | 'edit';

export default function TrackPage() {
  const router = useRouter();
  const [artworks, setArtworks] = useState(trackingArtworks);
  const [mode, setMode] = useState<Mode>('normal');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showNoTheftModal, setShowNoTheftModal] = useState(false);

  const handleArtworkClick = (artworkId: string) => {
    if (mode !== 'normal') return;
    
    if (artworkId === '1') {
      // Navigate to Sunny Garden detail page
      router.push(`/track/${artworkId}`);
    } else {
      // Show no theft history modal for other artworks
      setShowNoTheftModal(true);
    }
  };

  const handleTrackNow = (artworkId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Tracking artwork:', artworkId);
    // Implement tracking logic here
  };

  const handleDeleteSelected = () => {
    setArtworks(prev => prev.filter(artwork => !selectedItems.includes(artwork.id)));
    setSelectedItems([]);
    setMode('normal');
  };

  const handleToggleTracking = (artworkId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setArtworks(prev => prev.map(artwork => 
      artwork.id === artworkId 
        ? { ...artwork, status: artwork.status === 'tracking' ? 'stopped' : 'tracking' }
        : artwork
    ));
  };

  const handleSelectItem = (artworkId: string, checked: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    if (checked) {
      setSelectedItems(prev => [...prev, artworkId]);
    } else {
      setSelectedItems(prev => prev.filter(id => id !== artworkId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(artworks.map(artwork => artwork.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setSelectedItems([]);
  };

  const handleCancel = () => {
    setMode('normal');
    setSelectedItems([]);
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
            
            {mode === 'normal' ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <DotsThree size={24} className="text-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="bg-secondary border-border rounded-xl p-2 min-w-[140px]"
                >
                  <DropdownMenuItem 
                    onClick={() => handleModeChange('edit')}
                    className="flex items-center gap-3 px-3 py-2 text-foreground hover:bg-muted rounded-lg cursor-pointer"
                  >
                    <PencilSimple size={16} className="text-muted-foreground" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleModeChange('delete')}
                    className="flex items-center gap-3 px-3 py-2 text-foreground hover:bg-muted rounded-lg cursor-pointer"
                  >
                    <Trash size={16} className="text-muted-foreground" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button 
                onClick={handleCancel}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X size={24} className="text-foreground" />
              </button>
            )}
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

            {/* Delete Mode Header */}
            {mode === 'delete' && (
              <div className="flex items-center justify-between mb-4 p-4 bg-secondary rounded-xl">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedItems.length === artworks.length && artworks.length > 0}
                    onCheckedChange={handleSelectAll}
                    className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <span className="text-foreground font-medium">
                    Select All ({selectedItems.length}/{artworks.length})
                  </span>
                </div>
                {selectedItems.length > 0 && (
                  <Button
                    onClick={handleDeleteSelected}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm"
                  >
                    Delete ({selectedItems.length})
                  </Button>
                )}
              </div>
            )}

            {/* Artwork List */}
            <div className="space-y-4">
              {artworks.map((artwork) => (
                <Card 
                  key={artwork.id} 
                  className={`bg-secondary border-border rounded-2xl p-6 ${
                    mode === 'normal' ? 'cursor-pointer hover:bg-secondary/80 transition-colors' : ''
                  }`}
                  onClick={() => handleArtworkClick(artwork.id)}
                >
                  <div className="flex items-center gap-4">
                    {/* Checkbox for Delete Mode */}
                    {mode === 'delete' && (
                      <Checkbox
                        checked={selectedItems.includes(artwork.id)}
                        onCheckedChange={(checked) => handleSelectItem(artwork.id, checked as boolean, event as any)}
                        className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                    )}

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
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="secondary"
                            className={`flex-shrink-0 px-3 py-1 text-xs font-medium rounded-full ${
                              artwork.status === 'tracking' 
                                ? 'bg-primary/20 text-primary border-primary/30' 
                                : 'bg-muted text-muted-foreground border-border'
                            }`}
                          >
                            {artwork.status === 'tracking' ? 'Tracking' : 'Stop'}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        Latest Date  {artwork.latestDate}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        {mode === 'normal' && (
                          <Button 
                            onClick={(e) => handleTrackNow(artwork.id, e)}
                            className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-2 rounded-xl text-sm"
                          >
                            Track Now
                          </Button>
                        )}
                        
                        {mode === 'edit' && (
                          <Button 
                            onClick={(e) => handleToggleTracking(artwork.id, e)}
                            className={`font-semibold px-6 py-2 rounded-xl text-sm ${
                              artwork.status === 'tracking'
                                ? 'bg-muted hover:bg-muted/80 text-foreground'
                                : 'bg-primary hover:bg-primary/90 text-white'
                            }`}
                          >
                            {artwork.status === 'tracking' ? 'Stop' : 'Start'}
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

      {/* No Theft History Modal */}
      <Dialog open={showNoTheftModal} onOpenChange={setShowNoTheftModal}>
        <DialogOverlay className="bg-black/80" />
        <DialogContent className="bg-secondary border-0 rounded-3xl p-8 max-w-sm mx-auto">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto">
              <Shield size={32} className="text-success" />
            </div>
            
            <DialogTitle className="text-xl font-bold text-foreground">
              도용된 이력이 없습니다.
            </DialogTitle>
            
            <p className="text-muted-foreground text-sm leading-relaxed">
              현재까지 이 작품에 대한<br />
              도용 사례가 발견되지 않았습니다.
            </p>

            <Button 
              onClick={() => setShowNoTheftModal(false)}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-xl"
            >
              확인
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}