"use client";

import Link from "next/link";
import { CoinVertical, Plus } from "phosphor-react";
import { Button } from "../ui/button";
import { useState } from "react";
import BuyCoinsModal from "./BuyCoinsModal";

export default function CoinButton() {
  const [isBuyCoinsModalOpen, setIsBuyCoinsModalOpen] = useState(false);

  return (
    <div className="flex items-center space-x-2 rounded-2xl bg-slate-50/10 p-2 transition-colors hover:bg-slate-50/5">
      {/* Coin Balance - Clickable to go to withdrawal */}
      <Link href="/coin-withdrawal" className="flex items-center space-x-1">
        <CoinVertical size={16} className="text-primary" />
        <span className="text-sm">10.0</span>
      </Link>
      {/* Plus Button - Opens charge modal */}
      <Button
        onClick={() => setIsBuyCoinsModalOpen(true)}
        className="flex h-6 w-6 items-center justify-center rounded-full bg-primary p-0 hover:bg-[#E64A19]"
      >
        <Plus size={14} weight="bold" className="text-black" />
      </Button>

      <BuyCoinsModal
        isOpen={isBuyCoinsModalOpen}
        onClose={() => setIsBuyCoinsModalOpen(false)}
      />
    </div>
  );
}
