"use client";

import { useState } from "react";
import { X } from "phosphor-react";
import { ChartLineUp } from "phosphor-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";

interface BuyCoinsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BuyCoinsModal({ isOpen, onClose }: BuyCoinsModalProps) {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const coinPackages = [
    { coins: 10, price: 10, algo: "10", unit: "ALGO" },
    { coins: 50, price: 50, algo: "50", unit: "ALGO" },
    { coins: 100, price: 100, algo: "100", unit: "ALGO" },
  ];

  const handleBuyNow = () => {
    if (selectedPackage !== null) {
      const selectedPkg = coinPackages[selectedPackage];
      console.log("Purchasing:", selectedPkg);
      // Handle purchase logic here
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/80" />
      <DialogContent className="w-[calc(100svw-32px)] max-w-sm rounded-3xl border-0 bg-muted p-8">
        <DialogHeader>
          <div className="flex justify-between">
            <DialogTitle className="text-xl font-semibold text-white">
              Buy Coins
            </DialogTitle>
          </div>
          <p className="mt-2 text-left text-sm text-gray-400">
            Use coins to unlock advanced features.
          </p>
        </DialogHeader>

        <div>
          {/* Coin Package Options */}
          <div className="mb-6 grid grid-cols-3 gap-2">
            {coinPackages.map((pkg, index) => (
              <button
                key={index}
                onClick={() => setSelectedPackage(index)}
                className={`rounded-xl border-2 p-4 transition-all duration-200 ${
                  selectedPackage === index
                    ? "border-primary bg-primary/10"
                    : "border-slate-600 hover:border-slate-500"
                }`}
              >
                <div className="flex shrink-0 flex-col items-center">
                  <div
                    className={`flex items-center gap-1 text-center font-semibold text-primary ${
                      selectedPackage === index ? "text-primary" : "text-white"
                    }`}
                  >
                    {pkg.algo}
                    <span className="text-xs font-normal">{pkg.unit}</span>
                  </div>
                  <div className="mt-1 text-sm text-gray-400">${pkg.price}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Exchange Rate Info */}
          <div className="mb-6 flex flex-col items-center gap-1 space-x-2 text-sm text-gray-400">
            <ChartLineUp size={16} weight="regular" className="text-primary" />
            <span className="text-primary">
              Exchange rates are updated in real time.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center space-y-3">
            <Button
              onClick={handleBuyNow}
              disabled={selectedPackage === null}
              className="w-full rounded-xl bg-primary py-3 font-semibold text-white hover:bg-primary/90"
            >
              Buy Now
            </Button>

            <Button
              onClick={onClose}
              variant="outline"
              className="w-full rounded-xl border-0 bg-black py-4 font-semibold text-white hover:bg-black/80"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
