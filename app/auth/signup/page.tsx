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

export default function SignupPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!agreedToTerms) {
      setError("You must agree to the terms to create an account");
      return;
    }

    setLoading(true);

    const result = await signUp({
      email,
      password,
      display_name: displayName,
      username,
    });

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/");
    }
  };

  return (
    <AppPage>
      <AppHeader title="Create Account" />
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
              <AppText variant="label">Display Name</AppText>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Tyler Petersen"
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <AppText variant="label">Username</AppText>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="tylerpetersen"
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

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 rounded border-medium-gray"
              />
              <label htmlFor="terms" className="flex-1">
                <AppText variant="caption" className="text-dark-gray">
                  I agree to the Terms of Service and Privacy Policy
                </AppText>
              </label>
            </div>

            <AppButton
              onClick={handleSubmit}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Creating account..." : "Create Account"}
            </AppButton>
          </form>

          <div className="mt-6 border-t border-medium-gray pt-6">
            <AppText variant="caption" className="text-center text-dark-gray">
              Already have an account?
            </AppText>
            <Link href="/auth/login" className="mt-3 block">
              <AppButton variant="secondary" className="w-full">
                Log In
              </AppButton>
            </Link>
          </div>
        </CardShell>
      </PageSection>
    </AppPage>
  );
}
