"use client";

import { Bell } from "lucide-react";
import { useAuth } from "@/components/auth/useAuth";
import { useAppShell } from "@/components/layout/AppShellContext";
import { IconCircle } from "@/components/common/IconCircle";
import { AppText } from "@/components/common/AppText";
import { UserAvatar } from "@/components/common/UserAvatar";

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  titleClassName?: string;
}

export function AppHeader({ title = "The Tab", subtitle, titleClassName }: AppHeaderProps) {
  const { user } = useAuth();
  const { openProfileDrawer } = useAppShell();

  return (
    <header className="flex items-center justify-between px-5 pt-4 pb-3">
      <div>
        <AppText as="h1" variant="pageTitle" className={titleClassName}>
          {title}
        </AppText>
        {subtitle && (
          <AppText variant="pageSubtitle">
            {subtitle}
          </AppText>
        )}
      </div>

      <div className="flex items-center gap-3">
        <IconCircle>
          <Bell className="h-5 w-5 text-ink" />
        </IconCircle>

        <button
          onClick={openProfileDrawer}
          className="relative hover:opacity-80 transition-opacity"
        >
          <UserAvatar
            initials={user?.initials || "?"}
            size="md"
            avatarUrl={user?.avatar_url}
          />
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-orange border-2 border-white" />
        </button>
      </div>
    </header>
  );
}
