"use client";

import { ArrowLeft, Trash } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import BigNumber from 'bignumber.js';
import { studioArtworks } from "@/data/studio-artworks";
import CoinButton from "../coin-withdrawal/CoinButton";

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  artist: string;
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isEnough, setIsEnough] = useState<boolean>(false);
  const [total, setTotal] = useState<string>('0');
  const [walletAddress, setWalletAddress] = useState<{
    address: string;
    network: string;
    balance: string;
  }>({
    address: '',
    network: 'Algorand',
    balance: '0',
  });

    useEffect(() => {
    const getStudioArtworks = async () => {
        try {
          const studioArtworkData = await fetch("/api/studio-artworks");
        if (!studioArtworkData.ok) {
          console.error("Failed to fetch studio artworks");
          return [];
        }

        const artworks: CartItem[] = await studioArtworkData.json();
        const cartList = sessionStorage.getItem('CART_KEY');

        const cartItems = artworks.filter((artwork) => {
          if (cartList && cartList.includes(artwork.id)) {
            return true;
          }
          return false;
        });

        setCartItems(cartItems); 
      } catch (err) {
        console.error("Error fetching studio artworks:", err);
        return [];
      }
    };
    const getMyWallet = async () => {
      try {
        const walletData = await fetch('/api/me/wallet'); 
        const jsonData = await walletData.json();
        
        setWalletAddress(jsonData);
      } catch (error) {
        console.error('Error fetching wallet address:', error);
      }
    };

    getMyWallet();
    getStudioArtworks();
  }, []);

  useEffect(() => {
    const calcTotalAndCheckBalance = () => {
      const totalAmount = cartItems.reduce((acc, item) => acc.plus(item.price), new BigNumber(0));
      setTotal(totalAmount.toString());

      const balanceBN = new BigNumber(walletAddress.balance ?? '0');
      setIsEnough(balanceBN.gte(totalAmount));
    };

    // FIXEM: sampleItem, setCartItems 는 봐야함
    // Load cart items from localStorage or state management
    // For demo purposes, we'll show "Song of the Wind" as an example
    const sampleItem = studioArtworks.find((artwork) => artwork.id === "2");
    if (sampleItem) {
      setCartItems([
        {
          id: sampleItem.id,
          title: sampleItem.title,
          price: sampleItem.price,
          image: sampleItem.image,
          artist: "Aria Solen",
        },
      ]);
    }
    calcTotalAndCheckBalance();
  }, [cartItems, walletAddress.balance]);

  const handleBack = () => {
    router.back();
  };

  const handleRemoveItem = (itemId: string) => {
    const cartItmeNumbers = cartItems.map((item) => item.id);
    if (cartItmeNumbers.includes(itemId)) {
      setCartItems((prev) => prev.filter((cart) => cart.id !== itemId));
      sessionStorage.setItem('CART_KEY', JSON.stringify(cartItmeNumbers.filter((cart) => cart !== itemId)));
    }
    sessionStorage.setItem('CART_KEY', JSON.stringify(cartItmeNumbers.filter((cart) => cart !== itemId)));
  };

  const handleCheckout = async () => {
    if (!isEnough) {
      alert('Insufficient balance in your wallet');
      return;
    }
    const purchase = async () => {
      try {
        const response = await fetch('/api/purchase', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: cartItems,
            myInfo: {
              address: walletAddress.address,
              network: walletAddress.network,
              balance: walletAddress.balance,
            },
            total: total,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to process purchase');
        }

        const data = await response.json();
        return true;
      } catch (error) {
        console.error('Error during purchase:', error);
        return false;
      }
    };

    const result = await purchase();
    if (result) {
      router.push('/payment-success');
      return;
    } 
    alert('Purchase Failed!');
  };

  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy wallet address:', err);
    }
  };


  return (
    <div className="min-h-screen bg-white text-gray-900">
      <ScrollArea className="h-screen">
        <div className="pb-32 lg:pb-8">
          {/* Header */}
          <div className="mx-auto flex max-w-7xl items-center gap-4 border-b border-gray-200 px-6 py-4 lg:px-12">
            <button onClick={handleBack} className="-ml-2 p-2">
              <ArrowLeft size={24} className="text-gray-900" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Cart</h1>

            <div className="flex w-full justify-end">
              <CoinButton />
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-6 py-6 lg:px-12">
            {cartItems.length === 0 ? (
              /* Empty Cart State */
              <div className="flex flex-col items-center justify-center py-20">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <Trash size={24} className="text-gray-400" />
                </div>
                <h2 className="mb-2 text-xl font-semibold text-gray-900">
                  Your cart is empty
                </h2>
                <p className="text-center text-gray-500">
                  Browse our studio to find amazing artworks
                </p>
              </div>
            ) : (
              /* Responsive Layout for Cart Items */
              <div className="lg:flex lg:items-start lg:gap-12">
                {/* Cart Items - Left Side on Desktop */}
                <div className="mb-8 space-y-6 lg:mb-0 lg:flex-1">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4 lg:border lg:border-gray-200 lg:bg-white lg:p-6"
                    >
                      {/* Artwork Thumbnail */}
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100 lg:h-24 lg:w-24">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="min-w-0 flex-1">
                        <h3 className="mb-1 text-lg font-semibold text-gray-900 lg:text-xl">
                          {item.title}
                        </h3>
                        <p className="mb-1 text-lg font-bold text-primary lg:text-2xl">
                          ${item.price}
                        </p>
                        <p className="text-sm text-gray-500 lg:text-base">
                          {item.artist}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                      >
                        <Trash size={20} className="text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Order Summary - Right Side on Desktop */}
                <div className="lg:w-80 lg:flex-shrink-0">
                  <div className="bg-gray-50 lg:bg-white lg:border lg:border-gray-200 rounded-2xl p-6 lg:p-8">
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">My Wallet</h2>

                    {/* Wallet Address + Copy */}
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm break-all text-gray-700">{walletAddress.address}</p>
                      <button
                        onClick={handleCopy}
                        className="ml-2 text-sm text-blue-600 hover:underline"
                      >
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-6"></div>

                    {/* My Wallet Total */}
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Total</h3>
                      <p className="text-xl lg:text-2xl font-bold text-gray-900">$ {walletAddress.balance}</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 my-6"></div>

                  <div className="bg-gray-50 lg:bg-white lg:border lg:border-gray-200 rounded-2xl p-6 lg:p-8">
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                    
                    {/* Items List */}
                    <div className="mb-6 space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <span className="truncate pr-2 text-gray-600">{item.title}</span>
                          <span className="font-semibold text-gray-900">${item.price}</span>
                        </div>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="my-6 border-t border-gray-200"></div>

                    {/* Total */}
                    <div className="mb-8 flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900 lg:text-2xl">Total</h3>
                      <p className="text-xl font-bold text-gray-900 lg:text-2xl">${total}</p>
                    </div>

                    {/* Checkout Button - Desktop */}
                    <div className="hidden lg:block">
                      <Button
                        onClick={handleCheckout}
                        disabled={!isEnough}
                        className={`w-full text-white font-semibold py-4 rounded-2xl text-lg ${
                          isEnough
                            ? 'bg-primary hover:bg-primary/90'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {isEnough ? 'Checkout' : 'Insufficient Balance'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      {/* Fixed Checkout Button - Mobile Only */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200 lg:hidden">
          <Button 
            onClick={handleCheckout}
            disabled={!isEnough}
            className={`w-full font-semibold py-4 rounded-2xl text-lg ${
              isEnough
                ? 'bg-primary hover:bg-primary/90 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isEnough ? 'Checkout' : 'Insufficient Balance'}
          </Button>
        </div>
        )}
    </div>
  );
}
