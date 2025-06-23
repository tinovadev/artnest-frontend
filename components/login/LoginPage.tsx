'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function LoginPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const handleGoogleLogin = () => {
    if (!agreed) {
      alert('Please agree to the terms before proceeding.');
      return;
    }
    
    // Simulate login process
    console.log('Google login initiated');
    
    // Navigate to home page after login
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollArea className="h-screen">
        <div className="flex flex-col min-h-screen px-6 py-12">
          {/* Logo and Branding */}
          <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
            {/* ArtNest Logo */}
            <div className="mb-16">
              <div className="mb-8">
                <img 
                  src="/artnest-logo.svg" 
                  alt="ArtNest Logo" 
                  className="h-12 w-auto"
                />
              </div>
              
              {/* Tagline */}
              <div className="space-y-2 mb-16">
                <p className="text-2xl font-pixel font-bold text-primary leading-tight">
                  Nest your art.
                </p>
                <p className="text-2xl font-pixel font-bold text-primary leading-tight">
                  Lock your rights.
                </p>
              </div>
            </div>

            {/* Service Description */}
            <div className="mb-12">
              <h2 className="text-lg font-semibold text-primary mb-4">
                ArtNest provides NFT-based artwork protection and sales services.
              </h2>
              
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                When you sign up, a personal wallet will be automatically created for NFT use. Do you agree? 
                (You can check your wallet address anytime in My Page.)
              </p>
            </div>

            {/* Agreement Checkbox */}
            <div className="mb-12">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="agreement"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                  className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label 
                  htmlFor="agreement" 
                  className="text-base text-foreground cursor-pointer"
                >
                  I agree.
                </label>
              </div>
            </div>

            {/* Google Login Button */}
            <Button
              onClick={handleGoogleLogin}
              disabled={!agreed}
              className="w-full bg-secondary hover:bg-secondary/80 text-foreground border-0 rounded-2xl py-6 text-lg font-semibold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* Google Icon */}
              <div className="w-6 h-6 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              Google Login
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}