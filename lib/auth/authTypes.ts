export type AuthProfile = {
  id: string;
  email: string | null;
  display_name: string;
  username: string | null;
  initials: string | null;
  avatar_url: string | null;
  bio: string | null;
  home_city: string | null;
  is_private: boolean;
  created_at: string;
  updated_at: string;
};

export type SignUpPayload = {
  email: string;
  password: string;
  display_name: string;
  username: string;
};

export type AuthResult = {
  error: string | null;
  data?: {
    user: AuthProfile | null;
  };
};

export type AuthContextValue = {
  user: AuthProfile | null;
  session: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (payload: SignUpPayload) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<AuthProfile>) => Promise<AuthResult>;
};
