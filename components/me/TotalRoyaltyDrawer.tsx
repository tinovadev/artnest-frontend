'use client';

import { X, TrendUp, Calendar, CurrencyDollar } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Drawer, DrawerContent, DrawerOverlay } from '@/components/ui/drawer';
import { ForSaleArtwork } from '@/data/for-sale-artworks';
import { ForSaleArtworkDetails } from '@/data/for-sale-artwork-details';

interface TotalRoyaltyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  artwork: ForSaleArtwork;
  details: ForSaleArtworkDetails;
}

// Mock royalty data - in real app this would come from API
const royaltyData = {
  totalEarnings: 24.56,
  thisMonth: 8.32,
  totalUses: 307,
  thisMonthUses: 104,
  recentTransactions: [
    {
      id: '1',
      date: '2025.01.15',
      company: 'OpenAI',
      uses: 45,
      amount: 3.60,
      model: 'GPT-4 Vision'
    },
    {
      id: '2',
      date: '2025.01.14',
      company: 'Anthropic',
      uses: 32,
      amount: 2.56,
      model: 'Claude 3'
    },
    {
      id: '3',
      date: '2025.01.13',
      company: 'Midjourney',
      uses: 27,
      amount: 2.16,
      model: 'V6 Training'
    },
    {
      id: '4',
      date: '2025.01.12',
      company: 'Stability AI',
      uses: 38,
      amount: 3.04,
      model: 'SDXL'
    },
    {
      id: '5',
      date: '2025.01.11',
      company: 'Google',
      uses: 29,
      amount: 2.32,
      model: 'Gemini Vision'
    }
  ]
};

export default function TotalRoyaltyDrawer({ isOpen, onClose, artwork, details }: TotalRoyaltyDrawerProps) {
  const handleWithdraw = () => {
    console.log('Withdraw royalties');
    // Implement withdrawal logic
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerOverlay className="bg-black/80" />
      <DrawerContent className="bg-background border-0 rounded-t-3xl max-h-[90vh]">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0">
            <h2 className="text-xl font-bold text-foreground">Total Royalty</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X size={24} className="text-foreground" />
            </button>
          </div>

          <ScrollArea className="flex-1">
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

              {/* Usage Statistics */}
              <Card className="bg-secondary border-border rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendUp size={20} className="text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Usage Statistics</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {royaltyData.totalUses.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Uses</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {royaltyData.thisMonthUses.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">This Month</div>
                  </div>
                </div>
              </Card>

              {/* Recent Transactions */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Transactions</h3>
                <div className="space-y-3">
                  {royaltyData.recentTransactions.map((transaction) => (
                    <Card key={transaction.id} className="bg-secondary border-border rounded-2xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-foreground">{transaction.company}</span>
                            <span className="font-bold text-foreground">${transaction.amount.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{transaction.model}</span>
                            <span>{transaction.uses} uses</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {transaction.date}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Withdraw Button */}
              <div className="pt-4">
                <Button 
                  onClick={handleWithdraw}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-2xl text-lg"
                  disabled={royaltyData.totalEarnings < 10} // Minimum withdrawal amount
                >
                  {royaltyData.totalEarnings >= 10 
                    ? `Withdraw $${royaltyData.totalEarnings.toFixed(2)}`
                    : 'Minimum $10.00 to withdraw'
                  }
                </Button>
                {royaltyData.totalEarnings < 10 && (
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    You need at least $10.00 to make a withdrawal
                  </p>
                )}
              </div>
            </div>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
}