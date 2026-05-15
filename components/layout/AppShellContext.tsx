"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AppShellContextType = {
  profileDrawerOpen: boolean;
  openProfileDrawer: () => void;
  closeProfileDrawer: () => void;
};

const AppShellContext = createContext<AppShellContextType | undefined>(undefined);

export function AppShellProvider({ children }: { children: ReactNode }) {
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);

  return (
    <AppShellContext.Provider
      value={{
        profileDrawerOpen,
        openProfileDrawer: () => setProfileDrawerOpen(true),
        closeProfileDrawer: () => setProfileDrawerOpen(false),
      }}
    >
      {children}
    </AppShellContext.Provider>
  );
}

export function useAppShell() {
  const context = useContext(AppShellContext);
  if (!context) {
    throw new Error("useAppShell must be used within AppShellProvider");
  }
  return context;
}
