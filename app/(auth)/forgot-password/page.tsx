"use client";

import { useState } from "react";
import Link from "next/link";
import { AppPage } from "@/components/common/AppPage";
import { AppHeader } from "@/components/common/AppHeader";
import { PageSection } from "@/components/common/PageSection";
import { CardShell } from "@/components/common/CardShell";
import { AppButton } from "@/components/common/AppButton";
import { AppText } from "@/components/common/AppText";
import { inputStyles } from "@/lib/inputStyles";

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
      <AppPage>
        <AppHeader title="Reset Password" />
        <PageSection>
          <CardShell>
            <div className="space-y-4 text-center">
              <AppText variant="heading">Check your email</AppText>
              <AppText variant="body" className="text-dark-gray">
                We've sent password reset instructions to{" "}
                <span className="font-semibold text-ink">{email}</span>
              </AppText>
              <div className="rounded-lg bg-teal-50 p-4">
                <AppText variant="caption" className="text-teal">
                  The link will expire in 24 hours
                </AppText>
              </div>
              <Link href="/auth/login" className="mt-6 block">
                <AppButton className="w-full">Back to Log In</AppButton>
              </Link>
            </div>
          </CardShell>
        </PageSection>
      </AppPage>
    );
  }

  return (
    <AppPage>
      <AppHeader title="Reset Password" />
      <PageSection>
        <CardShell>
          <div className="mb-6 space-y-2">
            <AppText variant="body" className="text-dark-gray">
              Enter your email address and we'll send you instructions to reset
              your password.
            </AppText>
          </div>

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

            <AppButton
              onClick={handleSubmit}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </AppButton>
          </form>

          <div className="mt-6 border-t border-medium-gray pt-6">
            <Link href="/auth/login" className="block">
              <AppButton variant="secondary" className="w-full">
                Back to Log In
              </AppButton>
            </Link>
          </div>
        </CardShell>
      </PageSection>
    </AppPage>
  );
}
