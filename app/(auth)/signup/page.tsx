"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { AppText } from "@/components/common/AppText";
import { AppButton } from "@/components/common/AppButton";
import { inputStyles } from "@/lib/inputStyles";
import { useAuth } from "@/components/auth/useAuth";
import { AuthLayout } from "@/components/auth/AuthLayout";

export default function SignupPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    // Generate username with random suffix to avoid collisions
    const sanitizedUsername = `${firstName}${lastName}`
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const username = `${sanitizedUsername}${randomSuffix}`;

    // Generate initials from first and last name
    const firstInitial = firstName.trim().charAt(0).toUpperCase();
    const lastInitial = lastName.trim().charAt(0).toUpperCase();
    const initials = `${firstInitial}${lastInitial}`;

    const result = await signUp({
      email,
      password,
      display_name: `${firstName.trim()} ${lastName.trim()}`,
      username,
      initials,
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
          <AppText as="h1" variant="brand" className="text-teal">
            Create Account
          </AppText>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <AppText variant="meta" className="text-ink">First Name</AppText>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              className={inputStyles}
              required
            />
          </div>

          <div className="space-y-2">
            <AppText variant="meta" className="text-ink">Last Name</AppText>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
              className={inputStyles}
              required
            />
          </div>

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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className={inputStyles}
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

          <div className="space-y-2">
            <AppText variant="meta" className="text-ink">Confirm Password</AppText>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={inputStyles}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-medium-gray hover:text-dark-gray"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
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
            {loading ? "Creating account..." : "Create Account"}
          </AppButton>
        </form>

        <div className="rounded-lg bg-orange/5 p-4 text-center">
          <AppText variant="bodySmall" className="text-dark-gray">
            Already have one?
          </AppText>
          <Link href="/login">
            <AppText variant="body" className="mt-2 text-teal">
              Log In
            </AppText>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
