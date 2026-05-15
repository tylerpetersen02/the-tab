"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";
import { AppText } from "@/components/common/AppText";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/feed");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-off-white">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-medium-gray border-t-teal"></div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-off-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">{children}</div>
      </div>

      <footer className="text-center py-6 px-4 text-dark-gray">
        <AppText variant="meta">
          Drink responsibly. Keep the memories.
        </AppText>
      </footer>
    </div>
  );
}
