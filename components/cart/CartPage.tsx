'use client';

import { ArrowLeft, Trash } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { studioArtworks } from '@/data/studio-artworks';

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

  useEffect(() => {
    // Load cart items from localStorage or state management
    // For demo purposes, we'll show "Song of the Wind" as an example
    const sampleItem = studioArtworks.find(artwork => artwork.id === '2');
    if (sampleItem) {
      setCartItems([{
        id: sampleItem.id,
        title: sampleItem.title,
        price: sampleItem.price,
        image: sampleItem.image,
        artist: 'Aria Solen'
      }]);
    }
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleCheckout = () => {
    // Implement checkout logic
    console.log('Proceeding to checkout...');
    // Could navigate to payment page or show payment modal
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <ScrollArea className="h-screen">
        <div className="pb-32">
          {/* Header */}
          <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200">
            <button onClick={handleBack} className="p-2 -ml-2">
              <ArrowLeft size={24} className="text-gray-900" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Cart</h1>
          </div>

          <div className="px-6 py-6">
            {cartItems.length === 0 ? (
              /* Empty Cart State */
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Trash size={24} className="text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 text-center">
                  Browse our studio to find amazing artworks
                </p>
              </div>
            ) : (
              /* Cart Items */
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    {/* Artwork Thumbnail */}
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img 
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-lg font-bold text-primary mb-1">
                        ${item.price}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.artist}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Trash size={20} className="text-gray-400" />
                    </button>
                  </div>
                ))}

                {/* Divider */}
                <div className="border-t border-gray-200 my-8"></div>

                {/* Total */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Total</h2>
                  <p className="text-2xl font-bold text-gray-900">${total}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      {/* Fixed Checkout Button */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200">
          <Button 
            onClick={handleCheckout}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-2xl text-lg"
          >
            Checkout
          </Button>
        </div>
      )}
    </div>
  );
}