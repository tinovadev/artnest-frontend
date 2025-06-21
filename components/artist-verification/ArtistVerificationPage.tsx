'use client';

import { ArrowLeft, CheckCircle } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ArtistVerificationPage() {
  const router = useRouter();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
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
    // Show success modal
    setIsSuccessModalOpen(true);
  };

  const handleConfirm = () => {
    setIsSuccessModalOpen(false);
    
    // Set artist verification status
    localStorage.setItem('artistVerified', 'true');
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('artistVerified'));
    
    // Navigate back to Me page
    router.push('/me');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <ScrollArea className="h-screen">
        <div className="pb-8">
          {/* Header */}
          <div className="flex items-center gap-4 px-6 lg:px-12 py-4 border-b border-gray-200 max-w-7xl mx-auto lg:mt-20">
            <button onClick={handleBack} className="p-2 -ml-2">
              <ArrowLeft size={24} className="text-gray-900" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Artist Verification</h1>
          </div>

          <div className="px-6 lg:px-12 py-6 max-w-7xl mx-auto">
            {/* Responsive Layout */}
            <div className="lg:flex lg:gap-12 lg:items-start">
              {/* Main Heading - Left side on desktop */}
              <div className="lg:flex-shrink-0 lg:w-96 mb-8 lg:mb-0">
                <h2 className="text-3xl lg:text-4xl font-pixel font-bold text-primary mb-2 leading-tight">
                  Tell us about<br />
                  yourself
                </h2>
              </div>

              {/* Form - Right side on desktop */}
              <div className="lg:flex-1 lg:max-w-2xl">
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
                    <h3 className="text-2xl lg:text-3xl font-pixel font-bold text-primary mb-6">
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
          </div>
        </div>
      </ScrollArea>

      {/* Success Modal */}
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogOverlay className="bg-black/80" />
        <DialogContent className="bg-white border-0 rounded-3xl p-8 max-w-sm mx-auto">
          <div className="text-center space-y-6">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={32} className="text-primary" />
            </div>
            
            <DialogTitle className="text-xl font-bold text-gray-900">
              Application Submitted!
            </DialogTitle>
            
            <p className="text-gray-600 text-base leading-relaxed">
              Thank you for applying.<br />
              We'll review your application and<br />
              get back to you within a few days.
            </p>

            <Button 
              onClick={handleConfirm}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-xl"
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}