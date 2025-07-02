"use client";

import { House, Broadcast, CreditCard, User } from "phosphor-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import CoinButton from "../coin-withdrawal/CoinButton";

export default function TopNavbar() {
  const pathname = usePathname();

  const navItems = [
    {
      icon: House,
      label: "ArtNest",
      href: "/",
      active: pathname === "/",
    },
    {
      icon: Broadcast,
      label: "Track",
      href: "/track",
      active: pathname === "/track",
    },
    {
      icon: CreditCard,
      label: "Studio",
      href: "/studio",
      active: pathname === "/studio",
    },
    {
      icon: User,
      label: "Me",
      href: "/me",
      active: pathname === "/me",
    },
  ];

  return (
    <div className="fixed left-0 right-0 top-0 z-40 hidden bg-background/95 backdrop-blur-sm lg:block">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/artnest-logo.svg"
              alt="ArtNest Logo"
              className="h-8 w-auto"
            />
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-8">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 transition-colors hover:bg-muted"
                >
                  <Icon
                    size={20}
                    weight={item.active ? "fill" : "regular"}
                    className={
                      item.active ? "text-primary" : "text-muted-foreground"
                    }
                  />
                  <span
                    className={`text-sm font-medium ${
                      item.active ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}

            <CoinButton />
          </div>
        </div>
      </div>
    </div>
  );
}
