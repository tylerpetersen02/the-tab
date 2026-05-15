"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { AppText } from "@/components/common/AppText";
import { AppButton } from "@/components/common/AppButton";
import { inputStyles } from "@/lib/inputStyles";
import { useAuth } from "@/components/auth/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/feed");
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div className="flex h-dvh items-center justify-center bg-ink">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-ink/30 border-t-white"></div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn(email, password);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/feed");
    }
  };

  return (
    <main className="relative min-h-dvh overflow-hidden bg-ink">
      {/* Hero Image */}
      <div className="absolute inset-x-0 -top-6 h-[50dvh]">
        <img
          src="/images/auth/signin-hero.png"
          alt=""
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/60 to-ink" />
      </div>

      {/* Form Section */}
      <div className="relative z-10 flex min-h-dvh flex-col justify-end px-5 pb-8 pt-[25dvh]">
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <AppText variant="meta" className="text-white/90">
                Email
              </AppText>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputStyles}
                inputMode="email"
                autoComplete="email"
                enterKeyHint="next"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    passwordInputRef.current?.focus();
                  }
                }}
                required
              />
            </div>

            <div className="space-y-2">
              <AppText variant="meta" className="text-white/90">
                Password
              </AppText>
              <div className="relative">
                <input
                  ref={passwordInputRef}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputStyles}
                  autoComplete="current-password"
                  enterKeyHint="done"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-medium-gray hover:text-dark-gray"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-red-500/20 p-3 border border-red-500/30">
                <AppText variant="bodySmall" className="text-red-200">
                  {error}
                </AppText>
              </div>
            )}

            <AppButton
              type="submit"
              disabled={loading}
              size="lg"
              fullWidth
            >
              {loading ? "Logging in..." : "Log In"}
            </AppButton>
          </form>

          <div className="text-center">
            <Link href="/forgot-password">
              <AppText variant="meta" className="text-orange hover:opacity-80 transition-opacity">
                Forgot password?
              </AppText>
            </Link>
          </div>

          <div className="rounded-lg bg-white/5 backdrop-blur-sm p-4 text-center border border-white/10">
            <AppText variant="bodySmall" className="text-white/75">
              New here?
            </AppText>
            <Link href="/signup">
              <AppText variant="body" className="mt-2 text-orange hover:opacity-80 transition-opacity">
                Open your first tab
              </AppText>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
