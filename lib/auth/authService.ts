import { supabase } from "@/lib/supabase/client";
import type { AuthProfile, SignUpPayload, AuthResult } from "./authTypes";

export const authService = {
  async signIn(email: string, password: string): Promise<AuthResult> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      if (!data.user) {
        return { error: "No user returned from sign in" };
      }

      const profile = await this.getProfile(data.user.id);
      return {
        error: null,
        data: { user: profile },
      };
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Sign in failed" };
    }
  },

  async signUp(payload: SignUpPayload): Promise<AuthResult> {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
        options: {
          data: {
            display_name: payload.display_name,
            username: payload.username,
          },
        },
      });

      if (authError) {
        return { error: authError.message };
      }

      if (!authData.user) {
        return { error: "No user returned from sign up" };
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
      const profile = await this.getProfile(authData.user.id);

      return {
        error: null,
        data: { user: profile },
      };
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Sign up failed" };
    }
  },

  async signOut(): Promise<void> {
    await supabase.auth.signOut();
  },

  async getProfile(userId: string): Promise<AuthProfile | null> {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }

      return data as AuthProfile;
    } catch (err) {
      console.error("Error in getProfile:", err);
      return null;
    }
  },

  async updateProfile(
    userId: string,
    updates: Partial<AuthProfile>
  ): Promise<AuthResult> {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", userId)
        .select()
        .single();

      if (error) {
        return { error: error.message };
      }

      return {
        error: null,
        data: { user: data as AuthProfile },
      };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Update failed",
      };
    }
  },

  async getCurrentSession(): Promise<{ user: any; session: any } | null> {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session) {
        return null;
      }

      return {
        user: session.user,
        session,
      };
    } catch (err) {
      console.error("Error getting session:", err);
      return null;
    }
  },
};
