"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { BottomNav } from "@/components/layout/BottomNav";
import { ProfileDrawer } from "@/components/layout/ProfileDrawer";
import { AppShellProvider, useAppShell } from "@/components/layout/AppShellContext";

function AppLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profileDrawerOpen, closeProfileDrawer } = useAppShell();

  return (
    <ProtectedRoute>
      {children}
      <BottomNav />
      <ProfileDrawer open={profileDrawerOpen} onClose={closeProfileDrawer} />
    </ProtectedRoute>
  );
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShellProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </AppShellProvider>
  );
}
