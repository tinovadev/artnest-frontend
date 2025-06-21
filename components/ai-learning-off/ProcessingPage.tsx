'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProcessingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate processing progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Navigate back or to success page after processing
          setTimeout(() => {
            router.back();
          }, 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6">
      {/* Artwork with scanning animation */}
      <div className="relative mb-12">
        <div className="relative rounded-2xl overflow-hidden bg-muted w-80 h-80">
          <img 
            src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop"
            alt="Artwork being processed"
            className="w-full h-full object-cover"
          />
          
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10">
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="border border-white/10" />
                ))}
              </div>
            </div>
          </div>

          {/* Animated ping-pong scanning line */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="scan-line absolute left-0 right-0 h-1 bg-primary shadow-lg shadow-primary/50 animate-scan-pingpong">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
          </div>

          {/* Processing overlay */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>

      {/* Processing text */}
      <div className="text-center">
        <h1 className="text-2xl font-pixel font-bold mb-4">
          Safely processing<br />
          protection...
        </h1>
        <p className="text-muted-foreground text-lg mb-6">
          We're taking care of your work.<br />
          Just a moment.
        </p>
        
        {/* Progress indicator */}
        <div className="w-64 h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{progress}%</p>
      </div>
    </div>
  );
}