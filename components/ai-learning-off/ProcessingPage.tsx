'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TopNavbar from '@/components/shared/TopNavbar';

export default function ProcessingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate processing progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Navigate to completed page after processing
          setTimeout(() => {
            router.push('/completed');
          }, 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <TopNavbar />
      
      <div className="flex-1 flex items-center justify-center px-6 lg:px-12 lg:pt-20">
        <div className="max-w-6xl mx-auto">
          {/* Responsive Layout */}
          <div className="lg:flex lg:items-center lg:gap-16">
            {/* Artwork with scanning animation */}
            <div className="relative mb-12 lg:mb-0 lg:flex-shrink-0">
              {/* Extended scanning line container - wider than the image */}
              <div className="absolute inset-0 -inset-x-8 overflow-hidden z-10">
                <div className="scan-line absolute left-0 right-0 h-1 bg-primary shadow-lg shadow-primary/50 animate-scan-pingpong">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-muted w-80 h-80 lg:w-96 lg:h-96 mx-auto lg:mx-0">
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

                {/* Processing overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-2xl">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            </div>

            {/* Processing text */}
            <div className="text-center lg:text-left lg:flex-1">
              <h1 className="text-2xl lg:text-5xl xl:text-6xl font-pixel font-bold mb-4 leading-tight">
                Safely processing<br />
                protection...
              </h1>
              <p className="text-muted-foreground text-lg lg:text-2xl mb-6 lg:mb-8">
                We're taking care of your work.<br />
                Just a moment.
              </p>
              
              {/* Progress indicator */}
              <div className="w-64 lg:w-96 h-2 lg:h-3 bg-secondary rounded-full overflow-hidden mx-auto lg:mx-0">
                <div 
                  className="h-full bg-primary transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm lg:text-base text-muted-foreground mt-2">{progress}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}