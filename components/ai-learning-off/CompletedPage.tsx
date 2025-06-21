'use client';

import { ArrowLeft } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CompletedPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    artist: 'Aria Solen',
    year: '',
    medium: '',
    size: '',
    edition: '',
    description: ''
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
    // Handle form submission
    console.log('Form data:', formData);
    // Navigate back to home or show success message
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 px-6 py-4 border-b border-border flex-shrink-0">
        <button onClick={handleBack} className="p-2 -ml-2">
          <ArrowLeft size={24} className="text-foreground" />
        </button>
        <h1 className="text-lg font-semibold">AI Learning Off</h1>
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="px-6 py-6 pb-24">
          {/* Success Message */}
          <div className="mb-8">
            <h1 className="text-2xl font-pixel font-bold mb-2 text-primary">
              Completed!
            </h1>
            <p className="text-muted-foreground text-base">
              Your creation is now securely protected.
            </p>
          </div>

          {/* Protected Artwork */}
          <div className="mb-8">
            <div className="relative rounded-2xl overflow-hidden bg-muted aspect-[4/5] max-w-sm mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop"
                alt="Protected artwork"
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

          {/* Form Section */}
          <Card className="bg-white border-0 rounded-3xl p-6 space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                Title
              </Label>
              <Input
                id="title"
                placeholder="A name that captures your art."
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 rounded-xl h-12"
              />
            </div>

            {/* Artist */}
            <div className="space-y-2">
              <Label htmlFor="artist" className="text-sm font-medium text-gray-700">
                Artist
              </Label>
              <Input
                id="artist"
                value={formData.artist}
                onChange={(e) => handleInputChange('artist', e.target.value)}
                className="border-gray-200 bg-white text-gray-900 rounded-xl h-12"
              />
            </div>

            {/* Year */}
            <div className="space-y-2">
              <Label htmlFor="year" className="text-sm font-medium text-gray-700">
                Year
              </Label>
              <Input
                id="year"
                placeholder="When did you make this?"
                value={formData.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
                className="border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 rounded-xl h-12"
              />
            </div>

            {/* Medium */}
            <div className="space-y-2">
              <Label htmlFor="medium" className="text-sm font-medium text-gray-700">
                Medium
              </Label>
              <Input
                id="medium"
                placeholder="What materials or techniques did you use?"
                value={formData.medium}
                onChange={(e) => handleInputChange('medium', e.target.value)}
                className="border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 rounded-xl h-12"
              />
            </div>

            {/* Size */}
            <div className="space-y-2">
              <Label htmlFor="size" className="text-sm font-medium text-gray-700">
                Size
              </Label>
              <Input
                id="size"
                placeholder="How big is your work?"
                value={formData.size}
                onChange={(e) => handleInputChange('size', e.target.value)}
                className="border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 rounded-xl h-12"
              />
            </div>

            {/* Edition */}
            <div className="space-y-2">
              <Label htmlFor="edition" className="text-sm font-medium text-gray-700">
                Edition
              </Label>
              <Input
                id="edition"
                placeholder="Is this part of an edition?"
                value={formData.edition}
                onChange={(e) => handleInputChange('edition', e.target.value)}
                className="border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 rounded-xl h-12"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Add a short description."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 rounded-xl min-h-[100px] resize-none"
              />
            </div>
          </Card>
        </div>
      </ScrollArea>

      {/* Fixed Confirm Button */}
      <div className="flex-shrink-0 p-6 bg-background">
        <Button 
          onClick={handleConfirm}
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-2xl text-lg"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}