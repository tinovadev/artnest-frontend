'use client';

import { ArrowLeft } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ArtistVerificationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    artistName: '',
    description: '',
    portfolioLink: '',
    file: null as File | null
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        file: file
      }));
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', formData);
    // You can add validation and API call here
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <ScrollArea className="h-screen">
        <div className="pb-8">
          {/* Header */}
          <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200">
            <button onClick={handleBack} className="p-2 -ml-2">
              <ArrowLeft size={24} className="text-gray-900" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Artist Verification</h1>
          </div>

          <div className="px-6 py-6 max-w-2xl mx-auto">
            {/* Main Heading */}
            <div className="mb-8">
              <h2 className="text-3xl lg:text-4xl font-pixel font-bold text-primary mb-2 leading-tight">
                Tell us about<br />
                yourself
              </h2>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-base font-medium text-gray-900">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  placeholder="Required"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 rounded-xl h-14 text-base"
                />
              </div>

              {/* Artist Name */}
              <div className="space-y-2">
                <Label htmlFor="artistName" className="text-base font-medium text-gray-900">
                  Artist Name
                </Label>
                <Input
                  id="artistName"
                  placeholder="Optional"
                  value={formData.artistName}
                  onChange={(e) => handleInputChange('artistName', e.target.value)}
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
                  placeholder="Tell us a little about yourself"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 rounded-xl min-h-[120px] resize-none text-base"
                />
              </div>

              {/* Portfolio Section */}
              <div className="pt-4">
                <h3 className="text-3xl lg:text-4xl font-pixel font-bold text-primary mb-6">
                  Portfolio
                </h3>

                {/* Portfolio Link */}
                <div className="space-y-2 mb-6">
                  <Label htmlFor="portfolioLink" className="text-base font-medium text-gray-900">
                    Link
                  </Label>
                  <Input
                    id="portfolioLink"
                    placeholder="Add any link that best represents your work"
                    value={formData.portfolioLink}
                    onChange={(e) => handleInputChange('portfolioLink', e.target.value)}
                    className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 rounded-xl h-14 text-base"
                  />
                </div>

                {/* File Upload */}
                <div className="space-y-2 mb-8">
                  <Label htmlFor="file" className="text-base font-medium text-gray-900">
                    File
                  </Label>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Input
                        readOnly
                        placeholder="Upload files up to 200MB"
                        value={formData.file ? formData.file.name : ''}
                        className="border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 rounded-xl h-14 text-base"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="file"
                        id="file"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/*,application/pdf,.doc,.docx"
                      />
                      <Button
                        type="button"
                        className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-4 rounded-xl h-14 text-base whitespace-nowrap"
                      >
                        Upload file
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                onClick={handleSubmit}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-xl text-lg h-14"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}