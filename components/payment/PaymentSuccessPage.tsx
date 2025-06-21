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
      <div className="flex items-center gap-4 px-6 py-4 flex-shrink-0">
        <button onClick={handleBack} className="p-2 -ml-2">
          <ArrowLeft size={24} className="text-foreground" />
        </button>
        <h1 className="text-lg font-semibold">Back</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Success Icon - Phosphor CheckCircle */}
        <div className="mb-8">
          <CheckCircle size={80} weight="regular" className="text-primary" />
        </div>

        {/* Thank You Message */}
        <h1 className="text-3xl lg:text-4xl font-pixel font-bold text-primary mb-6 leading-tight">
          Thank You For<br />
          Your Payment
        </h1>

        {/* Confirmation Message */}
        <p className="text-lg text-muted-foreground">
          Everything is confirmed. You're all set.
        </p>
      </div>
    </div>
  );
}