"use client";

import { createContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";
import { authService } from "@/lib/auth/authService";
import { AuthContextValue, AuthProfile } from "@/lib/auth/authTypes";

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadProfile = async (session: Session | null) => {
      if (!mounted) return;

      setSession(session);

      if (session?.user?.id) {
        const profile = await authService.getProfile(session.user.id);
        if (mounted) setUser(profile);
      } else {
        setUser(null);
      }

      if (mounted) setLoading(false);
    };

    authService.getCurrentSession().then((currentSession) => {
      loadProfile(currentSession?.session ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      loadProfile(session);
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const result = await authService.signIn(email, password);
    if (!result.error && result.data?.user) {
      setUser(result.data.user);
      const newSession = await authService.getCurrentSession();
      setSession(newSession);
    }
    return result;
  };

  const signUp = async (payload: {
    email: string;
    password: string;
    display_name: string;
    username: string;
  }) => {
    const result = await authService.signUp(payload);
    if (!result.error && result.data?.user) {
      setUser(result.data.user);
      const newSession = await authService.getCurrentSession();
      setSession(newSession);
    }
    return result;
  };

  const signOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
      setSession(null);
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Sign out failed";
      return { error: errorMessage };
    }
  };

  const refreshProfile = async () => {
    if (!session?.user?.id) return { error: "No active session", data: null };

    const result = await authService.getProfile(session.user.id);
    if (!result.error && result.data) {
      setUser(result.data);
    }
    return result;
  };

  const updateProfile = async (
    updates: Partial<AuthProfile>
  ) => {
    if (!session?.user?.id) return { error: "No active session", data: null };

    const result = await authService.updateProfile(session.user.id, updates);
    if (!result.error && result.data) {
      setUser(result.data);
    }
    return result;
  };

  const value: AuthContextValue = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    refreshProfile,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
