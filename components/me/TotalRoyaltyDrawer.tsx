'use client';

import { X, Calendar, CurrencyDollar } from 'phosphor-react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Drawer, DrawerContent, DrawerOverlay, DrawerTitle } from '@/components/ui/drawer';
import { ForSaleArtwork } from '@/data/for-sale-artworks';
import { ForSaleArtworkDetails } from '@/data/for-sale-artwork-details';

interface TotalRoyaltyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  artwork: ForSaleArtwork;
  details: ForSaleArtworkDetails;
}

// Mock royalty data from buyers - in real app this would come from API
const royaltyData = {
  totalEarnings: 24.56,
  thisMonth: 8.32,
  recentPurchases: [
    {
      id: '1',
      date: '2025.01.15',
      buyer: 'TechCorp AI',
      amount: 8.00
    },
    {
      id: '2',
      date: '2025.01.12',
      buyer: 'Creative Studio Inc',
      amount: 5.60
    },
    {
      id: '3',
      date: '2025.01.10',
      buyer: 'AI Research Lab',
      amount: 3.20
    },
    {
      id: '4',
      date: '2025.01.08',
      buyer: 'Digital Agency',
      amount: 4.80
    },
    {
      id: '5',
      date: '2025.01.05',
      buyer: 'Startup AI',
      amount: 2.96
    },
    {
      id: '6',
      date: '2025.01.03',
      buyer: 'Media Company',
      amount: 7.20
    },
    {
      id: '7',
      date: '2025.01.01',
      buyer: 'Design Studio',
      amount: 4.40
    }
  ]
};

export default function TotalRoyaltyDrawer({ isOpen, onClose, artwork, details }: TotalRoyaltyDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerOverlay className="bg-black/80" />
      <DrawerContent className="bg-background border-0 rounded-t-3xl h-[90vh] flex flex-col max-w-4xl mx-auto">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0">
          <DrawerTitle className="text-xl font-bold text-foreground">Total Royalty</DrawerTitle>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X size={24} className="text-foreground" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-6 space-y-6">
              {/* Artwork Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                  <img 
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{artwork.title}</h3>
                  <p className="text-muted-foreground">${details.royalty.pricePerUse.toFixed(2)} per use</p>
                </div>
              </div>

              {/* Total Earnings Overview */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-secondary border-border rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <CurrencyDollar size={20} className="text-success" />
                    <span className="text-sm text-muted-foreground">Total Earnings</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    ${royaltyData.totalEarnings.toFixed(2)}
                  </div>
                </Card>

                <Card className="bg-secondary border-border rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar size={20} className="text-primary" />
                    <span className="text-sm text-muted-foreground">This Month</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    ${royaltyData.thisMonth.toFixed(2)}
                  </div>
                </Card>
              </div>

              {/* Recent Purchases */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Purchases</h3>
                <div className="space-y-3">
                  {royaltyData.recentPurchases.map((purchase) => (
                    <Card key={purchase.id} className="bg-secondary border-border rounded-2xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-foreground text-base">{purchase.buyer}</span>
                            <span className="font-bold text-foreground text-base">${purchase.amount.toFixed(2)}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {purchase.date}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Extra space at bottom to ensure last item is visible */}
              <div className="h-6"></div>
            </div>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
}