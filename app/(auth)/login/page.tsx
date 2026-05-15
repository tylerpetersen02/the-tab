"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppPage } from "@/components/common/AppPage";
import { AppHeader } from "@/components/common/AppHeader";
import { PageSection } from "@/components/common/PageSection";
import { CardShell } from "@/components/common/CardShell";
import { AppButton } from "@/components/common/AppButton";
import { AppText } from "@/components/common/AppText";
import { inputStyles } from "@/lib/inputStyles";
import { useAuth } from "@/components/auth/useAuth";

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
      router.push("/");
    }
  };

  return (
    <AppPage>
      <AppHeader title="Log In" />
      <PageSection>
        <CardShell>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <AppText variant="label">Email</AppText>
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
              <AppText variant="label">Password</AppText>
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
                <AppText variant="caption" className="text-red-700">
                  {error}
                </AppText>
              </div>
            )}

            <AppButton
              onClick={handleSubmit}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Logging in..." : "Log In"}
            </AppButton>
          </form>

          <div className="mt-6 space-y-3 border-t border-medium-gray pt-6">
            <AppText variant="caption" className="text-center text-dark-gray">
              Don't have an account?
            </AppText>
            <Link href="/auth/signup" className="block">
              <AppButton variant="secondary" className="w-full">
                Create Account
              </AppButton>
            </Link>
          </div>

          <div className="mt-3">
            <Link href="/auth/forgot-password">
              <AppText
                variant="caption"
                className="text-center text-teal hover:underline"
              >
                Forgot password?
              </AppText>
            </Link>
          </div>
        </CardShell>
      </PageSection>
    </AppPage>
  );
}
