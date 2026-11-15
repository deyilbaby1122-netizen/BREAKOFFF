/**
 * signup/page.tsx
 * BREAKOFF — Sign Up page.
 * - Full name, email, password, confirm password
 * - Email validation
 * - Error handling
 * - Redirect to account after signup
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";

export default function SignupPage() {
  const router = useRouter();
  const { signUp, user } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPasswordError(null);

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const result = await signUp(email, password, fullName);
    setLoading(false);

    if (result.error) {
      setError(result.error.message);
    } else if (user) {
      router.push("/account");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-8">
          <span className="text-3xl font-bold text-black">BREAKOFF</span>
          <span className="text-lg font-normal text-ink-500 hidden sm:block">
            TIMELESS CLOTHING
          </span>
        </Link>

        <div className="bg-white rounded-2xl border border-cream-200 p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-ink-900 mb-2">Create an account</h1>
          <p className="text-sm text-ink-500 mb-6">
            Join the BREAKOFF community and get exclusive offers.
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-600">
              {error}
            </div>
          )}
          {passwordError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-600">
              {passwordError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400 w-4 h-4" />
              <input
                type="text"
                required
                className="w-full pl-9 pr-3 py-2.5 border border-cream-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400 w-4 h-4" />
              <input
                type="email"
                required
                className="w-full pl-9 pr-3 py-2.5 border border-cream-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400 w-4 h-4" />
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full pl-9 pr-9 py-2.5 border border-cream-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
                placeholder="Password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                showPassword ? <Lock size={16} /> : <User size={16} />
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400 w-4 h-4" />
              <input
                type={showConfirm ? "text" : "password"}
                required
                className="w-full pl-9 pr-9 py-2.5 border border-cream-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                showConfirm ? <Lock size={16} /> : <User size={16} />
              </button>
            </div>
            <Button
              type="submit"
              className="w-full !text-base !px-6 !py-3 !rounded-full bg-black hover:bg-neutral-800 text-white"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
              <ArrowRight size={18} strokeWidth={2} className="ml-2" />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-ink-500">
            Already have an account?{" "}
            <Link href="/login" className="text-black font-medium hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
