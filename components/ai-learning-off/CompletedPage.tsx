'use client';

import { ArrowLeft, X } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from '@/components/ui/dialog';
import TopNavbar from '@/components/shared/TopNavbar';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CompletedPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setIsModalOpen(true);
  };

  const handleStartTracking = () => {
    setIsModalOpen(false);
    // Navigate to track page
    router.push('/track');
  };

  const handleNotNow = () => {
    setIsModalOpen(false);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <TopNavbar />
      
      {/* Header */}
      <div className="flex items-center gap-4 px-6 lg:px-12 py-4 border-b border-border flex-shrink-0 max-w-7xl mx-auto w-full lg:mt-20">
        <button onClick={handleBack} className="p-2 -ml-2">
          <ArrowLeft size={24} className="text-foreground" />
        </button>
        <h1 className="text-lg font-semibold">AI Learning Off</h1>
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="px-6 lg:px-12 py-6 pb-24 max-w-7xl mx-auto">
          {/* Success Message */}
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-2xl lg:text-4xl font-pixel font-bold mb-2 text-primary">
              Completed!
            </h1>
            <p className="text-muted-foreground text-base lg:text-lg">
              Your creation is now securely protected.
            </p>
          </div>

          {/* Main Content - Responsive Layout */}
          <div className="lg:flex lg:gap-12 lg:items-start">
            {/* Protected Artwork */}
            <div className="lg:flex-shrink-0 mb-8 lg:mb-0">
              <div className="relative rounded-2xl overflow-hidden bg-muted aspect-[4/5] max-w-sm mx-auto lg:mx-0 lg:w-80 lg:h-96">
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
            <div className="lg:flex-1 lg:max-w-2xl">
              <Card className="bg-white border-0 rounded-3xl p-6 lg:p-8 space-y-6">
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

                {/* Year and Medium - Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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

                  <div className="space-y-2">
                    <Label htmlFor="medium" className="text-sm font-medium text-gray-700">
                      Medium
                    </Label>
                    <Input
                      id="medium"
                      placeholder="Materials or techniques"
                      value={formData.medium}
                      onChange={(e) => handleInputChange('medium', e.target.value)}
                      className="border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 rounded-xl h-12"
                    />
                  </div>
                </div>

                {/* Size and Edition - Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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

                  <div className="space-y-2">
                    <Label htmlFor="edition" className="text-sm font-medium text-gray-700">
                      Edition
                    </Label>
                    <Input
                      id="edition"
                      placeholder="Part of an edition?"
                      value={formData.edition}
                      onChange={(e) => handleInputChange('edition', e.target.value)}
                      className="border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 rounded-xl h-12"
                    />
                  </div>
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
          </div>
        </div>
      </ScrollArea>

      {/* Fixed Confirm Button */}
      <div className="flex-shrink-0 p-6 lg:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <Button 
            onClick={handleConfirm}
            className="w-full lg:max-w-md lg:ml-auto lg:block bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-2xl text-lg"
          >
            Confirm
          </Button>
        </div>
      </div>

      {/* Tracking Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogOverlay className="bg-black/80" />
        <DialogContent className="bg-secondary border-0 rounded-3xl p-8 max-w-sm mx-auto">
          {/* Close Button */}
          <button 
            onClick={() => setIsModalOpen(false)}
            className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-foreground"
          >
            <X size={24} />
          </button>

          {/* Modal Content */}
          <div className="text-center space-y-6">
            <DialogTitle className="text-2xl font-bold text-foreground">
              Start tracking now?
            </DialogTitle>
            <p className="text-muted-foreground text-base leading-relaxed">
              We'll look out for any copycats<br />
              and keep you posted.
            </p>

            {/* Action Buttons */}
            <div className="space-y-4 pt-4">
              <Button 
                onClick={handleStartTracking}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-2xl text-lg"
              >
                Let's start
              </Button>
              <Button 
                onClick={handleNotNow}
                variant="outline"
                className="w-full bg-black hover:bg-black/80 text-white border-0 font-semibold py-4 rounded-2xl text-lg"
              >
                Not now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}