"use client";

import { useState } from "react";
import Link from "next/link";
import { AppText } from "@/components/common/AppText";
import { AppButton } from "@/components/common/AppButton";
import { inputStyles } from "@/lib/inputStyles";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthMessage } from "@/components/auth/AuthMessage";
import { AuthHero } from "@/components/auth/AuthHero";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Implement password reset via Supabase
    // For now, just show success message
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  if (submitted) {
    return (
      <AuthLayout>
        <div className="space-y-6">
          <div className="text-center">
            <AppText as="h1" variant="brand" className="text-teal mb-2">
              The Tab
            </AppText>
          </div>

          <AuthHero />

          <AuthCard>
            <div className="space-y-6 text-center">
              <AuthMessage title="Check your email" />

              <div className="space-y-3">
                <AppText variant="body" className="text-dark-gray">
                  We've sent password reset instructions to{" "}
                  <span className="font-semibold text-ink">{email}</span>
                </AppText>

                <div className="rounded-lg bg-teal-50 p-4">
                  <AppText variant="caption" className="text-teal">
                    The link will expire in 24 hours
                  </AppText>
                </div>
              </div>

              <Link href="/login">
                <AppButton size="lg" fullWidth>
                  Back to Log In
                </AppButton>
              </Link>
            </div>
          </AuthCard>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <AppText as="h1" variant="brand" className="text-teal mb-2">
            The Tab
          </AppText>
          <AppText variant="body" className="text-dark-gray">
            Reset password
          </AppText>
        </div>

        <AuthHero />

        <div className="space-y-6">
          <div className="text-center">
            <AppText as="h2" variant="cardTitle">
              Forgot password?
            </AppText>
            <AppText variant="meta" className="text-dark-gray mt-1">
              Enter your email and we'll send instructions.
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

            <AppButton
              type="submit"
              disabled={loading}
              size="lg"
              fullWidth
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </AppButton>
          </form>

          <div className="border-t border-light-gray pt-6">
            <Link href="/login">
              <AppText variant="meta" className="text-teal hover:underline block text-center">
                ← Back to Log In
              </AppText>
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
