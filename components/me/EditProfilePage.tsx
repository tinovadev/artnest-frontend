'use client';

import { ArrowLeft } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EditProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    artistName: 'Aria Solen',
    description: "I'm a digital illustrator exploring the intersection of nature and imagination."
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
    // Handle form submission - update profile
    console.log('Updated profile:', formData);
    
    // Navigate back to Me page
    router.push('/me');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <ScrollArea className="h-screen">
        <div className="pb-32">
          {/* Header */}
          <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200">
            <button onClick={handleBack} className="p-2 -ml-2">
              <ArrowLeft size={24} className="text-gray-900" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Edit Profile</h1>
          </div>

          <div className="px-6 py-6 max-w-2xl mx-auto">
            {/* Profile Photo */}
            <div className="mb-8 text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                  alt="Aria Solen"
                  className="w-full h-full object-cover"
                />
              </div>
              <Button 
                variant="outline"
                className="bg-transparent border-gray-300 text-gray-900 hover:bg-gray-50 rounded-xl px-6 py-2"
              >
                Change Photo
              </Button>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Artist Name */}
              <div className="space-y-2">
                <Label htmlFor="artistName" className="text-base font-medium text-gray-900">
                  Artist Name
                </Label>
                <Input
                  id="artistName"
                  value={formData.artistName}
                  onChange={(e) => handleInputChange('artistName', e.target.value)}
                  className="border-gray-300 bg-white text-gray-900 rounded-xl h-14 text-base"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-medium text-gray-900">
                  Artist Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="border-gray-300 bg-white text-gray-900 rounded-xl min-h-[120px] resize-none text-base"
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
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-xl text-lg"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}