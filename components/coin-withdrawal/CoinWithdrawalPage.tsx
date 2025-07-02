"use client";

import { useState } from "react";
import { ArrowLeft } from "phosphor-react";
import { CoinVertical } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function CoinWithdrawalPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const totalCoins = 10;
  const transactionFee = 0.005;
  const algoRate = 0.0325; // 1 coin = 0.0325 ALGO

  const withdrawalAmount = amount ? parseFloat(amount) : 0;
  const totalWithdrawal = withdrawalAmount * algoRate;

  const handleConfirm = () => {
    if (amount && walletAddress && withdrawalAmount <= totalCoins) {
      // Handle withdrawal logic here
      console.log("Processing withdrawal:", {
        amount: withdrawalAmount,
        walletAddress,
        totalWithdrawal,
        transactionFee,
      });
    }
  };

  const isValidWithdrawal =
    amount &&
    walletAddress &&
    withdrawalAmount > 0 &&
    withdrawalAmount <= totalCoins;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <ScrollArea className="h-screen">
        {/* Header */}
        <div className="mx-auto flex max-w-7xl items-center gap-4 border-b border-gray-200 px-6 py-4 lg:px-12">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-2 p-2"
            onClick={() => router.back()}
          >
            <ArrowLeft size={24} className="text-gray-900" weight="regular" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">
            Coin Withdrawal
          </h1>
        </div>

        {/* Main Content - Responsive Layout */}
        <div className="mx-auto max-w-7xl px-6 py-6 lg:flex lg:items-start lg:gap-12 lg:px-12">
          {/* Left Side - Total Balance (Desktop) / Top Section (Mobile) */}
          <div className="mb-8 lg:mb-0 lg:flex-1">
            <div>
              <h2 className="mb-2 font-pixel text-3xl font-light text-[#FF5722] lg:mb-4 lg:text-4xl">
                Total Balance
              </h2>
              <div className="flex items-center space-x-2 lg:space-x-4">
                <CoinVertical
                  size={24}
                  weight="regular"
                  className="text-[#FF5722] lg:h-10 lg:w-10"
                />
                <span className="font-pixel text-4xl font-light lg:text-6xl lg:font-normal">
                  {totalCoins}
                </span>
              </div>
              <p className="mt-4 hidden text-lg text-gray-600 lg:block">
                Available for withdrawal
              </p>
            </div>
          </div>

          {/* Right Side - Form (Desktop) / Bottom Section (Mobile) */}
          <div className="lg:flex lg:flex-1 lg:flex-col">
            <div className="lg:flex-1">
              {/* Form Fields */}
              <div className="space-y-8 lg:space-y-10">
                <div>
                  <label
                    htmlFor="amount"
                    className="mb-3 block text-base font-medium text-gray-900 lg:mb-4 lg:text-lg"
                  >
                    Amount to Withdraw
                  </label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter the number of coins"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="h-12 rounded-xl border-gray-200 bg-white text-gray-900 placeholder:text-gray-400"
                    max={totalCoins}
                  />
                </div>

                <div>
                  <label
                    htmlFor="wallet"
                    className="mb-3 block text-base font-medium text-gray-900 lg:mb-4 lg:text-lg"
                  >
                    Withdrawal Wallet Address
                  </label>
                  <Input
                    id="wallet"
                    type="text"
                    placeholder="Paste your wallet address here"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="h-12 rounded-xl border-gray-200 bg-white text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Transaction Summary */}
              <div className="mt-12 border-t border-gray-200 pt-8 lg:mt-16 lg:pt-10">
                <div className="mb-4 flex items-center justify-between lg:mb-6">
                  <span className="text-base text-gray-900 lg:text-lg">
                    Transaction Fee
                  </span>
                  <span className="text-base font-medium lg:text-lg">
                    {transactionFee}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900 lg:text-xl">
                    Total Withdrawal
                  </span>
                  <div className="text-right">
                    <span className="text-2xl font-semibold lg:text-3xl">
                      {totalWithdrawal.toFixed(3)}
                    </span>
                    <span className="ml-1 text-base text-gray-600 lg:text-lg">
                      ALGO
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirm Button - Desktop */}
            <div className="hidden justify-end pt-4 lg:flex lg:pt-6">
              <Button
                onClick={handleConfirm}
                disabled={!isValidWithdrawal}
                className="h-14 w-full rounded-xl bg-primary py-4 text-lg font-semibold text-white hover:bg-primary/90"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>

        {/* Confirm Button - Mobile (Fixed Bottom) */}
        <div className="fixed bottom-0 left-0 right-0 border-t border-gray-100 bg-white p-6 lg:hidden">
          <Button
            onClick={handleConfirm}
            disabled={!isValidWithdrawal}
            className="w-full rounded-2xl bg-primary py-4 text-lg font-semibold text-white hover:bg-primary/90"
          >
            Confirm
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
}
