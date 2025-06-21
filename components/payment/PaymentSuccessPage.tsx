'use client';

import { ArrowLeft, CheckCircle } from 'phosphor-react';
import { useRouter } from 'next/navigation';

export default function PaymentSuccessPage() {
  const router = useRouter();

  const handleBack = () => {
    // Navigate back to studio or home
    router.push('/studio');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 px-6 lg:px-12 py-4 flex-shrink-0 max-w-7xl mx-auto w-full lg:mt-20">
        <button onClick={handleBack} className="p-2 -ml-2">
          <ArrowLeft size={24} className="text-foreground" />
        </button>
        <h1 className="text-lg font-semibold">Back</h1>
      </div>

      {/* Main Content - Responsive Layout */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-6 lg:px-12 text-center lg:text-left lg:gap-12 max-w-7xl mx-auto">
        {/* Success Icon */}
        <div className="mb-8 lg:mb-0 lg:flex-shrink-0">
          <CheckCircle size={80} weight="regular" className="text-primary lg:w-24 lg:h-24 mx-auto lg:mx-0" />
        </div>

        {/* Text Content */}
        <div className="lg:flex-1 lg:max-w-2xl">
          {/* Thank You Message */}
          <h1 className="text-3xl lg:text-5xl xl:text-6xl font-pixel font-bold text-primary mb-6 leading-tight">
            Thank You For<br />
            Your Payment
          </h1>

          {/* Confirmation Message */}
          <p className="text-lg lg:text-xl text-muted-foreground">
            Everything is confirmed. You're all set.
          </p>
        </div>
      </div>
    </div>
  );
}