"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "../../utils/api";
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function SignupPage() {
  const router = useRouter();
  const BACKEND_URL = "http://localhost:8000"; // Change after deployment

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ---- Social Signup Handlers ----
  const googleSignup = () => {
    window.location.href = `${BACKEND_URL}/api/v1/auth/google/login`;
  };

  const githubSignup = () => {
    window.location.href = `${BACKEND_URL}/api/v1/auth/github/login`;
  };

  const facebookSignup = () => {
    window.location.href = `${BACKEND_URL}/api/v1/auth/facebook/login`;
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!agree) {
      setError("Please agree to the Terms & Privacy Policy.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/signup", { email, password });
      const { access_token, refresh_token } = res.data;

      localStorage.setItem("access_token", access_token);
      if (refresh_token) localStorage.setItem("refresh_token", refresh_token);

      router.push("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.detail || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl grid gap-12 md:grid-cols-[1.15fr,1fr] items-center">

        {/* LEFT */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            No credit card required · 40 seconds setup
          </div>

          <h1 className="text-4xl font-bold text-slate-900 leading-tight">
            Automate WordPress publishing in seconds.
          </h1>

          <p className="text-slate-700 text-[15px] max-w-md">
            Create, schedule and publish AI articles to all your WordPress sites —
            without opening the editor or copy-pasting ever again.
          </p>

          <ul className="text-sm text-slate-700 space-y-2">
            <li>⚡ Save 40+ hours every month</li>
            <li>📈 Built for agencies & publishers</li>
            <li>🔒 Privacy-first secure authentication</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xl rounded-2xl px-8 py-8">

          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Create your account</h2>

          {/* Social Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={googleSignup}
              className="w-full h-11 rounded-xl border border-slate-200 flex items-center justify-center gap-3 text-sm font-medium hover:bg-slate-100 transition"
            >
              <FaGoogle className="text-red-500" /> Sign up with Google
            </button>

            <button
              onClick={facebookSignup}
              className="w-full h-11 rounded-xl border border-slate-200 flex items-center justify-center gap-3 text-sm font-medium hover:bg-slate-100 transition"
            >
              <FaFacebookF className="text-blue-600" /> Sign up with Facebook
            </button>

            <button
  onClick={() => (window.location.href = "http://localhost:8000/api/v1/auth/github/login")}
  className="w-full h-11 rounded-xl border border-slate-200 flex items-center justify-center gap-3 text-sm font-medium hover:bg-slate-100 transition"
>
  <FaGithub /> Sign up with GitHub
</button>

          </div>

          <div className="flex items-center gap-3 my-4">
            <div className="h-[1px] bg-slate-200 w-full" />
            <span className="text-xs text-slate-500">or</span>
            <div className="h-[1px] bg-slate-200 w-full" />
          </div>

          {error && (
            <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-3">

            <div>
              <label className="text-xs font-medium text-slate-700">Full Name</label>
              <input type="text" value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border bg-slate-50 border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-slate-900/10"
                placeholder="Alex Turner" />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700">Email</label>
              <input type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border bg-slate-50 border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-slate-900/10"
                placeholder="you@example.com" />
            </div>

            <div className="relative">
              <label className="text-xs font-medium text-slate-700">Password</label>
              <input type={showPassword ? "text" : "password"} required value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="w-full rounded-xl border bg-slate-50 border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-slate-900/10" />
              <span className="absolute right-4 top-[38px] cursor-pointer text-slate-500"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
              </span>
            </div>

            <div className="relative">
              <label className="text-xs font-medium text-slate-700">Confirm Password</label>
              <input type={showConfirmPassword ? "text" : "password"} required value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl border bg-slate-50 border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-slate-900/10" />
              <span className="absolute right-4 top-[38px] cursor-pointer text-slate-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
              </span>
            </div>

            <label className="flex items-center gap-2 mt-3 text-xs text-slate-600">
              <input type="checkbox" checked={agree}
                onChange={() => setAgree(!agree)}
                className="h-4 w-4 rounded border-slate-300" />
              I agree to RankPost’s <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>
            </label>

            <button type="submit" disabled={loading}
              className="w-full mt-2 rounded-full bg-slate-900 text-white text-sm font-semibold py-3 shadow-sm hover:bg-slate-800 transition">
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-slate-900 hover:underline">
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
