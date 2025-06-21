'use client';

import { House, Broadcast, CreditCard, User } from 'phosphor-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    {
      icon: House,
      label: 'ArtNest',
      href: '/',
      active: pathname === '/'
    },
    {
      icon: Broadcast,
      label: 'Track',
      href: '/track',
      active: pathname === '/track'
    },
    {
      icon: CreditCard,
      label: 'Studio',
      href: '/studio',
      active: pathname === '/studio'
    },
    {
      icon: User,
      label: 'Me',
      href: '/me',
      active: pathname === '/me'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border lg:hidden">
      <div className="flex justify-around items-center py-3">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link key={index} href={item.href} className="flex flex-col items-center gap-1">
              <Icon 
                size={24} 
                weight={item.active ? "fill" : "regular"}
                className={item.active ? "text-primary" : "text-muted-foreground"} 
              />
              <span className={`text-xs font-medium font-pixel ${
                item.active ? "text-primary" : "text-muted-foreground"
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}