"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppText } from "@/components/common/AppText";
import { AppButton } from "@/components/common/AppButton";
import { inputStyles } from "@/lib/inputStyles";
import { useAuth } from "@/components/auth/useAuth";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthHero } from "@/components/auth/AuthHero";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <AppText as="h1" variant="brand" className="text-teal mb-2">
            The Tab
          </AppText>
          <AppText variant="body" className="text-dark-gray">
            Welcome back
          </AppText>
        </div>

        <AuthHero />

        <div className="space-y-6">
          <div className="text-center">
            <AppText as="h2" variant="cardTitle">
              Log in
            </AppText>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <AppText variant="meta" className="text-ink">Email</AppText>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <AppText variant="meta" className="text-ink">Password</AppText>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={inputStyles}
                required
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-3">
                <AppText variant="bodySmall" className="text-red-700">
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
              <AppText variant="meta" className="text-teal hover:underline">
                Forgot password?
              </AppText>
            </Link>
          </div>

          <div className="rounded-lg bg-orange/5 p-4 text-center">
            <AppText variant="bodySmall" className="text-dark-gray">
              New here?
            </AppText>
            <Link href="/signup">
              <AppText variant="body" className="mt-2 text-teal">
                Open your first tab
              </AppText>
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
