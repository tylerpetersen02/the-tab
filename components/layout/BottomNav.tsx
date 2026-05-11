"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Beer, Plus, Trophy, ReceiptText } from "lucide-react";

const tabs = [
  { href: "/feed", icon: House },
  { href: "/tabs", icon: Beer },
  { href: "/add-drink", icon: Plus },
  { href: "/leaderboard", icon: Trophy },
  { href: "/receipts", icon: ReceiptText },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-medium-gray flex items-center justify-around shadow-md"
      style={{
        height: "calc(64px + max(0px, env(safe-area-inset-bottom)))",
        paddingBottom: "max(0px, env(safe-area-inset-bottom))",
      }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex items-center justify-center flex-1 transition-colors ${
              isActive ? "text-orange" : "text-dark-gray"
            }`}
          >
            <Icon size={26} />
          </Link>
        );
      })}
    </nav>
  );
}
