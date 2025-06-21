'use client';

import { House, Broadcast, CreditCard, User } from 'phosphor-react';

export default function Navbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="flex justify-around items-center py-3">
        <div className="flex flex-col items-center gap-1">
          <House size={24} weight="fill" className="text-primary" />
          <span className="text-xs text-primary font-medium font-pixel">ArtNest</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Broadcast size={24} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground"></span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <CreditCard size={24} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground"></span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <User size={24} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground"></span>
        </div>
      </div>
    </div>
  );
}