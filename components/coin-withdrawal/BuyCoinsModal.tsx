"use client";

import { useState } from "react";
import { X } from "phosphor-react";
import { ChartLineUp } from "phosphor-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BuyCoinsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BuyCoinsModal({ isOpen, onClose }: BuyCoinsModalProps) {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const coinPackages = [
    { coins: 10, price: 10, algo: "10 ALGO" },
    { coins: 50, price: 50, algo: "50 ALGO" },
    { coins: 100, price: 100, algo: "100 ALGO" },
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
      <DialogContent className="gap-0 rounded-2xl border-slate-700 bg-slate-800 p-0 text-white sm:max-w-md">
        <DialogHeader className="px-6 py-5 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-white">
              Buy Coins
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-gray-400 hover:text-white"
              onClick={onClose}
            >
              <X size={20} weight="regular" />
            </Button>
          </div>
          <p className="mt-2 text-sm text-gray-400">
            Use coins to unlock advanced features.
          </p>
        </DialogHeader>

        <div className="px-6 py-5">
          {/* Coin Package Options */}
          <div className="mb-6 grid grid-cols-3 gap-3">
            {coinPackages.map((pkg, index) => (
              <button
                key={index}
                onClick={() => setSelectedPackage(index)}
                className={`rounded-2xl border-2 px-6 py-5 transition-all duration-200 ${
                  selectedPackage === index
                    ? "border-[#FF5722] bg-[#FF5722]/10"
                    : "border-slate-600 bg-slate-700/50 hover:border-slate-500"
                }`}
              >
                <div className="text-center">
                  <div
                    className={`text-lg font-semibold ${
                      selectedPackage === index
                        ? "text-[#FF5722]"
                        : "text-white"
                    }`}
                  >
                    {pkg.algo}
                  </div>
                  <div className="mt-1 text-sm text-gray-400">${pkg.price}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Exchange Rate Info */}
          <div className="mb-6 flex items-center space-x-2 text-sm text-gray-400">
            <ChartLineUp
              size={16}
              weight="regular"
              className="text-[#FF5722]"
            />
            <span>Exchange rates are updated in real time.</span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleBuyNow}
              disabled={selectedPackage === null}
              className="h-12 w-full rounded-2xl bg-[#FF5722] font-medium text-white hover:bg-[#E64A19] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Buy Now
            </Button>

            <Button
              onClick={onClose}
              variant="ghost"
              className="h-12 w-full rounded-2xl font-medium text-gray-400 hover:bg-slate-700 hover:text-white"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
