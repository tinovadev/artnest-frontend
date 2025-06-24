"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TopNavbar from "@/components/shared/TopNavbar";

export default function ProcessingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate processing progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Navigate to completed page after processing
          setTimeout(() => {
            router.push("/completed");
          }, 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <TopNavbar />

      <div className="mb-9 flex flex-1 items-center justify-center px-6 lg:px-12 lg:pt-20">
        <div className="mx-auto w-full max-w-6xl">
          {/* Responsive Layout - Vertical on mobile, Horizontal on desktop */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
            {/* Artwork with scanning animation */}
            <div className="relative mb-12 flex justify-center lg:mb-0 lg:flex-shrink-0 lg:justify-start">
              {/* Extended scanning line container - wider than the image */}
              <div className="relative">
                <div className="absolute inset-0 -inset-x-8 z-10 overflow-hidden">
                  <div className="scan-line animate-scan-pingpong absolute left-0 right-0 h-1 bg-primary shadow-lg shadow-primary/50">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                  </div>
                </div>

                <div className="relative h-80 w-80 overflow-hidden rounded-2xl bg-muted lg:h-96 lg:w-96">
                  <img
                    src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop"
                    alt="Artwork being processed"
                    className="h-full w-full object-cover"
                  />

                  {/* Grid overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10">
                    <div className="absolute inset-0 opacity-20">
                      <div className="grid-rows-8 grid h-full w-full grid-cols-8">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <div key={i} className="border border-white/10" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Processing text */}
            <div className="text-center lg:flex-1 lg:text-left">
              <h1 className="mb-4 font-pixel text-3xl font-bold leading-[1.2] lg:text-5xl">
                Safely processing
                <br />
                protection...
              </h1>
              <p className="mb-6 text-muted-foreground lg:mb-8 lg:text-lg">
                We're taking care of your work.
                <br />
                Just a moment.
              </p>

              {/* Progress indicator */}
              <div className="mx-auto h-2 w-64 overflow-hidden rounded-full bg-secondary lg:mx-0 lg:h-3 lg:w-96">
                <div
                  className="h-full bg-primary transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground lg:text-base">
                {progress}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
