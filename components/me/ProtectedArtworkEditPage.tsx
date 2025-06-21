'use client';

import { ArrowLeft } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { protectedArtworks } from '@/data/protected-artworks';
import { protectedArtworkDetails } from '@/data/protected-artwork-details';

interface ProtectedArtworkEditPageProps {
  artworkId: string;
}

export default function ProtectedArtworkEditPage({ artworkId }: ProtectedArtworkEditPageProps) {
  const router = useRouter();
  const artwork = protectedArtworks.find(art => art.id === artworkId);
  const details = protectedArtworkDetails.find(detail => detail.artworkId === artworkId);

  const [formData, setFormData] = useState({
    title: artwork?.title || '',
    artist: details?.artist || 'Aria Solen',
    year: details?.year || '',
    medium: details?.medium || '',
    size: details?.dimensions || '',
    edition: details?.edition || '',
    description: details?.description || ''
  });

  const handleBack = () => {
    router.back();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConfirm = () => {
    // Handle form submission - update artwork details
    console.log('Updated artwork details:', formData);
    
    // Navigate back to detail page
    router.push(`/me/protected/${artworkId}`);
  };

  if (!artwork) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-muted-foreground">Artwork not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <ScrollArea className="h-screen">
        <div className="pb-32">
          {/* Header */}
          <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200">
            <button onClick={handleBack} className="p-2 -ml-2">
              <ArrowLeft size={24} className="text-gray-900" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 truncate">{artwork.title}</h1>
          </div>

          <div className="px-6 py-6 max-w-2xl mx-auto">
            {/* Artwork Image */}
            <div className="mb-8">
              <div className="relative rounded-3xl overflow-hidden bg-gray-100 aspect-[4/5] w-full max-w-md mx-auto">
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

            {/* Form */}
            <div className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-medium text-gray-900">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="A name that captures your art."
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 rounded-xl h-14 text-base"
                />
              </div>

              {/* Artist */}
              <div className="space-y-2">
                <Label htmlFor="artist" className="text-base font-medium text-gray-900">
                  Artist
                </Label>
                <Input
                  id="artist"
                  value={formData.artist}
                  onChange={(e) => handleInputChange('artist', e.target.value)}
                  className="border-gray-300 bg-white text-gray-900 rounded-xl h-14 text-base"
                />
              </div>

              {/* Year */}
              <div className="space-y-2">
                <Label htmlFor="year" className="text-base font-medium text-gray-900">
                  Year
                </Label>
                <Input
                  id="year"
                  placeholder="When did you make this?"
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 rounded-xl h-14 text-base"
                />
              </div>

              {/* Medium */}
              <div className="space-y-2">
                <Label htmlFor="medium" className="text-base font-medium text-gray-900">
                  Medium
                </Label>
                <Input
                  id="medium"
                  placeholder="What materials or techniques did you use?"
                  value={formData.medium}
                  onChange={(e) => handleInputChange('medium', e.target.value)}
                  className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 rounded-xl h-14 text-base"
                />
              </div>

              {/* Size */}
              <div className="space-y-2">
                <Label htmlFor="size" className="text-base font-medium text-gray-900">
                  Size
                </Label>
                <Input
                  id="size"
                  placeholder="How big is your work?"
                  value={formData.size}
                  onChange={(e) => handleInputChange('size', e.target.value)}
                  className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 rounded-xl h-14 text-base"
                />
              </div>

              {/* Edition */}
              <div className="space-y-2">
                <Label htmlFor="edition" className="text-base font-medium text-gray-900">
                  Edition
                </Label>
                <Input
                  id="edition"
                  placeholder="Is this part of an edition?"
                  value={formData.edition}
                  onChange={(e) => handleInputChange('edition', e.target.value)}
                  className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 rounded-xl h-14 text-base"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-medium text-gray-900">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Add a short description."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 rounded-xl min-h-[120px] resize-none text-base"
                />
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Fixed Confirm Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200">
        <div className="max-w-2xl mx-auto">
          <Button 
            onClick={handleConfirm}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-2xl text-lg"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}