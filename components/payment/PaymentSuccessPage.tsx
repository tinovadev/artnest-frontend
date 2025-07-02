"use client";

import { ArrowLeft, CheckCircle } from "phosphor-react";
import { useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const router = useRouter();

  const handleBack = () => {
    // Navigate back to studio or home
    router.push("/studio");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <div className="mx-auto flex w-full max-w-7xl flex-shrink-0 items-center gap-4 px-6 py-4 lg:px-12">
        <button onClick={handleBack} className="-ml-2 p-2">
          <ArrowLeft size={24} className="text-foreground" />
        </button>
        <h1 className="text-lg font-semibold">Back</h1>
      </div>

      {/* Main Content - Responsive Layout */}
      <div className="mx-auto flex max-w-7xl flex-1 flex-col items-center justify-center px-6 text-center lg:flex-row lg:gap-12 lg:px-12 lg:text-left">
        {/* Success Icon */}
        <div className="mb-8 lg:mb-0 lg:flex-shrink-0">
          <CheckCircle
            size={80}
            weight="regular"
            className="mx-auto text-primary lg:mx-0 lg:h-24 lg:w-24"
          />
        </div>

        {/* Text Content */}
        <div className="lg:flex-1">
          {/* Thank You Message */}
          <h1 className="mb-6 font-pixel text-3xl font-bold leading-tight text-primary lg:text-5xl xl:text-6xl">
            Thank You For
            <br />
            Your Payment
          </h1>

          {/* Confirmation Message */}
          <p className="text-lg text-muted-foreground lg:text-xl">
            Everything is confirmed. You're all set.
          </p>
        </div>
      </div>
    </div>
  );
}
