"use client";

import { X, LogOut, Settings, Shield, Users, Search, FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppText } from "@/components/common/AppText";
import { AppButton } from "@/components/common/AppButton";
import { UserAvatar } from "@/components/common/UserAvatar";
import { useAuth } from "@/components/auth/useAuth";
import { useAppShell } from "./AppShellContext";

interface ProfileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function ProfileDrawer({ open, onClose }: ProfileDrawerProps) {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleLogOut = async () => {
    await signOut();
    onClose();
    router.push("/login");
  };

  if (!open) return null;

  const menuItems = [
    { icon: null, label: "Account", href: "/account" },
    { icon: Users, label: "Buddies", href: "#" },
    { icon: Search, label: "Find / Invite Buddies", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
    { icon: Shield, label: "Privacy & Safety", href: "#" },
    { icon: FileText, label: "Legal / Disclaimers", href: "#" },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-ink/30"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-[86vw] max-w-sm bg-off-white rounded-l-[28px] shadow-lg flex flex-col">
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-light-gray rounded-full"
          >
            <X className="h-5 w-5 text-dark-gray" />
          </button>
        </div>

        {/* Profile Summary */}
        {user && (
          <div className="px-6 pb-6 border-b border-light-gray">
            <div className="flex items-center gap-3 mb-3">
              <UserAvatar
                initials={user.initials || "?"}
                size="md"
                avatarUrl={user.avatar_url}
              />
              <div className="flex-1 min-w-0">
                <AppText variant="cardTitle" className="truncate">
                  {user.display_name}
                </AppText>
                <AppText variant="meta" className="text-dark-gray truncate">
                  @{user.username}
                </AppText>
              </div>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.label} href={item.href}>
                  <button
                    onClick={onClose}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-light-gray text-left"
                  >
                    {Icon && <Icon className="h-4 w-4 text-dark-gray flex-shrink-0" />}
                    <AppText variant="body" className="text-ink">
                      {item.label}
                    </AppText>
                  </button>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Log Out Button */}
        <div className="px-6 py-4 border-t border-light-gray">
          <AppButton
            variant="outline"
            size="lg"
            fullWidth
            onClick={handleLogOut}
            className="border-orange-200 text-orange-600"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </AppButton>
        </div>
      </div>
    </>
  );
}
