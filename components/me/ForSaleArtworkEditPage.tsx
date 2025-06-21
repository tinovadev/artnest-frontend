'use client';

import { ArrowLeft } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { forSaleArtworks } from '@/data/for-sale-artworks';
import { forSaleArtworkDetails } from '@/data/for-sale-artwork-details';

interface ForSaleArtworkEditPageProps {
  artworkId: string;
}

export default function ForSaleArtworkEditPage({ artworkId }: ForSaleArtworkEditPageProps) {
  const router = useRouter();
  const artwork = forSaleArtworks.find(art => art.id === artworkId);
  const details = forSaleArtworkDetails.find(detail => detail.artworkId === artworkId);

  const [formData, setFormData] = useState({
    title: artwork?.title || '',
    price: artwork?.price || 10,
    year: details?.year || '',
    artist: details?.artist || 'Aria Solen',
    dimensions: details?.dimensions || '',
    medium: details?.medium || '',
    edition: details?.edition || '',
    description: details?.description || '',
    artistBio: details?.artistBio.title || '',
    royaltyPerUse: details?.royalty.pricePerUse || 0.08,
    permissions: {
      commercialTraining: details?.license.permissions.includes('Commercial training allowed') || false,
      resaleNotPermitted: details?.license.restrictions.includes('Resale of image not permitted') || false,
      derivativeGeneration: details?.license.permissions.includes('Derivative generation permitted') || false
    }
  });

  const handleBack = () => {
    router.back();
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: checked
      }
    }));
  };

  const handleConfirm = () => {
    // Handle form submission - update artwork details
    console.log('Updated for sale artwork details:', formData);
    
    // Navigate back to detail page
    router.push(`/me/for-sale/${artworkId}`);
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
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="border-gray-300 bg-white text-gray-900 rounded-xl h-14 text-base"
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price" className="text-base font-medium text-gray-900">
                  Price
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900 text-base">$</span>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                    className="border-gray-300 bg-white text-gray-900 rounded-xl h-14 text-base pl-8"
                  />
                </div>
              </div>

              {/* Year and Artist - Grid Layout */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year" className="text-base font-medium text-gray-900">
                    Year
                  </Label>
                  <Input
                    id="year"
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    className="border-gray-300 bg-white text-gray-900 rounded-xl h-14 text-base"
                  />
                </div>

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
              </div>

              {/* Dimensions and Medium - Grid Layout */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dimensions" className="text-base font-medium text-gray-900">
                    Dimensions
                  </Label>
                  <Input
                    id="dimensions"
                    value={formData.dimensions}
                    onChange={(e) => handleInputChange('dimensions', e.target.value)}
                    className="border-gray-300 bg-white text-gray-900 rounded-xl h-14 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medium" className="text-base font-medium text-gray-900">
                    Medium
                  </Label>
                  <Input
                    id="medium"
                    value={formData.medium}
                    onChange={(e) => handleInputChange('medium', e.target.value)}
                    className="border-gray-300 bg-white text-gray-900 rounded-xl h-14 text-base"
                  />
                </div>
              </div>

              {/* Edition */}
              <div className="space-y-2">
                <Label htmlFor="edition" className="text-base font-medium text-gray-900">
                  Edition
                </Label>
                <Input
                  id="edition"
                  value={formData.edition}
                  onChange={(e) => handleInputChange('edition', e.target.value)}
                  className="border-gray-300 bg-white text-gray-900 rounded-xl h-14 text-base"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-medium text-gray-900">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="border-gray-300 bg-white text-gray-900 rounded-xl min-h-[120px] resize-none text-base"
                />
              </div>

              {/* About the Artist */}
              <div className="space-y-2">
                <Label htmlFor="artistBio" className="text-base font-medium text-gray-900">
                  About the Artist
                </Label>
                <Textarea
                  id="artistBio"
                  value={formData.artistBio}
                  onChange={(e) => handleInputChange('artistBio', e.target.value)}
                  className="border-gray-300 bg-white text-gray-900 rounded-xl min-h-[80px] resize-none text-base"
                />
              </div>

              {/* Royalty per Use */}
              <div className="space-y-2">
                <Label htmlFor="royaltyPerUse" className="text-base font-medium text-gray-900">
                  Royalty per Use
                </Label>
                <Input
                  id="royaltyPerUse"
                  placeholder="How much royalty would you like to earn?"
                  value={formData.royaltyPerUse}
                  onChange={(e) => handleInputChange('royaltyPerUse', parseFloat(e.target.value) || 0)}
                  className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 rounded-xl h-14 text-base"
                />
              </div>

              {/* AI Usage License */}
              <div className="space-y-4">
                <Label className="text-base font-medium text-gray-900">
                  AI Usage License
                </Label>
                
                <div className="space-y-4 p-4 border border-gray-300 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="commercialTraining"
                      checked={formData.permissions.commercialTraining}
                      onCheckedChange={(checked) => handlePermissionChange('commercialTraining', checked as boolean)}
                      className="border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label htmlFor="commercialTraining" className="text-base text-gray-900 cursor-pointer">
                      Commercial training allowed
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="resaleNotPermitted"
                      checked={formData.permissions.resaleNotPermitted}
                      onCheckedChange={(checked) => handlePermissionChange('resaleNotPermitted', checked as boolean)}
                      className="border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label htmlFor="resaleNotPermitted" className="text-base text-gray-900 cursor-pointer">
                      Resale of image not permitted
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="derivativeGeneration"
                      checked={formData.permissions.derivativeGeneration}
                      onCheckedChange={(checked) => handlePermissionChange('derivativeGeneration', checked as boolean)}
                      className="border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label htmlFor="derivativeGeneration" className="text-base text-gray-900 cursor-pointer">
                      Derivative generation permitted
                    </Label>
                  </div>
                </div>
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
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-xl text-lg"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}