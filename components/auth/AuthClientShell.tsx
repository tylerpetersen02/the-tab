"use client";

import { AuthProvider } from "./AuthProvider";

export function AuthClientShell({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
