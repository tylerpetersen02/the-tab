"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppText } from "@/components/common/AppText";
import { AppButton } from "@/components/common/AppButton";
import { inputStyles } from "@/lib/inputStyles";
import { useAuth } from "@/components/auth/useAuth";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthMessage } from "@/components/auth/AuthMessage";
import { AuthHero } from "@/components/auth/AuthHero";

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
      router.push("/feed");
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <AppText as="h1" variant="pageTitle" className="text-orange mb-2">
            The Tab
          </AppText>
          <AppText variant="body" className="text-dark-gray">
            Open your tab
          </AppText>
        </div>

        <AuthHero />

        <div className="space-y-6">
          <div className="text-center">
            <AppText as="h2" variant="cardTitle">
              Create account
            </AppText>
            <AppText variant="meta" className="text-dark-gray mt-1">
              Your name and username show on tabs and comments.
            </AppText>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              <AppText variant="meta" className="text-teal">
                @{username || "username"}
              </AppText>
            </div>

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
                placeholder="Minimum 8 characters"
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

            <div className="flex items-start space-x-3 pt-2">
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
              size="lg"
              fullWidth
            >
              {loading ? "Creating account..." : "Create Account"}
            </AppButton>
          </form>

          <div className="border-t border-light-gray pt-6">
            <div className="rounded-lg bg-orange/5 p-4 text-center">
              <AppText variant="meta" className="text-dark-gray">
                Already have one?
              </AppText>
              <Link href="/login">
                <AppButton variant="secondary" size="md" fullWidth className="mt-3">
                  Log In
                </AppButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
